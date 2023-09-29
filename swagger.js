import swaggerJsdoc from 'swagger-jsdoc';
import * as fs from "fs";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'STPP Rentee API',
            version: '1.0.0',
        },
        components: {
            // schemas: {
            //     authResponse: {
            //         type: "object",
            //         properties: {
            //             message: {
            //                 type: "string"
            //             }
            //         }
            //     }
            // }
        },
    },
    apis: ['./src/routes/api/v1/**/*.ts'],
};

fs.writeFileSync("./static/swagger/swagger.json", JSON.stringify(swaggerJsdoc(options)));