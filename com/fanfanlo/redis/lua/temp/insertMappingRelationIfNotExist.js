const ScriptTemp = require('./../ScriptTemp');
/**
 * 给tabKey做一个映射索引
 * 如果tabKey不存在，则为tabKey申请一个序列索引
 * 然后调用redis.call(set, tabKey, index)
 * redis.call(command, tabKey:index, args)
 * @type {ScriptItem}
 */
module.exports = new ScriptTemp(2, 3,
    function (incrKeyIndex, tabKeyIndex, stepAlias, commandArgIndex, argsIndex) {
        return `
            ${this.name} (res, ARGV[${stepAlias}], KEYS[${incrKeyIndex}], KEYS[${tabKeyIndex}], ARGV[${commandArgIndex}], ARGV[${argsIndex}])
            ${ScriptTemp.checkRes}
            `;
    }, function () {
        return `
            local function ${this.name} (res, stepAlias, incrKey, tabKey, command, args)
                ${ScriptTemp.tempHead}
                stepRes.tabKey = tabKey
                stepRes.incrKey = incrKey
                local isExist = redis.call('exists', tabKey)
                stepRes.isExist = isExist
                if(isExist == 0) then
                    local index = redis.call('incr', incrKey)
                    redis.call('set', tabKey, index)
                    stepRes.index = index
                    stepRes.insert = redis.call(command, tabKey .. index, unpack(cjson.decode(args)))
                end
            end
            `;
    },
    'insertMappingRelationIfNotExist');