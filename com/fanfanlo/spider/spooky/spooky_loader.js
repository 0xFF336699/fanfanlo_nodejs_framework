
const default_config = {
    child: {
        transport: 'http',
    },
    casper: {
        logLevel: 'debug',
        verbose: true
    }
}
const spiders = {};
//{key:'', callback, start, end}
const queue = [];
let active;
// thenOpen({key:"握草 表情", callback:function (data) {
//     console.log('on data back', data);
// }})
// thenOpen({key:"美女", callback:function (data) {
//     console.log('on data back2', data);
// }})
exports.thenOpen = thenOpen;
function thenOpen(conf){
    queue.push(conf);
    checkLoop();
}
function onSearchBack(data){
    if(active){
        active.callback(data);
        active = undefined;
    }
    checkLoop();
}
function checkLoop(){
    if(!active && queue.length > 0){
        active = queue.shift();
        _createSpooky(default_config, active.key);
    }
    else{

    }
}
checkLoop();
function _createSpooky(conf, text){
    // var text = '握草 表情';
    var key = encodeURIComponent(text);
    var url = "http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=utf8&word="+key + "&fr=ala&ala=1&alatpl=others&pos=0";
    const Spooky = require('spooky');
    const spooky = new Spooky(conf, callback);
    function callback(err){
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }
        start();
    }
    function start(){
        spooky.start(url);
        spooky.then(function () {
            var title = this.getElementsAttribute(".imgpage ul li", "data-objurl");
            this.emit('hi', title);
            // this.emit('hi', 'a');
        });
        spooky.run();
    }

    spooky.on('error', function (e, stack) {
        console.error(e);

        if (stack) {
            console.log(stack);
        }
    });
    spooky.on('hi', function (data) {
        onSearchBack(data);
    })
    return spooky;
}
exports.createSpooky = createSpooky;
function createSpooky(name, conf){
    return spiders[name] = _createSpooky(conf);
}
// const def = createSpooky("def", default_config);

function search(keys, start, end){
    var key = encodeURIComponent(keys);
    var url = "http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=utf8&word="+key + "&fr=ala&ala=1&alatpl=others&pos=0";
    def.start(url, function(){
        def.emit('img', 'abc');
    });
    def.then(function(){
        var title = this.getElementsAttribute(".imgpage ul li", "data-objurl");
        def.emit('img', title);
    });
    def.run();
    def.on("img", function(list){
        console.log('list', list);
    });
    console.log('run ', Object.keys(def));
}
exports.search = search;
// exports.def = def;