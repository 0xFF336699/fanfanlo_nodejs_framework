/**
 * @param func  must be keys.concat(args),example KEYS[1], KEYS[2], ARGV[1], ARGV[2]
 * but you can change it at return function
 * function (incrKeyIndex, tabKeyIndex, commandArgIndex, argsIndex) {
        return `
            setIncrKeyValue(res, KEYS[${incrKeyIndex}], KEYS[${tabKeyIndex}], ARGV[${commandArgIndex}], ARGV[${argsIndex}])
            ${ScriptTemp.checkRes}
            `;
    }
 */
class ScriptItem{
    constructor(paramAlias, func, script, name){
        this.paramAliases = paramAlias;
        this.func = func;
        this.script = script;
        this.name = name;
    }
}
ScriptItem.checkRes = `
    if(res.err ~= nil) then
        return redis.error_reply(res.err)
    end
    `;
ScriptItem.tempHead = `
        local stepRes = {}
        res[stepAlias] = stepRes
        local redisRes
        `;
ScriptItem.onRedisError = `
    if(redisRes.err ~= nil) then
        res.err = redisRes
        stepRes.err = redisRes
        return
    end
    `;
ScriptItem.separators = {
    //有一些长序列的session、url、md5后的值等，
    // 因为太长，并且其可能需要与多张表链接，例如需要链接到自己的hmset、llist等，
    // 这时候就需要把这个长的字段转为一个短的序列来节省空间，用时间换空间方案。
    //当然，22365其实其它字符串拼接等也都可以
    index:':' // c@weixin_user:22365 = {index:3,
}
module.exports = ScriptItem;