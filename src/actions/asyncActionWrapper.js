import store from '../store';
export default function asyncActionWrapper({ call, type, key, params = {} }) {
    store.dispatch({
        type,
        key,
        payload: {
            status: 'loading',
            loading: true,
        }
    });
    call(params)
        .then(data => {
            store.dispatch({
                type,
                key,
                payload: {
                    status: 'success',
                    loading: false,
                    data
                }
            });
        })
        .catch(msg => {
            console.log(msg,'msg')
            store.dispatch({
                type,
                key,
                payload: {
                    status: 'success',
                    loading: false,
                    msg
                }
            });
        })
}