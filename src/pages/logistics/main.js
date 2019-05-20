

import React from './node_modules/react';
import { Component, connect } from '../../platform';


import { ListWrapper, LogisticsFixedTool } from '../../components';
import { View } from '../../ui'
import { getLogisticsList } from '../../api';
import Item from './item';
import './main.scss';
import { navigate, asyncActionWrapper } from '../../actions';

@connect(({ data }) => ({ data }))
export default class Logistics extends Component {
    componentWillMount() {
        this.getData();
    }
    getData = () => {
        asyncActionWrapper({
            call: getLogisticsList,
            type: 'data',
            key: `logistics_list`
        });
    }
    handleToolClick = label => {
        if (label === '发布') {
            navigate({
                routeName: "publish-logistics"
            });
        }
    }
    render() {
        const { status, data } = this.props.data.logistics_list;
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

