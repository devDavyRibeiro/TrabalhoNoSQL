import bcrypt from 'bcrypt'
import { body } from 'express-validator';
import { ObjectId } from 'mongodb';
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
        res.status(200).json({usuarios});
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar procurar usuários.', error });
    }
}
export const getById = async (req,res) =>{
    try {
        const db = req.app.locals.db;
        const {id} = req.params;

        let usuario = await db.collection('client').findOne({_id: ObjectId.createFromHexString(id)});
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar procurar usuário.', error });
    }
}
export const postUsuario = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const {senha} = req.body;
    
        const novoUser = req.body; // pegando os dados do corpo da requisição
        novoUser.senha = criptografarSenha(senha);
    
        await db.collection('client').insertOne(novoUser); // inserindo na collection
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' }); // resposta   
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao cadastrar o usuário.', error });
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
        res.status(500).json({ mensagem: 'Erro ao atualizar o usuário.', error });
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

        res.status(200).json({ mensagem: 'usuário deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar o usuário.', error });
    }
};

 function criptografarSenha (senha='') {
    const salt =  bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    return  bcrypt.hashSync(senha, salt);
}
