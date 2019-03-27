import update from 'immutability-helper';
import { store } from '../constants';
const INITIAL_DATA = {};
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
    if (type === 'data') {
        return update(state, {
            [key]: {
                $set: payload
            }
        });
    } else {
        return state;
    }
}
