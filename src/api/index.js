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
export function getOfferLayout(params) {
    return get('CloudQuoteUI', params);
}
export {
    login
}