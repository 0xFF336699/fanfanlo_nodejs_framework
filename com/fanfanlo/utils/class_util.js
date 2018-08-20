exports.thisBindThis = thisBindThis;
function thisBindThis(that, list)
{
    var len = list.length;
    for(var i = 0; i < len; i ++)
    {
        var name = list[i];
        that[name] = that[name].bind(that);
    }
}