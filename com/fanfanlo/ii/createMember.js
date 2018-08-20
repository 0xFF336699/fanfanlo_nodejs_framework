const Team = require('./IIClass');
const Member = require('./IIFunc');
exports.defMembers = {
    list:{exec:null},
    insert:{exec:null},
    content:{exec:null},
    update:{exec:null}
}
class Base{
    constructor(){
        this.tab = null;
    }
    get sql(){
        throw new Error('sub class override this getter');
    }
    get values(){
        throw new Error('sub class override this getter');
    }
    get values2(){
        throw new Error('sub class override this getter');
    }
    exec(params, callback){
        let sql = {text:sql, values:values, values2:values2};
    }
}
class List extends Base{
    constructor(columns){
        super();
        this.columns = columns;
    }
    get sql(){
        return `select ${this.columns} from $ `
    }

}
function create(teamConf, memberConf) {
    let team = new Team(teamConf);
    let member = new Member(memberConf);
}