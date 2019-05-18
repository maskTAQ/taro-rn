

import React from './node_modules/react';
import { Component } from '../../platform';


import { ListWrapper, LogisticsFixedTool } from '../../components';
import { View } from '../../ui'
import { getLogisticsList } from '../../api';
import Item from './item';
import './main.scss';
import { navigate } from '../../actions';

export default class Logistics extends Component {
    state={
        status:'init',
        data:null
    }
    componentWillMount() {
        this.getData();
    }
    getData = () => {
        this.setState({
            status: 'loading'
        });
        getLogisticsList()
            .then(res => {
                this.setState({
                    status: 'success',
                    data: res
                });
            })
            .catch(e => {
                this.setState({
                    status: 'error'
                });
            })
    }
    handleToolClick = label => {
        if (label === '发布') {
            navigate({
                routeName: "publish-logistics"
            });
        }
    }
    render() {
        const { status, data } = this.state;
        return (
            <View className="container">
                <ListWrapper status={status} data={data}>
                    {
                        status === 'success' && (
                            <View>
                                {
                                    data.list.map(item => {
                                        return (
                                            <Item
                                                key={item.id}
                                                data={item}
                                                map={data.key}
                                            />
                                        )
                                    })
                                }
                            </View>
                        )
                    }
                </ListWrapper>
                <LogisticsFixedTool onClick={this.handleToolClick} showPublish={true} />
            </View>
        )
    }
}

