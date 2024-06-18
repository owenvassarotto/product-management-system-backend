import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {

    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
    })

    it('should validate that the price is greater than zero', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor Curvo 8K',
            price: 0,
        });

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toEqual('Precio no válido')
    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Mouse - Testing',
            price: 50
        })
        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('GET /api/products', () => {
    it('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404);
    })
    it('should return a JSON response with all the products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200);        
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 1945
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should check a valid ID in the URL', async () => {
        const productId = "invalid"
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('should return a JSON response with product info', async () => {
        const productId = 1
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => { 

    it('should check a valid ID in the URL', async () => {
        const productId = "not-valid-id"
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: 'Updated product',
            price: 400,
            available: false
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toEqual(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should validate that the price is greater than zero', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: 'Updated product',
            price: -400,
            available: false
        })
        expect(response.status).toEqual(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no válido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should display an error message if the product does not exist', async () => {
        const productId = 1945
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: 'Updated product',
            price: 400,
            available: false
        })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should update an existing product with valid data', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: 'Updated Product',
            price: 400,
            available: true
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto actualizado correctamente')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for an non-existing product', async () => {
        const response = await request(server).patch(`/api/products/2000`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update the product availability', async () => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.available).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () => {
    it('should check a valid ID in the URL', async () => {
        const productId = "not-valid-id"
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })


    it('should return a 404 response for a non-existent product', async () => {
        const productId = 1945
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should delete a product', async () => {
        const productId = 1
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})