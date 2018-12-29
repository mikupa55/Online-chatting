const express = require("express");
const body_parser = require("body-parser");  // Parses JSON
const bcrypt = require("bcrypt-nodejs");   // Hash password
const cors = require("cors");   // Allow testing on HTTP
const knex = require("knex");   // Talk to SQL database

const db = knex({
	client: 'pg',
	connection: {
		// Localhost database setup
		// host: '127.0.0.1',
		// user: '',
		// password: '',
		// database: 'chat_room'

		// Heroku database setup
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	}
});
//db.on('query', console.log);



const app = express();
counter = 0;
app.use(body_parser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json("The server is fine!!!!");
})

app.post('/send', (req, res) => {
	counter++;
	if (req.body.name == "") {
		req.body.name = "无名氏";
	}
	db.insert({
		name: req.body.name,
		message: req.body.message,
		id: counter
	}).into("data")
	.then(res.json("INSERT INTO DATABASE SUCCESS."))
	.catch(err => res.status(400).json(err));
})

app.get('/read', (req, res) => {

	db.select("*").from('data')
	.then(data => {
		if (data.length > 10) {
			db('data').where({id: data[0]['id']}).del()
			.then(res.json(data));
		}
		res.json(data)
	})
})


app.listen(process.env.PORT || 3000, () => {
	console.log(`The server is listening on port ${process.env.PORT}`);
});