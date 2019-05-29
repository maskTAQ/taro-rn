

import React from 'react';
import { Component, connect } from '../../platform';
import { View, TInput, TButton } from '../../ui'

import './main.scss';
import { feedback } from '../../api';
import { Tip } from '../../utils';

@connect(({ data }) => ({ data }))
export default class Feedback extends Component {
    state = {
        content: '',
        contact: ''
    }
    handleChange = (k, v) => {
        this.setState({
            [k]: v
        })
    }
    submit = () => {
        const { content, contact } = this.state;
        console.log(this.props,'props')
        feedback({
            '反馈内容': content,
            '联系方式': contact,
            '用户ID': this.props.data.user.data.id
        })
            .then(res => {
                Tip.success('反馈成功');
            })
    }
    render() {
        const { content, contact } = this.state;
        return (
            <View className='container'>
                <View className="top">
                    <View className="content">
                        <TInput value={content} onInput={this.handleChange.bind(this, 'content')} placeholder="请写下您的建议或意见" className="input" />
                    </View>
                    <View className="contact">
                        <TInput value={contact} onInput={this.handleChange.bind(this, 'contact')} placeholder="您的联系方式 QQ/手机/邮箱" className="input" />
                    </View>
                </View>
                <View className="bottom">
                    <TButton onClick={this.submit}>
                        <View className="submit">
                            <Text className="submit-text">提交</Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )
    }
}

