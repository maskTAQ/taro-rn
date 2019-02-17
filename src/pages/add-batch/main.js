

import { Component } from '@tarojs/taro';
import { View, TPicker, TTabs, TTabPane } from '../../components'


import Content from './content';
import './main.scss';

export default class AddBatch extends Component {
    state = {
        current: 0
    };
    handleClick = current => {
        this.setState({
            current
        });
    }
    render() {
        const { current } = this.state;
       // const tabList = ["人民币", "美元"];
        return (
            <View className='container'>

                <View tabLabel={item} current={current} index={index}>
                    <Content current={current} />
                </View>


            </View>
        )
    }
}

