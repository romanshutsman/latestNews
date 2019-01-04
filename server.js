const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./helpers/routes');
const conDb = require('./helpers/connectDb');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname + '/public')));
routes(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
mongoose.connect(conDb.connect(),  { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
});

const port = process.env.PORT || 13372;
app.listen(port, () => {
    console.log('Server is launching on http://localhost:' + port);
});

