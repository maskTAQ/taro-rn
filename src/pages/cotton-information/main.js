

import React from 'react';
import { Component, connect } from '../../platform';

import { View,TSTab } from '../../ui';
import { ListWrapper } from '../../components';
import { getCottonArticleTypeList, getCottonArticleList } from '../../api';
import { asyncActionWrapper } from '../../actions';
import Item from './item';
import './main.scss';


const imgSrc = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=834866073,4089509342&fm=111&gp=0.jpg';
const item = {
    imgSrc,
    title: '全国棉花价格指数（CC Index）及分省到厂价(1.8)',
    time: '2019-0201',
    readme: '2313',
};

@connect(({ layout }) => ({ layout }))
export default class CottonInformation extends Component {
    componentWillMount() {
        this.getCottonArticleTypeList();
        this.getCottonArticleList();
    }
    state = {
        activeTab: '全部',
        status: 'init',
        data: null
    };
    getCottonArticleTypeList() {
        const { status, loading } = this.props.layout.cotton_type;
        if (status !== 'success' && !loading) {
            asyncActionWrapper({
                call: getCottonArticleTypeList,
                type: 'layout',
                key: `cotton_type`
            });
        }
    }
    getCottonArticleList() {
        this.setState({
            status: 'loading',
            data: null
        });
        const { activeTab } = this.state;
        getCottonArticleList({ '分类': activeTab === '全部' ? '' : activeTab })
            .then(res => {
                this.setState({
                    status: 'success',
                    data: res
                });
            })
            .catch(e => {
                this.setState({
                    status: 'error',
                    msg: e
                });
            })
    }
    handleTabChange(activeTab) {
        this.setState({
            activeTab
        }, this.getCottonArticleList);
    }
    getTabList() {
        const { status, data } = this.props.layout.cotton_type;
        if (status === 'success') {
            const { key, list } = data;
            return ['全部'].concat(list.map(item => item[key['分类']]));
        } else {
            return ['全部'];
        }
    }
    render() {
        const { activeTab, status, data } = this.state;
        return (
            <View className='container'>
                <TSTab list={this.getTabList()} active={activeTab} onTabChange={this.handleTabChange} />
                <ListWrapper status={status} data={data}>
                    {
                        status === 'success' && data.list.map((item, index) => {
                            return <Item data={item} map={data.key} key={index} />
                        })
                    }
                </ListWrapper>
            </View>
        )
    }
}

