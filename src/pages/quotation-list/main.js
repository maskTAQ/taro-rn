import Taro, { Component, Config } from '@tarojs/taro';
import { Canvas, Button } from '@tarojs/components';
import { AtToast } from "taro-ui"

import './main.scss'
import Time from './component/time.js'

class Index extends Component {

    config = {
        navigationBarTitleText: '闹钟'
    }

    state = {
        width: 0,
        height: 0,
    }

    // 绘制表盘
    getDialClock = () => {
        const width = 750;
        const height = this.state.height;
        const ctx = Taro.createCanvasContext('myCanvas', this.$scope);

        const data = {
            websiteName: '中棉网',
            website: 'www.chncot.com',
            websiteDesc: '聚万千零差价无中介棉花资源信息',
            companyName: '江苏丰润科技有限公司',
            contact: '联系人:王先生',
            contactMobile: '联系电话:13888888888',
            gzjgLabel: '公重价格:',
            gzjgValue: '14322',
            s_tLabel: '生/贴(元/吨):',
            s_tValue: '30132.1',
            bz: '标准:郑商所(17/18年度)',
            remark: '注:安师大纪念卡迪士尼，马到接口拿，代码，'
        };
        const layout = {
            brandImg: { w: 50, h: 50 },
            websiteName: { fs: 24, x: 10 },
            website: { fs: 16, x: 10 },
            websiteDesc: { fs: 16, x: 10 },
            companyName: { fs: 20 },
            contact: { fs: 20 },
            contactMobile: { fs: 20 },
            gzjgLabel: { fs: 22 },
            gzjgValue: { fs: 30, color: 'red' },
        }
        const drawTable = ctx => {
            const width = 750 - 40;
            const lineHeight = 40;
            let initHeight = 280;
            ctx.strokeRect(0, initHeight, 2, 1000);
            ctx.strokeRect(width / 2, initHeight, 2, 1000);
            ctx.strokeRect(width, initHeight, 2, 1000);
            ctx.strokeRect(width / 2 / 5 * 2, initHeight + lineHeight, 2, lineHeight * 4);
            ctx.strokeRect(width / 10 * 7, initHeight + lineHeight, 2, lineHeight * 4);

            ctx.strokeRect(width / 2 / 7 * 2, initHeight + lineHeight * 5, 2, lineHeight * 10);

            for (let i = 0; i <= 7; i++) {
                ctx.strokeRect(0, initHeight, width, 2);
                initHeight += lineHeight;
            }

        }
        const scale = this.state.width / 750;
        ctx.scale(scale, scale);

        ctx.translate(20, 20);
        //addMethods(ctx);
        ctx.textBaseline = "hanging";
        const {
            brandImg, websiteName, website, websiteDesc,
            companyName, contactMobile, gzjgLabel, gzjgValue,
            //s_tLabel,s_tValue,bzLabel,bzValue,remark
        } = layout;
        //绘制商标
        // createImg(brandSrc, function (img) {
        //     ctx.drawImage(img, 0, 0, brandImg.w, brandImg.h);
        // });
        //
        ctx.setFontSize(websiteName.fs);
        let l = brandImg.w + websiteName.x;
        ctx.fillText(data.websiteName, l, 0);
        ctx.setFontSize(website.fs);
        l = l + (websiteName.fs * data.websiteName.length) + website.x;
        ctx.fillText(data.website, l, 6);
        l = brandImg.w + websiteDesc.x;
        ctx.fillText(data.websiteDesc, l, 32);

        ctx.setFontSize(companyName.fs);
        ctx.fillText(data.companyName, 0, 70);
        ctx.fillText(data.contact, 0, 100);
        ctx.fillText(data.contactMobile, 0, 130);

        ctx.setFontSize(gzjgLabel.fs);
        l = contactMobile.fs * data.contactMobile.length
        ctx.fillText(data.gzjgLabel, l, 130);

        ctx.setFontSize(gzjgValue.fs);
        ctx.setFillStyle(gzjgValue.color);
        l = l + gzjgLabel.fs * data.gzjgLabel.length;
        ctx.fillText(data.gzjgValue, l, 124);

        ctx.strokeRect(0, 176, width - 40, 2);

        ctx.setFontSize(17);
        ctx.setFillStyle('#000');
        ctx.fillText(data.s_tLabel, 0, 190);
        ctx.setFillStyle('green');
        ctx.fillText(data.s_tValue, 110, 190);

        ctx.setFillStyle('#000');
        ctx.fillText(data.bz, width - (data.bz.length * 15), 190);
        ctx.fillText(data.remark, 0, 220);

        ctx.strokeRect(0, 250, width - 40, 2);

        drawTable(ctx);



        ctx.draw();
    }

    componentWillMount() {
        const that = this;
        Taro.getSystemInfo({
            success: function (res) {
                that.setState({
                    width: res.windowWidth,
                    height: res.windowHeight
                })
            }
        })
    }

    componentDidMount() {
        this.getDialClock();
    }
    save = () => {
        const { width, height } = this.state;;
        Taro.canvasToTempFilePath({
            width, height,
            destWidth: width * 4,  //生成图片的大小设置成canvas大小的四倍
            destHeight: height * 4,
            canvasId: 'myCanvas',
            fileType: 'png',
            quality: 1,//图片质量
            success: (res) => {
                const { errMsg } = res;
                if (errMsg.includes('ok')) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                    });
                    Taro.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000
                    });
                }

            },
            fail: function (res) {
                Taro.showToast({
                    title: '保存失败',
                    icon: 'success',
                    duration: 2000
                });
            },

        }, this.$scope)

    }

    render() {
        return (
            <div>
                {/* 表盘绘制 */}
                <Canvas canvasId="myCanvas" className="canvas" />
                <Button onClick={this.save} className="a">保存</Button>
            </div>

        )
    }
}

export default Index;