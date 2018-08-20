var mysql = require('./index');
var sql_enum = require('./../sql-enum');
var errors = require('./../../error/error-enum');
var exp = exports;
exp.insertIfNotExitst = insertIfNotExitst;
/**
 *
 var sql = "select id from ?? where ?";
 var info = {openid:vo.data.wx_user.openid};
 var select_sql = {sql:sql, values:["user", info]};
 var insert_sql = {sql:"insert into ?? set ? ", values:["user", info]};
 mysql_util.insertIfNotExitst(select_sql, insert_sql, client, function(res)
 {
     console.log('select insert', res);
 });
 * @param select_sql
 * @param insert_sql
 * @param client
 * @param callback
 */
function insertIfNotExitst(select_sql, insert_sql, client, callback)
{
    var result = {is_insert:false};
    select();
    function select()
    {
        mysql.query(client, select_sql, function(res)
        {
            if(res.error)
            {
                result.error = res.error;
                return callback(result);
            }
            else if(res.data)
            {
                result.data = res.data;
                callback(result);
            }
            else{
                insert();
            }
        },sql_enum.db.CONTENT);
    }
    function insert()
    {
        // 如果已经插入过就跳出
        if(result.is_insert == true)
        {
            result.error = errors.lib_100001;
            return callback(result);
        }
        result.is_insert = true;
        mysql.query(client, insert_sql, function (res) {
            if(res.error)
            {
                result.error = res.error;
                return callback(result);
            }
            else{
                select();
            }
        }, sql_enum.db.INSERT);
    }
}