use('hotelpet')
db.pet.insertMany([
    {
        nome : "Bob",
        especie : "cachorro",
        raca : "Lhasa apso",
        idade : 14,
        sexo:  "Macho",
        porte : "pequeno",
        observacoes: "Ele está véio",
        peso: 9.0,
        cpfCliente : '47251787806',
        nome_tutor: "Dafny Ribeiro",
        created_at: new Date() ,
        updated_at : new Date() ,
    },
    {    
        nome : "Laika",
        especie : "cachorro",
        raca : "Moltes",
        idade : 10,
        sexo:  "Femea",
        porte : "pequeno",
        observacoes: "Ela está no espaço",
        peso: 9.0,
        created_at: new Date() ,
        updated_at : new Date() ,
        cpfCliente : '07535348009',
        nome_tutor: "Rodrigo Ribeiro"
    },
    {    
        nome : "Menina",
        especie : "gato",
        raca : "persa",
        idade : 2,
        sexo:  "Femea",
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


use('hotelpet')
db.pet.find({})

use('hotelpet')
db.estadia.insertOne({
    data_entrada: new Date("2000-04-29"),
    data_saida: new Date("2014-04-29"),

    pet: {
        _id: '680c58dfd40b99dd247a9e6f'
    }
})

use('hotelpet')
db.estadia.find({pet:{
    _id: '680c58dfd40b99dd247a9e6f'
}})

use('hotelpet')
db.pet.find({})


use('hotelpet')
const dados=[
    {
      "data_entrada": "2025-05-01T08:00:00.000Z",
      "data_saida": "2025-05-03T08:00:00.000Z",
      "pet": {
        "_id": "680d467e8f29bd74a01e51d2"
      }
    },
    {
      "data_entrada": "2025-05-04T10:00:00.000Z",
      "data_saida": "2025-05-07T10:00:00.000Z",
      "pet": {
        "_id": "680d467e8f29bd74a01e51d3"
      }
    },
    {
      "data_entrada": "2025-05-08T12:00:00.000Z",
      "data_saida": "2025-05-10T12:00:00.000Z",
      "pet": {
        "_id": "680d467e8f29bd74a01e51d4"
      }
    }
  ]
  
    
db.estadia.insertMany(dados)

use('hotelpet')
db.estadia.find({})

use('hotelpet')
const novosDadosAgenda = [
    {
      "data_entrada": "2025-05-12T09:00:00.000Z",
      "data_saida": "2025-05-15T09:00:00.000Z",
      "pet": {
        "_id": "680d467e8f29bd74a01e51d3"
      }
    },
    {
      "data_entrada": "2025-05-18T10:30:00.000Z",
      "data_saida": "2025-05-22T10:30:00.000Z",
      "pet": {
        "_id": "680d467e8f29bd74a01e51d3"
      }
    },
    {
      "data_entrada": "2025-05-25T08:00:00.000Z",
      "data_saida": "2025-05-30T08:00:00.000Z",
      "pet": {
        "_id": "680d467e8f29bd74a01e51d3"
      }
    },
    {
      "data_entrada": "2025-06-02T14:00:00.000Z",
      "data_saida": "2025-06-06T14:00:00.000Z",
      "pet": {
        "_id": "680d467e8f29bd74a01e51d3"
      }
    },
    {
      "data_entrada": "2025-06-10T11:00:00.000Z",
      "data_saida": "2025-06-14T11:00:00.000Z",
      "pet": {
        "_id": "680d467e8f29bd74a01e51d3"
      }
    }
  ]
  

db.estadia.insertMany(novosDadosAgenda)

use('hotelpet')
db.estadia.deleteMany(
    {
   
    }

)