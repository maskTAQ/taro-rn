import { get } from './base';

const login = (params) => {
    return get('Login', params);
}
export function getHome() {
    return get('HomeData');
}
export function getDemandCustomLayout(params) {
    return get('CloudArticleUI', params);
}
export {
    login
}