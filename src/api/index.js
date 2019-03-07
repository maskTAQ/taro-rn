import { get } from './base';

const login = (params) => {
    return get('entry/wxapp/Login', params);
}
export {
    login
}