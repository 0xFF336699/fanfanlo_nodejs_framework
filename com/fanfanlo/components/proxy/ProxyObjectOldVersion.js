'use strict';
const PropertyChangeEvent = require('./../../events/PropertyChangeEvent');
const implementEventDispatcher = require('./../../events/implementEventDispatcher');

function createProxyObject(target){
    const handler = {
        get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver);
        }
    }
    target = target || {};
    implementEventDispatcher(target);
    let proxy = new Proxy((target), handler);
    // implementEventDispatcher(proxy);

    handler.set = function(target, key, value, receiver){
        let oldValue = Reflect.get(target, key, receiver);
        if(oldValue === value){
            return value;
        } else if(Reflect.set(target, key, value, receiver))
        {
            let event = new PropertyChangeEvent(key + "$changed", oldValue, value, PropertyChangeEvent.UPDATE);
            receiver.dispatchEvent(event);
            event = new PropertyChangeEvent(PropertyChangeEvent.CHANGE, oldValue, value, PropertyChangeEvent.UPDATE);
            receiver.dispatchEvent(event);
            return value;
        }else {
            throw new Error('proxy object is frozen');
        }
    }

    return proxy;
}

module.exports = {create:createProxyObject};
