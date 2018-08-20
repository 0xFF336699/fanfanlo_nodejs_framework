var fs = require('fs');
var path = require('path');
//
/**
 * fs_util.mkdirs(move_dir, '0777', function(dest_p)
 * @param dirpath
 * @param mode
 * @param callback
 * @param sync是否同步，默认否。
 */
var mkdirs = function(dirpath, mode, callback, sync) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
            callback(dirpath);
        } else {
            mkdirs(path.dirname(dirpath), mode, function(){
                if(sync){
                    fs.mkdirSync(dirpath, mode);
                    callback();
                }else{
                    fs.mkdir(dirpath, mode, callback);
                }
            });
        }
    });
}

function readUtf8File(p, cb)
{
    fs.exists(p, function(exists)
    {
       if(exists)
       {
           fs.readFile(p, function(err, data)
           {
               if(data)
               {
                   cb(undefined, data.toString());
               }
               else{
                   cb(err);
               }
           });
       }
       else{
           cb(false);
       }
    });
}
exports.readUtf8File = readUtf8File;
exports.mkdirs = mkdirs;

