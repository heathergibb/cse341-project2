const swaggerAutogen = require('swagger-autogen')();

// const isProduction =process.env.NODE_ENV === 'production';

const doc = {
    info: {
        title: 'Board Games API',
        description: 'List of Board Games and Players'
    }
    // host: 'cse341-project2-psq1.onrender.com',
    // schemes: ['https']
    // host: isProduction ? 'cse341-project2-psq1.onrender.com' : 'localhost:5500',
    // schemes: isProduction ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
