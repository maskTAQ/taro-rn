import update from 'immutability-helper';
import { store } from '../constants';
const INITIAL_LAYOUT = {};
const INITIAL = {
    loading: false,
    status: 'init',
    data: []
};
store.layout.forEach(key => {
    INITIAL_LAYOUT[key] = INITIAL;
});
export default function counter(state = INITIAL_LAYOUT, action) {
    const { type, key, payload } = action;
    if (type === 'layout') {
        return update(state, {
            [key]: {
                $set: payload
            }
        });
    } else {
        return state;
    }
}
