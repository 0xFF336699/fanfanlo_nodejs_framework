var _ = require("lodash");
var chokidar = require('chokidar');
var path = require('path');
var fs = require('fs');
var error_enum = require('./../error/error-enum');
// var server_conf = require('./../../conf/server-conf');
var Ajv = require('ajv');
var ajv = new Ajv({
    meta: false, // optional, to prevent adding draft-06 meta-schema
    extendRefs: true, // optional, current default is to 'fail', spec behaviour is to 'ignore'
    unknownFormats: 'ignore',  // optional, current default is true (fail)
    // ...
});

var metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');
// metaSchema.$id = metaSchema.id;
ajv.addMetaSchema(metaSchema);
ajv._opts.defaultMeta = metaSchema.id;

// optional, using unversioned URI is out of spec, see https://github.com/json-schema-org/json-schema-spec/issues/216
ajv._refs['http://json-schema.org/schema'] = metaSchema.$schema;

// Optionally you can also disable keywords defined in draft-06
ajv.removeKeyword('propertyNames');
ajv.removeKeyword('contains');
ajv.removeKeyword('const');

function getAjv(){
    var ajv = new Ajv({
        meta: false, // optional, to prevent adding draft-06 meta-schema
        extendRefs: true, // optional, current default is to 'fail', spec behaviour is to 'ignore'
        unknownFormats: 'ignore',  // optional, current default is true (fail)
        // ...
    });

    var metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');
// metaSchema.$id = metaSchema.id;
    ajv.addMetaSchema(metaSchema);
    ajv._opts.defaultMeta = metaSchema.id;

// optional, using unversioned URI is out of spec, see https://github.com/json-schema-org/json-schema-spec/issues/216
    ajv._refs['http://json-schema.org/schema'] = metaSchema.$schema;

// Optionally you can also disable keywords defined in draft-06
    ajv.removeKeyword('propertyNames');
    ajv.removeKeyword('contains');
    ajv.removeKeyword('const');
    return ajv;
}
function getAjv6() {
    return new Ajv();
}
ajv6 = new Ajv();

var CallLater = require('./../utils/callLater');
var obj_util = require('./../utils/object_util');
var IIFuncBase = module.exports = function(config)
{
    /**
     * conf:{
     * name:"getTabs", // 该方法被调用的名称
     * powers:[1,3,7], //可调用该方法的权限
     * clients:[pg.client_enum.photo],//该方法需要的数据库链接的枚举，例如需要pg数据库photo角色权限的链接，或者mysql对某个数据库的链接等
     * exec:function(params, cb){}//执行函数，params为IIParams类型，cb为回调函数，因为可能IIFunc进行多层调用，无法把cb写入到params里作为参数使用，所以为独立参数注入。
     * valid:path.join(server_conf.paths.source_json_ii, 'product/product_insert.json') // 验证数据的路径，如果为空则等于不需要验证。
     * validate:function(valid, body){} //如果ajv满足不了验证，譬如上传文章的验证需要检测临时文件夹是否存在这个（些）文件，如果不存在，则可能是有人在直接调用接口，而非上传文章。
     * }
     */
    var that = this;
    this.config = config;
    for(var name in config)
    {
        this[name] = config[name];
    }
    if('valid' in config)
    {
        var p = config.valid;
        if(p.indexOf(IIFuncBase.schemaBasePath) == -1)
            p = IIFuncBase.schemaBasePath + p;
        this.valid_path = p;
        var watcher = chokidar.watch(p, {
            persistent: true
        });
        watcher.on('change', function(path,stat){
            laterReadValidJson(stat);
        });
        watcher.on('add', function(path, stat)
        {
            laterReadValidJson(stat);
        });
        // laterReadValidJson();
    }
    function laterReadValidJson(stat) {
        if(stat)
        {
            var time = stat.mtime.getTime();
            that.config.valid_mtime = time;
        }
        that.valid_json = undefined;
        that.validateFunc = undefined;
        CallLater.onlyOnce(readJson, 200);
    }
    function readJson() {
        fs.readFile(that.valid_path, function (err, data) {
            if (err) {
                return console.error(err);
            }
            try{
                let str = data.toString();
                let obj = JSON.parse(str);
                that.valid_json = obj;
                that.validateFunc = ajv.compile(obj);
                that.validateAjv = ajv;
            }
            catch(e)
            {
                // console.log('ooxx', that.valid_path, str);
                try{
                    let str = data.toString();
                    let obj = JSON.parse(str);
                    that.valid_json = obj;
                    that.validateFunc = ajv6.compile(obj);
                    that.validateAjv = ajv6;
                }catch (e){
                    console.log('读取验证文件出错', that.valid_path, e.stack);
                }
            }
        });
    }


    if(('validate' in config) == false && ('valid' in config) && (!('use_valid' in config) || config.use_valid == true))
    {
        this.validate = function (body, callback) {
            var result = {};
            if(this.validateFunc)
            {
                var valid = that.validateAjv.validate(this.valid_json, body);
                result.valid = valid;
                if(valid)
                {

                }
                else{
                    console.log("ajv.errors",that.valid_path, ajv.errors);
                    // console.log('3003validate body is', body);
                    //数据校验没通过。
                    result.error = error_enum.e3003;
                }
            }
            else{
                // console.log('3002 validate body is', body);
                //接口正在等待或缺少配置文件，请稍后再试。
                result.error = error_enum.e3002;
            }
            callback(result);
        }
    }

}
IIFuncBase.prototype.addChildren = function(list)
{
    if(!this.children)
    {
        this.children = [];
    }
    this.children = this.children.concat(list);
}
IIFuncBase.prototype.getUsedDBClientsName = function () {
    var conf = this.config;
    var result = conf.clients ? conf.clients.slice() : [];
    if(this.children)
    {
        for(var i = 0; i < this.children.length; i ++)
        {
            var base = this.children[i];
            result = _.union(result, base.getUsedDBClientsName());
        }
    }
    return result;
}

IIFuncBase.prototype.getUsedESClientsName = function () {
    var conf = this.config;
    var result = conf.es ? conf.es.slice() : [];
    if(this.children)
    {
        for(var i = 0; i < this.children.length; i ++)
        {
            var base = this.children[i];
            result = _.union(result, base.getUsedESClientsName());
        }
    }
    return result;
}

IIFuncBase.prototype.getClientConfInfo = function()
{
    var conf = this.config;
    var res = {};
    obj_util.copyInclude(conf, ['name', 'powers', 'clients', 'title', 'powers_show_in', 'valid_mtime'], res);
    res.has_valid = conf.valid != undefined;
    return res;
}
IIFuncBase.schemaBasePath;