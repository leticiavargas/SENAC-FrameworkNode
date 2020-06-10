const Database = require('../../lib/database');

const clear = () => {
    console.log("drop", Database);
    return Database.db.dropDatabase();
};

module.exports = {clear};