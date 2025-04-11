import express from 'express';
import petRouter from './routes/pet.js';
const app = express();
app.use('/', express.static('public'))
app.use('/pets', petRouter)
app.get('/',(req,res)=>{
    res.sendFile("localhost:3000/index.html")
})
app.listen(3000,()=>{
    console.log('Servidor Rodando');
})