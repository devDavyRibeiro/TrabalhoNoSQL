import { ObjectId } from "mongodb";

export const getPets = async (req, res) => {
  try {
    const filtros = req.query;

    const db = req.app.locals.db; 

    const query = {};

    if (filtros.cpfCliente) query.cpfCliente = filtros.cpfCliente;
    if (filtros.nome) query.nome = filtros.nome;

    if (filtros.especie) {
      query.especie = { $regex: `^${filtros.especie}$`, $options: 'i' };
    }

    if (filtros.porte) {
      query.porte = { $regex: `^${filtros.porte}$`, $options: 'i' };
    }

    if (filtros.idade_min || filtros.idade_max) {
      query.idade = {};
      if (filtros.idade_min) query.idade.$gte = parseInt(filtros.idade_min);
      if (filtros.idade_max) query.idade.$lte = parseInt(filtros.idade_max);
    }

    
    const pets = await db
      .collection("pet")
      .find(query)
      .toArray();

    res.status(200).json(pets);

  } catch (error) {
    console.error("Erro ao consultar pets:", error);
    res.status(500).json({ erro: "Erro ao buscar pets" });
  }
};


export const getPetID = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params;
    const query = { _id: new ObjectId(id) };
    const pet = await db.collection("pet").findOne(query);
    if (!pet) {
      return res
        .status(404)
        .json({ error: "true", message: "Pet doesn't found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    console.error("Error fetching municipio:", error);
    res.status(500).json({ error: true, message: "Failed to fetch municipio" });
  }
};

export const postPet = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const {
      nome,
      especie,
      raca,
      idade,
      sexo,
      porte,
      observacoes,
      peso,
      cpfCliente,
      nome_tutor,
    } = req.body;

    const newPet = {
      nome,
      especie,
      raca,
      idade,
      sexo,
      porte,
      observacoes,
      peso,
      cpfCliente,
      nome_tutor,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await db.collection("pet").insertOne(newPet);

    res.status(201).json(newPet);
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ error: true, message: "Failed to create pet" });
  }
};

export const putPets = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id; 
    const {
      
      nome,
      especie,
      raca,
      idade,
      sexo,
      porte,
      observacoes,
      peso,
      cpfCliente,
      nome_tutor,
    } = req.body;
    const novosDadosPets = {
      id,
      nome,
      especie,
      raca,
      idade,
      sexo,
      porte,
      observacoes,
      peso,
      cpfCliente,
      nome_tutor,
      updated_at: new Date(),
    };

    const result = await db.collection("pet").updateOne(
      { _id: new ObjectId(id) }, // procurando o pet pelo campo "id"
      { $set: novosDadosPets } // atualizando os dados
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ mensagem: "Pet não encontrado ou nada foi alterado." });
  }
  
    res.status(200).json({ mensagem: "Pet atualizado com sucesso!" });
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ error: true, message: "Failed to update pet" });
  }
};

// Delete Pets
export const deletePets = async (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;

  try {
    const existPet = db
      .collection("pet")
      .findOne({ _id: new ObjectId(id) }).count;
    if (existPet === 0) {
      return res.status(404).json({ mensagem: "Pet não encontrado." });
    }

     await db.collection("estadia").deleteMany({
      pet: {
        _id: id,
      },
    });
     await db.collection("pet").deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ mensagem: "Pet deletado com sucesso!" });

  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar o pet.", erro });
  }
};
