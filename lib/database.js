const {MongoClient} = require('mongodb');
const databaseName = process.env.DATABASE || 'super-news';

class Database {
    async init () {
        const client = await MongoClient.connect('mongodb://localhost', {
            useUnifiedTopology: true,
        });
        this.db = client.db(databaseName);
    }
}

module.exports = new Database();