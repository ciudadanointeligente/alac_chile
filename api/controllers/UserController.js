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


//BEGIN CREATE
//OKOK
	create: function (req,res){
		var userObj={
			name: req.param('name'),
			email: req.param('email'),
			password: req.param('password'),
			passwordConfirmation: req.param('passwordConfirmation')
		}
		User.create(userObj,function(err,user){
			if(err){return res.redirect('new');}
			res.redirect('/home');
		});
	}
//END CREATE



};
