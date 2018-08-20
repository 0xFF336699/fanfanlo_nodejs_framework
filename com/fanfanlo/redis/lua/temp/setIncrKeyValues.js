const ScriptTemp = require('./../ScriptTemp');
module.exports = new ScriptTemp(2, 2,
    function (incrKeyIndex, tabKeyIndex, commandArgIndex, argsIndex) {
        return `
            setIncrKeyValue(res, KEYS[${incrKeyIndex}], KEYS[${tabKeyIndex}], ARGV[${commandArgIndex}], ARGV[${argsIndex}])
            ${ScriptTemp.checkRes}
            `;
    }, function () {
        return `
            local function setIncrKeyValue(res, incrKey, tabKey, command, args)
                local index = redis.call('incr', incrKey)
                res.index = index
                local setRes = redis.call(command, tabKey .. index, unpack(cjson.decode(args)))
                res.setRes = setRes
            end`;
    },
    'setIncrKeyValues');