import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TButton, View, Text, TInput, Image } from '../../ui';
import {uploadImg} from '../../api';
import './card.scss'
import { Tip } from '../../utils';

export default class Card extends Component {
    static options = {
        addGlobalClass: true
    }
    formateData(d) {
        const data = [].concat(d);
        const result = [];

        while (data.length) {
            if (result.length === 0) {
                result.push([])
            }
            if (result[result.length - 1].length > 3) {
                result.push([data.shift()]);
            } else {
                result[result.length - 1].push(data.shift());
            }
        }
        return result;
    }
    handeChange(v) {
        const { k, value, onChange } = this.props;
        const valueWrapper = value || [];
        const i = valueWrapper.indexOf(v);
        let nextValue = valueWrapper;
        if (i > -1) {
            nextValue = update(nextValue, {
                $splice: [[i, 1]]
            });
        } else {
            nextValue = update(nextValue, {
                $push: [v]
            });
        }
        onChange({ key: k, value: nextValue });
    }
    uploadImg = () => {
        uploadImg()
        .then(res=>{
            Tip.success('上传成功');
            console.log(res,'res')
        })
    }
    render() {
        const { option = [], title, type, onRequestAddKf } = this.props;
        const hasInput = ['input', 'kf'].includes(type);
        const isImg = type === 'img';
        return (
            <View className="container">
                <View className="title">
                    <Text className="title-text">
                        {title}
                    </Text>
                </View>
                <View className={classnames({
                    'input-content': hasInput,
                    'img-content': type === 'img'
                })}>
                    {
                        option.map(item => {
                            const { label, placeholder = '请输入',key } = item;

                            return (
                                <View className={classnames("item", {
                                    'input-item': hasInput,
                                    'img-item': type === 'img'
                                })}>
                                    {isImg && (
                                        <TButton onClick={this.uploadImg}>
                                            <Image className="img" src={this.state[key]}/>
                                        </TButton>
                                    )}
                                    <View className={classnames({
                                        'input-label': hasInput,
                                        'img-label': type === 'img'
                                    })}>
                                        <Text className="item-label-text">
                                            {label}
                                        </Text>
                                    </View>
                                    <View className={classnames("item-content", {
                                        'input-box': hasInput
                                    })}>
                                        {
                                            hasInput && (
                                                <TInput className="input" placeholder={placeholder} />
                                            )
                                        }
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        type === 'kf' && (
                            <TButton onClick={onRequestAddKf}>
                                <View className="add-kf-btn">
                                    <Text className="add-kf-btn-text">
                                        添加客服
                                </Text>
                                </View>
                            </TButton>
                        )
                    }
                </View>

            </View>
        )
    }
}