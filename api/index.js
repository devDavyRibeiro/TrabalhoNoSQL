import express, { json } from 'express';
import petRouter from './routes/pet.js';
import agendaRouter from './routes/agendas.js';  // Ajuste o caminho se necessário
import { connectMongoDB } from './config/db.js';
import cors from 'cors'
import agendas2Router from './routes/agendas.js'

const PORT = process.env.PORT;
const app = express();
const URL = process.env.URL;

app.use(cors());
app.use(express.json())
app.use(`${URL}/`, express.static('public'))


app.use(`${URL}/pets`, petRouter)
app.use(`${URL}/agendas`, agendaRouter);  // Agora o prefixo '/agenda' será usado para suas rotas


connectMongoDB(app).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}!`)
    })
});