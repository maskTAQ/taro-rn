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
    return get('CloudQuoteList',params);
}
//提交
export function doSubmit(url, params) {
    return get(url, params);
}
export {
    login
}