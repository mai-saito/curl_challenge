import express from 'express';
import router from './routes/index';

// Initialise express
const app = express();

// Parse incoming requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/', router);

// Port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port);
console.log('Curl Command API is listening on port ' + port);