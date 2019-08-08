
var User = require('../models/user');

exports.listUser = (req, res, next) => {
    res.send('respond with a resource');
}

exports.registerGet = (req, res, next) => {
    res.render('signUp');
}

exports.loginGet =  (req, res, next) => {
    res.render('login', {msg: 'Please login with credentials'});
}

exports.createUser = (req, res, next)=> {
    User.create(req.body, (err, createdUser)=> {
      if(err) return next(err);
      res.redirect('/users/login')
    });
}

exports.loginPost = (req, res, next)=> {
  User.findOne({email: req.body.email}, (err, loggedUser)=> {
    if(err) return next(err);
    if(loggedUser){
      if(loggedUser.validatePassword(req.body.password)) {
        req.session.userId = loggedUser.id;
        res.redirect('/');
      } else {
        res.render('login', {msg: 'Wrong Password'});
      }
    } else {
      res.render('login', {msg: 'Please register before login'});
    }
  });
}

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if(err) return next(err);
    res.redirect('/');
  })
}

exports.updateAccount = (req, res, next) => {
  res.render('editUser');
}

exports.updateUser = (req, res, next) => {
  const {name, email, newPassword} = req.body;

  console.log(name, email, newPassword);

  User.findByIdAndUpdate(req.loggedUser.id, {name: name, email: email, password: newPassword}, { new: true, runValidators: true }, (err, updatedUser) => {
    updatedUser.save();
    if(err) return next(err);
    console.log(updatedUser);
    res.redirect('/');
  });

}

// module.exports = {
//     listUser: (req, res, next) => {
//         res.send('respond with a resource');
//     },

//     registerUser: (req, res, next)=>{
//         res.render('signUp');
//       }

// }

// const listUser = (req, res, next) => {
//     res.send('respond with a resource');
// }


// module.exports = {
//     listUser: listUser
// } 