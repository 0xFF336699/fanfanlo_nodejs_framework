/**
 *  执行redis内置命令
 *  需要执行的命令名称，命令要执行的tab，和tab要设置的args
 * @type {ScriptItem}
 */
const ScriptTemp = require('./../ScriptTemp');
module.exports = new ScriptTemp(['command', 'tab', 'args'],
    function (alias) {
        return `
    ${this.name} (res, '${alias}', copyParamsByAlias(params, aliases['${alias}']))
    ${ScriptTemp.checkRes}
    `;
    }, function () {
        return `
    local function ${this.name} (res, stepAlias, params)
        ${ScriptTemp.tempHead}
        stepRes.data = redis.call(params.command, params.tab, unpack(params.args))
    end
    `;
    },
    'exec');