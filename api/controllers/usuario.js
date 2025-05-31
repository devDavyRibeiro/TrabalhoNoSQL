

export const postUsuario = async (req, res) => {
    const db = req.app.locals.db;

    const novoUser = req.body; // pegando os dados do corpo da requisição

    await db.collection('client').insertOne(novoUser); // inserindo na collection
    res.status(201).json({ mensagem: 'Tutor cadastrado com sucesso!' }); // resposta
};


//Delete Client
export const deleteUsuario = async (req, res) => {
    const db = req.app.locals.db;
    const id = req.params.id;

    try {
        const resultado = await db.collection('client').deleteOne({ id: id });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ mensagem: 'Tutor não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Tutor deletado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao deletar o tutor.', erro });
    }
};

export const efetuaLogin = async (req,res) =>{

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
