/**
 * 如果条件成立，就执行redis.call的命令
 * @type {ScriptItem}
 */

const ScriptTemp = require('./../ScriptTemp');
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
        if(params.isTrue == true) then
            stepRes.redisRes = redis.call(params.command, params.tab, unpack(params.args))
        end
    end
    `;
    },
    'ifRedisCall');