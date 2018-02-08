/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt=require('bcrypt')
module.exports = {

//OK
	new: function(req,res){
		res.view();
		},

//OK
	create: function(req,res,next){
		var username = req.param('name');
		var password = req.param('password');

		//User.findOneByName(username, function userFounded(err,user){
		User.findOne({name:username}, function userFounded(err,user){
			console.log("IN FIND ONE BY NAME");

			if(err){
				console.log("*****ERROR: findOneBy..******");
				return res.redirect('/error');
			}
			if(!user){
				console.log("*****!USER******");
				return res.redirect('/error');
			}

			bcrypt.compare(password, user.encryptedPassword, function passwordsMatch(err,valid){
				console.log(password);
				console.log('NAME: '+user.name);
				console.log(user.encryptedPassword);
				if(err){
					console.log("*****ERROR: bcrypt******");
					return res.redirect('/error');
				}
				if(!valid){
					console.log("*****!VALID******");
					return res.redirect('/error');
				}
				req.session.authenticated = true;
				req.session.User=user;
				//return res.redirect('adminhome');
				res.redirect('/home');
			});
		});
	},

//OK
	destroy: function(req,res, next){
		req.session.destroy();
		res.redirect('/home');

	},


//BEGIN RECOVERY
//OK
	recovery: function(req,res,next){
		//recibimos el email desde el formulario. revisamos si el email está en la BD.
		//si el email está en la BD entonces se le envía un mail al usuario
		//el email tendrá un link al que debe acceder el usario que quiere restaurar la clave
		//el link será una llamada al controlador session/cambiar/ + un token aleatorio
		//luego de enviar submit el controlador redirecciona a home
		var useremail = req.param('email');

		if(!useremail){return res.redirect('error');}


		User.findOne({email:useremail}, function userFounded(err,user){

			if(err){console.log("UUPS.. TENEMOS PROBLEMAS 1");
				return res.redirect('error');}

			if(!user){console.log("UUPS.. TENEMOS PROBLEMAS 2");
				return res.redirect('error');}

			if(user.email == useremail){
				//req.session.User=user;
				//console.log("UUPDATING");
				///////////////////////////
				var token = require('crypto-extra')
				token = token.randomString(15,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
				////////////////////////////
				User.update({email:useremail},{tokenAleatorio:token}).exec(function afterwards(err, updated){
  			if (err) {return;}
				});
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
			}
		});
	},
//END RECOVERY

//BEGIN CAMBIAR
	cambiar: function(req,res,next){
		//sesion/cambiar recibe un parametro en la url. si es vacío entonces retorna ERROR
		//si la url posee un parametro (token aleatorio generado en session/recovery) entonces entra en el "if"
		//dentro del if se chequea que el token aleatorio sea igual al de algun usuario en la BD
		//si el token pertenece a algún usuario entonces se muestra la vista session/cambiar
		//console.log("****IN CAMBIAR*****");
		var token = req.params[0];
		console.log(token);

		if (token != null){
				//**
				User.findOne({tokenAleatorio:token}, function userFounded(err,user){
					req.session.name = token;
					return res.view();
				});
				//**
		}

		else {
				console.log("***TOKEN=VOID ");
				return res.redirect('/error');
		}
	},
//END CAMBIAR
//BEGIN CAMBIAR 2
cambiar2: function(req,res,next){
	//console.log("****IN CAMBIAR2*****");
	var password = req.param('password');
	var passwordConfirmation = req.param('passwordConfirmation');

	console.log(password);
	console.log(passwordConfirmation);
	//**
	User.findOne({tokenAleatorio:req.session.name}, function userFounded(err,user){
			if(err){console.log("UUPS.. TENEMOS PROBLEMAS 1");
				return res.redirect('/error');}

			if(!user){console.log("UUPS.. TENEMOS PROBLEMAS 2");
				return res.redirect('/error');}

      if (!password || !passwordConfirmation || password != passwordConfirmation){
				return res.redirect('/home');
			}
			else {
				//console.log("****EN ENCRIPTACIÓN*****");
				bcrypt.hash(password, 10, function passwordEncrypted(err, encryptedPass){

					//BEGIN USER: encryptedPassword UPDATE*
					//console.log("****ACTUALIZANDO VALOR DE PASSWORD: "+ user.name);
					User.update({name:user.name},{encryptedPassword:encryptedPass}).exec(function afterwards(err, updated){
						if (err) {return;}
					});
					//END USER: encryptedPassword UPDATE*
				});

			}

		//BEGIN USER: tokenAleatorio UPDATE*
		//console.log("****ELIMINANDO TOKEN ALEATORIO DEL USUARIO: "+ user.name);
		User.update({name:user.name},{tokenAleatorio:null}).exec(function afterwards(err, updated){
			if (err) {return;}
		});
		//END USER: tokenAleatorio UPDATE*
		req.session.destroy();
		return res.redirect('/home');

	});
	//**


}
//END CAMBIAR 2

};
