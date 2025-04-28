# Trabalho NoSQL

Trabalho de Banco de Dados Não-Relacional sobre aplicação de uma API REST com MongoDB

## Sobre o projeto:

Site de um hotel de pets, onde você pode cadastrar um pet e reservar uma estadia para ele

## Link do site

https://trabalho-no-sql.vercel.app/

## Integrantes:

- Ariele Peres
- Davy Ribeiro
- Mayara Barros
- Vanessa Lima

## Rotas de Pet

### Get All 

Pega todos os documentos da collection Pet 

``` 
    https://trabalho-no-sql.vercel.app/pets/
```
### Get By Id

Pega o documento pertencente ao ID mencionado 

``` 
    https://trabalho-no-sql.vercel.app/pets/:id
```

### Post

Cria um novo documento de Pet

``` 
    https://trabalho-no-sql.vercel.app/pets/
```

### Put

Atualiza um documento específico de Pet

``` 
    https://trabalho-no-sql.vercel.app/pets/:id
```

### Delete

Excluí um documento específico de Pet e todos os documentos de Estadia relacionados

``` 
    https://trabalho-no-sql.vercel.app/pets/:id
```

## Rotas de Estadia

### Get All 

Pega todos os documentos da collection Estadia 

``` 
    https://trabalho-no-sql.vercel.app/agendas/
```
### Get By Id

Pega o documento pertencente ao ID mencionado 

``` 
    https://trabalho-no-sql.vercel.app/agendas/:id
```

### Post

Cria um novo documento de Estadia

``` 
    https://trabalho-no-sql.vercel.app/agendas/
```

### Put

Atualiza um documento específico de Estadia

``` 
    https://trabalho-no-sql.vercel.app/agendas/:id
```

### Delete

Excluí um documento específico de Estadia

``` 
    https://trabalho-no-sql.vercel.app/agendas/:id
```

## Comando

Para iniciar a aplicação:

``` cmd
    npm run dev
```
