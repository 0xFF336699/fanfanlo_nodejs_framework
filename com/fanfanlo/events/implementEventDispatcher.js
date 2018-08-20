'use strict'
const Event = require('./Event');
function implementEventDispatcher(target){
    
    let listenMap = {};
    let listenDomainMap = new Map();
    let onceListeners = {};

    function addEventListenerOnce(type, cb, index) {
        this.addOnceListener(type, cb, index);
    }

    Object.defineProperty(target, 'addEventListenerOnce',{
        emumerable:false,
        value :addEventListenerOnce
    });

    function addOnceListener(type, cb, index, domain){
        let listeners = onceListeners[type];
        if(!listeners) onceListeners[type] = listeners = new Map();
        if(listeners.has(cb) == false) {
            let fn = this.onceListenerCb(type, cb, domain);
            listeners.set(cb, fn);
            domain ? this.addDomainEventListener(domain, type, fn, index) : this.addEventListener(type, fn, index);
        }
    }


    Object.defineProperty(target, 'addOnceListener',{
        emumerable:false,
        value :addOnceListener
    });

    function onceListenerCb(type, cb, domain){
        return function(event){
            cb(event);
            let listeners = onceListeners[type];
            if(domain) 
                this.removeDomainEventListener(domain, type, listeners.get(cb));
            else 
                this.removeEventListener(type, listeners.get(cb));
        }.bind(this);
    }

    Object.defineProperty(target, 'onceListenerCb',{
        emumerable:false,
        value :onceListenerCb
    });


    function addEventListener(type, cb, index = -1){
        let listeners = listenMap[type];
        if(!listeners) listenMap[type] = listeners = [];
        let _index = listeners.indexOf(cb);
        if(_index > -1)
            listeners.splice(_index, 1);
        if(index == -1)
            index = listeners.length;
        index = Math.max(0, Math.min(index, listeners.length));
        listeners.splice(index, 0, cb);
    }

    Object.defineProperty(target, 'addEventListener',{
        emumerable:false,
        value :addEventListener
    });

    function removeEventListener(type, cb){
        let listeners = listenMap[type];
        if(!listeners) return false;
        let index = listeners.indexOf(cb);
        if(index == -1) {
            return false;
        } else {
            listeners.splice(index, 1);
            return true;
        }
    }

    Object.defineProperty(target, 'removeEventListener',{
        emumerable:false,
        value :removeEventListener
    });

    function addDomainEventListener(domain, type, cb, index){
        let _domain = listenDomainMap.get(domain);
        if(!_domain){
            _domain = {};
            listenDomainMap.set(domain, _domain);
        }
        let listeners = _domain[type];
        if(!listeners) listeners = _domain[type] = [];
        if(listeners.indexOf(cb) == -1) listeners.push(cb);
        return this.addEventListener(type, cb, index);
    }

    Object.defineProperty(target, 'addDomainEventListener',{
        emumerable:false,
        value :addDomainEventListener
    });

    function addDomainOnceListener(domain, type, cb, index){
        this.addOnceListener(type, cb, index, domain);
    }

    Object.defineProperty(target, 'addDomainOnceListener',{
        emumerable:false,
        value :addDomainOnceListener
    });

    function removeDomainEventListener(domain, type, cb){
        let domainMap = listenDomainMap.get(domain);
        if(!domainMap) return false;
        let listeners = domainMap[type];
        if(!listeners) return false;
        let index = listeners.indexOf(cb);
        if(index == -1) return false;
        listeners.splice(index, 1);
        return this.removeEventListener(type, cb);
    }

    Object.defineProperty(target, 'removeDomainEventListener',{
        emumerable:false,
        value :removeDomainEventListener
    });

    // target.removeDomain = removeDomain;
    function removeDomain(domain){
        let domainMap = listenDomainMap.get(domain);
        if(!domainMap) return false;
        for(let type in domainMap){
            domainMap[type].forEach(function(cb) {
                this.removeEventListener(type, cb);
            }, this);
        }
        listenDomainMap.delete(domain);
        return true;
    }

    Object.defineProperty(target, 'removeDomain',{
        emumerable:false,
        value :removeDomain
    });

    function dispatchEvent(event){
        let listeners = listenMap[event.type];
        if(!listeners) return false;
        event[event._target] = this;
        // event._target = this;
        for(let i = 0, len = listeners.length; i < len; i ++){
            if(event.canceled) return false;
            listeners[i](event);
        }
        return true;
    }

    Object.defineProperty(target, 'dispatchEvent',{
        emumerable:false,
        value :dispatchEvent
    });

    function willTrigger(type){
        return listenMap[type] !== undefined && listenMap[type].length > 0;
    }

    Object.defineProperty(target, 'willTrigger',{
        emumerable:false,
        value :willTrigger
    });
}

module.exports = implementEventDispatcher;
    