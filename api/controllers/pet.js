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

        const existTutor = await db.collection('cliente').find({cpfCliente: cpfCliente});
        if(!existTutor){
            return res.status(400).json({
                error: true,
                message: "Tutor not found"
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
export const deletePet = async(req,res)=>{
    try {
        const id = req.params;
        const db = req.app.locals.db;
        
        const result = await db.collection('pet').deleteOne({
            _id: new ObjectId(id)
        });

        if(result.deletedCount === 0){
           return res.status(404).json({ error: true, message: "Pet doesn't found"})
        } 
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error deleting pet:", error)
        res.status(500).json({ error: true, message: "Failed to delete pet" })
    }
}