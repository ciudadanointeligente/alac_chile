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
/**    toJson: function(){
        var obj=this.toObjet();
        delete obj.password;
        delete obj._csrf;
        delete obj.passwordConfirmation;
        return obj;
    }
**/
  },



    beforeCreate: function(values, next){
      console.log("EN BEFORE CREATED");
      var password = values.password;
      var passwordConfirmation = values.passwordConfirmation;
      console.log("good");
      if (!password || !passwordConfirmation ||password != passwordConfirmation){
        var passwordDoesNotMatchError=[{
            name: 'passwordDoesNotMatch',
            message: 'passwords no coinciden'
        }]
        console.log('ERROR DE CLAVE MATCH 1');
        return next({
            err:passwordDoesNotMatchError
        });
      }
      console.log("fine");
      require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
        console.log("encriptando");
        values.encryptedPassword=encryptedPassword;
        values.password='';
        values.passwordConfirmation='';
        values.tokenAleatorio='';
        next();
      });
    }

};
