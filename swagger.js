import swaggerAutogen from 'swagger-autogen'

const doc = {
    swagger: "2.0",
    info: {
        version: "1.0.0",
        title: "DoaPet",
        description: "Documentação gerada automaticamente com swagger-autogen"
    },
    host: 'localhost:3000',
    basePath: "/api",
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",  
            name: "access-token", 
            description: "Token de Acesso gerado após o login"
        }
    },
    definitions: {
        Erro: {
            value: "Erro gerado pela aplicação",
            msg: "Mensagem de erro",
            param: "URL que gerou o erro"
        }
    }
}

const outputFile = './api/swagger/swagger_output.json'
const endpointsFiles = ['./api/index.js']
const options = {
    swagger: '2.0',          // By default is null
    language: 'pt-BR',         // By default is 'en-US'
    disableLogs: false,     // By default is false
    disableWarnings: false  // By default is false
}

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(async () => {
    await import('./api/index.js');
  });