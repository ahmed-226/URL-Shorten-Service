const crypto = require('crypto');


class UrlModel {
    constructor (db) {
        this.collection = db.collection('urls');
    }

    async createShortUrl(longUrl) {
        const shortCode = this.generateShortCode(longUrl);

        const existingUrl = await this.collection.findOne({ shortCode: shortCode });
        if (existingUrl) {
            return existingUrl.shortCode; 
        }

        await this.collection.insertOne({
            longUrl: longUrl,
            shortCode: shortCode,
        });
        return shortCode;
    }


    async getLongUrl(shortCode) {
        const url = await this.collection.findOne({ shortCode: shortCode });
        return url ? url.longUrl : null;
    }


    generateShortCode(longUrl) {
        try {
            const hashedUrl = crypto.createHash('sha256')
                .update(longUrl) 
                .digest('hex')
                .slice(0, 7); 
    
            return hashedUrl;
        } catch (e) {
            console.error('Error generating short code', e);
        }
    }
}

module.exports = UrlModel;
