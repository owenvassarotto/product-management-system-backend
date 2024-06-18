import swaggerJSDoc, { Options } from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            },
            {
                name: 'Users',
                description: 'API operations related to users'
            },
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .swagger-ui .topbar {
            background-color: #2b3b45
        }
    `,
    customSiteTitle: 'Documentation REST API Express / TypeScript'
} 

export default swaggerSpec
export {
    swaggerUiOptions,
}