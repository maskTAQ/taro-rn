import { post, get } from "./base";
import { Tip } from 'commons';

const login = (params, config) => {
    return post("/user/userLogin", params, config);
};
const register = (params, config) => {
    return post("/user/inUser", params, config);
};
const autoLogin = config => {
    return post("/Api/tokenLogin", null, config);
};
const logout = () => {
    return post("/Api/LogOut");
};

//获取站房集合
const getZFPoints = () => {
    return post('/hannan/sb/getZf');
}
//获取开关集合
const getKGPoints = () => {
    return post('/hannan/sb/getKg');
}
//获取杆塔集合
const getGTPoints = () => {
    console.log(',,getGTPoints')
    return post('/hannan/sb/getGt');
}
//获取录波集合
const getFaultRecorderPoints = () => {
    return post('/hannan/sb/getFaultrecorder');
}
//获取变压器集合
const getTransformerPoints = () => {
    return post('/hannan/sb/getHsbByq');
}
//获取变电站集合
const getBDZPoints = () => {
    return post('/hannan/sb/getHsbBdz');
}
//获取线路
const getPath = () => {
    return post('/hannan/sb/getHxl');
}
//获取工单
const getOrderList = params => {
    return post('/hannan/fault/getFaultByConditions', params, { loading: false });
}
//根据手机号获取指定工单 
const getOrderListByMobile = telephoneNumber => {
    return post('/hannan/dictionary/selectByFault', { telephoneNumber }, { loading: false });
}
//更改工单状态 
const updateWorkOrderStatus = params => {
    console.log(params, 'params')
    return post('hannan/fault/updateWorkOrderPage', params);
}
//获取设备类型
const getDeviceType = () => {
    return post('/hannan/sb/getHsblx')
}
//获取故障
const getTrouble = () => {
    return post('/hannan/sb/getWorkorderType')
}
//获取故障类型
const getTroubleType = () => {
    return post('/hannan/sb/getFaultTypeById')
}
//获取故障状态
const getTroubleStatus = () => {
    return post('/hannan/sb/getFaultStateById')
}
//获取故障来源
const getTroubleSource = () => {
    return post('/hannan/sb/getFaultSourceById')
}
//获取服务
const getService = () => {
    return get('/hannan/sb/getEvaluationTypeById', { ID: 1 })
}
//获取车辆位置
const getCarLocation = carId => {
    return get(`hannan/position/api/getCarTrajectoryByPUID/${carId}`, null, { loading: false });
}
//接单人
const jdr = () => {
    return post('/hannan/sb/getAccepterById', { ID: 1 })
}
//获取派单人
const pdr = () => {
    return get('/hannan/sb/getDistributerById', { iD: 0 })
}
const getPosByAddr = (addr = '湖北省武汉市汉南区纱帽街道绿苑路居委会绿苑路汉大271#公安局5-7-1') => {
    return get(`https://restapi.amap.com/v3/geocode/geo?parameters&key=ae74708e0a87716e35ca8096c0cda28d&address=${addr}`, null, { loading: false })
}
const checkUpdate = () => {
    Tip.loading();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Tip.dismiss();
            reject('当前版本已是最新版!');
        }, 1000);
    });
}
const success = () => Promise.resolve({});
export { host } from "./base";
export {
    login,
    logout,
    success,
    autoLogin,
    getZFPoints,
    getKGPoints,
    getGTPoints,
    getFaultRecorderPoints,
    getTransformerPoints,
    getBDZPoints,
    getPath,
    getOrderList,
    getOrderListByMobile,
    getDeviceType,
    getTrouble,
    getTroubleType,
    getTroubleStatus,
    getTroubleSource,
    getService,
    jdr,
    pdr,
    getPosByAddr,
    register,
    updateWorkOrderStatus,
    checkUpdate,
    getCarLocation
};
