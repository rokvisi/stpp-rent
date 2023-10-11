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
                columns: {
                    price: true
                }
            }
        },
    });

    const res = houses.map(h => {
        const room_price_min = Math.min(...h.rooms.map(r => r.price));
        const room_price_max = Math.max(...h.rooms.map(r => r.price));

        return {
            ...h,
            rooms: undefined,
            room_price_min: room_price_min === Infinity ? 0 : room_price_min,
            room_price_max: room_price_max === -Infinity ? 0 : room_price_max
        }
    })

    return {
        houses: res
    }
}