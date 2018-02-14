/**
 * ArticulosController
 *
 * @description :: Server-side logic for managing articulos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports= {

//BEGIN NEW
//OKOK
 	new: function(req, res){
 		res.view();
 	},
//END NEW
//BEGIN CREATE
//OKOK
 	create: function (req,res){
    console.log("creando articulo")
    var articuloObj={
 			titulo: req.param('titulo'),
      resumen: req.param('resumen'),
      contenido: req.param('contenido')
 		}

 		Articulo.create(articuloObj,function(err,articulo){
      if(err){return res.redirect('new');}
      var FileController = require('./FileController');
      FileController.upload(req,res,articulo.id);
 			res.redirect('index');
 		});
 	},
//END CREATE
//BEGIN INDEX
//OKOK
  index: function(req,res,next){
    Articulo.find(function articuloFounded(err,articulos){
      if(err){return next(err);}

      res.view({
        articulos: articulos
      });
    });
  },
//END INDEX
//BEGIN DESTROY
//OKOK
	destroy: function (req,res, next){
    console.log("destroy: "+req.param('id'))
    Articulo.destroy({id : req.param('id')}).exec(function(err){
      if (err){
        return next(err);
      }
      res.redirect("/articulo");
    });
},
//END DESTROY
//BEGIN SHOW
//OKOK
 	show: function(req, res, next){
 		Articulo.findOne(req.param('id'), function articuloFounded(err,articulo){
 			if (err)
 				return next(err);
 			res.view({
 				articulo: articulo
 			});
 		});
 	},
//END SHOW
///////////////////
///////////////////
///////////////////
///////////////////


//BEGIN EDIT
	edit: function (req,res, next){
    console.log("edit: "+req.param('id'))
    Articulo.findOne(req.param('id'), function articuloFounded(err,articulo){
      if (err)
        return next(err);
      if(!articulo)
        return next();
      res.view({
        articulo: articulo
      });
    });
 	},
//END EDIT
//BEGIN UPDATE
  update: function(req,res,next){
    console.log("update: "+req.param('id'))
    var articuloObj={
      titulo: req.param('titulo'),
      resumen: req.param('resumen'),
      contenido: req.param('contenido')
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
  }
//END UPDATE




 };
