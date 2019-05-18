

import React from './node_modules/react';
import { Component, connect } from '../../platform';

import { View, TButton, Image } from '../../ui';
import { ListWrapper } from '../../components';
import { getLogisticsList, deleteLogistics } from '../../api';
import Item from '../logistics/item';
import refreshImg from '../my-demand/img/refresh.png';
import editImg from '../my-demand/img/edit.png';
import './main.scss';
import { navigate } from '../../actions';
import { Tip } from '../../utils';

@connect(({ data }) => ({ data }))
export default class MyLogistics extends Component {
    state = {
        status: 'init',
        data: null
    }
    componentWillMount() {
        this.getData();
    }
    getData = () => {
        this.setState({
            status: 'loading'
        });
        const { id } = this.props.data.user.data;
        getLogisticsList({ '用户ID': id })
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
    publish() {
        navigate({
            routeName: 'publish-logistics'
        });
    }
    render() {
        const { status, data } = this.state;

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
                                            <TButton onClick={this.publish}>
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

