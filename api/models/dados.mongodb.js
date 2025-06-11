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
    },
    ]
)



use('banco')
db.pet.find({})


use('banco')
db.client.find()