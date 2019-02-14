import React, { PureComponent } from "react";
import { View, StatusBar, Vibration } from "react-native";

import { Icon, Input, Button, Text } from "components";

import { iconSource, Tip, Storage, rules } from "commons";
import { navigate } from "actions";
import { login } from "actions";


const styles ={};

export default class Login extends PureComponent {
    state = {
        username: "",
        password: ""
    };
    UNSAFE_componentWillMount() {
        Storage.getJson("config").then(res => {
            if (!(res && res.isRemberLoginStatus === false)) {
                Storage.getJson("userInfo").then(res => {
                    if (res) {
                        this.setState({
                            ...res
                        });
                    }
                });
            }
        });
    }
    
    toRegister() {
        navigate({
            routeName: 'Register'
        })
    }
    render() {
        const { username, password } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={"transparent"}
                    translucent={true}
                    barStyle="light-content"
                />
                <View style={styles.logoBox}>
                    <Text style={styles.title}>运维管理</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputItem}>
                        <Icon
                            source={iconSource.username}
                            style={styles.usernameIcon}
                        />
                        <Input
                            style={styles.input}
                            value={username}
                            placeholder="请输入用户名"
                            placeholderTextColor="#ccc"
                            onChangeText={username => {
                                this.setState({
                                    username
                                });
                            }}

                        />
                    </View>
                    <View style={styles.inputItem}>
                        <Icon
                            source={iconSource.password}
                            style={styles.passwordIcon}
                        />
                        <Input
                            style={styles.input}
                            value={password}
                            placeholder="密码"
                            placeholderTextColor="#ccc"
                            onChangeText={password => {
                                this.setState({ password });
                            }}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.nav}>
                        <Button onPress={this.toRegister}>没有账号?点我注册</Button>
                    </View>
                    <Button
                        style={styles.submit}
                        textStyle={styles.submitText}
                        onPress={() => {
                            // ws.call();
                            if (!rules.isPassword(password)) {
                                Tip.fail("密码只能是数字与字母组合!");
                            } else if (!username) {
                                Tip.fail("请输入用户名!");
                            } else {
                                login({ username, password });
                            }
                            //this.onReceiveOrder();
                        }}
                    >
                        登录
                    </Button>

                </View>
            </View>
        );
    }
}
