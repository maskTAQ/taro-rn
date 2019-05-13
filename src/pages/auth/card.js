import React from 'react';
import { Component, connect } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TButton, View, Text, TInput, Image } from '../../ui';
import { uploadImg } from '../../api';
import closeIcon from './img/close.png';
import './card.scss'
import { Tip } from '../../utils';

@connect(({ data }) => ({ host: data.host }))
export default class Card extends Component {
    static options = {
        addGlobalClass: true
    }
    uploadImg = (key) => {
        const { state, onChange } = this.props;
        if (state === 0) {
            uploadImg()
                .then(res => {
                    const value = res.data;
                    onChange({ key, value });
                    Tip.success('上传成功');
                })
        }
    }
    handleInputChange = (key, value) => {
        this.props.onChange({ key, value });
    }
    render() {
        console.log(this.props, 'card');
        const { option = [], title, type, onRequestAddKf, state, data, host, kfList, onRequestDeleteKf } = this.props;
        const hasInput = ['input', 'kf'].includes(type);
        const isImg = type === 'img';
        const showInput = hasInput && ([0, 3].includes(state) || type === 'kf');
        const showText = hasInput && state === 2 && type !== 'kf';
        const showAddKf = type === 'kf';
        return (
            <View className="container">
                <View className="title">
                    <Text className="title-text">
                        {title}
                    </Text>
                </View>
                {
                    type === 'kf' && (
                        <View className="kf-list" v-if="type === 'kf'">

                            {
                                kfList.map(item => {
                                    const { id } = item;
                                    return (
                                        <View key={id} className="kf-item">
                                            <View className="kf-item-content">
                                                <Text className="kf-item-text">客服名称：{item['客服名称']}</Text>
                                                <Text className="kf-item-text ml">客服电话：{item['客服电话']}</Text>
                                            </View>
                                            <TButton onClick={() => {
                                                console.log(id, 'd');
                                                this.props.onRequestDeleteKf(id);
                                            }}>
                                                <Image className="kf-item-close" src={closeIcon} />
                                            </TButton>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                }
                <View className={classnames({
                    'input-content': hasInput,
                    'img-content': type === 'img'
                })}>
                    {
                        option.map(item => {
                            const { label, placeholder = '请输入', key } = item;
                            return (
                                <View key={key} className={classnames("item", {
                                    'input-item': hasInput,
                                    'img-item': type === 'img'
                                })}>
                                    {isImg && (
                                        <TButton onClick={this.uploadImg.bind(this, key)}>
                                            <Image className="img" src={host + data[key]} />
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
                                        'input-box': showInput
                                    })}>
                                        {
                                            showInput ? (
                                                <TInput value={data[key]} className="input" placeholder={placeholder} onInput={this.handleInputChange.bind(this, item.key)} />
                                            ) : null
                                        }
                                        {
                                            showText && (
                                                <Text className="text">
                                                    {placeholder}
                                                </Text>
                                            )
                                        }

                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        showAddKf && (
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