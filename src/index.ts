import express from 'express';
import router from './routes/index';
import mysql from 'mysql';
import 'dotenv/config';

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

// Initialise MySQL
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_USER_PASSWORD,
	database: process.env.DB_NAME,
});

db.connect((error) => {
	if (error) {
		console.error('Error connecting MySQL: ' + error);
		return false;
	}
	console.log('Successfully connected to MySQL!')
});

export default db;