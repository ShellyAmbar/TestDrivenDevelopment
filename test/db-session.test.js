const { DEFAULT_DB_CONFIG } = require("../config");
const DataBaseSession = require("../database/database-session");
describe('Testing Engine', ()=>{
    jest.setTimeout(10000)
    it("Testing connection to the database session", async ()=>{
       
        const dbSession = new DataBaseSession(DEFAULT_DB_CONFIG);
        const didConnect = await dbSession.connect()
        expect(didConnect).toBe(true);
    })
    it('Testing connection to mongo db should succeed', async()=>{
        const dbSession = new DataBaseSession({
            dialect:'mongo',
            host:'localhost',
            username:'root',
            password:'example',
            port:27017,
            database:'mydatabase'
        })
        const didConnect = await dbSession.connect()
        expect(didConnect).toBe(true);
    })
})