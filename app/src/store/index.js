import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

import rootReducer from '../reducers'

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose

const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);
const middlewares = [
    thunkMiddleware,
    navigationMiddleware
]

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(require('redux-logger').createLogger())
// }



const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
)
const store = createStore(rootReducer, enhancer)

export default store
