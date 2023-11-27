import { pgContracts } from '$lib/database/schema';
import db from '$lib/server/db.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

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

export async function PATCH({ locals, params }) {
    //* Authenticated as a renter.
    if (locals.user?.role !== "rentee") throw error(401, "Only rentees can end contracts. Please login.");

    //* Check if the logged in renter is the one whose room it is.
    const contractId = Number(params.contract_id) ?? -1;
    const dbContract = await getContractById(contractId);
    if (dbContract === undefined) throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    if (dbContract === null) throw error(404, 'The specified contract does not exist.');

    if (dbContract.fk_rentee !== locals.user.id) throw error(401, "Can't end a contract owned by a different rentee.");

    //* Check if the contract is started and can be ended
    const contractCanBeEnded = dbContract.start_date !== null && dbContract.end_date === null;
    if (!contractCanBeEnded) {
        throw error(403, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    //* End the contract
    try {
        await db.update(pgContracts).set({
            end_date: new Date()
        }).where(eq(pgContracts.id, dbContract.id))
    }
    catch {
        throw error(503, 'Sorry, we are currently experiencing technical difficulties. Please try again later.');
    }

    return new Response();
}