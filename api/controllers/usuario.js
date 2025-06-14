import bcrypt from 'bcrypt'
import e from 'express';
import { body, param } from 'express-validator';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken'
export const getListUsuario = async(req,res) =>{
    try {
        const db = req.app.locals.db;
        const{cpf,nome, email} = req.query;
        let query = {};
        
        if(cpf){
            query.cpf = cpf
        }
        if(nome){
            query.nome = {$regex: nome, i}
        }
        if(email){
            query.email = {$regex: email, i}
        }

        const usuarios = await db.collection('client').find(query).toArray(); 
        return res.status(200).json({usuarios});
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao cadastrar procurar usuários.', error });
    }
}
export const getById = async (req,res) =>{
    try {
        const db = req.app.locals.db;
        const {id} = req.params;

        let usuario = await db.collection('client').findOne({_id: ObjectId.createFromHexString(id)});
        return res.status(200).json(usuario);
    } catch (error) {
       return res.status(500).json({ mensagem: 'Erro ao cadastrar procurar usuário.', error });
    }
}
export const postUsuario = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const {senha} = req.body;
    
        const novoUser = req.body; // pegando os dados do corpo da requisição
        novoUser.senha = criptografarSenha(senha);
    
        await db.collection('client').insertOne(novoUser); // inserindo na collection
        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' }); // resposta   
    } catch (error) {
       return res.status(500).json({ mensagem: 'Erro ao cadastrar o usuário.', error });
    }
};

export const putUsuario = async(req,res)=>{
    try {
        const db = req.app.locals.db;
        const {id} = req.params;
        const {senha} = req.body;
        const existsUsuario = await db.collection('client').findOne({_id: ObjectId.createFromHexString(id)});
        
        if(!existsUsuario){
           return res.status(404).json({mensagem:'Não foi encontrado o usuário'})
        }

        const usuario = req.body
        usuario.senha = criptografarSenha(senha);
        const result = await db.collection('client').updateOne({_id: ObjectId.createFromHexString(id)},{$set:usuario});
        if(result.modifiedCount > 0){
           return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
        }
        else{
            return res.status(400).json({ mensagem: "Nenhuma modificação realizada." });
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar o usuário.', error });
    }
}
export const deleteUsuario = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const id = req.params.id;

        const resultado = await db.collection('client').deleteOne({ _id: ObjectId.createFromHexString(id) });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ mensagem: 'usuário não encontrado.' });
        }

        return res.status(200).json({ mensagem: 'Tutor deletado com sucesso!' });
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao deletar o tutor.', erro });
    }
};

export const efetuaLogin = async (req,res) =>{
try {
    const db = req.app.locals.db;
    const {email, senha} = req.body;
    const secret = process.env.SECRET_KEY
    const expiresIn = process.env.EXPIRES_IN ;
    
    if(!secret){
        console.log("Variavel SECRET_KEY não foi definida no .env")
        return res.status(500).json({
            errors:[{
                value: `secret`,
                msg: `Erro do servidor`,
                param: 'secret'
            }]
        })
    }
    const usuario = await db.collection('client').findOne({email:email})

    if(!usuario){
        return res.status(404).json({
            errors:[{
                value: `${email}`,
                msg: `O email não foi cadastrado`,
                param: 'email'
            }]
        })
    }
    
    const isMath = await bcrypt.compare(senha, usuario.senha);
    if(!isMath){
        return res.status(403).json({
            errors:[{
                value: `senha`,
                msg: `Senha incorreta`,
                param: 'senha'        
            }]
        })
    }

    jwt.sign(
      {
        usuario: {
          id: usuario._id,
        },
      },

      secret,

      {
        expiresIn: expiresIn,
      },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          accessToken : token,
          msg: "Login efetuado com sucesso",
        });
      }
    );
} catch (error) {
    return res.status(500).json({mensagem:`Erro ao Logar: ${error}`})
}


}
 function criptografarSenha (senha='') {
    const salt =  bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    return  bcrypt.hashSync(senha, salt);
}

