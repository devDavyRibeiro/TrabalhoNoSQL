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