/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports= {
	new: function(req, res){
		res.view();
	},

	show: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err,user){
			if (err)
				return next(err);
			res.view({
				user: user
			});
		});
	},

//OK
	create: function (req,res){
		console.log("creando");
		var userObj={
			name: req.param('name'),
			email: req.param('email'),
			password: req.param('password'),
			passwordConfirmation: req.param('passwordConfirmation')
		}
		User.create(userObj,function(err,user){
			if(err){
				return res.redirect('new');
			}
			//res.redirect('user/show/'+user.id);
			console.log("FIN DE CREATE: REDIRECT TO HOME");
			res.redirect('/home');
		});
	}




};
