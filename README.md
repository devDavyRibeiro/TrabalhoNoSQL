# Trabalho NoSQL

Trabalho de Banco de Dados Não-Relacional sobre aplicação de uma API REST com MongoDB

## Sobre o projeto:

Site para ONG cadastrar, editar e excluir pet disponível para adoção

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
    http://localhost:3000/pets/
```
### Get By Id

Pega o documento pertencente ao ID mencionado 

``` 
    http://localhost:3000/pets/:id
```

### Post

Cria um novo documento de Pet

``` 
   http://localhost:3000/pets/
```

### Put

Atualiza um documento específico de Pet

``` 
    http://localhost:3000/pets/:id
```

### Delete

Excluí um documento específico de Pet 

``` 
    http://localhost:3000/pets/:id
```


## Comando

Para iniciar a aplicação:

``` cmd
    npm run dev
```
