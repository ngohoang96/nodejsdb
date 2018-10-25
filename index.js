const express = require('express');
const reload = require('reload');
const { Singer, singers } = require('./Singer');
const app = express();
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', { singers });
});
app.get('/add', (req, res) => res.render('add'));
app.listen(3000, () => console.log('Server started!'));
reload(app);