const productTypes = ['新疆棉', '进口棉￥', '进口棉$', '地产棉', '拍储'];
const demand_custom = productTypes.map(item => `demand_custom_${item}`);
const offer = productTypes.map(item => `offer_${item}`);
const fiter = productTypes.map(item => `filter_${item}`);

const offerList = productTypes.map(item => `offer_list_${item}`);
const demandList = productTypes.map(item => `demand_list_${item}`);
const store = {
    layout: demand_custom.concat(offer, fiter),
    data: offerList.concat(demandList, ['my_demand_list', 'user','shoppingCarList','my_offer_list','my_cloud_offer_list',`demand_list_全部`,'auth']),
};
const authStatusMap = ['未认证','等待审核','已认证','认证被拒绝'];
export {
    store,
    productTypes,
    authStatusMap
}