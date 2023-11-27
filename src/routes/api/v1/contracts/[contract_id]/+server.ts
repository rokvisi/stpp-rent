import { pgContracts } from '$lib/database/schema';
import db from '$lib/server/db.js';
import { getRequestJson } from '$lib/server/helpers.js';
import { error } from '@sveltejs/kit';
import { and, eq, ne } from 'drizzle-orm';

async function getContractById(contractId: number) {
    try {
        const res = await db.query.pgContracts.findFirst({
            where: eq(pgContracts.id, contractId),
            with: {
                room: {
                    with: {
                        house: {
                            with: {
                                renter: {
                                    columns: {
                                        id: true
                                    }
                                },

                            },
                            columns: {}
                        }
                    },
                }
            }
        })

        if (res === undefined) return null;
        return {
            ...res,
            room: undefined,
            fk_renter: res.room.house.renter.id
        };
    }
    catch {
        return undefined;
    }
}

async function getAllOtherContractsForRoom(roomId: number) {
    try {
        const res = await db.query.pgContracts.findMany({
            where: eq(pgContracts.fk_room, roomId),
            with: {
                room: {
                    with: {
                        house: {
                            with: {
                                renter: {
                                    columns: {
                                        id: true
                                    }
                                },

                            },
                            columns: {}
                        }
                    },
                }
            }
        })

        return res;
    }
    catch {
        return undefined;
    }
}

export async function PATCH({ locals, request, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "renter") throw error(401, "Only renters can act upon contracts. Please login.");

    //* Got form data in the request.
    const json = await getRequestJson(request);
    if (json === null) throw error(400, "The request json is invalid. Please check your data and try again.");

    //* Validate the form data.
    if (json.action === undefined || typeof json.action !== "string" || (json.action !== "accept" && json.action !== "decline")) throw error(400, "The request json is invalid. Please check your data and try again.");
    const contractAction = json.action as ("accept" | "decline");

    //* Check if the logged in renter is the one whose room it is.
    const contractId = Number(params.contract_id) ?? -1;
    const dbContract = await getContractById(contractId);
    if (dbContract === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    if (dbContract === null) throw error(404, 'The specified contract does not exist.');

    if (dbContract.fk_renter !== locals.user.id) throw error(401, "Can't accept a contract for a room owned by a different person.");

    //* Check if we can accept the contract (no other contract for the same room with start_date !== null and end_date === null).
    const otherContractsForRoom = await getAllOtherContractsForRoom(dbContract.fk_room);
    if (otherContractsForRoom === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    if (otherContractsForRoom === null) throw error(404, 'The specified contract does not exist.');
    for (const otherContract of otherContractsForRoom) {
        //* Room already in use
        if (otherContract.start_date !== null && otherContract.end_date === null) {
            throw error(503, 'The room is already being rented by a person!');

            //TODO: Good idea to delete all other the contracts in the array.
        }
    }

    //* Accept/Decline contract.
    //? Accept
    if (contractAction === "accept") {
        try {
            await db.transaction(async (tx) => {
                //* Decline all other contracts for the room.
                await tx.update(pgContracts).set({
                    declined: true
                }).where(and(eq(pgContracts.fk_room, dbContract.fk_room), ne(pgContracts.id, dbContract.id)))

                //* Set the contract as accepted
                await tx.update(pgContracts).set({
                    start_date: new Date(),
                }).where(eq(pgContracts.id, dbContract.id))
            })
        }
        catch {
            throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
        }
    }
    //? Decline
    else {
        try {
            //* Set the contract as declined
            await db.update(pgContracts).set({
                declined: true,
            }).where(eq(pgContracts.id, dbContract.id))
            //TODO: Decline all other contracts for the same room from the same user.
        }
        catch {
            throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
        }
    }

    return new Response();
}