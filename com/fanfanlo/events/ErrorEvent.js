const Event = require('./Event');
class ErrorEvent extends Event{
    static get error(){
        return 'error';
    }
    static get ioError(){
        return 'ioError';
    }
    static get netError(){
        return 'netError';
    }
    constructor(type, message, data, cancelable = false){
        super(type, data, cancelable);
        this.message = message;

    }
}

module.exports = ErrorEvent;