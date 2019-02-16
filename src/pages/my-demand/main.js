

import { Component } from '@tarojs/taro';
import { View, ScrollView, TTabs, TTabPane, Text } from '../../components'
import Item from './item';

import './main.scss';



const item = {
    id: '562781322',

    ysj: '21+',
    cd: '12',
    ql: 21.2,
    mz: 1,
    cz: '0.0',
    hc: '0.0',
    hz: '0.0',
    jg: '<15003',

    shd: '盐城',
    mj: '盐城捷多纺织品有限公司',
    zwjhsj: '2019-01-01',
    cgjs: '200d吨',

    sl: '12',
    ztj: '1231',
    dcj: '1331',

    xqbh: '12132987130'
};


export default class MyDemand extends Component {


    state = {
        list: [item, item, item, item, item],
        itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hz', 'jg'],
        offerItemKeyList: ['sl', 'ztj', 'dcj'],
        itemDescList: ['mj', 'cgjs', 'shd', 'zwjhsj'],
        offerItemDescList: ['xqbh', 'mj'],
        current: 0,
    };
    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    handleClick(current) {
        this.setState({
            current
        });
    }
    render() {
        const { list, itemDescList, itemKeyList, current } = this.state;
        const tabList = ["我的需求", "我的报价"];
        return (
            <View className='container'>
                <TTabs scroll={false} current={current} tabList={tabList} onClick={this.handleClick}>
                    {
                        tabList.map((item, index) => {
                            return (
                                <TTabPane tabLabel={item} current={current} index={index}>
                                    <ScrollView>
                                        {list.map((item, index) => {
                                            return <Item item={item} index={index} itemDescList={itemDescList} itemKeyList={itemKeyList} />
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

