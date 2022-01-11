const { DEFAULT_DB_CONFIG } = require("../config");
const QueryResult = require("../database/query-result");

describe('Test DataBase Query', ()=>{

    test('isTableExist should return false when we did not migrate students table to the database', async ()=>{
      
        const queryResult = new QueryResult(DEFAULT_DB_CONFIG);
        const isTableExist = await queryResult.isTableExist('students', 'public');
        expect(isTableExist).toBe(false);
    });
    test('Query result suppose to know to to initialize without config object and take the object from the configuration', async ()=>{
        const queryResult = new QueryResult();
        const isTableExist = await queryResult.isTableExist('students', 'public');
        expect(isTableExist).toBe(false);
    });
})