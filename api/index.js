import express from 'express';

const app = express();
app.use('/', express.static('public'))
app.get('/',(req,res)=>{
    res.sendFile("localhost:3000/index.html")
})
app.listen(3000,()=>{
    console.log('Servidor Rodando');
})