const object_util = require('./../../utils/object_util');
const def_user_agent = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'};
class BaseConf{
    constructor()
    {
        // 名称
        this.name = undefined;
        //  子页面的前缀
        this.page_host = undefined;
        // 列表页的前缀 http://www.shangwoa.com/article/
        this.page_list_prefix = undefined;
        // 列表页的后缀 .html
        this.page_list_suffix = undefined;
        // 使用数组而不是key value的方式 是因为v8动态添加属性时需要重新检测隐藏类，
        // 如果数组固定类型vector方式的话则可以省去这个检测。
        this.headers = [def_user_agent];
        // 是否有权限调用该爬虫
        this.check_visitor_power = true;
        this.runner = undefined;
        this.listAnalyze = undefined;
        this.pageAnalyze = undefined;
        // 跟headers相似 都是设置superagent参数的
        // 数组形式为三维，第一维所有要调用的方法
        // 第二维 调用的方法名和方法所需的key,value
        // [
        // ["query", ['range', '1.5']],
        // ["set", ["charset", "gbk"]]
        // ]
        this.request_funcs = undefined;
        // 一次翻几页。有的list小，这里可以一次多翻几页。
        this.page_step = 1;
        // 请求是get或者post，少数例如stone的公众号是post获取数据的。
        this.req_type = "get";
        this.page_start_offset = 0;
        this.spider_id = 0;
        this.auto_spider = false;
    }

    /**
     *
     * @param conf
     */
    setConf(conf)
    {
        object_util.simpleCopy(this, conf);
        return this;
    }

    getListUrl(current_page_index)
    {
        var per = ((current_page_index + this.page_start_offset)* this.page_step);
        // console.log('per', per, current_page_index, this.page_step);
        return this.page_list_prefix + per + this.page_list_suffix;
    }
    getPageUrl(path)
    {
        return (path.indexOf("http") == 0 ? "" : this.page_host) + path;
    }
}
module.exports = BaseConf;

// var conf = {
//     name:"草榴新时代",
//     page_host:"http://c6.r0y.org/",
//     page_list_prefix:"http://c6.r0y.org/thread0806.php?fid=8&search=180&page=",
//     page_list_suffix:"",
//     request_funcs:[
//         ['charset', ['gb2312']]
//     ]
// }
//
// var bc = new BaseConf();
// bc.setConf(conf);
// console.log('bc', bc);