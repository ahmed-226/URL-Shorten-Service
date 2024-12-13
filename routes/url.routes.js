const apiRouter = require('express').Router();

const { createShortUrl, redirectToLongUrl } = require('../controllers/url.controller');

apiRouter.post('/shorten', createShortUrl);
apiRouter.get('/:shortCode', redirectToLongUrl);

module.exports = apiRouter;