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
		var token = require('crypto-extra')
		token = token.randomString(15,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
		var userObj={
			name: req.param('name'),
			email: req.param('email'),
			tipo: 'user',
			password: token,
			passwordConfirmation: token
		}
		User.create(userObj,function(err,user){
			if(err){return res.redirect('new');}
			var SessionController = require('./SessionController');
			SessionController.recovery(req,res);
		});




	},
//END CREATE

//BEGIN INDEX
index: function(req,res,next){
	User.find(function userFounded(err,users){
		if(err){return next(err);}

		res.view({
			users: users
		});
	});
},
//END INDEX
//OKOK
	destroy: function (req,res, next){
    console.log("destroy: "+req.param('id'))
    User.destroy({id : req.param('id')}).exec(function(err){
      if (err){
        return next(err);
      }
      res.redirect("/user");
    });
}

//END DESTROY


};
