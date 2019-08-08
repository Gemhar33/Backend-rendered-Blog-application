var express = require('express');
var router = express.Router();

const userSession = require('../controllers/sessionControllers');
const Comment = require('../models/comment');
const Article = require('../models/article');


/* POST users listing. */
router.post('/add', userSession.isLogged, (req, res, next) => {
    Comment.create(req.body, (err, comment) => {
        if(err) return next(err);
        Article.findByIdAndUpdate(req.body.articleId, { "$push": { "comments": comment.id } }, { "new": true }, (err,updatedArticle)=> {        
            if(err) return next(err);
            res.redirect('/articles/view/'+updatedArticle.id);
        });
    });
});

router.get('/delete/:artId/:commentId', (req, res, next) => {
    const commentId = req.params.commentId
    Comment.findByIdAndDelete( commentId, (err, deleteddArticle)=> {
        res.redirect('/articles/view/'+req.params.artId);
    });
});

router.get('/like/:commentId', (req, res, next) => {
    const commentId = req.params.commentId;
    Comment.findById(commentId, (err, comment) => {
        if(err) return next(err);
        if(!comment.likes.includes(req.loggedUser.id)){
            Comment.findByIdAndUpdate(commentId, { "$push": { "likes": req.loggedUser.id } }, { "new": true }, (err, updatedComment) => {
                res.redirect('/articles/view/'+updatedComment.articleId);
            })
        } else {
            Comment.findByIdAndUpdate(commentId, { "$pull": { "likes": req.loggedUser.id } }, { "new": true }, (err, updatedComment) => {
                res.redirect('/articles/view/'+updatedComment.articleId);
            })
        }
    })
})



module.exports = router;