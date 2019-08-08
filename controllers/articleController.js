
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');

exports.newArticle = (req, res, next) => {
    res.render('newArticle', {art: null});
}

exports.createNewArticle = (req, res, next) => {
    newArticle = req.body;
    newArticle.tags = req.body.tags.split(',').map(tag => tag.trim());
    newArticle.userId = req.loggedUser.id;
    Article.create(newArticle, (err, newArticle) => {
        if(err) return next(err);
        User.findByIdAndUpdate(req.loggedUser.id, { "$push": { "articles": newArticle.id } }, { "new": true }, (err, updatedUser) => {
            if(err) return next(err);
            res.redirect('/');
        });
    });
}

exports.viewArticle = (req ,res, next) => {
    Article.findById(req.params.articleId, (err, article) => {
        if(err) return next(err);
        Comment.find({articleId: article.id}, (err, commentList) => {
            if(err) return next(err);
            res.render('viewArticle', {article: article, comments: commentList });
        })
        
    });
}

exports.editArticle = (req , res, next) => {
    Article.findById(req.params.articleId, (err, article) => {
        if(err) return next(err);
        res.render('editArticle', {art: article});
    });
}

exports.deleteArticle = (req, res, next) =>{
    Article.findByIdAndDelete(req.params.articleId, (err, deleteddArticle) => {
        if(err) return next(err);
        res.redirect('/');
    });
}

exports.updateArticle = (req, res, next) => {
    newArticle = req.body;
    newArticle.tags = req.body.tags.split(',').map(tag => tag.trim());
    Article.findByIdAndUpdate(req.params.articleId, newArticle, { new: true },  (err, updatedArticle) => {
        if(err) return next(err);
        res.redirect('/');
    });
}

exports.likeArticle = (req, res, next) => {
    const articleId = req.params.articleId;
    Article.findById(articleId, (err, article) => {
        if(err) return next(err);
        if(!article.likes.includes(req.loggedUser.id)){
            Article.findByIdAndUpdate(articleId, { "$push": { "likes": req.loggedUser.id } }, { "new": true }, (err, updatedArticle) => {
                if(err) return next(err);
                res.redirect('/articles/view/'+article.id);
            })
        } else {
            Article.findByIdAndUpdate(articleId, { "$pull": { "likes": req.loggedUser.id } }, { "new": true }, (err, updatedArticle) => {
                res.redirect('/articles/view/'+article.id);
            })
        }
    })
}
