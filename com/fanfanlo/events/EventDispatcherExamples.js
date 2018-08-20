const EventDispatcher = require('./EventDispatcher');
const Event = require('./Event');
module.exports = function test(){
    const LOGIN = 'login';
    const MSG = 'msg';
    function onMsg(event){
        console.log('onMsg', event.toString());
    }
    function onLogin(event){
        console.log('onLogin', event.toString());
    }
    // addEventListener();
    function addEventListener(){
        let dispacher = new EventDispatcher();
        dispacher.addEventListener(MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'addEventListener'}));
    }
    // removeEventListener();
    function removeEventListener(){
        let dispacher = new EventDispatcher();
        dispacher.addEventListener(MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'removeEventListener', times: 1}));
        dispacher.removeEventListener(MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'removeEventListener', times: 2}));
    }
    // addDomainEventListener();
    function addDomainEventListener(){
        let domain = {};
        let dispacher = new EventDispatcher();
        dispacher.addDomainEventListener(domain, MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'addDomainEventListener'}));
    }
    // removeDomainEventListener();
    function removeDomainEventListener(){
        let domain = {};
        let dispacher = new EventDispatcher();
        dispacher.addDomainEventListener(domain, MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'removeDomainEventListener', times: 1}));
        dispacher.removeDomainEventListener(domain, MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'removeDomainEventListener', times: 2}));
    }
    // removeDomain();
    function removeDomain(){
        let domain = {};
        let dispacher = new EventDispatcher();
        dispacher.addDomainEventListener(domain, MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'removeDomain', times: 1}));
        dispacher.addDomainEventListener(domain, LOGIN, onLogin);
        dispacher.dispatchEvent(new Event(LOGIN, {info: 'removeDomain', times: 1}));
        dispacher.removeDomain(domain);
        dispacher.dispatchEvent(new Event(MSG, {info: 'removeDomain', times: 2}));
        dispacher.dispatchEvent(new Event(LOGIN, {info: 'removeDomain', times: 2}));
    }
    // willTrigger();
    function willTrigger(){
        let dispacher = new EventDispatcher();
        dispacher.addEventListener(MSG, onMsg);
        console.log('willTrigger %s', MSG, dispacher.willTrigger(MSG));
        console.log('willTrigger %s', LOGIN, dispacher.willTrigger(LOGIN));
    }
    // addOnceListener();
    function addOnceListener(){
        let dispacher = new EventDispatcher();
        dispacher.addOnceListener(MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'addOnceListener', times: 1}));
        dispacher.dispatchEvent(new Event(MSG, {info: 'addOnceListener', times: 2}));
    }
    // addDomainOnceListener();
    function addDomainOnceListener(){
        let domain = {};
        let dispacher = new EventDispatcher();
        dispacher.addDomainOnceListener(domain, MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'addDomainOnceListener', times: 1}));
        dispacher.dispatchEvent(new Event(MSG, {info: 'addDomainOnceListener', times: 2}));
    }
    cancelCb();
    function cancelCb(){
        let dispacher = new EventDispatcher();
        dispacher.addEventListener(MSG, function(event){
            event.canceled = true;
            console.log('canceled');
        });
        dispacher.addEventListener(MSG, onMsg);
        dispacher.dispatchEvent(new Event(MSG, {info: 'cancelCb'}));
    }
}