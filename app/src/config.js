const orderStatusMap = ['', '生成工单', '派单', '到达现场', '故障修复', '完成归档','取消','接单中'];
const noShowOrderState = ['生成工单','接单中'];
let i = 0;
const orderFidlds = {
    //key:[label,weight,isShowWhenNone=true]
    fault_id: ['工单编号', i++],
    fault_state: ['工单状态', i++],
    fault_time: ['报修时间', i++],
    arrival_time: ['到达时间', i++, false],
    id: ['序号', i++],
    yhbh: ['用户编号', i++],
    fault_address: ['报修地址', i++],
    fault_description: ['报修内容', i++],
    fault_source: ['工单来源', i++],
    yhmc: ['用户姓名', i++],
    lxfs: ['联系电话', i++],
    sstq: ['所属台区', i++],
    dfyl: ['电费余额', i++],
    jizcdy: ['计量点电压', i++],
};
const serviceStatusMap = {
    'unconnected': {
        color: 'red',
        desc: '服务离线请检查网络'
    },
    'connected': {
        color: 'green',
        desc: '服务在线,请放心使用!'
    },
    'connecting': {
        color: '#ccc',
        desc: '服务连接中...'
    }
};
const carStatusMap = ['停止','运行'];
export {
    orderStatusMap,
    orderFidlds,
    serviceStatusMap,
    noShowOrderState,
    carStatusMap
}