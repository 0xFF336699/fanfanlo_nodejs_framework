
class EventDispatcher {
    constructor(){

        require('./implementEventDispatcher')(this);
        // this.listenMap = {};
        // this.listenDomainMap = new Map();
        // this.onceListeners = {};
    }
    get [Symbol.toStringTag]() {
        return "EventDispatcher";
    }
    // addEventListenerOnce(type, cb, index) {
    //     this.addOnceListener(type, cb, index);
    // }
    // addOnceListener(type, cb, index, domain){
    //     let listeners = this.onceListeners[type];
    //     if(!listeners) this.onceListeners[type] = listeners = new Map();
    //     if(listeners.has(cb) == false) {
    //         let fn = this.onceListenerCb(type, cb, domain);
    //         listeners.set(cb, fn);
    //         domain ? this.addDomainEventListener(domain, type, fn, index) : this.addEventListener(type, fn, index);
    //     }
    // }
    // onceListenerCb(type, cb, domain){
    //     return function(event){
    //         cb(event);
    //         let listeners = this.onceListeners[type];
    //         if(domain)
    //             this.removeDomainEventListener(domain, type, listeners.get(cb));
    //         else
    //             this.removeEventListener(type, listeners.get(cb));
    //     }.bind(this);
    // }
    // addEventListener(type, cb, index = -1){
    //     let listeners = this.listenMap[type];
    //     if(!listeners) this.listenMap[type] = listeners = [];
    //     let _index = listeners.indexOf(cb);
    //     if(_index > -1)
    //         listeners.splice(_index, 1);
    //     if(index == -1)
    //         index = listeners.length;
    //     index = Math.max(0, Math.min(index, listeners.length));
    //     listeners.splice(index, 0, cb);
    // }
    // removeEventListener(type, cb){
    //     let listeners = this.listenMap[type];
    //     if(!listeners) return false;
    //     let index = listeners.indexOf(cb);
    //     if(index == -1) {
    //         return false;
    //     } else {
    //         listeners.splice(index, 1);
    //         return true;
    //     }
    // }
    // addDomainEventListener(domain, type, cb, index){
    //     let _domain = this.listenDomainMap.get(domain);
    //     if(!_domain){
    //         _domain = {};
    //         this.listenDomainMap.set(domain, _domain);
    //     }
    //     let listeners = _domain[type];
    //     if(!listeners) listeners = _domain[type] = [];
    //     if(listeners.indexOf(cb) == -1) listeners.push(cb);
    //     return this.addEventListener(type, cb, index);
    // }
    // addDomainOnceListener(domain, type, cb, index){
    //     this.addOnceListener(type, cb, index, domain);
    // }
    // removeDomainEventListener(domain, type, cb){
    //     let domainMap = this.listenDomainMap.get(domain);
    //     if(!domainMap) return false;
    //     let listeners = domainMap[type];
    //     if(!listeners) return false;
    //     let index = listeners.indexOf(cb);
    //     if(index == -1) return false;
    //     listeners.splice(index, 1);
    //     return this.removeEventListener(type, cb);
    // }
    // removeDomain(domain){
    //     let domainMap = this.listenDomainMap.get(domain);
    //     if(!domainMap) return false;
    //     for(let type in domainMap){
    //         domainMap[type].forEach(function(cb) {
    //             this.removeEventListener(type, cb);
    //         }, this);
    //     }
    //     this.listenDomainMap.delete(domain);
    //     return true;
    // }
    // dispatchEvent(event){
    //     let listeners = this.listenMap[event.type];
    //     if(!listeners) return false;
    //     event._target = this;
    //     for(let i = 0, len = listeners.length; i < len; i ++){
    //         if(event.canceled) return false;
    //         listeners[i](event);
    //     }
    //     return true;
    // }
    // willTrigger(type){
    //     return this.listenMap[type] !== undefined && this.listenMap[type].length > 0;
    // }
}
//
// Object.defineProperties(EventDispatcher.prototype, {
//     'listenMap':{
//         emumerable:false,
//         value:{}
//     },
//     'listenDomainMap':{
//         emumerable:false,
//         value: new Map()
//     },
//     'onceListeners':{
//         emumerable:false,
//         value:{}
//     }
// });

// require('./implementEventDispatcher')(EventDispatcher.prototype);
module.exports = EventDispatcher;
