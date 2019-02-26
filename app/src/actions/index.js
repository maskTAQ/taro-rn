//import store from "../store";
import { NavigationActions } from "react-navigation";


const back = () => {
    return store.dispatch(NavigationActions.back());
};

// 路由跳转
const navigate = (...p) => {
    console.log(p,'p')
   // return store.dispatch(NavigationActions.navigate(...p));
};
const call=()=>{
    console.log('call')
}
export {
    back, navigate,call,
}