/**
 * 如果需要就插入数据。
 * 是否需要更新的条件可以通过外部直接注入，也可以在之前执行的函数里构成条件，通过copyParamsByAlias来获取到
 * 例如如果某个人的session没有id索引，这时可以判断认为需要通过这个id绑定来添加它的专属数据。
 * 或者查看数据是否不一致，不一致就更新。
 * @type {ScriptItem}
 */

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
        if(params.isNeed == true) then
            stepRes.insert = redis.call(params.command, params.tab, unpack(params.args))
        end
    end
    `;
    },
    'insertDataIfNeed');