import bcrypt from 'bcrypt'

export const postUsuario = async (req, res) => {
    const db = req.app.locals.db;
    const {senha} = req.body;
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    let senhaCriptografada = bcrypt.hashSync(senha, salt);

    const novoUser = req.body; // pegando os dados do corpo da requisição
    novoUser.senha = senhaCriptografada;

    await db.collection('client').insertOne(novoUser); // inserindo na collection
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' }); // resposta
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
