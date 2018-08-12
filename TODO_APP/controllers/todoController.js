
var bodyParser = require('body-parser');
var mongoDB = require('mongoose');

mongoDB.connect('mongodb://jpuentes:jpuentes2018@ds157901.mlab.com:57901/todos',{'useNewUrlParser': true});

var todoSchema = new mongoDB.Schema({item: String});
var Todo =  mongoDB.model('Todo',todoSchema);
//var itemOne = Todo({item:'Buy a new car'});

/**
itemOne.save(function(err){
    if(err){
        mongoDB.disconnect();
        throw err;
    }
    mongoDB.disconnect();
    console.log('item saved...');
});
*/  

//var data = [{item:'Get Milk'},{item:'Walk dog'},{item:'Buy Bread'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

app.get('/todo',function(req,res){
    // Obtener los datos de mongoDB y pasarlos a la vista.
    Todo.find({},function(err,data){
        if(err) throw err;
        res.render('todo',{todos:data});
    }); 
});

app.post('/todo', urlencodedParser, function(req,res){
    //Obtener los datos de l avista y guardarlos en MongoDB.
    var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    });
    //data.push(req.body);
});

app.delete('/todo/:item',function(req,res){
    var itemToFind = req.params.item.replace(/\-/g," ");
    Todo.find({item:itemToFind}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    });
    /**data = data.filter(function(todo){
        return todo.item.replace(/ /g,'-') !==  req.params.item;
    });
    res.json(data);*/
});

};