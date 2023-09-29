import swaggerJsdoc from 'swagger-jsdoc';
import * as fs from "fs";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/api/v1/**/*.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
// console.dir(JSON.stringify(openapiSpecification))


// await fs.writeFileAsync();

fs.writeFileSync("./src/lib/static/generated.json", JSON.stringify(openapiSpecification));