const express = require('express');
const mysql = require('mysql');
const app = express();
const favicon = require('serve-favicons');
const cors = require('cors');
const bodyparser = require('body-parser');
const PORT = 3000;
const modules = require('./modules')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pasword: '',
    database: 'test'
});

mysqlConnection.connect()

app.listen(PORT, () => console.log('Express server is running at port number: 3000'));

    app.get('/registrationData', (req, res) => {
        mysqlConnection.query('SELECT * FROM registration', (err, rows) => {
            if(!err)
            res.send(rows)
            else
            console.log(err);
        })
    });

app.get('/registrationData/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM registration where id = ?', [req.params.id], (err, rows) => {
        if(!err)
        res.send(rows)
        else
        console.log(err);
    })
});

app.get('/add', (req, res) =>{
    mysqlConnection.query('SELECT * FROM registration', (err, rows) =>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})

app.post('/add', (req, res) => {
    const { firstName, lastName, email, gender, password } = req.body
    mysqlConnection.query('INSERT INTO registration(firstName, lastName, gender, email, password) values(?,?,?,?,?)',[firstName, lastName, gender, email, password], (err, rows) => {
        if(err){
            console.log(err)
        }else{
            res.send({ ...req.body, id: rows.insertId })
        }
    })
})

app.post('/remove', (req, res) => {
     
    // console.log(req.query.id);
    mysqlConnection.query('DELETE FROM registration WHERE id =?', [ req.body.id ], (err, rows) =>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})
app.post('/infoUpdatedData', (req, res) => {
    const { id, firstName, lastName, email, gender, password } = req.body;
    mysqlConnection.query('UPDATE registration SET  firstName = ?, lastName = ?, email = ?, gender = ?, password = ?  WHERE id = ?', [ firstName, lastName, email, gender, password, id ], function(err, data){
        if(err) throw err;
        var response = { message: 'updated' }
        res.send(response);
    })
})