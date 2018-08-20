var _ = require("lodash");
var array_util = require('./../../../../utils/ArrayUtil');

function Group(config)
{
    this.config = config;
    this.index = 0;
    this.members = [];
}


Group.prototype.addMember = function(member, params, params_args, alias)
{
    this.members.push({member:member, params:params, params_args:params_args, alias:alias});
}

Group.prototype.addMembers = function(items)
{
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
        else{
            this.members.push(item);
        }
    }
}

Group.prototype.run = function()
{
    this.runStep(this);
}



Group.prototype.gotoIndex = function(index)
{
    if(_.isNumber(index))
    {
        if(index <= this.members.length)
        {
            this.index = index;
            this.runStep();
        }
        else{
            console.error('QueueGroup error goto greater then members length ', index, this.members.length, this.name);
        }
    }
    else{
        console.error('QueueGroup error goto_index not a number ', index, this.members.length, this.name);
    }
}
Group.prototype.gotoAlias = function(alias)
{
    var index = array_util.getItemIndexByProps(this.members, {alias:alias});
    if(index > -1)
    {
        this.index = index;
        this.runStep();
    }
    else{
        console.error('QueueGroup error goto_alias ', alias, this.name);
    }
}
Group.prototype.gotoComplete = function()
{
    this.config.gotoComplete();
}
Group.prototype.runStep = function()
{
    if(this.index >= this.members.length)
    {
        this.config.onComplete();
    }
    else{
        var num = this.index;
        this.index ++;
        var item = this.members[num];
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
        var conf = this.config;
        args.unshift(this.runStep.bind(this), conf.onError, conf.vo, this.gotoIndex.bind(this), this.gotoAlias.bind(this), this.gotoComplete.bind(this));
        item.member.apply(null, args);
    }
}

Group.prototype.runFunction = function(that, item)
{
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
    var conf = that.config;
    args.unshift(that.runStep.bind(that), conf.onError, conf.vo, that.gotoIndex.bind(that), that.gotoAlias.bind(that), that.gotoComplete.bind(that));
    item.member.apply(null, args);
}
module.exports = Group;