var exp = module.exports;

exp.copyInclude = copyInclude;
/**
 *
 * @param src 源对象
 * @param include 要复制的字段
 * @param dest 目标对象，如无则创建
 * @param aliases 字段别名{content:"charpters"}会把src.content复制为dest.charpters
 * @returns {*|{}}
 */
function copyInclude(src, include, dest, aliases)
{
    dest = dest || {};
    aliases = aliases || {};
    var keys = Object.keys(src);
    for(var i = 0, len = keys.length; i < len; i ++)
    {
        var key = keys[i];
        if(include.indexOf(key) > - 1)
        {
            dest[aliases[key] || key] = src[key];
        }
    }
    return dest;

}
exp.copyExclude = copyExclude;
function copyExclude(src, exclude, dest, keys)
{
    keys = keys || Object.keys(src);
    exclude = exclude || [];
    dest = dest || {};
    var len = keys.length;
    for(var i = 0; i < len; i ++)
    {
        var key = keys[i];
        if(exclude.indexOf(key) == -1)
            dest[key] = src[key];

    }
    return dest;
}
exp.copyValuesToArray = copyValuesToArray;
function copyValuesToArray(src, columns)
{
    var result = [];
    for(var i = 0, len = columns.length; i < len; i ++)
    {
        result.push(src[columns[i]]);
    }
    return result;
}

exp.copyIfNotExist = copyIfNotExist;
/**
 * A对象属性复制到B身上，如果B没有这个属性字段的情况下。
 * 可用于复制默认配置，如果B有这个字段，则使用B，没有这个字段就从A身上复制默认值。
 * @param src A默认配置
 * @param dest B目标配置
 * @param keys V8优化时forin会导致整个函数不被优化缓存，推荐使用keys方法然后循环对象属性
 * @param exclude 在非默认属性配置方案时可以通过这个字段配置额外排除属性的字段。
 */
function copyIfNotExist(src, dest, keys, exclude)
{
    dest = dest || {};
    exclude = exclude || [];
    exclude = exclude.concat(Object.keys(dest));
    return copyExclude(src, exclude, dest, keys);
}

exp.simpleCopy = simpleCopy;
function simpleCopy(dest,...srcs)
{
    for(let j = 0, l= srcs.length; j < l; j ++)
    {
        var src = srcs[j];
        var keys = Object.keys(src);
        for(var i = 0, len = keys.length; i < len; i ++)
        {
            var key = keys[i];
            dest[key] = src[key];
        }
    }
    return dest;
}