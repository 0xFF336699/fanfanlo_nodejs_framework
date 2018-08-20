var mysql = require('mysql');
var conf = require('./../sql-enum');


var INSERT = conf.db.INSERT;
var INSERT_PARAMS = conf.db.INSERT_PARAMS;
var INSERT_MULTI = conf.db.INSERT_MULTI;
var UPDATE = conf.db.UPDATE;
var UPDATE_MULTI = conf.db.UPDATE_MULTI;
var LIST = conf.db.LIST;
var LIST_COMPLEX = conf.db.LIST_COMPLEX;
var CONTENT = conf.db.CONTENT;
var DELETE = conf.db.DELETE;
var exp = exports;
var pools = {};
exp.createPool = createPool;
function createPool(name, config)
{
    var pool;
    if(pools[name])
    {
        pool = pools[name];
    }
    else{
        pool = mysql.createPool(config);
        pools[name] = pool;
    }
    return pool;
}
exp.getClient = getClient;

function getClient(client_type, onError, onConnect) {
    var pool = pools[client_type];
    if(!pool)
    {
        onError({error:'数据库不存在', client_type:client_type});
        return;
    }
    pool.getConnection(function(err, connection){
        if(connection)
        {
            onConnect({client:connection, db:exp});
        }
        else{
            onError({error:"数据库连接池没有连接成功", client_type:client_type, err:err});
        }
    });
}


exp.query = query;
function query(conn, sql, callback, sqlType)
{
    var q;
    q =  conn.query(sql, function(err, rows, fields)
    {
        var query;
        var result = {err:err,  rows:rows, fields:fields};
        switch (sqlType)
        {
            case INSERT:
                break;
            case UPDATE:
                break;
            case CONTENT:
                if(rows && rows.length > 0)
                {
                    result.data = rows[0];
                }
                break;
            case LIST:
            case LIST_COMPLEX:
                if(rows)
                {
                    result.data = rows;
                }
                break;
            case DELETE:
                break;
        }
        if(err){
            if(conf.is_release)
            {
                //delete  result.err;
            }
        }
        else{
            result.rows = rows;
        }
        if(conf.is_developer){
            if(err){
                result.error_sql = result.err;
                result.error_query =  {values: q.values, sql: q.sql, typeCast: q.typeCast, nestTables: q.nestTables};
            }
            else{
                result.query = {values: q.values, sql: q.sql};
            }
        }
        if(err)
        {
            console.log("mysql.index.query.err", err);
            console.log("mysql.index.query.sql", q.sql);
        }
        //console.log("q.sql", q.sql);
        result.error = err;
        callback(result);
    });

}
exp.releaseClient = releaseClient;
function releaseClient(db) {
    db.client.release();
}