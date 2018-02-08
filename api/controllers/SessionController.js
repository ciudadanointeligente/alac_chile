/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt=require('bcrypt')
module.exports = {

//BEGIN NEW
//OKOK
	new: function(req,res){
		res.view();
		},
//END NEW
//BEGIN CREATE
//OKOK
	create: function(req,res,next){
		var username = req.param('name');
		var password = req.param('password');
		User.findOne({name:username}, function userFounded(err,user){
			if(err){console.log("UUPS.. TENEMOS PROBLEMAS: error (Session.create)");
				return res.redirect('/error');}
			if(!user){console.log("UUPS.. TENEMOS PROBLEMAS: !user (Session.create)");
				return res.redirect('/error');}

			bcrypt.compare(password, user.encryptedPassword, function passwordsMatch(err,valid){
				if(err){console.log("UUPS.. TENEMOS PROBLEMAS: bcryptError (Session.create)");
					return res.redirect('/error');}
				if(!valid){console.log("UUPS.. TENEMOS PROBLEMAS: bcryptValid (Session.create)");
					return res.redirect('/error');}
				req.session.authenticated = true;
				res.location('/home');
				res.redirect('/home');
			});
		});
	},
//END CREATE
//BEGIN DESTROY
//OKOK
	destroy: function(req,res, next){
		req.session.destroy();
		res.redirect('/home');
	},
//END DESTROY
//BEGIN RECOVERY
//OKOK
	recovery: function(req,res,next){
		//recibimos el email desde el formulario. revisamos si el email está en la BD.
		//si el email está en la BD entonces se le envía un mail al usuario
		//el email tendrá un link al que debe acceder el usario que quiere restaurar la clave
		//el link será una llamada al controlador session/cambiar/* con un token aleatorio
		//luego de enviar el mail, el controlador redirecciona a home


		//buscando un usuario con el email ingresado en el formulario
		var useremail = req.param('email');
		User.findOne({email:useremail}, function userFounded(err,user){
			if(err){console.log("UUPS.. TENEMOS PROBLEMAS: error (session.recovery)");
				return res.redirect('/error');}
			if(!user){console.log("UUPS.. TENEMOS PROBLEMAS: !user (session.recovery)");
				return res.redirect('/error');}

			var token = require('crypto-extra')
			token = token.randomString(15,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
			//update: tokenAleatorio = un nuevo token aleatorio
			User.update({email:useremail},{tokenAleatorio:token}).exec(function afterwards(err, updated){if (err) {return;}});
			//enviando mail
			sails.hooks.email.send("testEmail",
				  {
				    recipientName: user.name,
						linkClave: process.env.server+':'+process.env.port+'/cambiar/'+token,
				    senderName: process.env.senderName
				  },
				  {
				    to: user.email,
				    subject: process.env.subject
				  },
					function(err) {console.log(err || "Mail enviado!");})
			return res.redirect('/home');
			//aquí termina.. el usuario debe ingresar a su mail y revisar el link que se el ha enviado
		});
	},
//END RECOVERY
//BEGIN CAMBIAR
	cambiar: function(req,res,next){
		//sesion/cambiar/* recibe un parametro (*) en la url. si es vacío entonces retorna ERROR
		//si la url posee un parametro (token aleatorio generado en session/recovery) entonces entra en el "if"
		//dentro del if se chequea que el token aleatorio sea igual al de algun usuario en la BD
		//si el token pertenece a algún usuario entonces se muestra la vista session/cambiar
		//console.log("****IN CAMBIAR*****");
		var token = req.params[0];
		if (token != ''){
				User.findOne({tokenAleatorio:token}, function userFounded(err,user){
					if(err){return res.redirect('/error');}
					if(!user){return res.redirect('/error');}
					req.session.name = token;
					req.session.authenticated = false;
					return res.view();
				});
		}
		else {
				console.log("UUPS.. TENEMOS PROBLEMAS: token=='' (SessionController.cambiar)");
				return res.redirect('/error');
		}
	},
//END CAMBIAR
//BEGIN CAMBIAR 2
//OKOK
cambiar2: function(req,res,next){
	var password = req.param('password');
	var passwordConfirmation = req.param('passwordConfirmation');
	User.findOne({tokenAleatorio:req.session.name}, function userFounded(err,user){
			if(err){console.log("UUPS.. TENEMOS PROBLEMAS: error (session.cambiar2)");
				req.session.destroy();
				return res.redirect('/error');}
			if(!user){console.log("UUPS.. TENEMOS PROBLEMAS: !user (SessionController.cambiar2)");
				req.session.destroy();
				return res.redirect('/error');}

      if (!password || !passwordConfirmation || password != passwordConfirmation){return res.redirect('cambiar');}
			else {
				bcrypt.hash(password, 10, function passwordEncrypted(err, encryptedPass){
					User.update({name:user.name},{encryptedPassword:encryptedPass}).exec(function afterwards(err, updated){
						if (err) {return;}
					});
				});
			}
		//aquí eliminamos el tokenAleatorio generado para la recuperación de cuenta
		User.update({name:user.name},{tokenAleatorio:''}).exec(function afterwards(err, updated){
			if (err) {return;}
		});
		req.session.destroy();
		return res.redirect('/home');

	});
}
//END CAMBIAR 2
};
