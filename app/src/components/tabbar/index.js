import React, { Component } from "react";
import {
    View,
    Text
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import styles from "./style";
import { Button } from "components";

@connect()
export default class Tabbar extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        jumpTo: PropTypes.func,
        activeTintColor: PropTypes.string,
        inactiveTintColor: PropTypes.string,
        renderIcon: PropTypes.func,
        getLabelText: PropTypes.func,
        dispatch: PropTypes.func,
        home: PropTypes.object
    };
    state = {
        isModalVisible: false
    };
    requestModalClose = () => {
        this.setState({
            isModalVisible: false
        });
    };
    renderItem = (route, index) => {
        const {
            navigation,
            jumpTo,
            activeTintColor,
            inactiveTintColor,
            renderIcon,
            getLabelText
        } = this.props;
        const focused = index === navigation.state.index;
        const color = focused ? activeTintColor : inactiveTintColor;
        const TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };

        return (
            <Button
                key={route.key}
                style={styles.tabItem}
                onPress={() => {
                    const { key } = route;
                    if (key === 'CompleteOrder') {
                        this.props.dispatch(NavigationActions.navigate({
                            routeName: 'WordOrder', 
                            params: {
                                initialPage: 3
                            }
                        }));
                    }else{
                        jumpTo(key);
                    } 
                }}
            >
                {renderIcon(TabScene)}
                <Text style={{ ...styles.tabItemText, color }}>
                    {getLabelText(TabScene)}
                </Text>
            </Button>
        );
    };
    render() {
        const { navigation } = this.props;
        const { routes = [] } = navigation.state;
        return (
            <View style={styles.container}>
                {routes.map((route, index) => this.renderItem(route, index))}
            </View>
        );
    }
}
