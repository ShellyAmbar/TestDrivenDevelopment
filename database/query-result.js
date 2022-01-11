const { DEFAULT_DB_CONFIG, IS_TABLE_EXIST, QUERY_TEMPLATES, DEFAULT_QUERY_CONFIG } = require("../config");
const DataBaseSession = require("./database-session");

class QueryResult{
    constructor(config=DEFAULT_DB_CONFIG){
        this.db = new DataBaseSession(config);
    }

   async isTableExist(tableName, schemaName){
        const session = await this.db.getSession();
        const props = {
            tableName,
            schemaName
        }
        const queryString = this.getQuery(IS_TABLE_EXIST, props);
        const result = await session.query(queryString, {
            plain:true,
            ...DEFAULT_QUERY_CONFIG
        })
        return result['exists'];
   }
   getQuery(templateName, props){
       const templateCallBack = QUERY_TEMPLATES[templateName];
       return templateCallBack(props)
   }


}

module.exports = QueryResult;