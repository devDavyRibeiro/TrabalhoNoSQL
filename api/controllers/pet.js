
export const getPets = async (req,res) => {
    const db = req.app.locals.db;
    const pets = await db.collection('pets').find({}).toArray();
    res.status(200).json(pets);


}