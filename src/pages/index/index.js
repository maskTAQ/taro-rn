import { Component } from '@tarojs/taro'
import { View,  Text } from '@tarojs/components'
import TButton from '../../components/TButton'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
   
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <TButton className='add_btn' onClick={this.props.add}>+</TButton>
        <TButton className='dec_btn' onClick={this.props.dec}>-</TButton>
        <TButton className='dec_btn' onClick={this.props.asyncAdd}>async</TButton>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index
