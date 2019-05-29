

import Taro from '@tarojs/taro';
import React from 'react';
import { Component } from '../../platform';
import { View, TWebView, Image } from '../../ui'

import { Tip } from '../../utils'
import './main.scss';

export default class Recommend extends Component {
    state = {
        isShowAuthBtn: false
    }
    requestSaveImg() {

        const a = Taro.getSetting()
            .then(res => {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    Tip.fail('请先授权！');
                    Taro.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            this.saveImg();
                        },
                        fail: () => {
                            this.setState({
                                isShowAuthBtn: true
                            });
                        }
                    })
                } else {
                    this.saveImg();
                }
            })

    }
    saveImg() {
        var imgSrc = "https://alipic.lanhuapp.com/SketchCover30ad4216b0f0e172f71ffb096a0f6982"
        wx.downloadFile({
            url: imgSrc,
            success: function (res) {
                console.log(res);
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (data) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail: function (err) {
                        console.log(err);
                        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                            console.log("当初用户拒绝，再次发起授权")
                            wx.openSetting({
                                success(settingdata) {
                                    console.log(settingdata)
                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                    } else {
                                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                    }
                                }
                            })
                        }
                    },
                    complete(res) {
                        console.log(res);
                    }
                })
            }
        })
    }
    auth() {
        Taro.openSetting();
    }
    render() {
        const { isShowAuthBtn } = this.state;
        return (
            <View className='container' onlongtap={this.requestSaveImg}>
                <Image src="https://alipic.lanhuapp.com/SketchCover30ad4216b0f0e172f71ffb096a0f6982" className="img" />
                {isShowAuthBtn && <button open-type="openSetting" className="auth-button">授权</button>}
            </View>
        )
    }
}

