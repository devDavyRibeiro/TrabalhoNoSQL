import { ObjectId } from 'mongodb';

export const getAgendas = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const agendas = await db.collection('agenda')
      .find({})
      .toArray();

    res.status(200).json(agendas);
  } catch (error) {
    console.error('Erro ao buscar agendas:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar agendas.' });
  }
};

export const getAgendaById = async (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;

  try {
    const agenda = await db.collection('agenda').findOne({ _id: new ObjectId(id) });

    if (!agenda) {
      return res.status(404).json({ mensagem: 'Agenda não encontrada.' });
    }

    res.status(200).json(agenda);
  } catch (error) {
    console.error('Erro ao buscar agenda por ID:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar agenda por ID.' });
  }
};

export async function PostEstadia(req, res) {
  try {
    const db = req.app.locals.db;
    const { nome_cliente, cpf_tutor, nome_pet, data_entrada, data_saida, id_pet } = req.body;

    const existePet = await db.collection('pet').find({_id: new ObjectId(id_pet)});
        if(!existePet){
            return res.status(404).json({
                error: true,
                message: "Pet not found"
            })
        }

    const novaEstadia = {
      nome_cliente,
      cpf_tutor,
      nome_pet,
      data_entrada,
      data_saida,
      created_at: new Date(),
      updated_at: new Date()
    };
    const resultado = await db.collection('estadia').insertOne(novaEstadia);

    res.status(201).json({
      mensagem: "Estadia cadastrada com sucesso!",
    });

  } catch (error) {
    console.error("Erro ao cadastrar estadia:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};
