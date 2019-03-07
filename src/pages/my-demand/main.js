

import React from 'react';
import { Component } from '../../platform';

import { View, ScrollView, TTabs, TTabPane , TButton ,Image} from '../../ui';
import {MainItem} from '../../components';

import './main.scss';
import refreshImg from './img/refresh.png';
import editImg from './img/edit.png';


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
        const { list, current } = this.state;
        const tabList = ["我的需求", "我的报价"];
        return (
            <View className='container'>
                <TTabs scroll={false} current={current} tabList={tabList} onClick={this.handleClick}>
                    {
                        tabList.map((item, index) => {
                            return (
                                <TTabPane tabLabel={item} current={current} index={index}>
                                    <ScrollView>
                                        {list.map(() => {
                                            return (
                                                <MainItem border={false}>
                                                    <View className="tool-btn-group">
                                                        <TButton>
                                                            <View className="btn">
                                                                <Text className="btn-text">删除</Text>
                                                            </View>
                                                        </TButton>
                                                        <View className="btn-group-right">
                                                            <TButton>
                                                                <View className="btn mr">
                                                                        <Image className="btn-icon" src={refreshImg}/>
                                                                    <Text className="btn-text">刷新</Text>
                                                                </View>
                                                            </TButton>
                                                            <TButton>
                                                                <View className="btn">
                                                                <Image className="btn-icon" src={editImg}/>
                                                                    <Text className="btn-text">编辑</Text>
                                                                </View>
                                                            </TButton>
                                                        </View>
                                                    </View>
                                                </MainItem>
                                            )
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

