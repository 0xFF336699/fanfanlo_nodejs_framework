var IIParams = module.exports = function(obj)
{
    /**
     * body:{dest:dest,params:params}
     * dest 目标调用接口{team:类名、文件名,member:方法名} 必须有
     * params 客户端发送的参数{page:{per_items:3,page_index:1},data:{user_id:3}}。如果没有需要传递的参数可以为空
     * user 调用接口的用户{power_type:1} 装载用户权限等数据。除了系统内部统计诸如访问频次等，其它接口应该是必须比较调用权限。
     * db_clients:{"pg_photo":{db:pg, client:client_photo}, "ms_photo":{db:ms, client_photo:client_photo}}该接口所需要的所有数据库链接，可以多种数据库，可以同数据库多个链接
     */
    this.setParams(obj);
}
IIParams.prototype.setParams = function(obj)
{
    if(obj)
    {
        for(var name in obj)
        {
            this[name] = obj[name];
        }
    }
}