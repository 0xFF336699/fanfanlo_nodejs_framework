
var xml_head = "<xml>";
var xml_end = "</xml>";
var to_user_head = "<ToUserName><![CDATA[";
var to_user_end  = "]]></ToUserName>";
var from_user_head = "<FromUserName><![CDATA[";
var from_user_end = "]]></FromUserName>";
var create_time_head = "<CreateTime>";
var create_time_end = "</CreateTime>";
var msg_type_head = "<MsgType><![CDATA[";
var msg_type_end = "]]></MsgType>";
var content_head = "<Content><![CDATA[";
var content_end = "]]></Content>";
var msg_id_head = "<MsgId>";
var msg_id_end = "</MsgId>";
var msg_id_end = "</MsgId>";
var img_head = "<Image><MediaId><![CDATA[";
var img_end = "]]></MediaId></Image>";


var msg_type_text = msg_type_head + "text" + msg_type_end;
var msg_type_image = msg_type_head + "image" + msg_type_end;

var from_user_name;
exports.sendText = sendText;
function sendText(to_user_name, content, res, callback)
{
    var now = new Date().getTime();
    var msg = xml_head +
        to_user_head + to_user_name + to_user_end +
            from_user_name +
            create_time_head + now + create_time_end +
            msg_type_text +
            content_head + content + content_end +
            xml_end;
//     msg = `<xml>
// <ToUserName><![CDATA[${to_user_name}]]></ToUserName>
// <FromUserName><![CDATA[gh_6bc0971ef481]]></FromUserName>
// <CreateTime>${now}</CreateTime>
// <MsgType><![CDATA[text]]></MsgType>
// <Content><![CDATA[你好]]></Content>
// </xml>`;
    if(res)
    {
        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.send(msg);
        console.log('msg', msg);
    }
    if(callback)
    {
        callback(msg);
    }
    return msg;
}
exports.sendPicText = sendPicText;
function sendPicText(toUserName, content, res, callback){
    var now = new Date().getTime();
    let msg = `<xml>
<ToUserName><![CDATA[${toUserName}]]></ToUserName>
<FromUserName><![CDATA[${exports.platform_name}]]></FromUserName>
<CreateTime>${now}</CreateTime>
<MsgType><![CDATA[news]]></MsgType>
<ArticleCount>2</ArticleCount>
<Articles>
<item>
<Title><![CDATA[title1]]></Title> 
<Description><![CDATA[description1]]></Description>
<PicUrl><![CDATA[http://wx3.sinaimg.cn/mw690/006D2KSdly1fjs16242f2g30cs06snpe.gif]]></PicUrl>
<Url><![CDATA[http://www.shangwoa.com]]></Url>
</item>
<item>
<Title><![CDATA[title]]></Title>
<Description><![CDATA[description]]></Description>
<PicUrl><![CDATA[http://ww4.sinaimg.cn/large/a15b4afegy1fjpup8vq4wj20k00dcgo6]]></PicUrl>
<Url><![CDATA[http://www.shangwoa.com/ii]]></Url>
</item>
</Articles>
</xml>`;

    if(res)
    {
        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.end(msg);
        // console.log('msg', msg);
    }
    if(callback)
    {
        callback(msg);
    }
    return msg;
}
exports.sendUnknowAnswer = sendUnknowAnswer;
function sendUnknowAnswer(toUserName, res, callback){

    var now = new Date().getTime();
    let msg = `<xml>
<ToUserName><![CDATA[${toUserName}]]></ToUserName>
<FromUserName><![CDATA[${exports.platform_name}]]></FromUserName>
<CreateTime>${now}</CreateTime>
<MsgType><![CDATA[news]]></MsgType>
<ArticleCount>2</ArticleCount>
<Articles>
<item>
<Title><![CDATA[title1]]></Title> 
<Description><![CDATA[description1]]></Description>
<PicUrl><![CDATA[http://wx3.sinaimg.cn/mw690/006D2KSdly1fjs16242f2g30cs06snpe.gif]]></PicUrl>
<Url><![CDATA[http://www.shangwoa.com]]></Url>
</item>
<item>
<Title><![CDATA[title]]></Title>
<Description><![CDATA[description]]></Description>
<PicUrl><![CDATA[http://ww4.sinaimg.cn/large/a15b4afegy1fjpup8vq4wj20k00dcgo6]]></PicUrl>
<Url><![CDATA[http://www.shangwoa.com/ii]]></Url>
</item>
</Articles>
</xml>`;
    sendMsg(msg, res, callback);
}
function sendMsg(msg, res, callback) {
    if(res){
        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.end(msg);
    }
    if(callback)
    {
        callback(msg);
    }
}
function createFromUserName(name) {
    exports.platform_name = name;
    from_user_name = from_user_head + name + from_user_end;
}
exports.createFromUserName = createFromUserName;
exports.platform_name = "gh_25201c6a63f7";// shangwoa
// exports.platform_name = "gh_6bc0971ef481";// fanfanlo
createFromUserName(exports.platform_name);