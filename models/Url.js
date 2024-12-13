const crypto = require('crypto');

class UrlModel {
    constructor(db) {
        this.db = db;  
        this.collection = null;
        this.createUrlCollection();
    }
    async createUrlCollection() {
        try {
            
            const collections = await this.db.listCollections().toArray();
            const collectionExists = collections.some(col => col.name === 'urls');

            if (!collectionExists) {
                await this.db.createCollection('urls', {
                    validator: {
                        $jsonSchema: {
                            bsonType: 'object',
                            required: ['longUrl', 'shortCode'],
                            properties: {
                                longUrl: {
                                    bsonType: 'string',
                                    description: 'must be a string and is required'
                                },
                                shortCode: {
                                    bsonType: 'string',
                                    description: 'must be a string and is required'
                                }
                            }
                        }
                    }
                });
                console.log("Collection 'urls' created with schema validation.");
            }
            
            this.collection = this.db.collection('urls');

            await this.collection.createIndexes([
                {
                    key: { shortCode: 1 },
                    unique: true,
                    name: 'shortCodeIndex',
                },
            ]);
        } catch (error) {
            console.error('Error creating collection and indexes:', error);
        }
    }

    async createShortUrl(longUrl) {
        const shortCode = this.generateShortCode(longUrl);

        
        const existingUrl = await this.collection.findOne({ shortCode });
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
        const url = await this.collection.findOne({ shortCode });
        return url ? url.longUrl : null;
    }

    generateShortCode(longUrl) {
        try {
            const hashedUrl = crypto
                .createHash('sha256')
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
