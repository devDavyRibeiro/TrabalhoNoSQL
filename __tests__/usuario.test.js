import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
 
const baseURL = 'http://localhost:3000/api';
 
describe('👉 API REST de Usuários', () => {
  let token;
  let idUsuarioInserido;
 
  it('POST - Autentica usuário e recebe token', async () => {
    const senha = process.env.SENHA_USUARIO || 'Abc@1234';
    const response = await request(baseURL)
      .post('/usuarios/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'teste@exemplo.com', senha })
      .expect(200);
 
    token = response.body.accessToken;
    expect(token).toBeDefined();
  });
 
  it('GET - Lista usuários', async () => {
    const response = await request(baseURL)
      .get('/usuarios')
      .set('Content-Type', 'application/json')
      .expect(200);
 
    expect(Array.isArray(response.body.usuarios)).toBe(true);
  });
 
  const novoUsuario = {
    nome: 'Teste Usuário',
    cpf: '12345678901',
    email: 'teste@exemplo.com',
    senha: 'Abc@1234'
  };
 
  it('POST - Cria usuário', async () => {
    const response = await request(baseURL)
      .post('/usuarios')
      .set('Content-Type', 'application/json')
      .send(novoUsuario)
      .expect(201);
 
    expect(response.body).toHaveProperty('mensagem');
  });
 
  it('GET /:id - Busca usuário pelo ID', async () => {
 
    const lista = await request(baseURL)
      .get('/usuarios')
      .set('Content-Type', 'application/json')
      .expect(200);
 
    const usuarios = lista.body.usuarios;
    expect(usuarios.length).toBeGreaterThan(0);
    idUsuarioInserido = usuarios[0]._id || usuarios[0].id;
 
    await request(baseURL)
      .get(`/usuarios/${idUsuarioInserido}`)
      .set('Content-Type', 'application/json')
      .expect(200);
  });
 
  it('PUT - Atualiza dados do usuário', async () => {
    novoUsuario.nome = 'Usuário Atualizado';
 
    const response = await request(baseURL)
      .put(`/usuarios/${idUsuarioInserido}`)
      .set('Content-Type', 'application/json')
      .send(novoUsuario)
      .expect(200);
 
    expect(response.body.mensagem).toBe('Usuário atualizado com sucesso!');
  });
 
  it('DELETE - Remove o usuário', async () => {
    const response = await request(baseURL)
      .delete(`/usuarios/${idUsuarioInserido}`)
      .set('Content-Type', 'application/json')
      .expect(200);
 
    expect(response.body.mensagem).toBe('Tutor deletado com sucesso!');
  });
});