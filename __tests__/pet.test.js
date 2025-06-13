import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
 
const baseURL = 'http://localhost:3000/api';
let token;
let idPetInserido;
 
describe('👉 API REST de Pets', () => {
  beforeAll(async () => {
    const senha = 'Abc@1234';
    const loginResponse = await request(baseURL)
      .post('/usuarios/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'teste@exemplo.com', senha });
 
    token = loginResponse.body.accessToken;
  });
 
  const novoPet = {
    nome: 'Bob',
    especie: 'cachorro',
    raca: 'Lhasa apso',
    idade: 14,
    sexo: 'macho',
    porte: 'pequeno',
    observacoes: 'Ele está véio',
    peso: 9.0
  };
 
  it('GET - Lista todos os pets', async () => {
    const response = await request(baseURL)
      .get('/pets')
      .set('accessToken', token)
      .expect(200);
 
    expect(Array.isArray(response.body)).toBe(true);
  });
 
  it('POST - Cria um novo pet', async () => {
    const response = await request(baseURL)
      .post('/pets')
      .set('Content-Type', 'application/json')
      .set('accessToken', token)
      .send(novoPet)
      .expect(201);
 
    expect(response.body).toHaveProperty('_id');
    idPetInserido = response.body._id;
  });
 
  it('GET - Busca pet por ID', async () => {
    const response = await request(baseURL)
      .get(`/pets/${idPetInserido}`)
      .set('accessToken', token)
      .expect(200);
 
    expect(response.body._id).toBe(idPetInserido);
    expect(response.body.nome).toBe('Bob');
  });
 
  it('PUT - Atualiza o pet', async () => {
    const petAtualizado = {
      nome: 'Bob Atualizado',
      especie: 'cachorro',
      raca: 'Lhasa apso',
      idade: 15,
      sexo: 'macho',
      porte: 'pequeno',
      observacoes: 'Ele está mais véio ainda',
      peso: 9.5
    };
 
    const response = await request(baseURL)
      .put(`/pets/${idPetInserido}`)
      .set('Content-Type', 'application/json')
      .set('accessToken', token)
      .send(petAtualizado)
      .expect(200);
 
    expect(response.body.mensagem).toBe('Pet atualizado com sucesso!');
  });
 
  it('DELETE - Remove o pet', async () => {
    const response = await request(baseURL)
      .delete(`/pets/${idPetInserido}`)
      .set('accessToken', token)
      .expect(200);
 
    expect(response.body.mensagem).toBe('Pet deletado com sucesso!');
  });
});