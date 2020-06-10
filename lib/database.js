const {MongoClient} = require('mongodb');
const databaseName = process.env.DATABASE;

class Database {
    async init () {
        console.log(databaseName);

        const client = await MongoClient.connect('mongodb://localhost', { useUnifiedTopology: true});
        this.db = client.db(databaseName);  
        console.log("depois do this", this.db);
    }
}

module.exports = new Database();