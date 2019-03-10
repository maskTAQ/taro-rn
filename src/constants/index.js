const productTypes = ['新疆棉', '进口棉￥', '进口棉$', '地产棉', '拍储'];
const demand_custom = productTypes.map(item => `demand_custom_${item}`);
const offer = productTypes.map(item => `offer_${item}`);
const store = {
    layout: demand_custom.concat(offer),
};
export {
    store,
    productTypes
}