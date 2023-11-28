import db from "$lib/server/db";

export async function load() {
    const houses = await db.query.pgHouses.findMany({
        with: {
            renter: {
                columns: {
                    username: true
                }
            },
            rooms: {
                with: {
                    contracts: true
                }
            }
        },
    });

    const res = houses.map(h => {
        const room_price_min = Math.min(...h.rooms.map(r => r.price));
        const room_price_max = Math.max(...h.rooms.map(r => r.price));

        return {
            ...h,
            room_price_min: room_price_min === Infinity ? 0 : room_price_min,
            room_price_max: room_price_max === -Infinity ? 0 : room_price_max
        }
    })

    //* Get room availability
    const res2 = res.map(r => ({
        ...r, rooms: r.rooms.map(room => ({
            ...room,
            available: room.contracts.findIndex(c => c.start_date !== null && c.end_date === null) === -1
        }))
    }));

    const res3 = res2.map(h => ({
        ...h,
        availableRooms: h.rooms.filter(r => r.available).length
    }))

    return {
        houses: res3
    }
}