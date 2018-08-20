
const ScriptTemp = require('./../ScriptTemp');
/**
 * 给tabKey做一个映射索引
 * 如果tabKey不存在，则为tabKey申请一个序列索引
 * 然后调用redis.call(set, tabKey, index)
 * redis.call(command, tabKey:index, args)
 * @type {ScriptItem}
 */
module.exports = new ScriptTemp(['tab', 'incr'],
    function (alias) {
        return `
    ${this.name} (res, '${alias}', copyParamsByAlias(params, aliases['${alias}']))
    ${ScriptTemp.checkRes}
    `;
    }, function () {
        return `
    local function ${this.name} (res, stepAlias, params)
        ${ScriptTemp.tempHead}  
        local isExist = redis.call('exists', params.tab)
        if(isExist == 0) then
            stepRes.isExist = false
            local index = redis.call('incr', params.incr)
            stepRes.index = index
            redis.call('set', params.tab, index)
        else
            local index = redis.call('get', params.tab)
            stepRes.index = index
            stepRes.isExist = true
        end
    end
    `;
    },
    'setGetIncrDataKey');