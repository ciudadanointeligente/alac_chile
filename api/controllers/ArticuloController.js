/**
 * ArticulosController
 *
 * @description :: Server-side logic for managing articulos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports= {

//OK
 	new: function(req, res){
 		console.log("NEEEEEW ARTICULO");
 		res.view();

 	},

//OK
 	show: function(req, res, next){
 		Articulo.findOne(req.param('id'), function userFounded(err,articulo){
 			if (err)
 				return next(err);
 			res.view({
 				articulo: articulo
 			});
 		});
 	},

//OK
 	create: function (req,res){
    console.log("creando articulo")
    var articuloObj={
 			titulo: req.param('titulo'),
      resumen: req.param('resumen'),
      contenido: req.param('contenido')
 		}

 		Articulo.create(articuloObj,function(err,articulo){
      if(err){
 				console.log(err);
 				return res.redirect('new');
 			}

      var FileController = require('./FileController');
      FileController.upload(req,res,articulo.id);

      console.log("agregando articulo: "+articulo.titulo);
 			res.redirect('index');
 		});
 	},

	edit: function (req,res, next){
    console.log("edit: "+req.param('id'))
    Articulo.findOne(req.param('id'), function userFounded(err,articulo){
      if (err)
        return next(err);
      if(!articulo)
        return next();
      res.view({
        articulo: articulo
      });
    });
 	},

  update: function(req,res,next){
    console.log("update: "+req.param('id'))
    var articuloObj={
      titulo: req.param('titulo')
    }

    Articulo.update(req.param('id'), articuloObj, function articuloUpdated(err,articulo){
      console.log(req.param('id'))
      if (err){
        req.session.flash={
          err: err
        }
        return res.redirect('articulo/edit/'+req.param('id'));
      }
      res.redirect('/articulo/show/'+req.param('id'));

    });
  },

//OK
  index: function(req,res,next){
    Articulo.find(function articuloFounded(err,articulos){
      if(err){
        console.log(err);
        return next(err);
      }
      res.view({
        articulos: articulos
      });
    });
  }



 };
