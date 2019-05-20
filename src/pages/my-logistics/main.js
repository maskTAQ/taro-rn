

import React from './node_modules/react';
import { Component, connect } from '../../platform';

import { View, TButton, Image } from '../../ui';
import { ListWrapper } from '../../components';
import { getLogisticsList, deleteLogistics } from '../../api';
import Item from '../logistics/item';
import refreshImg from '../my-demand/img/refresh.png';
import editImg from '../my-demand/img/edit.png';
import './main.scss';
import { navigate, asyncActionWrapper } from '../../actions';
import { Tip } from '../../utils';

@connect(({ data }) => ({ data }))
export default class MyLogistics extends Component {
    componentWillMount() {
        this.getData();
    }
    getData = () => {
        const { id } = this.props.data.user.data;
        asyncActionWrapper({
            call: getLogisticsList,
            params: { '用户ID': id },
            type: 'data',
            key: `my_logistics_list`
        });
    }
    delete(id) {
        const { id: userId } = this.props.data.user.data;
        deleteLogistics({
            '用户ID': userId,
            '物流列表的主键数组': [id]
        }).then(res => {
            Tip.success('删除成功');
            this.getData();
        })
    }
    edit(d) {
        const { data } = this.props.data.my_logistics_list;

        const reverseKey = {};
        for (const key in data.key) {
            reverseKey[data.key[key]] = key;
        }
        const parseData = {};
        for (const key in d) {
            parseData[reverseKey[key]] = d[key];
        }
        navigate({
            routeName: 'edit-logistics',
            params: parseData
        });
    }
    render() {
        const { status, data } = this.props.data.my_logistics_list;

        return (
            <View className='container'>
                <ListWrapper data={data} status={status}>
                    {
                        status === 'success' && data.list.map((item) => {
                            return (
                                <Item
                                    key={item.id}
                                    data={item}
                                    map={data.key}
                                >
                                    <View className="tool-btn-group">
                                        <TButton onClick={this.delete.bind(this, item[data.key['主键']])}>
                                            <View className="btn">
                                                <Text className="btn-text">删除</Text>
                                            </View>
                                        </TButton>
                                        <View className="btn-group-right">
                                            <TButton onClick={this.getData}>
                                                <View className="btn mr">
                                                    <Image className="btn-icon" src={refreshImg} />
                                                    <Text className="btn-text">刷新</Text>
                                                </View>
                                            </TButton>
                                            <TButton onClick={() => this.edit(item)}>
                                                <View className="btn">
                                                    <Image className="btn-icon" src={editImg} />
                                                    <Text className="btn-text">编辑</Text>
                                                </View>
                                            </TButton>
                                        </View>
                                    </View>
                                </Item>
                            )
                        })
                    }
                </ListWrapper>
            </View>
        )
    }
}

