import express, { json } from 'express';
import petRouter from './routes/pet.js';
import agendaRouter from './routes/agendas.js';  // Ajuste o caminho se necessário
import usuarioRouter from './routes/usuario.js';
import { connectMongoDB } from './config/db.js';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import cors from 'cors'


const PORT = process.env.PORT;
const app = express();
const URL = process.env.URL;

app.use(cors());
app.use(express.json())
app.use(`/`, express.static('public'))


app.use(`/api/pets`, petRouter)
app.use(`/api/agendas`, agendaRouter);  // Agora o prefixo '/agenda' será usado para suas rotas
app.use(`/api/usuarios`, usuarioRouter);  // Agora o prefixo '/agenda' será usado para suas rotas

// Rota da documentação Swagger 
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(JSON.parse(fs.readFileSync('./api/swagger/swagger_output.json')),))


connectMongoDB(app).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}!`)
    })
});