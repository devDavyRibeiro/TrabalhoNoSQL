import jwt from jsonwebtoken

async function auth(req,res,next){
    const db = req.app.locals.db;
    const {email, senha} = req.body;
    
    const usuario = await db.collection('client').findOne({email:email,senha:senha})

    if(usuario){
        const {nome, cpf} = usuario
        const payload = {
            nome,
            cpf
        }

        console.log(payload)
    }
    else{
        res.status(401).json({mensagem:"Credeciais inválidas"})
    }
}