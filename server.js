const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();

});
// app.use((req,res,next) =>{
//     res.render('maintain.hbs');

// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('currentYear',() =>{
    return new Date().getFullYear();
})
hbs.registerHelper('sreamIt',(text) =>{
    return text.toUpperCase();
});
app.get('/',(req,res) =>{
    //res.send('<h1>Hello World</h1>');
    // res.send({
    //     name:'Tri Pham',
    //     like:['food','football','reading story']
    // });
    res.render('home.hbs',{
        papeTitle:'Home page',
        content:'Welcome to Home page',

    });
});
app.get('/about',(req,res) =>{
    //res.send('Home page of Tri Pham');
    res.render('home.hbs',{
        papeTitle:'About page',
        content:'Welcome to about page',
    });
});
app.get('/project',(req,res) =>{
    res.render('project.hbs',{
        papeTitle:'Project',
        content:'Welcome to project page'
    });
})
app.get('/bad',(req,res) =>{
   res.send({
       errorMessage:'Page not found'
   }); 
});
app.listen(port, () =>{
    console.log(`Starting webserver with port ${port}`);
});