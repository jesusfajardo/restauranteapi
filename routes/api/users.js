var express = require('express');
var router = express.Router();
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const Usuario = require('../../database/models/user');

/* POST Crear nuevo usuario */
router.post('/', function(req, res, next) {
  //validar regex
  const data = {
    name: req.body.name,
    email: req.body.email,
    log: req.body.log,
    lat: req.body.lat,
    tipo: req.body.tipo,

  }

  data.password = sha1(req.body.password);
  var modelUsuario = new Usuario(data);
  modelUsuario.save()
  .then(result => {
      res.json({
          message: "Usuario insertado en la bd"
      });
  })
  .catch(err => {
      res.status(500).json({
          error: err.message
      })
  });
});
/* borrar*/
router.get('/', function(req, res, next) {

  Usuario.find()
  .exec(function (err, doc) {
    res.json(doc)
  });
});


/* Borrar*/
/* Actualizar datos de usuario*/
router.patch('/:id',function(req, res, next){
  const datos = {name:req.body.name};

  Usuario.updateOne({_id:req.params.id},datos).exec()
    .then(result => {
      res.json({
        message:'Se actualizo el nombre',
        result
      });
    }).catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});
/* GET Usuario . */
router.get('/:id', function(req, res, next) {

  Usuario.findById(req.params.id,"-password")
  .exec(function (err, doc) {
    if (err) {
      res.json({error:err.message})
    }
    res.json(doc)
  });
});



router.post('/login', (req, res, next) => {
    Usuario.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    error: "Auth failed"
                });
            }
            console.log(user[0].password);
            var passwordHash = sha1(req.body.password);
            if (user[0].password != passwordHash) {
              return res.status(401).json({
                  error: "fallo al autenticar"
              });
            }
            else{
              const token = jwt.sign({
                      email: user[0].email,
                      userId: user[0]._id
                  },
                  process.env.JWT_KEY || 'secret321');
              console.log(user[0]);
              return res.status(200).json({
                  message: "logeo existoso",
                  token: token,
                  idUser:user[0]._id,
                  tipo: user[0].tipo
              });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});




module.exports = router;
