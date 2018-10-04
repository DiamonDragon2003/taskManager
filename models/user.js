var crypto = require('crypto');
var async = require("async");
var util = require('util');

var mongoose = require('lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password+'';
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password+'');
  })
  .get(function() { return this._plainPassword; });



schema.statics.registration = function(username, password, email, callback){
    var User = this;
    async.waterfall([
      function (callback) {
          User.findOne({ email: email }, callback);
      },
      function (user, callback) {
          if(user){
            callback(null,'email found')
          }else{
              var user = new User({email: email, username: username, password: password});
          user.save(function (err) {
              if (err) return callback(err);
              callback(null,user)
          })
          }
      },
  ],callback);
  }

  schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
  };

  schema.statics.auth = function(email, password, callback){
    var User = this;
    async.waterfall([
      function (callback) {
          User.findOne({ email: email }, callback);
      },
      function (user, callback) {
          if(!user){
            callback(null,'email not found')
          }else{
            if(user.checkPassword(password)){
              callback(null,user);
            }else{
              callback(null,'err password');
            }
          }
      },
  ],callback);
  }


exports.User = mongoose.model('User', schema);


function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;

