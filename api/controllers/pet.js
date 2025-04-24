import { ObjectId } from "mongodb";

export const getPets = async (req, res) => {
    try {
        const db = req.app.locals.db; // guardando o banco na variavel db. Todas as operações do banco vão ser usadas atráves de db

        const pets = await db.collection('pet') // collection que estou procurando
        .find({}) // procurando por todos
        .toArray(); // transformando tudo em um Array
        res.status(200).json(pets); // dando o resultado em forma de JSON e dando status 200   
    } catch (error) {
        console.error("Error fetching pet:", error)
        res.status(500).json({ error: true, message: "Failed to fetch pet" })
    }

}
export const getPetID = async (req,res)=>{
    try {
        const db = req.app.locals.db;
        const id = req.params;
        const query = {_id: new ObjectId(id)};
        const pet = await db.collection('pet').findOne(query)
        if(!pet){
            return res.status(404).json({error:"true", message: "Pet doesn't found"});
        }
        res.status(200).json(pet);
    } catch (error) {
        console.error("Error fetching municipio:", error)
        res.status(500).json({ error: true, message: "Failed to fetch municipio" })
    }
}

export const postPet = async(req,res)=>{
    try {
        const db = req.app.locals.db;
        const {nome,especie,raca,datanasc,sexo,porte,observacoes,peso,cpfCliente} = req.body;

        const existTutor = await db.collection('cliente').findOne({cpf:cpfCliente});
       
        if(!existTutor){
            return res.status(404).json({
                error: true,
                message: "Tutor não encontrado"
            })
        }
        
        const newPet ={
            nome,
            especie,
            raca,
            datanasc,
            sexo,
            porte,
            observacoes,
            peso,
            cpfCliente,
            created_at: new Date(),
            updated_at : new Date(),
        }
        
        await db.collection('pet').insertOne(newPet);

        res.status(201).json(newPet);

    } catch (error) {
        console.error("Error creating pet:", error)
        res.status(500).json({ error: true, message: "Failed to create pet" })
    }
}

export const putPets = async (req, res) => {
    const db = req.app.locals.db;
    const id = req.params.id; // pegando o ID
    const {nome, especie, raca, datanasc, sexo, porte, observacoes, peso, cpfCliente} = req.body;
    const novosDadosPets ={
        nome,
        especie,
        raca,
        datanasc,
        sexo,
        porte,
        observacoes,
        peso,
        cpfCliente,
        updated_at : new Date(),
    }
    

    const result = await db.collection('pet').updateOne(
        { _id: new ObjectId (id) }, // procurando o pet pelo campo "id"
        { $set: novosDadosPets } // atualizando os dados
    );
    if(result.updateCount === 0){
        return res.status(404).json({ mensagem: 'Pet não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Pet atualizado com sucesso!' });
};

// Delete Pets
export const deletePets = async (req, res) => {
    const db = req.app.locals.db;
    const id = req.params.id;

    try {
        const resultado = await db.collection('pet').deleteOne({ _id: new ObjectId(id) });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ mensagem: 'Pet não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Pet deletado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao deletar o pet.', erro });
    }
};

