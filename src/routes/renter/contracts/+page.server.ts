import db from "$lib/server/db";
import { error } from "@sveltejs/kit";

export async function load({ locals }) {
    if (locals.user === undefined) throw error(401);
    const renterId = locals.user.id

    const result = await db.query.pgRooms.findMany({
        with: {
            house: true,
            contracts: {
                with: {
                    rentee: true
                }
            },
            images: true,
        }
    })

    const myRooms = result.filter(r => r.house.fk_renter === renterId).flatMap(r => r)

    const allContracts = myRooms.flatMap(r => r.contracts);

    const contractsWithMeta = []
    for (const contract of allContracts) {
        const roomOfContract = myRooms.find(r => r.id === contract.fk_room)!;

        const result = {
            ...contract,
            room: {
                ...roomOfContract,
                contracts: undefined,
                house: undefined,
                images: undefined
            },
            house: {
                ...roomOfContract.house
            },
            images: {
                ...roomOfContract.images
            }
        }

        contractsWithMeta.push(result);
    }

    return {
        contracts: contractsWithMeta
    }
}