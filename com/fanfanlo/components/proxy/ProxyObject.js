const EventDispatcher = require('./../../events/EventDispatcher');
const PropertyChangeEvent = require('./../../events/PropertyChangeEvent');
const _ = require('lodash');
const handler = {
    get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver){
        let oldValue = Reflect.get(target, key, receiver);
        if(oldValue === value){
            return true;
        } else if(Reflect.set(target, key, value, receiver)){
            let event = new PropertyChangeEvent(key + "$changed", oldValue, value, PropertyChangeEvent.UPDATE);
            receiver.dispatchEvent(event);
            event = new PropertyChangeEvent(PropertyChangeEvent.CHANGE, oldValue, value, PropertyChangeEvent.UPDATE);
            receiver.dispatchEvent(event);
            return true;
        }else {
            throw new Error('proxy object is frozen');
        }
    }
}
class BaseProxy extends EventDispatcher{
    constructor(target){
        super();
        if(_.isObject(target)){
            _.each(target, (value, key) =>{
                this[key] = value;
            });
        }
        return new Proxy(this, handler)
    }
}
module.exports = BaseProxy;