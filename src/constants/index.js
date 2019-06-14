const productTypes = ['新疆棉', '地产棉', '进口棉$', '进口棉￥', '拍储'];
const productTypesValue = {
    '全部': 0,
    '新疆棉': 1,
    '进口棉$': 2,
    '进口棉￥': 3,
    '地产棉': 4,
    '拍储': 5
};
const productTypesLabel = {
    0: '全部',
    1: '新疆棉',
    2: '进口棉$',
    3: '进口棉￥',
    4: '地产棉',
    5: '拍储'
};

const terms = {
    '新疆棉': ['出库费 由买家承担 ', '仓储期 货转日后免仓储期3天 (仓单当天)'],
    '进口棉$': ['信用证 四大国有银行开证', '索赔期 D/O日后60天', '其他 中纺条款 ICA仲裁'],
    '进口棉￥': ['出库费 由买家承担', '仓储期 货转日后免仓储期3天（仓单当日）'],
    '地产棉': ['出库费 由买家承担 ', '仓储期 货转日（含当日）费用卖方承担', '货转后所有费用买家承担 付款期限', '合同日后3工作日内付清全款'],
    '拍储': ['出库费 由买家承担 ', '仓储期 货转日（含当日）费用卖方承担', '付款期限。合同日后3工作日内付清全款']
};
const demand_custom = productTypes.map(item => `demand_custom_${item}`);
const offer = productTypes.map(item => `offer_${item}`);
const fiter = productTypes.map(item => `filter_${item}`);

const offerList = productTypes.map(item => `offer_list_${item}`);
const demandList = productTypes.map(item => `demand_list_${item}`);
const store = {
    layout: demand_custom.concat(offer, fiter, ['cotton_type']),
    data: offerList.concat(demandList, ['my_demand_list', 'user', 'shoppingCarList', 'my_offer_list', 'my_cloud_offer_list', `demand_list_全部`, 'auth', 'logistics_list', 'my_logistics_list', 'kfList']),
};
const authStatusMap = ['未认证', '等待审核', '已认证', '认证被拒绝'];
export {
    store,
    productTypes,
    authStatusMap,
    productTypesValue,
    productTypesLabel,
    terms
}