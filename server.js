const cors = require('cors');
const express = require('express');
const mongodb = require('./data/connect');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Error Handling
process.on('uncaughtException', (err, origin) => {
    console.log(
        process.stderr.fd,
        `Caught exception: ${err}\n` + `Exception origin: ${origin}`
    );
});

mongodb.connectToDB((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT);
        console.log(`Server is running on port ${PORT}.`);
    }
});
