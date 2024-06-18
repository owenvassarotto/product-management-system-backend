import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middlewares";

const router = Router()
/**
*@swagger
*components:
*   schemas:
*       Product: 
*           type: object
*           properties: 
*               id:
*                   type: integer
*                   description: The product ID
*                   example: 1
*               name:
*                   type: string
*                   description: The product name
*                   example: "Iphone 15 PRO"
*               price:
*                   type: number
*                   description: The product price
*                   example: 300
*               available:
*                   type: boolean
*                   description: The product availability
*                   example: true
*/

/**
*@swagger
* /api/products:
*   get: 
*       summary: Get a list of products
*       tags: 
*           - Products  
*       description: Return a list of products
*       responses: 
*           200:
*               description: Successful response
*               content: 
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Product'
*/
router.get('/', getProducts);

/** 
* @swagger
* /api/products/{id}:
*   get: 
*       summary: Get a product by id     
*       tags:     
*           - Products     
*       description: Return a product based on its unique ID
*       parameters:
*         - in: path
*           name: id
*           description: The ID of the product to retrieve
*           required: true
*           schema: 
*               type: integer
*       responses:
*        200:
*           description: Successful response
*           content: 
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Product'
*        400:
*           description: Bad request - Invalid ID 
*        404:
*           description: Not found
*/
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),        
    handleInputErrors,
    getProductById
);


/**
* @swagger
* /api/products:
*  post:
*   summary: Creates a new Product
*   tags: 
*      - Products
*   description: Returns a new record in the database
*   requestBody: 
*       required: true
*       content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       name:
*                           type: string
*                           example: "PS5 PRO"
*                       price:
*                           type: number
*                           example: 1200
*   responses:
*        201: 
*           description: Successful response
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Product'
*        400:
*           description: Bad request - Invalid input data
*/
router.post('/', 
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .isNumeric().withMessage('Precio no válido')
        .notEmpty().withMessage('El precio del producto es obligatorio')
        .custom( value => value > 0 ).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct
);

/**
* @swagger
*   /api/products/{id}:
*       put:
*           summary: Updates a product with user input  
*           tags: 
*               - Products
*           description: Return the uploaded product
*           parameters: 
*               - in: path
*                 name: id
*                 description: The ID of the product to retrieve
*                 required: true
*                 schema: 
*                   type: integer
*           requestBody: 
*               required: true
*               content:
*                   application/json:
*                     schema:
*                       type: object
*                       properties:
*                           name:
*                               type: string
*                               example: "PS5 PRO"
*                           price:
*                               type: number
*                               example: 1200
*                           available:
*                               type: boolean
*                               example: false
*           responses:
*            200: 
*               description: Successful response
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Product'
*            404:
*               description: Product not found
*            400:
*               description: Bad request - Invalid ID or ivalid input data
*/
router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),   
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .isNumeric().withMessage('Precio no válido')
        .notEmpty().withMessage('El precio del producto es obligatorio')
        .custom( value => value > 0 ).withMessage('Precio no válido'),     
    body('available').isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
);

/**
*  @swagger
*   /api/products/{id}:
*      patch: 
*          summary: Update product availability
*          tags:
*              - Products
*          description: Returns the updated availability
*          parameters: 
*              - in: path
*                name: id
*                description: The ID of the product to retrieve
*                required: true
*                schema: 
*                  type: integer
*          responses:
*              200: 
*                  description: Successful response
*                  content:
*                      application/json:
*                          schema:
*                              $ref: '#/components/schemas/Product'
*              404:
*                  description: Product not found
*              400:
*                  description: Bad request - Invalid ID
*/
router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),   
    handleInputErrors,
    updateAvailability
);

/**
* @swagger
*  /api/products/{id}:
*   delete:
*       summary: Deletes a product by a given ID
*       tags: 
*          - Products
*       description: Returns a message confirming that the product was deleted
*       parameters: 
*           - in: path
*             name: id
*             description: The ID of the product to retrieve
*             required: true
*             schema: 
*               type: integer
*       responses:
*              200: 
*                  description: Successful response
*                  content: 
*                       application/json:
*                           schema:
*                               type: string
*                               value: 'Producto eliminado'
*              404:
*                  description: Product not found
*              400:
*                  description: Bad request - Invalid ID
*/
router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
);

export default router;