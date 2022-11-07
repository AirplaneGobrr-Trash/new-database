const { io } = require("socket.io-client")
class dbClient {
    constructor(url, database, auth){
        this.socket = io(url, {
            auth: {
                database: database,
                auth: auth
            }
        });
        this.cache = {}
        this.defaultTable = null
    }

    async get(path) {
        return new Promise((resolve, reject) => {
            if (!path) path = this.defaultTable; else if (this.defaultTable) path = `${this.defaultTable}.${path}`;
            this.socket.emit("get", path, (a)=>{
                if (a && a?.error) reject(a)
                return resolve(a)
            })
        })
        
    }

    async set(path, value) {
        return new Promise((resolve, reject) => {
            if (this.defaultTable) path = `${this.defaultTable}.${path}`
            this.socket.emit("set", path, value, (a)=>{
                if (a && a?.error) reject(a)
                resolve(a)
            })
        })
    }

    async has(path) {
        return new Promise((resolve, reject) => {
            if (this.defaultTable) path = `${this.defaultTable}.${path}`
            this.socket.emit("has", path, (a)=>{
                if (a && a?.error) reject(a)
                resolve(a)
            })
        })
    }

    async push(path, value) {
        return new Promise((resolve, reject) => {
            if (this.defaultTable) path = `${this.defaultTable}.${path}`
            this.socket.emit("push", path, value, (a)=>{
                if (a && a?.error) reject(a)
                resolve(a)
            })
        })
    }
}

module.exports = dbClient