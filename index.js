const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const router = express.Router();
const UserSchema = require('./models/User.js')

mongoose.connect("mongodb+srv://brandoncadena44:ekXVyzCAUUFnOBuS@misiontic.go8g2ux.mongodb.net/test")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get('/', (req, res) => {
    res.send("Hello World");
});


app.use(router)
app.listen(port, () => {
    console.log('Listening on ' + port)
})


router.get('/user', (req, res) => {
    UserSchema.find(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
});


router.post('/user', (req, res) => {
    let newUser = new UserSchema({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: req.body.password,
    })
    newUser.save(function(err, data){
        if(err){
            console.log(err)
        }else{
        res.send("saved successfully " + newUser)
        }
    });
})
