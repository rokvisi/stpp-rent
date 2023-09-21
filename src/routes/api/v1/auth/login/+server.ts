import { authSchema } from '$lib/zod_schemas.js';
import { error } from '@sveltejs/kit';
import * as jose from 'jose'
import crypto from "crypto";

import { SECRET_JWT_SERVER_TOKEN } from '$env/static/private';
import db from '$lib/server/database/db';
import { and, eq } from 'drizzle-orm';
import { pgUsers } from '$lib/database/schema.js';

export async function POST({ request }) {
    const requestBody = await request.json();

    try {
        //* 1. Zod validate the formData. (optional, but highly recommeded)
        const { username, password } = authSchema.parse(requestBody);
        console.log("/auth/login | ZOD VALID:", { username, password });

        //* 2. Hash the password for database lookup.
        const passwordHash = Buffer.from(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))).toString("base64");
        console.log("Hashed password:", passwordHash)

        //* 3. Check if the user exists and the password matches.
        const userInfo = await db.query.pgUsers.findFirst({
            where: and(eq(pgUsers.name, username), eq(pgUsers.password, passwordHash))
        })

        //* 4.1. If the user doesn't exist or the password doesn't match - return error response.
        if (userInfo === undefined) {
            console.log("User not found!");
        }

        //* 4.2. Create a JWT token with *some* user information.
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60 * 60; // one hour
        const payload = {
            user: "foo"
        }
        const res = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setExpirationTime(exp)
            .setIssuedAt(iat)
            .setNotBefore(iat)
            .sign(new TextEncoder().encode(SECRET_JWT_SERVER_TOKEN))
        console.log("/auth/login | JWT:", res)

        const a = await jose.jwtVerify(res, new TextEncoder().encode(SECRET_JWT_SERVER_TOKEN))
        // console.log(a)


        //* 4.3. Set http-only cookie with the JWT token.

        //* 5. Return the success response.
        return new Response();
    }
    catch (e) {
        //* Handle zod errors.
        // TODO:

        //* Handle JWT errors

        //* Handle other (db, ...) errors
        // TODO:

        console.log("/auth/login | ERROR", requestBody)
        console.log(e)
        throw error(401);
    }
}