var express = require('express');
var router = express.Router();

const artController = require('../controllers/articleController')
const userSession = require('../controllers/sessionControllers');

/* GET users listing. */
router.get('/new', userSession.isLogged, artController.newArticle);

router.get('/view/:articleId', artController.viewArticle);

router.get('/edit/:articleId', userSession.isLogged, artController.editArticle);
router.get('/delete/:articleId', userSession.isLogged, artController.deleteArticle);
router.get('/like/:articleId', userSession.isLogged, artController.likeArticle);
/* POST users listing. */
router.post('/new', userSession.isLogged, artController.createNewArticle);

router.post('/edit/:articleId', userSession.isLogged, artController.updateArticle);

module.exports = router;