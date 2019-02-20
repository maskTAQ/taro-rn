import { combineReducers } from 'redux'
import counter from './counter'
import AppNavigator from "src/Router";

const defaultNav = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams("CottonDetail")
);

const isNeedRedirectToLogin = [];
export default combineReducers({
    counter,
    nav: (state = defaultNav, action) => {
        const { type, routeName, params = {} } = action;

        if (!type.includes("Navigation")) {
            return state;
        }
        let nextState;

        if (isNeedRedirectToLogin(routeName)) {
            nextState = AppNavigator.router.getStateForAction(
                AppNavigator.router.getActionForPathAndParams(
                    "Login",
                    //将重定向的页面的action放入参数有登录之后dispatch
                    NavigationActions.navigate({
                        routeName,
                        params: Object.assign({ isRedirect: true }, params)
                    })
                ),
                state
            );
        } else {
            nextState = AppNavigator.router.getStateForAction(action, state) || {};
            const routes = nextState.routes || [];
            //如果是登录转向的重定向的页面将路由栈中的登录页移除 实现在重定向页面返回时返回到登录之前的页面
            //并且排除tab相互跳转的情况 路由栈小于俩个页面的情况
            if (
                params.isRedirect &&
                routes.length > 2 &&
                routes[routes.length - 2].routeName === "Login"
            ) {
                routes.splice(1, 1);
                nextState.index -= 1;
            }
        }
        const routes = nextState.routes || [];
        //如果是重定向的页面 将次页面从路由栈移除
        if (params.redirect && routes.length >= 2) {
            routes.splice(routes.length - 2, 1);
            nextState.index -= 1;
        }
        return nextState || state;
    },
})
