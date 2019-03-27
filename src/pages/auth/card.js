import React from 'react';
import { Component, connect } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TButton, View, Text, TInput, Image } from '../../ui';
import { uploadImg } from '../../api';
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
        const { option = [], title, type, onRequestAddKf, state, data, host } = this.props;
        const hasInput = ['input', 'kf'].includes(type);
        const isImg = type === 'img';
        const showInput = hasInput && [0, 3].includes(state);
        const showText = hasInput && state === 2;
        const showAddKf = type === 'kf' && [0, 3].includes(state);
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