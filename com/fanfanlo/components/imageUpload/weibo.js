const sinaUrl = 'http://picupload.service.weibo.com/interface/pic_upload.php?ori=1&mime=image%2Fjpeg&data=base64&url=0&markpos=1&logo=&nick=0&marks=1&app=miniblog';
const cookie = 'SINAGLOBAL=2277809656598.042.1507216888871; _s_tentry=-; YF-Page-G0=9a31b867b34a0b4839fa27a4ab6ec79f; Apache=5351375581362.308.1524565902478; ULV=1524565902942:11:1:1:5351375581362.308.1524565902478:1521951597186; YF-Ugrow-G0=ad83bc19c1269e709f753b172bddb094; YF-V5-G0=7fb6f47dfff7c4352ece66bba44a6e5a; login_sid_t=e2a015a3417817d7ede7236e699a75fc; cross_origin_proto=SSL; SSOLoginState=1526979421; UOR=f.uliba.net,widget.weibo.com,www.imydl.com; wb_view_log=1920*12001; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFKIokbz3g-4Tq3R53_.Drn5JpX5K2hUgL.Foe4S054eo.N1h52dJLoIp7LxKML1KBLBKnLxKqL1hnLBoUfUgvrIP5f9rya; ALF=1560129373; SCF=AimoCxlxenffPp5foS0MfzEW3JjBxiTCa3vmnDkOSNRmXytfUhI20nwS38AwxHb_I8B3zA1-UMz8l673rxIsHlI.; SUB=_2A252GAuPDeRhGeVH7FIY8ifLwzyIHXVVbHpHrDV8PUNbmtBeLVHBkW9NTyFfFl5Fb0dDenC7RZk7_wfThTUj3wEW; SUHB=079jaewNo9yM5S; un=18701381686; wvr=6';
const request  = require('superagent');
const charset = require('superagent-charset');
charset(request);
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const sizeTypes = ['large', 'mw1024', 'mw690', 'bmiddle', 'small', 'thumb180', 'thumbnail', 'square'];
function upload(imageLocalPath, removeFileAfterUpload, onError, onComplete, onFinish) {
    let p = path.resolve(imageLocalPath);
    fs.readFile(p, function(err, data) {
        request.parse['application/json'] = function(res, fn){
            res.text = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk){ res.text += chunk;});
            res.on('end', function(){
                res.text = res.text.slice(res.text.indexOf('{'));
                return fn(null, res);
            });
        };
        request.post(sinaUrl)
            .set({'Cookie':cookie})
            .attach('pic1', p, {name:'oo', filename:'xxx', contentType: 'blob'})
            .end(function(err, res){
                if(res && res.text){
                    try{
                        let data = JSON.parse(res.text);
                        let pic = data.data.pics.pic_1;
                        let pid = pic.pid;
                        if(pid){
                            uploadComplete(pic);
                        }else{
                            uploadError({info:'可能需要登陆', data:data});
                        }
                    }catch (err){
                        uploadError(err);
                    }
                }
            });
    });
    function uploadError(err) {
        if(_.isFunction(onError))
            onError({error:err});
        uploadFinish();
    }
    function uploadComplete(data) {
        if(_.isFunction(onComplete))
            onComplete(data);
        uploadFinish();
    }
    function uploadFinish() {
        if(_.isFunction(onFinish))
            onFinish();
        if(removeFileAfterUpload){
            fs.unlink(imageLocalPath, function (err) {
                if(err){
                    console.error('weibo upload image remove local image error', err);
                }
            })
        }
    }
}


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function pid2url(params, type) {
    function crc32(str) {
        str = String(str);
        var table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
        if (typeof(crc) == 'undefined') {
            crc = 0;
        }
        var x = 0,
            y = 0;
        crc = crc ^ (-1);
        for (var i = 0, iTop = str.length; i < iTop; i++) {
            y = (crc ^ str.charCodeAt(i)) & 0xFF;
            x = '0x' + table.substr(y * 9, 8);
            crc = (crc >>> 8) ^ x;
        }
        return crc ^ (-1);
    }
    var http_pre  = "http://ww";
    var https_pre = "https://ws";
    var url, zone, ext;
    var url_pre = https_pre;
    if (typeof(type) == 'undefined') type = 'bmiddle';
    if (params.pid[9] == 'w') {
        zone = (crc32(params.pid) & 3) + 1;
        url = url_pre + zone + '.sinaimg.cn/' + type + '/' + params.pid;
    } else {
        zone = ((params.pid.substr(-2, 2), 16) & 0xf) + 1;
        url = url_pre + zone + '.sinaimg.cn/' + type + '/' + params.pid;
    }
    return url + params.ext;
}

// httpUpload();
function httpUpload(imageLocalPath, callback){
    var http = require('http');
    var FormData = require('form-data');
//var querystring = require('querystring');
    var fs = require('fs');
    var CRLF = '\r\n';
    var form = new FormData();

    var opt = {
        header: CRLF + '--' + form.getBoundary() + CRLF + 'X-Custom-Header: 123' + CRLF + CRLF,
        knownLength: 1
    };

    let p = path.resolve(imageLocalPath);
    connect();

    function connect() {
        username = "wr";
        password = "45!"

        var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
        var options = {
            hostname: 'picupload.service.weibo.com',
            path: sinaUrl.replace('http://picupload.service.weibo.com', ''),
            method: 'POST',
            headers:{
                Cookie:cookie
            }
        };

        let bb = base64_encode(p);
        console.log('bb', bb.length);
        // form.append('b64_data', bb , opt);
        form.append('pic1', fs.readFileSync(p), {name:'ooxx'});
        form.append('pic1', bb, {name:'ooxx'});

        var req = http.request(options, function(res) {
            console.log("statusCode: ", res.statusCode);
            //console.log("headers: ", res.headers);
            res.setEncoding('utf8');
            res.on('data', function(d) {
                console.log(d)
            });
        });

        req.write(form + '');
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });
    }
}

// exports.httpUpload = httpUpload;
exports.upload = upload;