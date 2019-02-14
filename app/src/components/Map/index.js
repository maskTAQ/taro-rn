import React, { PureComponent } from "react";
import { View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import styles from './style';
import { WebView, Text, Visible } from "components";
import { navigate } from "actions";


export default class Point extends PureComponent {
    static propTypes = {
        isGetPosPenging: PropTypes.bool
    };
    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.webview.sendMessage(JSON.stringify(data.geocodes[0].location));
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        if (!this.props.data && data) {
            this.webview.sendMessage(JSON.stringify(data.geocodes[0].location));
        }
    }
   
    render() {
        const { loading } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    onMessage={e => {
                        navigate({ routeName: 'PointDetail', params: JSON.parse(e) });
                    }}
                    ref={e => this.webview = e}
                    source={{ uri: 'file:///android_asset/map.html' }}
                    //source={{uri:'http://47.104.131.96/gdj/map.html'}}
                />
                <Visible show={loading}>
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#000" />
                        <Text style={styles.loadingText}>获取维修点位置中...</Text>
                    </View>
                </Visible>
            </View>
        );
    }
}
