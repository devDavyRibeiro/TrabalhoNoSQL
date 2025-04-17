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
