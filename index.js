const express = require('express');

const port = 8000;

const db = require('./config/mongoose');

const Task = require('./models/task');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('assets'));

app.use(express.urlencoded({extended: true}));

var mainList = [
    {
        description: "New Year Party",
        category: "PERSONAL",
        date: "DEC 30, 2022"
    },
]

app.get('/', function(req, res){

    //fetching list from database
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

    return res.render('home', {
        title: 'To-Do List',
        main_list: task
    });

    });
});

app.post('/create-task', function(req, res){
    console.log(req.body);
    Task.create({
        description:req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err, newTask){
        if(err){console.log('error in creating a task');
    return;}

    console.log('********', newTask);
    return res.redirect('/');

    });

});
 
//below is the router consisting of params.

// app.get('/delete-task/:description', function(req, res){
//     console.log(req.params);
//     let description = req.params.description;
// });

//I have made another router below that uses Query.

app.get('/delete-task/', function(req, res){
    console.log(req.query);

    //get the id from query
    let id = req.query.id;

    //find the contact in the database using id and delete it
    Task.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from db');
            return;
        }
        
    });

    // let description = req.query.description;
    // let taskIndex = mainList.findIndex(task => task.description == description);
    // if(taskIndex != -1){
    //     mainList.splice(taskIndex, 1);
    // }

    return res.redirect('back');
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log('Server is up and running on the port:', port);
});