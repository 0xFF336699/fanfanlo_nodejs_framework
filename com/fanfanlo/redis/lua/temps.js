function init() {
    const ScriptTemp = require('./ScriptTemp');
    const rd = require('rd');
    rd.eachFileFilterSync(__dirname + "/temp", /\.js$/, function (f, s) {
        var temp = require(f);
        if (temp && temp.constructor == ScriptTemp) {
            if(temp.name in exports){
                throw Error('find same name redis lua temp, path is', f);
            }else{
                exports[temp.name] = temp;
            }
        }
    });
}
init();