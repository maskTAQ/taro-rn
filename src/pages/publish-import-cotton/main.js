

import { Component } from '@tarojs/taro';
import { View, ScrollView, TTabs, TTabPane } from '../../components'


import Content from './content';
import './main.scss';

export default class publishImportCotton extends Component {
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
        const tabList = ["人民币", "美元"];
        //tpicker 在小程序端 在tabpanel下 且只能存在一个picker
        //所以需要将tabpanel里面的组件拿出
        //rn端不需要拿出
        return (
            <View className='container'>

                <TTabs scroll={false} current={current} tabList={tabList} onClick={this.handleClick}>
                    {
                        tabList.map((item, index) => {
                            return (
                                <TTabPane tabLabel={item} current={current} index={index}>
                                    <ScrollView>
                                        <Content current={current} />
                                    </ScrollView>
                                </TTabPane>
                            )
                        })
                    }
                </TTabs>


            </View>
        )
    }
}

