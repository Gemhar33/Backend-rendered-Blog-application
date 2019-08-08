const express = require('express');
const router = express.Router();
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
let CommonSrtategy;

const config = require('../config/variables');
const User = require('../models/user');

// Github Route Handlers
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/users/register'}), function(req,res) {
		//success Messge
		res.redirect('/');
});

// Google Route Handlers
router.get('/google', passport.authenticate('google',  {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/users/register'}), function (req, res) {
    //success Messge
    res.redirect('/');
});


// Github Strategy
passport.use( new GithubStrategy({
    clientID: config.githubClientId,
    clientSecret: config.githubClientSecret,
    callbackURL: config.githubClientCallbackURL
}, (accessToken, refreshToken, profile, callback) => {

    User.findOne({ email:profile._json.email }, (err, oldUser) => {
 
        if(err) callback(err, false);
        if(oldUser) {    
            console.log('OLD USER');
            return callback(null, oldUser);
        } else {
 
            const newUser = {
                githubId: profile.id,
                name : profile.displayName,
                email : profile._json.email,
                username: profile.username,
                photo: profile._json.avatar_url
            };
            User.create(newUser, (err, createdUser) => {
                console.log('NEW USER')
                if(err) callback(err, false);
                return callback(null, createdUser);
            });
        };
        return;
    });
}));


// Google Strategy
passport.use( new GoogleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleClientCallbackURL
}, (accessToken, refreshToken, profile, callback) => {

    console.log(profile);
    User.findOne({ email:profile._json.email }, (err, oldUser) => {
        console.log("*********************")
        if(err) callback(err, false);
        if(oldUser) {    
            console.log('OLD USER');
            return callback(null, oldUser);
        } else {
 
            const newUser = {
                googleId: profile.id,
                name : profile.displayName,
                email : profile._json.email,
                photo: profile._json.picture
            };
            User.create(newUser, (err, createdUser) => {
                console.log('NEW USER')
                if(err) callback(err, false);
                return callback(null, createdUser);
            });
        };
        return;
    });
}));

passport.serializeUser((user, callback) => {
    console.log('serializeUser')
    callback(null, user.id)
});

passport.deserializeUser((id, callback) => {
    console.log('deserializeUser')
    User.findById(id, (err, user) => {
        if(err) callback(err, false);
        callback(null, user);
    });
});

// passport

module.exports = router;