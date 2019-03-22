import { get } from './base';

const login = (params) => {
    return get('Login', params);
}
export function getHome() {
    return get('HomeData');
}
//定制需求页面
export function getDemandCustomLayout(params) {
    return get('CloudArticleUI', params);
}
//报价页面
export function getOfferLayout(params) {
    return get('CloudQuoteUI', params);
}
//云筛选页面
export function getFilterLayout(params) {
    return get('CloudQuoteFiltrateUI', params);
}
//报价列表
export function getOfferList(params) {
    return get('CloudQuoteList', params);
}
//提交
export function doSubmit(url, params) {
    return get(url, params);
}
//获取需求列表
export function getDemandList(params) {
    return get('CloudArticleList', params);
}
//获取自己发布的需求
export function getMySelfDemandList(params) {
    return get('CloudArticleMyList', params);
}
//获取指标
export function getSpotIndicators(params) {
    return get('QCList', params);
}
//获取仓单证书
export function getCertificate(params) {
    return get('QC2List', params);
}
//获取openid
export function getOpenId(params) {
    return get('openid', params);
}
//加入购物车
export function addShoppingCar(params) {
    return get('CartAdd', params);
}
//获取购物车列表
export function getShoppingCarList(params) {
    return get('CartList', params);
}
//从购物车移除
export function removeFromCart(params) {
    return get('CartDelete', params);
}
//我的报价列表
export function getMyOfferList(params) {
    return get('CloudArticleMyPriceList', params);
}
//获取我的云报价
export function getMyCloudOfferList(params) {
    return get('CloudQuoteMyList', params);
}
//报价
export function offer(params) {
    return get('CloudArticlePrice', params);
}

//获取需求的报价
export function getOfferByDemand(params) {
    return get('CloudArticleUIPriceList', params);
}
//删除我发布的需求
export function deleteMyDemand(params) {
    return get('CloudArticleDelete', params);
}
//删除我发布的报价
export function deleteMyOffer(params) {
    return get('CloudArticleMyPriceListDelete', params);
}
//删除我发布的云报价
export function deleteMyCloudOffer(params) {
    return get('CloudQuoteDelete', params);
}
export {
    login
}