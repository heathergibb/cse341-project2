const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Board Games API',
        description: 'List of Board Games and Players'
    },
    // host: 'cse341-project2-psq1.onrender.com',
    host: 'localhost:5500',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
