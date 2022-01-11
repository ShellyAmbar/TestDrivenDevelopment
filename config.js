const DEFAULT_QUERY_CONFIG = {
    // Set this to true if you don't have a model definition for your query.
    raw: false,
}
const IS_TABLE_EXIST='IS_TABLE_EXIST'
const QUERY_TEMPLATES = {
    [IS_TABLE_EXIST]: (props) =>`SELECT EXISTS (\
        SELECT FROM pg_catalog.pg_class c\
        JOIN   pg_catalog.pg_namespace n ON n.oid = c.relnamespace\
        WHERE  n.nspname = '${props.schemaName}'\
        AND    c.relname = '${props.tableName}'\
        AND    c.relkind = 'r'\
        );`
}
const DEFAULT_DB_CONFIG= {
    username: 'user',
    password: 'localone',
    port: 5432,
    host: 'localhost',
    database: '',
    dialect: 'postgres'
};
module.exports = {
    DEFAULT_DB_CONFIG,
    QUERY_TEMPLATES,
    IS_TABLE_EXIST,
    DEFAULT_QUERY_CONFIG
}