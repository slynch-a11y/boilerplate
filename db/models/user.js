const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');

const db = require('../_db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
});

// instance methods
User.prototype.correctPassword = function (candidatePassword) {
  return User.encryptPassword(candidatePassword, this.salt) === this.password;
};

//sanitize method you can use to make sure you don't send any more information than needed down to the client.
User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

//sha1 is possible to have hash collisions - better to use RSA-SHA256
User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }

}

module.exports = User;
