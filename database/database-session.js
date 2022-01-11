const { Sequelize } = require('sequelize');
const mongoose = require("mongoose");


class MongoWrapper {
    constructor({host, database, port, username,password}){
        this.host = host;
        this.database = database;
        this.port = port;
        this.username = username;
        this.password = password;
        // this.session = mongoose
    }
    async authenticate(){
        // mongodb://username:password@host:port/database?options...
        const mongoUrl = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}`
        console.log(`>>>>${mongoUrl}<<<<`)
        // const mongoUrl = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`
        try{
            await mongoose.connect(mongoUrl);
        }catch(error){
            throw error;
        }
    }
}
const SessionFactory = ({dialect, ...config}) => {
    const implemented = {
        'mongo': ()=>new MongoWrapper(config),
        'postgres': ()=>new Sequelize({dialect: dialect, ...config}),
    }
    if(dialect in implemented){
        return implemented[dialect]();
    }
    throw new Error(`Dialect ${dialect} not implemented`)

}
class DataBaseSession{

    constructor({dialect, host, username,password,port, database}){
        this.dialect = dialect
        this.host = host
        this.username = username
        this.password = password
        this.port = port
        this.database = database
        this.session = undefined;
        this.didConnect = false;
    }
    async getSession(){
       await this.connect();
       return this.session; 
    }
    async connect(){
        if(this.didConnect){
            return
        }
        if(this.session===undefined){
            this.createSession()
        }
        try {
            await this.session.authenticate();
            console.log('Connection has been established successfully.');
            this.didConnect=true;
            return true
          } catch (error) {
            throw error;
          }
    }
    createSession(){
        this.session = SessionFactory({
            host: this.host,
            username: this.username,
            password: this.password,
            port: this.port,
            dialect: this.dialect,
            database: this.database
        })
    }
}
module.exports = DataBaseSession;