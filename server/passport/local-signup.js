const User = require("mongoose").model("User");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

// passport.use(
//   "local-signup",
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//       passReqToCallback: true
//     },
//     (req, username, password, done) => {
//       const newUser = new User({
//         username,
//         password,
//         email: req.email
//       });
//       newUser.save((err, doc) => {
//         if (!err) done(null, doc);
//         else done(err, null);
//       });
//     }
//   )
// );

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      console.log('in passport local-sgnup')
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ email: email }, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done("Email already in use", false);
        } else {
          const newUser = new User({
            email,
            password
          });

          // save the user
          newUser.save(function(err) {
            if (err) done("Error saving user", false)
            return done(null, newUser);
          });
        }
      });
    }
  )
);

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
