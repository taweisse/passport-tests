const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const crypto = require('crypto');
const User = require('./user');
// const User = connection.models.User; // TODO: Model my method after original - cleaner for sure.
const validPassword = require('../lib/passwordUtils').validPassword;

const strategy  = new LocalStrategy(function(username, password, done) {
	
	// DEBUG:
	console.log(`USERNAME:${username}, PASSWORD: ${password}`);
	
	User.findOne({
		where: {
			username: username
		}
	}).then(function(user) {
		// Check if user exists.
		if (user == null) {
			return done(null, false)
		}

		// Compare password hashes.
		const isValid = validPassword(password, user.password, user.salt);
		
		console.log(`VALID PASSWORD: ${validPassword}`);
		
		if (isValid) {
			return done(null, user);
		}
		return done(null, false);
	});
});
passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findOne({
		where: {
			id: id
		}
	}).then((user) => {
		if (user == null) {
			done(new Error('wrong user id'));
		}
		done(null, user);
	});
});
