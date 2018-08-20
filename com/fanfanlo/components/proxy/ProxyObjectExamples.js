'use strict';
const ProxyObject = require('./ProxyObject');
const util = require('util');
// testGet();
function testGet(){
    let proxy = new ProxyObject({xx:3});
    console.log('proxy', proxy.xx);
}
// testSet();
function testSet(){
    let proxy = new ProxyObject();
    proxy.addEventListener('xx$changed', function(event){
        // console.log('xxxxx', util.inspect(event));
        let xx = event.toString();
        console.log('xxxx', util.inspect(event));
    })
    proxy.xx = 6;
    console.log('testset', proxy.xx, proxy);
}
