import React from "react";
import PropTypes from "prop-types";
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import { YellowBox, Platform, StatusBar } from "react-native";

import { Icon, TabBar } from "components";
import {Login,Home,OfferHint,
    MyDemand,Share,publishImportCotton,
    NoticeDetails,Canvas,CottonDetail,Demand,
    OfferTool,User} from "pages";
import { iconSource } from 'commons';

Platform.OS == 'android' && StatusBar.setTranslucent(true)
Platform.OS == 'android' && StatusBar.setBackgroundColor('#2D78E7')
YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader",
    "Class RCTCxxModule",
    "Remote",
    "thumbTintColor"
]);
/* eslint-disable */
const TabBarIcon = type => ({ focused }) => {
    switch (true) {
        case type === "Home" && !focused:
            return <Icon size={24} source={iconSource.home} />;
        case type === "Home" && focused:
            return <Icon size={24} source={iconSource.homeActive} />;
        case type === "Repair" && !focused:
            return <Icon size={22} source={iconSource.clock} />;
        case type === "Repair" && focused:
            return <Icon size={22} source={iconSource.clockActive} />;
        case type === "Car" && !focused:
            return <Icon size={22} source={iconSource.car} />;
        case type === "Car" && focused:
            return <Icon size={22} source={iconSource.carActive} />;
        case type === "Complete" && !focused:
            return <Icon size={20} source={iconSource.order} />;
        case type === "Complete" && focused:
            return <Icon size={20} source={iconSource.orderActive} />;
        case type === "Location" && !focused:
            return <Icon size={20} source={iconSource.location} />;
        case type === "Location" && focused:
            return <Icon size={20} source={iconSource.locationActive} />;

    }
};
TabBarIcon.propTypes = {
    focused: PropTypes.boolean
};

const tabPageConfig = [
    // ["Home", Home, "首页", TabBarIcon("Home")],
    // ["Repair", Repair, "处理工单", TabBarIcon("Repair")],
    // ["CarLocation", CarRealtimeLocation, "实时位置", TabBarIcon("Car")],
    // ["CompleteOrder", CompleteOrder, "完成工单", TabBarIcon("Complete")],
    // ["Point", Point, "地图", TabBarIcon("Location")],
];

const createTabNavigatorParams = () => {
    const result = {};
    tabPageConfig.forEach(
        ([componentName, component, tabBarLabel, tabBarIcon]) => {
            result[componentName] = {
                screen: component,
                navigationOptions: {
                    tabBarLabel,
                    tabBarIcon
                }
            };
        }
    );
    return result;
};
// 创建TAB导航
// const TabNavigator = createBottomTabNavigator(createTabNavigatorParams(), {
//     initialRouteName: "Home",
//     tabBarOptions: {
//         activeTintColor: "#19a696",
//         inactiveTintColor: "#999",
//         style: {
//             backgroundColor: "#fff",
//             height: 50
//         },
//         labelStyle: {
//             fontSize: 12,
//             margin: 0,
//             padding: 0
//         }
//     },
//     tabBarComponent: TabBar
// });

const AppRouteConfigs = {
    OfferHint,
    Home,
    Login,
    MyDemand,
    Share,
    publishImportCotton,
    NoticeDetails,
    Canvas,
    CottonDetail,
    Demand,
    OfferTool,
    User
};
// 创建一级导航
const StackNavigator = createStackNavigator(AppRouteConfigs, {
    initialRouteName: "TabNavigator",
    mode: "modal",
    headerMode: "none"
});
export default StackNavigator;
export { AppRouteConfigs };
