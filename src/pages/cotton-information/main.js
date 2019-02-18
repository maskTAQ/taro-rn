

import { Component } from '@tarojs/taro';
import { View, ScrollView, TTabs, TTabPane, Text } from '../../components'
import Item from './item';

import './main.scss';


const imgSrc = 'https://www.baidu.com/img/bd_logo1.png';
const item = {
    imgSrc,
    title: '中国棉花价格指数（CC Index）及分省到厂价(1.8)',
    time: '2019-0201',
    readme: '2313',
};


export default class CottonInformation extends Component {


    state = {
        list: [item, item, item, item, item],
        current: 0,
    };
    
    handleClick(current) {
        this.setState({
            current
        });
    }
    render() {
        const { list, current } = this.state;
        const tabList = ["全部", "分类一", '分类二', '分类三', '分类四', '分类五'];
        return (
            <View className='container'>
                <TTabs scroll={false} current={current} tabList={tabList} onClick={this.handleClick}>
                    {
                        tabList.map((item, index) => {
                            return (
                                <TTabPane tabLabel={item} current={current} index={index}>
                                    <ScrollView>
                                        {list.map((item, index) => {
                                            return <Item item={item} index={index} />
                                        })}
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

