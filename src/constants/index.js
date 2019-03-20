const productTypes = ['新疆棉', '进口棉￥', '进口棉$', '地产棉', '拍储'];
const demand_custom = productTypes.map(item => `demand_custom_${item}`);
const offer = productTypes.map(item => `offer_${item}`);
const fiter = productTypes.map(item => `filter_${item}`);

const offerList = productTypes.map(item => `offer_list_${item}`);
const demandList = productTypes.map(item => `demand_list_${item}`);
const store = {
    layout: demand_custom.concat(offer, fiter),
    data: offerList.concat(demandList, ['my_self_demand_list', 'user']),
};
export {
    store,
    productTypes
}