var express = require('express');
var router = express.Router();
const Producto = require('../../database/models/producto');

/*Crear un nuevo producto*/
router.post('/',function(req, res, next){
  const data = {
    vendedor: req.body.vendedor,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,

    categoria: req.body.categoria,
  }
  if (req.body.stock < 1 ) {
    estado: 'agotado'
  }
  data.estado = req.body.estado;

  const modelProducto = new Producto(data);

  modelProducto.save()
    .then(result=>{
      res.json({
        message:'Producto guardado!'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

/*Actualizar producto*/
router.patch('/:id',function(req, res, next){
  const datos = {};
  Object.keys(req.body).forEach((key) => {
      datos[key] = req.body[key];
  });
  Producto.findOneAndUpdate({_id:req.params.id},datos).exec()
    .then(result => {
      res.json({message:'Se actualizo el producto'});
    }).catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});
/*Eliminar Producto*/
router.delete('/:id',function(req, res, next){
  Producto.remove({_id:req.params.id}).exec()
    .then(result => {
      res.json({message:'Producto eliminado'});
    }).catch(err => {
      res.status(500).json({
        error: err.message
      });
    });

});
/* Listar todos los productos disponibles y por categoria*/
router.get('/',function(req, res, next){
  const criterios = {estado:'disponible'};

  if (req.query.categoria != undefined) {
    criterios.categoria = req.query.categoria
  }
  Producto.find(criterios).exec()
    .then(docs => {
      if (docs.length < 1) {
        return res.status(401).json({message:'No existen productos'});
      }
      res.json({data:docs});
    }).catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

/* Listar los productos para el vendedor*/
router.get('/vendedor/:id',function(req, res, next){
  Producto.find({vendedor:req.params.id}).exec()
    .then(docs => {
      if (docs.length < 1) {
        return res.status(401).json({message:'No existen productos'});
      }
      res.json({data:docs});
    }).catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

module.exports = router;
