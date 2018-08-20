/**
 *  执行redis内置命令
 *  需要执行的命令名称，命令要执行的tab，和tab要设置的args
 * @type {ScriptItem}
 */
const ScriptTemp = require('./../ScriptTemp');
module.exports = new ScriptTemp(['tab'],
    function (alias) {
        return `
    ${this.name} (res, '${alias}', copyParamsByAlias(params, aliases['${alias}']))
    ${ScriptTemp.checkRes}
    `;
    }, function () {
        return `
    local function ${this.name} (res, stepAlias, params)
        ${ScriptTemp.tempHead}
        stepRes.isExist = redis.call('exists', params.tab)
    end
    `;
    },
    'checkKeyIsExist');