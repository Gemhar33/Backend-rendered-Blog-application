var express = require('express');
var router = express.Router();
const Article = require('../models/article');


/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(req.session.passport ? req.session.passport.user.id : "");
  Article.find({}, (err,articleList) => {
    if(err) return next(err);
    res.render('index', { title: 'Gr. Blogs', articles: articleList});
  });
  
});

module.exports = router;
