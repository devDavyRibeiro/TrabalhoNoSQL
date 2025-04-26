import { ObjectId } from "mongodb";

export const getPets = async (req, res) => {
  try {
    const filtros = req.query;

    const db = req.app.locals.db;

    const query = {};

    if (filtros.cpfCliente) query.cpfCliente = filtros.cpfCliente;
    if (filtros.especie) query.especie = filtros.especie;
    if (filtros.porte) query.porte = filtros.porte;

    if (filtros.idadeMinima || filtros.idadeMaxima) {
      query.idade = {};
      if (filtros.idadeMinima) query.idade.$gte = parseInt(filtros.idadeMinima);
      if (filtros.idadeMaxima) query.idade.$lte = parseInt(filtros.idadeMaxima);
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
      nomePet,
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
      nomePet,
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
    const id = req.params.id; // pegando o ID
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
    if (result.updateCount === 0) {
      return res.status(404).json({ mensagem: "Pet não encontrado." });
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
    const resultado = await db
      .collection("pet")
      .deleteOne({ _id: new ObjectId(id) });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensagem: "Pet não encontrado." });
    }

    res.status(200).json({ mensagem: "Pet deletado com sucesso!" });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar o pet.", erro });
  }
};
