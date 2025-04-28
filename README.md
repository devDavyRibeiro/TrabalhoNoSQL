# Trabalho NoSQL

Trabalho de Banco de Dados Não-Relacional sobre aplicação de uma API REST com MongoDB

## Sobre o projeto:

Site de um hotel de pets, onde você pode cadastrar um pet e reservar uma estadia para ele

## Integrantes:

- Ariele Peres
- Davy Ribeiro
- Mayara Barros
- Vanessa Lima

## Rotas de Pet

### Get All 

Pega todos os documentos da collection Pet 

``` 
    .../pets/
```
### Get By Id

Pega o documento pertencente ao ID mencionado 

``` 
    .../pets/:id
```

### Post

Cria um novo documento de Pet

``` 
    .../pets/
```

### Put

Atualiza um documento específico de Pet

``` 
    .../pets/:id
```

### Delete

Excluí um documento específico de Pet e todos os documentos de Estadia relacionados

``` 
    .../pets/:id
```

## Rotas de Estadia

### Get All 

Pega todos os documentos da collection Estadia 

``` 
    .../agendas/
```
### Get By Id

Pega o documento pertencente ao ID mencionado 

``` 
    .../agendas/:id
```

### Post

Cria um novo documento de Estadia

``` 
    .../agendas/
```

### Put

Atualiza um documento específico de Estadia

``` 
    .../agendas/:id
```

### Delete

Excluí um documento específico de Estadia

``` 
    .../agendas/:id
```

## Comando

Para iniciar a aplicação:

``` cmd
    npm run dev
```
