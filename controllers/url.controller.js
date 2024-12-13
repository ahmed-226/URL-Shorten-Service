const UrlModel = require('../models/Url');
const {client}= require('../config/db');
const db=client.db(process.env.DB_NAME);

const Url = new UrlModel(db);


const createShortUrl = async (req, res) => {
    const longUrl = req.body.longUrl;
    const shortCode = await Url.createShortUrl(longUrl);
    res.json({ shortCode: shortCode });
}


const redirectToLongUrl = async (req, res) => {
    const shortCode = req.params.shortCode;
    try {
        const longUrl = await Url.getLongUrl(shortCode);
        if (longUrl) {
            res.redirect(longUrl);
        } else {
            res.status(404).json({ error: 'Url not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { 
    createShortUrl, 
    redirectToLongUrl 
};