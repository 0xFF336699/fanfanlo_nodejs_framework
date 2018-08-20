const ScriptTemp = require('./../ScriptTemp');
/**
 * 给tabKey做一个映射索引
 * 如果tabKey不存在，则为tabKey申请一个序列索引
 * 然后调用redis.call(set, tabKey, index)
 * redis.call(command, tabKey:index, args)
 * @type {ScriptItem}
 */
module.exports = new ScriptTemp(['tabKey', 'incrKey', 'expireTime'],
    function (alias) {
    return `
    ${this.name} (res, '${alias}', copyParamsByAlias(params, aliases['${alias}']))
    ${ScriptTemp.checkRes}
    `;
    }, function () {
    return `
    local function ${this.name} (res, stepAlias, params)
        ${ScriptTemp.tempHead}   
        res.params = params
    end
    `;
    },
    'updateExpireTime');