const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const UserSchema = mongoose.Schema({
  username: {type: String},
  email: {type: String},
  password: {type: String}
})

UserSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
UserSchema.methods = {
  comparePassword: function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }
};


mongoose.model('User', UserSchema);