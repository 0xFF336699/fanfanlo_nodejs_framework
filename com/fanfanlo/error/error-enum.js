var errs  = {};
errs._1001 = {id:1001, type:1, content:'数据库操作错误'};
errs._1002 = {id:1002, type:1, content:'非法操作'};
errs._1003 = {id:1003, type:1, content:'数据库没连接上'};
errs._1101 = {id:1101, type:1, content:'数据重复'};
errs._1102 = {id:1102, type:1, content:'不明真相的的错误'};

errs.e2001 = {id:2001, type:2, name:"不明的数据库问题", comm:"不明的数据库问题，包括错误和一些逻辑上没有完善的配置。需要在最终输出时捕捉这个错误进行记录"}

errs.e3001 = {id:3001, type:3, name:"数据不完整", comm:"前端提交的数据不完整，例如有的必须有的字段或者数组必须有一定长度"};

errs.e3002 = {id:3002, type:3, name:"接口不完整", comm:"接口正在等待或缺少配置文件，请稍后再试。"};
errs.e3003 = {id:3003, type:3, name:"服务器出现错误", comm:"数据校验没通过"};
errs.e3004 = {id:3004, type:3, name:"服务器无应答", comm:"服务器无应答"};// 没有发送接口team或team.name or team.member字段


errs._7001 = {id:7001, type:7, name:'getValidateTabColumns', comm:'操作数据表时权限配置错误，可能是非法、或未配置操作表'};

errs._7101 = {id:7101, type:7, name:'接口错误', comm:'没配置表的操作。例如没有配置order_order表'};
errs._7102 = {id:7102, type:7, name:'接口错误', comm:'没有配置该权限的操作。例如没有配置order_order["1"]权限'};
errs._7103 = {id:7103, type:7, name:'接口错误', comm:'没有配置该权限下的操作类型。例如没有配置order_order["1"]["ins"]的权限'};
errs._7104 = {id:7104, type:7, name:'接口错误', comm:'没有配置表的方法'};
// 例如update操作中没有where
errs._7105 = {id:7105, type:7, name:'生化武器操作', comm:'该操作已被国际公约禁止'};
errs._7106 = {id:7106, type:7, name:'服务器表示一脸懵逼', comm:'该判断条件无对应处理方案----可能是尝试调用数据'};

errs.e_7110 = {id:7110, type:7, name:'接口错误', comm:'没有找到接口'};
errs.e_7111 = {id:7111, type:7, name:'schema错误', comm:'没有找到schema'};
errs.e_7112 = {id:7112, type:7, name:'schema读取错误', comm:'没有读到schema'};


errs._8001 = {id:8001, type:8, name:'file not exits', comm:'读取的文件不存在'};
errs._8002 = {id:8002, type:8, name:'file ext not allow', comm:'不允许的文件类型'};
errs._8003 = {id:8003, type:8, name:'file cant move', comm:'无法移动文件'};


errs._9001 = {id:9001, type:9, name:"gateway get db connect has error on getDBClients", comm:"没有获取到数据库链接"};

errs._21001 = {id:21001, type:21, name:"注册时没有用户昵称", comm:"注册时没有用户昵称"};
errs._21002 = {id:21002, type:21, name:"注册时用户昵称已被使用", comm:"注册时用户昵称已被使用"};
errs._21002 = {id:21003, type:21, name:"注册时用户昵称错误", comm:"注册时用户昵称错误，例如屏蔽词等。"};

errs._210011 = {id:21011, type:21, name:"注册时没有手机号码", comm:"注册时没有手机号码"};
errs._210012 = {id:21012, type:21, name:"注册时手机号码已被使用", comm:"注册时手机号码已被使用"};
errs._210013 = {id:21013, type:21, name:"注册时手机号码不正确", comm:"注册时手机号码不正确"};
errs._210014 = {id:21014, type:21, name:"注册时手机验证码错误", comm:"注册时手机验证码错误"};
errs.e210015 = {id:21015, type:21, name:'账号有问题', comm:'账号有问题'}; // 其实就是不存在

errs._210021 = {id:21021, type:21, name:"注册时没有邮箱", comm:"注册时没有邮箱"};
errs._210022 = {id:21022, type:21, name:"注册时邮箱地址已被使用", comm:"注册时邮箱地址已被使用"};
errs._210022 = {id:21023, type:21, name:"注册时邮箱地址不正确", comm:"注册时邮箱地址不正确"};

errs._210031 = {id:21031, type:21, name:"注册时没有邀请码", comm:"注册时没有邀请码"};
errs._210032 = {id:21032, type:21, name:"注册时邀请码错误", comm:"注册时邀请码错误"};

errs.e210041 = {id:21041, type:21, name:"注册时用户唯一名称错误", comm:"注册时用户唯一名称错误"};
errs.e21042 = {id:21042, type:21, name:"登录时唯一账号格式错误", comm:"登录时唯一账号格式错误。格式错误是格式非法，如果用户名不存在或者密码错误则返回21043"};
errs.e21043 = {id:21043, type:21, name:"账号或密码错误", comm:"账号或密码错误"};


errs.e21051 = {id:21051, type:21, name:"注册时加密盐值过期", comm:"注册时加密盐值过期"};
errs.e21052 = {id:21052, type:21, name:"不能识别的用户密码", comm:"不能识别的用户密码"};


errs.e21061 = {id:21061, type:21, name:"请五分钟后再来", comm:"注册验证码申请过于频繁"};
errs.e21062 = {id:21062, type:21, name:"请一分钟后再来", comm:"请一分钟后再来"};
errs.e21063 = {id:21063, type:21, name:"发送验证码失败", comm:"短信服务商出现故障"};
errs.e21064 = {id:21064, type:21, name:"验证码错误", comm:"验证码错误、验证码过期、验证码已经被使用过"};


errs.e30001 = {id:30001, type:30, name:"无合法session", comm:"无合法session"};


errs.e40001 = {id:40001, type:40, name:"redis发生错误", comm:"redis发生错误"}

errs.e5001 = {id:5001, type:50, name:"权限不足", comm:"没有操作权限"};


errs.e6001 = {id:6001, type:60, name:"爬虫出巡出现错误", comm:"可能是对方主机有问题 或者解析返回数据时出错"};


errs.e7001 = {id:7001, type:70, name:"数据写入错误", comm:"数据库已经有相同数据了。"};


module.exports = errs;