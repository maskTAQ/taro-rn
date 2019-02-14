import store from "../store";
import { NavigationActions } from "react-navigation";


const back = () => {
    return store.dispatch(NavigationActions.back());
};

// 路由跳转
const navigate = (...p) => {
    return store.dispatch(NavigationActions.navigate(...p));
};

export default {
    back, navigate
}