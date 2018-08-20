var exp = module.exports;
var _ = require('lodash');
exp.fillGap = fillGap;
/**
 *
 * @param src 要进行补位的源字符串
 * @param len 要多少长度
 * @param fill 补位的填充字符
 * @returns {*} 003
 */
function fillGap(src, len, fill)
{
    var res = src;
    while(res.length < len)
    {
        res = fill + res;
    }
    return res;
}
var characters = {
    num:"0123456789"
    , upper:"ABCDEFJHIJKLMNOPQRSTUVWXYZ"
}
characters.lower = characters.upper.toLowerCase();
characters.lower_upper = characters.lower + characters.upper;
characters.num_lower_upper = characters.num + characters.lower_upper;
characters.num_lower = characters.num + characters.lower;

exp.characters = characters;

exp.getRandomCode = getRandomCode;
/**
 * 获取一组随机的字符串
 // var code = getRandomCode(12);
 // var code = getRandomCode({min:3, random:3});
 // var code = getRandomCode({min:12, random:3}, true);
 // console.log('code is', code.length, code);
 * @param len 要获取的长度。如果len为数字则使用len，如果len是对象，可以{min:3,random:6} min为最小值，random为随机数，最终值为min+Math.random(random)
 * @param distinct 是否要排重，如果设置为true则返回字符串不会有重复的，但是需要注意src字符串长度需要超过len，不然会直接返回len。默认false
 * @param src 随机字符串的源。默认为characters.num_lower_upper
 * @returns {*} 返回len长度的字符串
 */

function getRandomCode(len, distinct, src) {
    src = src || characters.num_lower_upper;
    var res = "";
    var length = 0;
    if(_.isNumber(len))
    {
        length = len;
    }
    else if(_.isObject(len))
    {
        var min = len.min;
        var random = len.random;
        if(random <= 0)
        {
            random = 0;// 如果是动态数据，可能也不是错误
        }
        var amount = Math.floor(Math.random() * (random));
        length = min + amount;
    }
    if(distinct && src.length < length)
    {
        // error print here
        return src;
    }
    else{
        var src_len = src.length;
        for(var i = 0; i < length; i ++)
        {
            var index = Math.floor(Math.random() * src_len);
            var char = src.charAt(index);
            if(distinct && res.indexOf(char) > -1)
            {
                console.log('i', i);
                i --;
            }
            else{
                res += char;
            }
        }
    }
    return res;
}

// var code = getRandomCode({min:12, random:3}, true);
// console.log('code is', code.length, code);