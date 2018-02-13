/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  name:{
    type: 'string',
    required: true
  },
  email:{
    type: 'string',
    required: true
  },
  tipo:{
    type: 'string',
    required: true
  },
  password:{
    type: 'string',
    required: true,
  },

  passwordConfirmation:{
    type: 'string',
    required: true,
  },

  encryptedPassword:{
    type: 'string'
  },

  tokenAleatorio:{
    type: 'string'
  }

},

    beforeCreate: function(values, next){
      var password = values.password;
      var passwordConfirmation = values.passwordConfirmation;
      if (password != passwordConfirmation){
        return res.redirect('home');
      }
      require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
        values.encryptedPassword=encryptedPassword;
        values.password='';
        values.passwordConfirmation='';
        values.tokenAleatorio='';
        next();
      });
    }

};
