const express = require('express');
const reload = require('reload');
const { Singer, singers } = require('./Singer');


const parser = require('body-parser').urlencoded({ extended: false });
const app = express();


app.use(parser);


app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', { singers });
});
app.get('/remove/:id' , (req, res) =>{
    const {id} = req.params;
    const index = singers.findIndex(singer => singer.id === +id);
    if(index === -1) return res.send('khong tim thay');
    singers.splice(index, 1);
    res.redirect('/'); 
} )
app.get('/add', (req, res) => res.render('add'));
app.post('/add',(req,res)=>{
    const {name,link,image} = req.body;
    const singer = new Singer(name, link, image);
    singers.push(singer);
    res.redirect('/');
})
app.get('/update/:id',(req,res)=>{
    const singer = singers.find(s => s.id === +req.params.id);
    if(!singer) return res.send('khong tim thay');
    res.render('update',{singer});
})
app.post('/update/:id',(req,res)=>{
 const {name,link,image} = req.body;
 const singer = singers.find(s => s.id === +req.params.id);
 if(!singer) return res.send('khong tim thay');
 singer.name = name;
 singer.link = link;
 singer.image = image; 
 res.redirect('/');
});

app.listen(3000, () => console.log('Server started!'));
reload(app);