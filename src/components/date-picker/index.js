import Taro, { Component } from '@tarojs/taro';
import moment from 'moment';

import { TButton, View, Text } from '../../ui';
import checkedImg from '../../img/checked.png';
import dateImg from '../../img/date.png';
import './index.scss'
export default class DatePicker extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const {  date } = this.props;
        return (
            <TButton>
                <View className="container">
                    <Text className="label">{date ? moment(date).format('YYYY/DD/MM') : '年/月/日'}</Text>
                    <Image className="date-img" src={dateImg} />
                </View>
            </TButton>
        )
    }
}


