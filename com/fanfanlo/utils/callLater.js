var exp = module.exports = {};
var au = require('./array_util');
var only_once = [];
var only_once_alias = {};
exp.onlyOnce = function(cb, time, args)
{
    var index = au.getItemIndexByProps(only_once, {cb:cb});
    var item;
    if(index > -1)
    {
        item = only_once[index];
        only_once.splice(index, 1);
        clearTimeout(item.timer);
    }

    var timer = later(cb, time, args);
    item = {cb:cb, timer:timer};
    only_once.push(item);
    return item;
}
exp.later = later;
function later(cb, time, args)
{
    return setTimeout(function(){
        var index = au.getItemIndexByProps(only_once, {cb:cb});
        if(index > -1)
        {
            only_once.splice(index, 1);
        }
        else{
            console.error('call later has error');
        }
        cb.apply(null, args);
    }, time);
}

exp.onceByAlias = function(alias, interval, cb, args)
{
    var item = only_once_alias[alias];
    if(item)
    {
        clearTimeout(item.interval);
    }
    var interval= laterByAlias(alias, interval, cb, args);
    item = {interval:interval};
    only_once_alias[alias] = item;
    return item;
}

function laterByAlias(alias, interval, cb, args)
{
    return setTimeout(function(){
        delete  only_once_alias[alias];
        cb.apply(null, args);
    }, interval);
}

var call_later_func_list = [];
var call_later_point_list = [];
exp.callLaterOneTime = function callLaterOneTime(interval, cb, jump, list)
{
    var index = call_later_func_list.indexOf(cb);
    var point;
    if(index > -1 )
    {
        if(jump)
        {
            return call_later_point_list[index];
        }
        else{
            point = call_later_point_list[index];
            clearTimeout(point);
            point = callLater(interval, cb, list);
            call_later_point_list[index] = point;
            return point;
        }
    }
    else{
        // point = callLater(interval, cb, list);
        point = exp.onlyOnce(cb,interval, list);
        call_later_func_list.push(cb);
        call_later_point_list.push(point);
        return point;
    }

}