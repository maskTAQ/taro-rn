import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { TButton } from '../../components'
import './index.scss'


@connect()
export default class Demo extends Component {

    config = {
        navigationBarTitleText: 'title'
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        return (
            <View className='contianer'>
                
            </View>
        )
    }
}

