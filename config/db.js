const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

const connect = async () => {
  try {
    await client.connect().then(() => {
      console.log('Connected to the database');
    });
    return client;
  }catch (error) {
    console.error('Error connecting to the database', error);
    throw error;  
  }
};

module.exports = { client, connect };
