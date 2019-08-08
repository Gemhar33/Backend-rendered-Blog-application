
const User = require('../models/user');

exports.isLogged = (req, res, next) => {
    const hasSessionId = Boolean(req.session && (req.session.userId || (req.session.passport && req.session.passport.user)));
    console.log('isLogged', hasSessionId)
    if(hasSessionId) {
        next()
    } else {
        res.redirect('/users/login')
    }
}

exports.userLoggedSession = (req, res, next) => {
    const hasSessionId = Boolean(req.session && (req.session.userId || (req.session.passport && req.session.passport.user)));
    
    
    // console.log('req.session', Boolean(req.session))
    // console.log('req.session.userId', Boolean(req.session) && Boolean(req.session.userId))
    // console.log('req.session.passport', Boolean(req.session) && Boolean(req.session.passport))
    // console.log('req.session.passport.user', Boolean(req.session) && Boolean(req.session.passport) && Boolean(req.session.passport.user))


    if(hasSessionId) {
        const sessionId = req.session.userId || req.session.passport.user;
        User.findById(sessionId, (err, user)=> {
            if(err) return next(err);
            req.loggedUser = user;
            res.locals.loggedUser = user;
            next();
        });
        sessionId    } else {
        req.loggedUser = null;
        res.locals.loggedUser = null;
        next();
    }
}



