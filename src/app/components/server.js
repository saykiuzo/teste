const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // Create database if not exists
  db.query(`CREATE DATABASE IF NOT EXISTS teste;`, (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists');

    // Select the database
    db.changeUser({ database: 'teste' }, (err) => {
      if (err) throw err;
      console.log('Using teste database');
    });
  });
});

app.use((req, res, next) => {
  console.log('Received request:', req.method, req.url);
  next();
});

app.post('/register', (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let telefone = req.body.telefone;
  let password = req.body.password;

  let query = 'INSERT INTO users SET ?';
  let values = { username: username, email: email, telefone: telefone, password: password };

  db.query(query, values, (err, result) => {
    if (err) throw err;
    res.send('Data registered');
  });
});

app.post('/api/create', (req, res) => {
  let data = req.body;

  let query = 'INSERT INTO users SET ?';
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.send('Data received and stored');
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
