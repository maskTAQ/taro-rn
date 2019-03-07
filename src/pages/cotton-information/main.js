

import React from 'react';
import { Component } from '../../platform';

import { View, ScrollView, TTabs, TTabPane } from '../../ui';
import Item from './item';
import './main.scss';


const imgSrc = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=834866073,4089509342&fm=111&gp=0.jpg';
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
                <TTabs scroll={true} current={current} tabList={tabList} onClick={this.handleClick}>
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

