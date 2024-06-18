import colors from "colors";
import cors, { CorsOptions} from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swaggerConfig";
import express from "express";
import router from "./router";
import db from "./config/db";
import morgan from "morgan";

// Conectar a DB
export async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue.bold('Conexión exitosa a la DB'));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold('Hubo un error al conectar a DB'));
    }
}
connectDB();

// instancia de express
const server = express();

// Permitir conexiones externas
// const corsOptions : CorsOptions = {
//     origin: function(origin, callback){
//         if(origin === process.env.FRONTEND_URL){
//             callback(null, true)
//         }else{
//             callback(new Error('Not allowed by CORS ❌'))
//         }
//     }
// }
server.use(cors())
// Para permitir todas -> server.use(cors())

// leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="icon" href="https://i.imgur.com/S1Bz8ro.png" />
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        }
        .container {
        text-align: center;
        }
        h1 {
        color: #333;
        font-size: 3rem;
        margin-bottom: 20px;
        }
    </style>
    </head>
    <body>
        <div class="container">
            <h1>¡Server funcionando! 🥳</h1>
        </div>
    </body>
    </html>
    `);
})

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;
