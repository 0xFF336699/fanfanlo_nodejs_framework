const _ = require('lodash');
function getResTemp(content, keys) {
    /**
     *  params等于是ARGV[1-n]打包成集合，每个参数都有变量名和变量值组成，这样就不必从ARGV 1-n这样写死提取了
     *  params = {
     *      keys:{
     *          upsertIncr_incrTab:"c@b_u"
     *      },
     *      args:{
     *          upsertIncr_expireTime:3000
     *      },
     *      res:{
     *          upsertIncrStep:{//upsertIncrStep是每个函数所动态产生出来的数据
     *              incr:3
     *          }
     *      }
     *  }
     *
     *
     *
     *  alias 所有要调用的方法的别名，
     *  {
     *      upsertIncr:// 表示要调用的方法的配置
 *              {
     *              mapping:{//表示映射关系
     *              //方法内用到的incrTab变量是从args.keys.upsertIncr_incrTab参数里获取的，这里用到的是一个key值
     *                incrTab:"params.keys.upsertIncr_incrTab",
     *                //方法内用到的expireTime变量是从args.params.upsertIncr_expireTime获取的，这里是一个argv的值
     *                expireTime:"params.args.upsertIncr_expireTime"
     *                //
     *              }
     *          },
     *      updateExpire:{
     *          mapping:{
     *              // params.res.upsertIncr.indexTab是在上一个函数里动态生成的数据。
     *              tab:params.res.upsertIncr.indexTab
     *          }
     *  }
     *  这个别名里下辖了这个方法要使用到的keys和argvs，keys和argvs被转换成了通过alias
     */
    return `
    local  function split(s, p)
        local rt= {}
        string.gsub(s, '[^'..p..']+', function(w) table.insert(rt, w) end )
        return rt
    end
    
    local function getValueByMultiLevelString(srcTable, valuesString)
        local values = split(valuesString, '.')
        local value = srcTable
        for index, name in ipairs(values) do
            value = value[name]
            if(value == nil) then
                return nil
            end
        end
        return value
    end
    
    local function copyParamsByAlias(src, mapping) 
        local res = {}
        for key, value in pairs(mapping) do  
            res[key] = getValueByMultiLevelString(src, value)  
        end 
        return res
    end
    
    local res = {}
    local params = cjson.decode(ARGV[1])
    local aliases = cjson.decode(ARGV[2])
    ARGV[1] = params
    ARGV[2] = aliases
    ARGV[3] = res
    ${content}
    return cjson.encode(res)`;
}
function createParamIndexArray(index, len) {
    let res = [];
    index ++, len ++;
    while(index < len){
        res.push(index);
        index ++;
    }
    return res;
}
const operators = {
    plus:'+',
    multiply:'*',
    devide:'/',
    substract:'-',
    stringJoin:'..'
}
class RedisLua {
    static create(){
        return new RedisLua();
    }
    constructor() {
        this.resetParams();
    }
    resetParams(){
        this.params = null;
        this.scripts = [];
        this.keys = null
        this.content = '';
        this.aliases = {};
        return this;
    }
    checkMappingAliases(mapping, temp){
        let paramAliases = temp.paramAliases;
        let mappingKeys = Object.keys(mapping);
        if(mappingKeys.length == paramAliases.length){
            _.each(paramAliases,(value, key) =>{
                if(mappingKeys.indexOf(value) == -1){
                    throw new Error('mapping lost a key ', value);
                }
            })
        }else{
            throw new Error('mapping not match aliases');
        }
    }
    addFunction(temp, alias, mapping){
        if(this.scripts.indexOf(temp.script()) == -1){
            this.scripts.push(temp.script());
        }
        let mappingKeys = Object.keys(mapping);
        this.checkMappingAliases(mapping, temp);
        this.aliases[alias] = mapping;
        let func = temp.func.apply(temp, [alias]);
        this.content += func;
        return this;
    }
    setKeysParams(keys, params){
        this.keys = keys;
        this.params = params;
        return this;
    }
    get args(){
        return [ this.script, this.keys.length].concat(this.keys).concat([JSON.stringify(this.params), JSON.stringify(this.aliases)]);
    }
    get script(){
        return getResTemp(this.scripts.join('') + this.content);
    }
}
module.exports = RedisLua;