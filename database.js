const { io } = require("socket.io-client")
class dbClient {
    constructor(url, database, auth){
        this.socket = io(url, {
            auth: {
                database,
                auth
            }
        });
    }
}

module.exports = dbClient