/**
 * LangController
 *
 * @description :: Server-side logic for managing langs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	ES: function(req,res, next){
		req.setLocale('es');

		console.log(req.session.languagePreference);
		console.log("***********");
		res.redirect('/home');
	},
	EN: function(req,res, next){
		req.setLocale('en');

		console.log(req.session.languagePreference);
		console.log("***********");
		res.set('Accept-Language', 'en');
		res.redirect('/home');
	},
	HT: function(req,res, next){
		req.acceptsLanguage('ht');
		req.setLocale('ht');
		req.session.languagePreference='ht';

		console.log(req.session.languagePreference);
		console.log("***********");
		res.redirect('/home');
	},
	PT: function(req,res, next){
		req.acceptsLanguage('pt');
		req.setLocale('pt');
		req.session.languagePreference='pt';

		console.log(req.session.languagePreference);
		console.log("***********");
		res.redirect('/home');
	}
};
