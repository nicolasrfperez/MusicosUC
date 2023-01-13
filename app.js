// declaracion y uso de los paquetes node de express
var express = require('express');

var mongoose = require('mongoose');
const bodyparser = require("body-parser");
var app = express();

const cors = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");

    next();
};

app.use(cors);

app.set("view engine", "jade");

app.use(express.static("public"));
app.use(express.urlencoded({extends: true}));
app.use(bodyparser.urlencoded({extends: true}));
app.use(bodyparser.json());



//conexion con la base de datos
mongoose.connect('mongodb://localhost/paginaloginuc', { useNewUrlParser: true }, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conectado a MongoDB');
    }
});
//esquema del modelo de datos
const LoginSchema = new mongoose.Schema ({
    usuario:String,
    //mail:String,
    password:String
});

const LoginModel = mongoose.model("login",LoginSchema);
//postea a la base de datos
app.post("/",  (req, res, next)=>{

    try{

    let usuario = req.body.usuario;
    //let mail = req.body.mail;
    let password = req.body.password;
    
    
// JSON loin para guardar en la base de datos
    let login =
    {
        usuario:usuario,
        //mail:mail,
        password:password
    }
        console.log(login);
    //crea y guarda el JSON login
    LoginModel.create(login)
    console.log(login);
    res.status(200).send({ message: 'Se cargo correctamente el login' });
    }
    catch (e)
    {
        res.status(422).send({ error: e.message });
    }

});

//conexion abre el puerto
app.listen(8080, () =>
{
    console.log("Servidor escuchando en el puerto 8080");
});
