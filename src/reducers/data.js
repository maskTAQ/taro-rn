import update from 'immutability-helper';
import { store } from '../constants';
const INITIAL_DATA = {
    homeActiveTab: '新疆棉'
};
const INITIAL = {
    loading: false,
    status: 'init',
    data: undefined
};
store.data.forEach(key => {
    INITIAL_DATA[key] = INITIAL;
});
export default function data(state = INITIAL_DATA, action) {
    const { type, key, payload } = action;
    switch (type) {
        case 'data':
            return update(state, {
                [key]: {
                    $set: payload
                }
            });
        case 'setHomeActiveTab':
            return update(state, {
                homeActiveTab: {
                    $set: payload
                }
            });
        default:
            return state;
    }

}
