import express, { json } from 'express';
import petRouter from './routes/pet.js';
import usuarioRouter from './routes/usuario.js';
import  dotenv from 'dotenv'
import { connectMongoDB } from './config/db.js';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import cors from 'cors'

dotenv.config();
const PORT = process.env.PORT;
const app = express();
const URL = process.env.URL;

app.use(cors());
app.use(express.json())
app.use(`/`, express.static('public'))


app.use(`/api/pets`, petRouter)
app.use(`/api/usuarios`, usuarioRouter);  // Agora o prefixo '/agenda' será usado para suas rotas

// Rota da documentação Swagger 
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(JSON.parse(fs.readFileSync('./api/swagger/swagger_output.json')),))


connectMongoDB(app).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}!`)
    })
});