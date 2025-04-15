
export const getPets = async (req, res) => {
    const db = req.app.locals.db; // guardando o banco na variavel db. Todas as operações do banco vão ser usadas atráves de db

    const pets = await db.collection('pet') // collection que estou procurando
    .find({}) // procurando por todos
    .toArray(); // transformando tudo em um Array
    res.status(200).json(pets); // dando o resultado em forma de JSON e dando status 200
}
export const getPetsID = ()=>{

}