var exp = module.exports;
var util = require('util');
function getItemIndexByProps(arr, props)
{
    for(var i = 0; i < arr.length; i ++){
        var item = arr[i];
        var is_same = true;
        for(var name in props)
        {
            if(item[name] != props[name])
            {
                is_same = false;
                break;
            }
        }
        if(is_same)
        {
            return i;
        }
    }
    return -1;
}
exp.getItemIndexByProps = getItemIndexByProps;
exp.getItemByProps = getItemByProps;
function getItemByProps(arr, props)
{
    var index = getItemIndexByProps(arr, props);
    if(index > -1)
    {
        return arr[index];
    }
    return null;
}
exp.copyInclude = copyInclude;
/**
 * 单层复制对象，只复制允许的key
 * @param list 可以是obj，也可以是数组。obj会返回obj，数组则返回数组
 * @param include 允许复制的keys
 * @returns {Array} 根据list参数不同返回对应数组或对象。
 */
function copyInclude(list, include)
{
    var array = [];
    var is_array = util.isArray(list);
    if(!is_array)
    {
        list = [list];
    }
    for(var i = 0; i < list.length; i ++)
    {
        var item = list[i];
        var obj = {};
        for(var key in item)
        {
            if(include.indexOf(key) > -1)
                obj[key] = item[key];
        }
        array.push(obj);
    }
    return is_array ? array : array[0];
}
exp.copyExclude = copyExclude;
/**
 * 单层复制对象，排除不允许的key
 * @param list 可以是obj，也可以是数组。obj会返回obj，数组则返回数组
 * @param exclude 要排除的keys
 * @returns {Array} 根据list参数不同返回对应数组或对象。
 */
function copyExclude(list, exclude)
{
    var array = [];
    var is_array = util.isArray(list);
    if(!is_array)
    {
        list = [list];
    }
    for(var i = 0; i < list.length; i ++)
    {
        var item = list[i];
        var obj = {};
        for(var key in item)
        {
            if(exclude.indexOf(key) == -1)
                obj[key] = item[key];
        }
        array.push(obj);
    }
    return is_array ? array : array[0];
}