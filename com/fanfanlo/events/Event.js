const util = require('util');
const _ = require('lodash');
class Event {
    static get complete(){
        return 'complete';
    }
    static get loaded(){
        return 'loaded';
    }
    constructor(type, data, cancelable = false){
        this.type = type;
        this.data = data;
        this.cancelable = cancelable;
        this.canceled = false;
        this[this._target] = null;

    }
    get target(){
        return this[this._target];
    }
    toString(){
        let res = {};
        _.each(Object.keys(this), (key) => { console.log('key key key', key);if(key == 'data'){console.log('key is ', key, this[key])};res[key] = this[key]});
        return res;
    }

}
Object.defineProperties(Event.prototype, {
    _target: {configure:false, value:Symbol('Event.target'), writable:false}
});

module.exports = Event;
