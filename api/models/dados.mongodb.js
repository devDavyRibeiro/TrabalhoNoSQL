use('hotelpet')

db.cliente.insertOne({
    nome_tutor: "Dafny Ribeiro",
    cpf:"47251787806",
    created_at: new Date() ,
    updated_at : new Date() 
})

use('hotelpet')
db.cliente.find({})

use('hotelpet')
db.pet.insertOne({
    nome : "Bob",
    especie : "cachorro",
    raca : "Lhasa apso",
    datanasc :"10/03/2011",
    sexo:  "M",
    porte : "pequeno",
    observacoes: "Ele está véio",
    peso: 9.0,
    created_at: new Date() ,
    updated_at : new Date() ,
    cpfCliente : '47251787806' 
})

use('hotelpet')
db.pet.find()

dataAtual = new Date()
use('hotelpet')
db.estadia.insertOne({
    horario_entrada: dataAtual,
    horario_saida: dataAtual.setDate(dataAtual.getDate() + 20), //isso significa que o animal não saiu
    pet: {
        _id: {
            $oid: "680a99407c66932cae04f79f"
          },
    }
})

use('hotelpet')
db.estadia.find()

use('hotelpet')
db.cliente.findOne({cpfCliente:'47251787806'})
