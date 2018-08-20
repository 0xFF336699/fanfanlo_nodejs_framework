const Event = require('./Event');

class PropertyChangeEvent extends Event{
  constructor(type, oldValue, newValue, kind, cancelable = false){
    super(type, newValue, cancelable);
    this._oldValue = oldValue;
    this._newValue = newValue;
    this._kind = kind;
  }
  
  get oldValue(){
    return this._oldValue;
  }
  
  get newValue(){
    return this._newValue;
  }

  get kind(){
    return this._kind;
  }
}

/**
 * 一般情况下不推荐动态类的，并且v8的属性添加和减少需要重建隐藏类，所以一般不会有delete属性的情况，不过不排除特殊情况。
 * 先留着这个状态，以后再想想要不要用到。
 */
PropertyChangeEvent.DELETE = 'delete';

/**
 * 字段更新
 */
PropertyChangeEvent.UPDATE = 'update';

/**
 * 为集合准备的。proxy对象的属性变更后都统一派发这个事件，用于在集合中侦听成员变化，而不必每个字段都侦听。
 */
PropertyChangeEvent.CHANGE = 'change';

module.exports = PropertyChangeEvent;
