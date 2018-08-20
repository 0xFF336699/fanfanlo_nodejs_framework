var IIClassBase = module.exports = Team;
function Team(params)
{
    /**
     * params:{name:"goods_goods",title:"商品"}
     */
    for(var name in params)
    {
        this[name] = params[name];
    }
    this.powers = {};
    this.members = {};
    this.conf = params;
}
Team.prototype.addMember = function(member)
{
    this.members[member.config.name] = member;
}
Team.prototype.joinTeam = function(team)
{
    var tms = team.members;
    for(var name in tms)
    {
        if(!this.members[name])
        {
            this.addMember(tms[name]);
        }
        else{
            console.error('Team合并时出现同名接口', this.name, team.name, name);
        }
    }
}
Team.prototype.getClientConfInfo = function()
{
    var conf = this.conf;
    var members = getMembersInfo(this);
    return {conf:conf, members:members};
}
function getMembersInfo(team)
{
    var map = {};
    var members = team.members;
    for(var i in members)
    {
        var member = members[i];
        map[member.name] = member.getClientConfInfo();
    }
    return map;
}