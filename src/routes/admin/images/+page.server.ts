import db from "$lib/server/db";

export async function load() {
    type Image = { id: number, url: string, type: "house" | "room" | 'common-area' };

    const houseImagesPromise: Promise<Image[]> = db.query.pgHouses.findMany({ columns: { id: true, image_url: true } }).then(r => r.map(i => (
        {
            id: i.id, //! house_id
            url: i.image_url,
            type: "house"
        }
    )));
    const roomImagesPromise: Promise<Image[]> = db.query.pgRoomImages.findMany().then(r => r.map(i => (
        {
            id: i.id, //! image_id
            url: i.url,
            type: "room"
        }
    )));
    const commonAreaImagesPromise: Promise<Image[]> = db.query.pgCommonAreaImages.findMany().then(r => r.map(i => (
        {
            id: i.id, //! image_id
            url: i.url,
            type: 'common-area'
        }
    )));

    return {
        streamed: {
            houseImagesPromise,
            roomImagesPromise,
            commonAreaImagesPromise
        }
    }
}