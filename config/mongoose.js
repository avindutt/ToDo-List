//require the library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://0.0.0.0/todo_list_db');

//acquire the connection(to check if it is successful)
const db = mongoose.connection; //connection between the database and mongoose is stored in const db

//error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected!');
});
