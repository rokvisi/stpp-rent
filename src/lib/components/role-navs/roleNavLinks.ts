export const roleNavLinks: Record<string, { href: string, title: string }[]> = {
    admin: [
        {
            href: "/renter/contracts",
            title: "TODO"
        }
    ],
    renter: [
        {
            href: "/renter/listings",
            title: "My Listings"
        },
        {
            href: "/renter/contracts",
            title: "My Contracts"
        }
    ],
    rentee: [
        {
            href: "/rentee/houses",
            title: "House listings"
        },
        {
            href: "/rentee/contracts",
            title: "My contracts"
        }
    ]
};