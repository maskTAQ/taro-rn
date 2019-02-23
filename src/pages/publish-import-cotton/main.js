

import { Component } from '@tarojs/taro';
import { View, ScrollView, TTabs, TTabPane, TSTab } from '../../components'


import Content from './content';
import './main.scss';

export default class publishImportCotton extends Component {
    state = {
        activeTab: "人民币"
    };
    handleClick = current => {
        this.setState({
            current
        });
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        });
    }
    render() {
        const { current, activeTab } = this.state;
        const tabList = ["人民币", "美元"];
        //tpicker 在小程序端 在tabpanel下 且只能存在一个picker
        //所以需要将tabpanel里面的组件拿出
        //rn端不需要拿出
        return (
            <View className='container'>
                <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
                <ScrollView>
                    <Content current={tabList.indexOf(activeTab)} />
                </ScrollView>
            </View>
        )
    }
}

