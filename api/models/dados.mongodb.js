use('banco')
db.pet.insertMany([
    {
        nome : "Bob",
        especie : "cachorro",
        raca : "Lhasa apso",
        idade : 14,
        sexo:  "macho",
        porte : "pequeno",
        observacoes: "Ele está véio",
        peso: 9.0,
        created_at: new Date() ,
        updated_at : new Date() ,
        cpfCliente : '47251787806',
        nome_tutor: "Dafny Ribeiro",
    },
    {    
        nome : "Laika",
        especie : "cachorro",
        raca : "vira-lata",
        idade : 10,
        sexo:  "fêmea",
        porte : "pequeno",
        observacoes: "Ela foi pro espaço",
        peso: 9.0,
        created_at: new Date() ,
        updated_at : new Date() ,
        cpfCliente : '07535348009',
        nome_tutor: "Yuri Gagarin"
    },
    {    
        nome : "Mingau",
        especie : "gato",
        raca : "persa",
        idade : 2,
        sexo:  "fêmea",
        porte : "pequeno",
        observacoes: "Não tem nome porque é de rua",
        peso: 9.0,
        created_at: new Date() ,
        updated_at : new Date() ,
        cpfCliente : '07535348009',
        nome_tutor: "Rodrigo Ribeiro"
    },
    ]
)


use('banco')
db.pet.find({})

use('banco')
db.estadia.insertOne({
    data_entrada: new Date("2000-04-29"),
    data_saida: new Date("2014-04-29"),

    pet: {
        _id: '680c58dfd40b99dd247a9e6f'
    }
})

use('banco')
db.estadia.find({pet:{
    _id: '680c58dfd40b99dd247a9e6f'
}})

use('banco')
db.pet.find({})


use('banco')
const dados=[
    {
      "data_entrada": "2025-05-01T08:00:00.000Z",
      "data_saida": "2025-05-03T08:00:00.000Z",
      "pet": {
        "_id": "680e78e7e3fef722e2d5f926"
      }
    },
    {
      "data_entrada": "2025-05-04T10:00:00.000Z",
      "data_saida": "2025-05-07T10:00:00.000Z",
      "pet": {
        "_id": "680e78e7e3fef722e2d5f925"
      }
    },
    {
      "data_entrada": "2025-05-08T12:00:00.000Z",
      "data_saida": "2025-05-10T12:00:00.000Z",
      "pet": {
        "_id": "680e78e7e3fef722e2d5f927"
      }
    }
  ]
  
    
db.estadia.insertMany(dados)

use('banco')
db.estadia.find({})

use('banco')
const novosDadosAgenda = [
    {
      "data_entrada": "2025-05-12T09:00:00.000Z",
      "data_saida": "2025-05-15T09:00:00.000Z",
      "pet": {
        "_id": "680e78e7e3fef722e2d5f927"
      }
    },
    {
      "data_entrada": "2025-05-18T10:30:00.000Z",
      "data_saida": "2025-05-22T10:30:00.000Z",
      "pet": {
        "_id": "680e78e7e3fef722e2d5f927"
      }
    },
    {
      "data_entrada": "2025-05-25T08:00:00.000Z",
      "data_saida": "2025-05-30T08:00:00.000Z",
      "pet": {
        "_id": "680e78e7e3fef722e2d5f926"
      }
    },
    {
      "data_entrada": "2025-06-02T14:00:00.000Z",
      "data_saida": "2025-06-06T14:00:00.000Z",
      "pet": {
        "_id": "680e78e7e3fef722e2d5f925"
      }
    },
    {
      "data_entrada": "2025-06-10T11:00:00.000Z",
      "data_saida": "2025-06-14T11:00:00.000Z",
      "pet": {
        "_id": "680e78e7e3fef722e2d5f925"
      }
    }
  ]
  

db.estadia.insertMany(novosDadosAgenda)

use('banco')
db.estadia.find({})

use('banco')
db.pet.find({})
