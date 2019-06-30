//映射关系
const map = {
  main: {
    dj: '等级',
    ysj: '颜色级',
    cd: '长度',
    ql: '强力',
    mz: '马值',
    cz: '长整',
    hc: '回潮',
    hz: '含杂',
    jg: '价格',

    jc: '基差',
    'y/d': '元/吨',
    gz: '公重',

    shd: '收货地',
    mj: '买家',
    zwjhsj: '最晚交货时间',
    cgjs: '采购结束',

    sl: '数量',
    ztj: '自提价',
    dcj: '到场价',

    gys: '供应商',

    xqbh: '需求编号',
    zg: '公重',
    zhc: '轧花厂',
    ph: '批号',
    ck: '仓库',
  }
};
const config = {
  dev: true,
  host: '',
  version: '0.0.1',
  map,
  platform: 'h5'
};
const offerKeyMap = {
  "主键": "c_ybj1",
  "报价号": "c_ybj2",
  "加工单位": "c_ybj3",
  "加工批号": "c_ybj4",
  "组批批次": "c_ybj5",
  "合计包数": "c_ybj6",
  "扎工质量P1": "c_ybj7",
  "扎工质量P2": "c_ybj8",
  "扎工质量P3": "c_ybj9",
  "供应商": "c_ybj10",
  "报价类型": "c_ybj11",
  "基差类型": "c_ybj12",
  "基差值": "c_ybj13",
  "报价": "c_ybj14",
  "公司": "c_ybj15",
  "公司类型": "c_ybj16",
  "联系人": "c_ybj17",
  "手机号": "c_ybj18",
  "棉花云报价类型": "c_ybj19",
  "发布日期": "c_ybj20",
  "用户ID": "c_ybj21",
  "仓单": "c_ybj22",
  "产地": "c_ybj23",
  "年份": "c_ybj24",
  "类型": "c_ybj25",
  "颜色级": "c_ybj26",
  "品级": "c_ybj27",
  "长度": "c_ybj28",
  "强力": "c_ybj29",
  "马克隆值": "c_ybj30",
  "回潮": "c_ybj31",
  "平均含杂": "c_ybj32",
  "整齐度": "c_ybj33",
  "叶屑": "c_ybj34",
  "加b": "c_ybj35",
  "Rd": "c_ybj36",
  "重量": "c_ybj37",
  "重量备注": "c_ybj38",
  "重量类型": "c_ybj39",
  "交货仓库或方式": "c_ybj40",
  "远期交货": "c_ybj41",
  "远期交货每天仓库费": "c_ybj42",
  "远期交货定金比": "c_ybj43",
  "目的港": "c_ybj44",
  "自提": "c_ybj45",
  "船期": "c_ybj46",
  "提单号": "c_ybj47",
  "配额比": "c_ybj48",
  "状态": "c_ybj49",
  "基差值升贴水": "c_ybj50",
  "交货地": "c_ybj51",
  "现货报价": "c_ybj52",
  "仓单报价": "c_ybj53",
  "批号": "c_ybj4",
  "包数": "c_ybj6",
  "仓库": "c_ybj40"
};
const oneKeyMap = {
  "id": "c_zj1",
  "仓库": "c_zj2",
  "执行标准": "c_zj3",
  "加工批号": "c_zj4",
  "包数": "c_zj5",
  "产地": "c_zj6",
  "产品名称": "c_zj7",
  "加工单位": "c_zj8",
  "合计毛重": "c_zj9",
  "合计皮重": "c_zj10",
  "合计净重": "c_zj11",
  "平均回潮": "c_zj12",
  "平均含杂": "c_zj13",
  "合计公重": "c_zj14",
  "轧工质量P1": "c_zj15",
  "轧工质量P2": "c_zj16",
  "轧工质量P3": "c_zj17",
  "长度最大值": "c_zj18",
  "长度最小值": "c_zj19",
  "长度级": "c_zj20",
  "平均值": "c_zj21",
  "25毫米": "c_zj22",
  "26毫米": "c_zj23",
  "27毫米": "c_zj24",
  "28毫米": "c_zj25",
  "29毫米": "c_zj26",
  "30毫米": "c_zj27",
  "31毫米": "c_zj28",
  "32毫米": "c_zj29",
  "主体颜色级": "c_zj30",
  "白棉1级": "c_zj31",
  "白棉2级": "c_zj32",
  "白棉3级": "c_zj33",
  "白棉4级": "c_zj34",
  "白棉5级": "c_zj35",
  "白棉6级": "c_zj36",
  "白棉7级": "c_zj37",
  "淡点污棉1级": "c_zj38",
  "淡点污棉2级": "c_zj39",
  "淡点污棉3级": "c_zj40",
  "淡黄染棉1级": "c_zj41",
  "淡黄染棉2级": "c_zj42",
  "淡黄染棉3级": "c_zj43",
  "黄染棉1级": "c_zj44",
  "黄染棉2级": "c_zj45",
  "马克隆最大值": "c_zj46",
  "马克隆最小值": "c_zj47",
  "主体马克隆值级": "c_zj48",
  "马克隆平均值": "c_zj49",
  "马克隆值A级": "c_zj50",
  "马克隆值B级": "c_zj51",
  "马克隆值C级": "c_zj52",
  "马克隆A档平均值": "c_zj53",
  "马克隆B1档平均值": "c_zj54",
  "马克隆B2档平均值": "c_zj55",
  "马克隆C1档平均值": "c_zj56",
  "马克隆C2档平均值": "c_zj57",
  "马克隆A档平均值比率": "c_zj58",
  "马克隆B1档平均值比率": "c_zj59",
  "马克隆B2档平均值比率": "c_zj60",
  "马克隆C1档平均值比率": "c_zj61",
  "马克隆C2档平均值比率": "c_zj62",
  "断裂比强度最大值": "c_zj63",
  "断裂比强度最小值": "c_zj64",
  "断裂比强度平均值": "c_zj65",
  "断裂比强度很差档平均值": "c_zj66",
  "断裂比强度差档平均值": "c_zj67",
  "断裂比强度中等档平均值": "c_zj68",
  "断裂比强度强档平均值": "c_zj69",
  "断裂比强度很强档平均值": "c_zj70",
  "断裂比强度很差档比率": "c_zj71",
  "断裂比强度差档比率": "c_zj72",
  "断裂比强度中等档比率": "c_zj73",
  "断裂比强度强档比率": "c_zj74",
  "断裂比强度很强档比率": "c_zj75",
  "长度整齐度最大值": "c_zj76",
  "长度整齐度最小值": "c_zj77",
  "长度整齐度平均值": "c_zj78",
  "长度整齐度很低档平均值": "c_zj79",
  "长度整齐度低档平均值": "c_zj80",
  "长度整齐度中等档平均值": "c_zj81",
  "长度整齐度高档平均值": "c_zj82",
  "长度整齐度很高档平均值": "c_zj83",
  "Rd最大值": "c_zj84",
  "Rd最小值": "c_zj85",
  "Rd平均值": "c_zj86",
  "加b最大值": "c_zj87",
  "加b最小值": "c_zj88",
  "加b平均值": "c_zj89",
  "备注": "c_zj90",
  "检查单位": "c_zj91",
  "发布日期": "c_zj92",
  "重量结果证书编号": "c_zj93",
  "质量结果证书编号": "c_zj94",
  "加工单位代码": "c_zj95",
  "货权人": "c_zj96",
  "用户ID": "c_zj97",
  "升贴水": "c_zj98",
  "轧工": "c_zj99",
  "mhph": "c_zj100",
  "批号": "c_zj4",
  "客服": null
};
const twoKeyMap = {
  "id": "c_2zj1",
  "仓库": "c_2zj2",
  "执行标准": "c_2zj3",
  "加工批号": "c_2zj4",
  "包数": "c_2zj5",
  "产地": "c_2zj6",
  "产品名称": "c_2zj7",
  "加工单位": "c_2zj8",
  "合计毛重": "c_2zj9",
  "合计皮重": "c_2zj10",
  "合计净重": "c_2zj11",
  "平均回潮": "c_2zj12",
  "平均含杂": "c_2zj13",
  "合计公重": "c_2zj14",
  "轧工质量P1": "c_2zj15",
  "轧工质量P2": "c_2zj16",
  "轧工质量P3": "c_2zj17",
  "长度最大值": "c_2zj18",
  "长度最小值": "c_2zj19",
  "长度级": "c_2zj20",
  "平均值": "c_2zj21",
  "25毫米": "c_2zj22",
  "26毫米": "c_2zj23",
  "27毫米": "c_2zj24",
  "28毫米": "c_2zj25",
  "29毫米": "c_2zj26",
  "30毫米": "c_2zj27",
  "31毫米": "c_2zj28",
  "32毫米": "c_2zj29",
  "主体颜色级": "c_2zj30",
  "白棉1级": "c_2zj31",
  "白棉2级": "c_2zj32",
  "白棉3级": "c_2zj33",
  "白棉4级": "c_2zj34",
  "白棉5级": "c_2zj35",
  "白棉6级": "c_2zj36",
  "白棉7级": "c_2zj37",
  "淡点污棉1级": "c_2zj38",
  "淡点污棉2级": "c_2zj39",
  "淡点污棉3级": "c_2zj40",
  "淡黄染棉1级": "c_2zj41",
  "淡黄染棉2级": "c_2zj42",
  "淡黄染棉3级": "c_2zj43",
  "黄染棉1级": "c_2zj44",
  "黄染棉2级": "c_2zj45",
  "马克隆最大值": "c_2zj46",
  "马克隆最小值": "c_2zj47",
  "主体马克隆值级": "c_2zj48",
  "马克隆平均值": "c_2zj49",
  "马克隆值A级": "c_2zj50",
  "马克隆值B级": "c_2zj51",
  "马克隆值C级": "c_2zj52",
  "马克隆A档平均值": "c_2zj53",
  "马克隆B1档平均值": "c_2zj54",
  "马克隆B2档平均值": "c_2zj55",
  "马克隆C1档平均值": "c_2zj56",
  "马克隆C2档平均值": "c_2zj57",
  "马克隆A档平均值比率": "c_2zj58",
  "马克隆B1档平均值比率": "c_2zj59",
  "马克隆B2档平均值比率": "c_2zj60",
  "马克隆C1档平均值比率": "c_2zj61",
  "马克隆C2档平均值比率": "c_2zj62",
  "断裂比强度最大值": "c_2zj63",
  "断裂比强度最小值": "c_2zj64",
  "断裂比强度平均值": "c_2zj65",
  "断裂比强度很差档平均值": "c_2zj66",
  "断裂比强度差档平均值": "c_2zj67",
  "断裂比强度中等档平均值": "c_2zj68",
  "断裂比强度强档平均值": "c_2zj69",
  "断裂比强度很强档平均值": "c_2zj70",
  "断裂比强度很差档比率": "c_2zj71",
  "断裂比强度差档比率": "c_2zj72",
  "断裂比强度中等档比率": "c_2zj73",
  "断裂比强度强档比率": "c_2zj74",
  "断裂比强度很强档比率": "c_2zj75",
  "长度整齐度最大值": "c_2zj76",
  "长度整齐度最小值": "c_2zj77",
  "长度整齐度平均值": "c_2zj78",
  "长度整齐度很低档平均值": "c_2zj79",
  "长度整齐度低档平均值": "c_2zj80",
  "长度整齐度中等档平均值": "c_2zj81",
  "长度整齐度高档平均值": "c_2zj82",
  "长度整齐度很高档平均值": "c_2zj83",
  "Rd最大值": "c_2zj84",
  "Rd最小值": "c_2zj85",
  "Rd平均值": "c_2zj86",
  "加b最大值": "c_2zj87",
  "加b最小值": "c_2zj88",
  "加b平均值": "c_2zj89",
  "备注": "c_2zj90",
  "检查单位": "c_2zj91",
  "发布日期": "c_2zj92",
  "重量结果证书编号": "c_2zj93",
  "质量结果证书编号": "c_2zj94",
  "加工单位代码": "c_2zj95",
  "货权人": "c_2zj96",
  "用户ID": "c_2zj97",
  "升贴水": "c_2zj98",
  "轧工": "c_2zj99",
  "mhph": "c_2zj100",
  "批号": "c_2zj4",
  "客服": null,
  "颜色级": "c_2zj30",
  "长度": "c_2zj20",
  "强力": "c_2zj65",
  "马克隆值": "c_2zj49",
  "含杂": "c_2zj13",
  "回潮": "c_2zj12",
  "整齐度": "c_2zj78"
}
const one = Object.assign({}, offerKeyMap, oneKeyMap);
const two = Object.assign({}, offerKeyMap, twoKeyMap);
export function getFullKeyMap(type) {
  return type === '现货指标' ? one : two;
}
export default config;
export { offerKeyMap };