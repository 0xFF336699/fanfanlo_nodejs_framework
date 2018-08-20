var _ = require("lodash");
var array_util = require('./../../utils/array_util');

class Group
{
// {onComplete:{func:this.onComplete, that:this}, onError:this.onError, name:'BotAnswer.run', vo:this}
    constructor(config)
    {
        this.config = config;
        this.members = [];
    }

    addMember(member, params, params_args, alias, that) {
        this.members.push({member:member, params:params, params_args:params_args, alias:alias, that:that});
    }

    addMembers(items) {
        for(var i = 0; i < items.length; i ++)
        {
            var item = items[i];
            if(_.isFunction(item))
            {
                this.addMember(item);
            }
            else if(_.isArray(item))
            {
                this.addMember.apply(this, item);
            }
            else if(_.isObject(item)){
                this.members.push(item);
            }
            else {
                throw new Error("还没设置启用的类型");
            }
        }
    }

    run (jump_to) {
        throw new Error("接口方法没实现");
    }

    getMemberArgs(item) {
        var args;
        if(_.isFunction(item.params))
        {
            if(item.params_args)
            {
                args = item.params.apply(null, item.params_args);
            }
            else{
                args = item.params();
            }
        }
        else if(_.isArray(item.params))
        {
            args = item.params;
        }
        else{
            args = [];
        }
        return args;
    }
    gotoComplete() {
        // this.config.onComplete();
        let complete = this.config.onComplete;
        if(_.isFunction(complete)){
            complete();
        }else if(_.isObject(complete) && 'func' in complete){
            complete['func'].apply(complete.that);
        }
    }
}

module.exports = Group;