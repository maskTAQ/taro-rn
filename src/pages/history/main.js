

import React from 'react';
import { Component } from '../../platform';


import { ListWrapper } from '../../components';
import { View, TButton, Text, Image } from '../../ui'
import { getHistory } from '../../api';
import HistoryItem from './item';
import checkedImg from '../../img/checked.png';
import uncheckedImg from '../../img/unchecked.png';
import './main.scss';
import { Storage, Tip } from '../../utils';

export default class History extends Component {
    state = {
        isAllChecked: false,
        modalVisible: false,
        checkedOfferList: []
    };
    componentWillMount() {
        this.getData();
    }
    getData = () => {
        this.setState({
            status: 'loading'
        });
        Storage.get('history')
            .then(res => {
                const data = JSON.parse(res || '[]');
                getHistory({ '主键': data })
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
            })
            .catch(e => {
                this.setState({
                    status: 'success',
                    data: {
                        list: [],
                        key: {}
                    }
                })
            })
    }
    toggleCheckedStatus = () => {
        const { status, data, isAllChecked } = this.state;
        if (isAllChecked) {
            this.setState({
                isAllChecked: false,
                checkedOfferList: []
            });
        } else {
            if (status === 'success') {
                this.setState({
                    isAllChecked: true,
                    checkedOfferList: data.list.map(item => item[data.key['主键']])
                });
            } else {
                this.setState({
                    isAllChecked: true,
                    checkedOfferList: []
                });
            }

        }

    }
    handleCheckedChange = (d) => {
        this.setState({
            checkedOfferList: d
        });
    }
    remove = () => {
        const { checkedOfferList } = this.state;
        Storage.get('history')
            .then(res => {
                const data = JSON.parse(res || '[]');
                const result = [];
                data.forEach(item => {
                    if (!checkedOfferList.includes(item)) {
                        result.push(item);
                    }
                })
                Storage.setJson('history', result)
                    .then(this.getData)
                    .catch(e => {
                        Tip.fail('删除失败！')
                    })

            })
            .catch(e => {
                Tip.fail('删除失败！')
            })
    }

    render() {
        const { isAllChecked, status, data } = this.state;
        return (
            <View className="container">
                <ListWrapper status={status} data={data}>
                    {
                        status === 'success' && (

                            <View>
                                {
                                    data.list.map(item => {
                                        return (
                                            <HistoryItem
                                                key={item.id}
                                                data={item}
                                                checkedOfferList={checkedOfferList}
                                                onCheckedChange={this.handleCheckedChange}
                                                map={data.key}
                                            />
                                        )
                                    })
                                }
                            </View>

                        )
                    }
                </ListWrapper>

                {
                    status === 'success' && (
                        <View className="bottom">
                            <View className="checked-box">
                                <TButton onClick={this.toggleCheckedStatus}>
                                    <Image className="checked-icon" src={isAllChecked ? checkedImg : uncheckedImg} />
                                </TButton>
                                <Text className="checked-text">全选</Text>
                            </View>
                            <View className="bottom-right">
                                <TButton onClick={this.remove}>
                                    <View className="button delete-button">
                                        <Text className="button-text">移除</Text>
                                    </View>
                                </TButton>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}

