/**
 * LangController
 *
 * @description :: Server-side logic for managing langs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	ES: function(req,res, next){
		console.log('location = ' + req.get('Referrer'));
		console.log('session = ' + JSON.stringify(req.session));
		// console.log('req = ' + JSON.stringify(req));

		sails.hooks.i18n.setLocale('es');


		req.acceptsLanguages('es');
		req.setLocale('es');
		req.session.languagePreference='es';

		console.log(req.session.languagePreference);
		console.log("***********");
		res.set('Accept-Language', 'es');
		res.redirect('/home');
	},
	EN: function(req,res, next){
		req.acceptsLanguages('en');
		req.setLocale('en');
		req.session.languagePreference='en';

		console.log(req.session.languagePreference);
		console.log("***********");
		res.set('Accept-Language', 'en');
		res.redirect('/home');
	},
	HT: function(req,res, next){
		req.acceptsLanguages('ht');
		req.setLocale('ht');
		req.session.languagePreference='ht';

		console.log(req.session.languagePreference);
		console.log("***********");
		res.redirect('/home');
	},
	PT: function(req,res, next){
		req.acceptsLanguages('pt');
		req.setLocale('pt');
		req.session.languagePreference='pt';

		console.log(req.session.languagePreference);
		console.log("***********");
		res.redirect('/home');
	}
};
