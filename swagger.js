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
            schemas: {
                authResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string"
                        }
                    }
                }
            },
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "token"
                }
            }
        },
        security: [{ cookieAuth: [] }]
    },
    apis: ['./src/routes/api/v1/**/*.ts'],
};

fs.writeFileSync("./src/lib/static/generated.json", JSON.stringify(swaggerJsdoc(options)));
fs.writeFileSync("./static/generated.json", JSON.stringify(swaggerJsdoc(options)));