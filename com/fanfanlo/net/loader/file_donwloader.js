const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const fsUtil = require('./../../utils/fs_util');
let defDownloadOptions = {
    maxRepeatTime:5,
    repeatInterval:2500 // 毫秒
};

function setDefDownloadOptions(options){
    defDownloadOptions = options;
}

let defRequestOptions = {

};

function setDefRequestOptions(options){
    defRequestOptions = options;
}

let defFileOptions = {};

function setDefFileOptions(options){
    defFileOptions = options;
}

function downloadWithSaveFile(url, savePath, onComplete, onError, onFinish, requestOptions, downloadOptions, fileOptions){
    downloadOptions = _.defaultsDeep(downloadOptions || {}, defDownloadOptions);
    downloadOptions.repeatTime = 0;
    requestOptions = _.defaultsDeep(requestOptions || {}, defRequestOptions);
    requestOptions.url = url;
    fileOptions = _.defaultsDeep(fileOptions || {}, defFileOptions);
    let p = path.dirname(savePath);
    fsUtil.mkdirs(p, '0777', function (res) {
        download();
    });

    function download(){
        let req = request(url, function (error, response, body) {
            if(!body || body == ''){
                let error = {error:'no body'};
                if(onError && _.isFunction(onError)){
                    onError(error);
                }
                complete(error);
            }
        });
        req.on('error',  function(err){
            console.log('req on error', err);
            if(++downloadOptions.repeatTime > downloadOptions.maxRepeateTime){
                if(onError && _.isFunction(onError)){
                    onError(err);
                }
            } else {
                return setTimeout(download, downloadOptions.repeatInterval);
            }
            complete({error:err});
        });
        // req.on('response', function(response) {
        //     console.log(response.statusCode) // 200
        //     console.log(response.headers['content-type']) // 'image/png'
        // });
        // req.on('data', function (data) {
        //     console.log('data length ', data.length);
        // })
        let fw = req.pipe(fs.createWriteStream(savePath, fileOptions));
        fw.on('error', function(err){
            console.log('fw error', err);
            //  可能无法写入等，这个错误先跳过，以后再琢磨怎么处理合适。
            complete({error:err});
        });

        fw.on('finish', function (res) {
            if(onFinish && _.isFunction(onFinish)){
                onFinish(res);
            }
            complete({info:res});
        });

        fw.on('pipe', function (data) {
            console.log('data', data);
        })
    }

    function complete(info){
        if(onComplete && _.isFunction(onComplete)){
            onComplete(info);
        }
    }

}

module.exports = {setDefDownloadOptions, setDefRequestOptions, setDefFileOptions, downloadWithSaveFile};
