const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
let conf;
const defConf = {
    inputTag:'_src',
    output:'.json',
    jsonExt:'.json'
}
/**
 * {watchPath:'/var/www/shangwoa/web/source/json/ii/'}
 * @param config
 */
function setConf(config) {
    for(let key in defConf)
        if(!(key in config))
            config[key] = defConf[key];
    conf = config;
    return module.exports;
}
function watch() {
    // check('E:\\work\\nodejs\\shangwoa\\web\\source\\json\\ii\\bot_subscription_tag_user\\list_src.json')
    check('/var/www/shangwoa/web/source/json/ii/bot_subscription_tag_user/list_src.json')
    return exports;
}
const jsonExt = '.json';
function check(input) {
    if(path.extname(input) == conf.jsonExt){
        let srcName = path.basename(input, jsonExt);
        if(srcName.slice(srcName.length - conf.inputTag.length) == conf.inputTag){
            let name = srcName.slice(0, srcName.lastIndexOf('_src'));
        }
    }
}

module.exports = {setConf, watch}
