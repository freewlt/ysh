var express = require('express');
var app = express();
var cors = require ('cors');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(
    cors({
        origin: ['http://localhost:8080'],
        methods: ['GET', 'POST'],
        alloweHeaders: ['Content-Type', 'Authorization']
    })
)
app.use('/', (req, res, next) => {
  console.log('22');
  res.set('Access-Control-Allow-Origin', '*');
  next();
})
app.use(express.static('../dist'))

app.post('/resource/save', (req, res) => {
  console.log(res);
  res.send({ a: 1, b:2 });
});

app.listen(7000, function () {
  console.log('Example app listening on port 7000!');
});
