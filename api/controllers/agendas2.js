import { ObjectId } from "mongodb";

export const getAgendas2 = async (req, res) => {
  try {
    const filtros = req.query;

    const db = req.app.locals.db; 

    const query = {};

    if (filtros.nome_pet) {
      query.nome_pet = filtros.nome_pet;
    }

    if (filtros.cpf_tutor) {
      query.cpf_tutor = filtros.cpf_tutor;
    }

    if (filtros.data_entrada || filtros.data_saida) {
        query.data_entrada = {};
        query.data_saida = {};
        
          if (filtros.data_entrada) {
            query.data_entrada.$gte = new Date(filtros.data_entrada);
          }
          if (filtros.data_saida) {
            query.data_saida.$lte = new Date(filtros.data_saida);
          }
      }

    const agendas = await db
      .collection("estadia")
      .find(query)
      .toArray();
    
    // Formata datas do banco para DD/MM/YYYY
    // Ignorando agendamentos invalidos ou com datas em string
    // Tambem ajusta o formato das datas para lidar com os diferentes fuso horarios gravados no MongoDB e 
    // a formatação de data do JavaScript, que leva em conta o fuso horario do computador.
    const reservas = agendas.map(({data_entrada, data_saida, ...reserva}) => ({
      ...reserva,
      data_entrada: data_entrada && new Date(data_entrada).toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
      data_saida: data_saida && new Date(data_saida).toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
    }));

    res.status(200).json(reservas);

  } catch (error) {
    console.error("Erro ao consultar agendas:", error);
    res.status(500).json({ erro: "Erro ao buscar agendas" });
  }
};


export const getAgendabyID2 = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const agenda = await db.collection("estadia").findOne(query);
    if (!agenda) {
      return res
        .status(404)
        .json({ error: "true", message: "Agenda doesn't found" });
    }
    res.status(200).json(agenda);
  } catch (error) {
    console.error("Error fetching municipio:", error);
    res.status(500).json({ error: true, message: "Failed to fetch municipio" });
  }
};

export const postEstadia2 = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const {cpf_tutor, nome_pet, data_entrada, data_saida,nome_cliente} = req.body;

    const newEstadia = {
        nome_cliente,
        cpf_tutor,
        nome_pet,
        data_entrada: new Date(data_entrada),
        data_saida: new Date(data_saida),
        created_at: new Date(),
        updated_at: new Date()
    };

    await db.collection("estadia").insertOne(newEstadia);

    res.status(201).json(newEstadia);
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ error: true, message: "Failed to create pet" });
  }
};

export const putEstadia2 = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id; 
    const {
      nome_cliente,
         cpf_tutor, 
         nome_pet, 
         data_entrada, 
         data_saida, 
         id_pet
        } = req.body;
    const novosDadosEstadia ={
        id,
        nome_cliente,
        cpf_tutor,
        id_pet,
        nome_pet,
        data_entrada,
        data_saida,
        updated_at : new Date(),
    };
    
    const result = await db.collection('estadia').updateOne(
        { _id: new ObjectId (id) }, // procurando o pet pelo campo "id"
        { $set: novosDadosEstadia } // atualizando os dados
    );
    if(result.updateCount === 0){
        return res.status(404).json({ mensagem: 'Estadia não encontrado.' });
    }
    res.status(200).json({ mensagem: 'Estadia atualizada com sucesso!' });
  } catch (error) {
    console.error("Error creating estadia:", error);
    res.status(500).json({ error: true, message: "Failed to update estadia" });
  };
}


export const deleteEstadia2 = async (req, res) => {
    const db = req.app.locals.db;
    const id = req.params.id;
  
    try {
      const result = await db.collection('estadia').deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ mensagem: 'Estadia não encontrada.' });
      }
  
      res.status(200).json({ mensagem: 'Estadia deletada com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar estadia:', error);
      res.status(500).json({ mensagem: 'Erro interno ao deletar estadia.' });
    }
  };
  