import React from 'react';
import { Component } from '../../platform';

import { Canvas } from '@tarojs/components';
import { TButton, Text } from '../../components';

import './main.scss'
import brandSrc from './img/logo.png';
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
    remark: '注:安师大纪念卡迪士尼，马到接口拿，代码，',
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

const createImg = (src, callback) => {
    // const img = new Image();
    // img.src = src;
    // img.onload = function () {

    // };
    callback(src);
    return src;
}

class Index extends Component {

    config = {
        navigationBarTitleText: '闹钟'
    }

    state = {
        width: 0,
        height: 0,
    }
    drawTable = ctx => {

        const width = 750 - 40;
        const halfWidth = width / 2;
        const data = [
            [{ v: '组批批次:', x: 150 }, { v: '21837687123', x: 150 + halfWidth }],
            [{ v: '合计报数:', x: 10 }, { v: '60', x: 10 + halfWidth / 5 * 2 }, { v: '质量标识:', x: 10 + halfWidth }, { v: '--', x: 10 + halfWidth / 5 * 7 }],
            [{ v: '合计毛重:', x: 10 }, { v: '————', x: 10 + halfWidth / 5 * 2 }, { v: '平均回潮:', x: 10 + halfWidth }, { v: '0.0%', x: 10 + halfWidth / 5 * 7 }],
            [{ v: '合计皮重:', x: 10 }, { v: '————', x: 10 + halfWidth / 5 * 2 }, { v: '平均含杂:', x: 10 + halfWidth }, { v: '0.0%', x: 10 + halfWidth / 5 * 7 }],
            [{ v: '合计净重:', x: 10 }, { v: '————', x: 10 + halfWidth / 5 * 2 }, { v: '合计公重:', x: 10 + halfWidth }, { v: '13.3860t', x: 10 + halfWidth / 5 * 7 }],

            [{ v: '批检验指标:', x: 4, bold: true }, { v: '棉包组批各指标分布', x: 10 + halfWidth / 5 * 2 }, { v: '批检验指标:', x: 10 + halfWidth, bold: true }, { v: '棉包组批各指标分布', x: 10 + halfWidth / 5 * 7 }],
            [{ v: '主体颜色级:', x: halfWidth / 2, bold: true }, { v: '主体长度级', x: halfWidth + halfWidth / 2, bold: true }],

            [{ v: '白棉1级:', x: halfWidth / 2 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '32mm:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '白棉2级:', x: halfWidth / 2 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '31mm:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '白棉3级:', x: halfWidth / 2 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '30mm:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '白棉4级:', x: halfWidth / 2 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '29mm:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '白棉5级:', x: halfWidth / 2 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '28mm:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '淡点污棉1级:', x: halfWidth / 2 - 15 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '27mm:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '淡点污棉2级:', x: halfWidth / 2 - 15 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '26mm:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '淡点污棉3级:', x: halfWidth / 2 - 15 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '25mm:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '淡黄污棉1级:', x: halfWidth / 2 - 15 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: '马克隆主体级', x: width / 14 * 9 + 20, bold: true }],
            [{ v: '淡黄染棉2级:', x: halfWidth / 2 - 15 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: 'C1:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '淡黄染棉3级:', x: halfWidth / 2 - 15 }, { v: '100', x: halfWidth / 10 * 7 + 10 }, { v: 'B1:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '黄染棉1级:', x: halfWidth / 2 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: 'A:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '黄染棉1级:', x: halfWidth / 2 }, { v: '————', x: halfWidth / 10 * 7 + 10 }, { v: 'B2:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: 'C2:', x: halfWidth + halfWidth / 2 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],

            [{ v: '最小值', x: halfWidth / 7 * 3 }, { v: '79.3', x: halfWidth / 10 * 7 + 10 }, { v: '最小值', x: width / 14 * 10 }, { v: '27.6', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '最大值', x: halfWidth / 7 * 3 }, { v: '81.2', x: halfWidth / 10 * 7 + 10 }, { v: '最大值', x: width / 14 * 10 }, { v: '29.7', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: '平均值', x: halfWidth / 7 * 3 }, { v: '80.4', x: halfWidth / 10 * 7 + 10 }, { v: '平均值', x: width / 14 * 10 }, { v: '28.7', x: halfWidth + halfWidth / 10 * 7 + 10 }],
            [{ v: 'Rd(%)', x: 20, bold: true }, { v: '平均值', x: halfWidth / 7 * 3 }, { v: '----', x: halfWidth / 10 * 7 + 10 }, { v: '+b', x: halfWidth + 20, bold: true }, { v: '平均值', x: width / 14 * 10 }, { v: '————', x: halfWidth + halfWidth / 10 * 7 + 10 }],
        ];
        const specifiedHeightData = [
            { v: '颜色级', x: 20, bold: true, h: 720, },

            { v: '各颜', x: halfWidth / 7 * 2 + 7, bold: true, h: 700 },
            { v: '色级', x: halfWidth / 7 * 2 + 7, bold: true, h: 700 + 20 },
            { v: '比例', x: halfWidth / 7 * 2 + 7, bold: true, h: 700 + 40 },
            { v: '(%)', x: halfWidth / 7 * 2 + 10, bold: true, h: 700 + 60 },

            { v: '长度', x: halfWidth + 30, bold: true, h: 600 },
            { v: '长度平均', x: halfWidth + 20, bold: true, h: 640 + 20 },
            { v: '值:27.6', x: halfWidth + 24, bold: true, h: 640 + 40 },

            { v: '各颜', x: width / 14 * 9 + 7, bold: true, h: 620 },
            { v: '色级', x: width / 14 * 9 + 7, bold: true, h: 620 + 20 },
            { v: '比例', x: width / 14 * 9 + 7, bold: true, h: 620 + 40 },
            { v: '(%)', x: width / 14 * 9 + 10, bold: true, h: 620 + 60 },

            { v: '马克隆值', x: halfWidth + 30, bold: true, h: 870 },
            { v: '(cN/tex)', x: halfWidth + 30, bold: true, h: 870 + 20 },
            { v: '值:4.6', x: halfWidth + 34, bold: true, h: 870 + 40 },


            { v: '各马', x: width / 14 * 9 + 7, bold: true, h: 860 },
            { v: '克隆', x: width / 14 * 9 + 7, bold: true, h: 860 + 20 },
            { v: '值级', x: width / 14 * 9 + 7, bold: true, h: 860 + 40 },
            { v: '比例', x: width / 14 * 9 + 7, bold: true, h: 860 + 60 },
            { v: '(%)', x: width / 14 * 9 + 10, bold: true, h: 860 + 80 },

            { v: '长度整齐度', x: 15, bold: true, h: 1020 },
            { v: '(%)', x: 40, bold: true, h: 1020 + 20 },

            { v: '撕裂比强度', x: halfWidth + 15, bold: true, h: 1020 },
            { v: '(cN/tex)', x: halfWidth + 24, bold: true, h: 1020 + 20 },
        ];
        const lineHeight = 34;
        let initHeight = 280;

        //绘制边框 start
        //竖线 start
        ctx.setFillStyle('#000');
        ctx.fillRect(0, initHeight, 2, 852);
        ctx.fillRect(width / 2, initHeight, 2, 852);
        ctx.fillRect(width, initHeight, 2, 852);
        ctx.fillRect(width / 10 * 2, initHeight + lineHeight, 2, lineHeight * 4);
        ctx.fillRect(width / 10 * 7, initHeight + lineHeight, 2, lineHeight * 4);

        ctx.fillRect(width / 14 * 2, initHeight + lineHeight * 5, 2, lineHeight * 15);
        ctx.fillRect(halfWidth / 10 * 7, initHeight + lineHeight * 7, 2, lineHeight * 13);
        ctx.fillRect(halfWidth + halfWidth / 10 * 7, initHeight + lineHeight * 6, 2, lineHeight * 19);
        ctx.fillRect(width / 14 * 2, initHeight + lineHeight * 21, 2, lineHeight * 4);
        ctx.fillRect(halfWidth / 10 * 7, initHeight + lineHeight * 21, 2, lineHeight * 4);
        ctx.fillRect(width / 14 * 9, initHeight + lineHeight * 5, 2, lineHeight * 20);

        ctx.fillRect(width / 10 * 2, initHeight + lineHeight * 7, 2, lineHeight * 13);
        ctx.fillRect(width / 10 * 7, initHeight + lineHeight * 7, 2, lineHeight * 8);
        ctx.fillRect(width / 10 * 7, initHeight + lineHeight * 16, 2, lineHeight * 5);
        //竖线 end
        for (let i = 0; i <= 6; i++) {
            ctx.fillRect(0, initHeight, width, 2);
            initHeight += lineHeight;
        }

        ctx.fillRect(width / 14 * 2, initHeight, width / 14 * 5, 2);
        ctx.fillRect(width / 14 * 9, initHeight, width / 14 * 5, 2);
        initHeight += lineHeight;
        for (let i = 0; i <= 11; i++) {
            ctx.fillRect(width / 10 * 2, initHeight, width / 10 * 3, 2);
            ctx.fillRect(width / 10 * 7, initHeight, width / 10 * 3, 2);
            if (i === 7) {
                ctx.fillRect(halfWidth, initHeight, width / 10 * 3, 2);
            }
            if (i === 8) {
                ctx.fillRect(halfWidth + halfWidth / 7 * 2, initHeight, width / 10 * 3, 2);
            }
            initHeight += lineHeight;
        }
        ctx.fillRect(0, initHeight, width / 2, 2);
        ctx.fillRect(width / 10 * 7, initHeight, width / 10 * 3, 2);
        initHeight += lineHeight;
        ctx.fillRect(0, initHeight, width, 2);
        initHeight += lineHeight;
        for (let i = 0; i <= 1; i++) {
            ctx.fillRect(width / 14 * 2, initHeight, width / 14 * 5, 2);
            ctx.fillRect(width / 14 * 9, initHeight, width / 14 * 5, 2);
            initHeight += lineHeight;
        }
        ctx.fillRect(0, initHeight, width, 2);
        initHeight += lineHeight;
        ctx.fillRect(0, initHeight, width, 2);
        //绘制边框 end

        //绘制数据
        data.forEach((row, rowIndex) => {
            row.forEach(({ v, x, bold }) => {
                if (bold) {
                    ctx.font = "bold 14px sans-serif";
                    // ctx.fillText(v, x, 280 + 12 + lineHeight * rowIndex);
                    // ctx.fillText(v, x, 280 + 12 + lineHeight * rowIndex);
                    // ctx.fillText(v, x, 280 + 12 + lineHeight * rowIndex);
                    // ctx.fillText(v, x, 280 + 12 + lineHeight * rowIndex);
                    //ctx.fillText(v, x, 280 + 12 + lineHeight * rowIndex);
                }
                ctx.fillText(v, x, 280 + 12 + lineHeight * rowIndex);
                ctx.font = "12px sans-serif";
            });
        });
        //绘制数据
        specifiedHeightData.forEach(({ v, x, h, bold, w }) => {
            if (bold) {
                ctx.font = "bold 14px sans-serif";
            }
            if (w) {
                ctx.fillText(v, x, h, w);
            } else {
                ctx.fillText(v, x, h);
            }

            ctx.font = "12px sans-serif";
        });
    }
    getCtx = (id) => {
        return Taro.createCanvasContext(id, this.$scope);
    }
    createdQuoteList = ({ ctx, width, padding, scale, isScale }) => {

        const {
            brandImg, websiteName, website, websiteDesc,
            companyName, contactMobile, gzjgLabel, gzjgValue,
            //s_tLabel,s_tValue,bzLabel,bzValue,remark
        } = layout;
        if (isScale) {
            ctx.scale(scale, scale);
            
        }
        ctx.beginPath();
        //添加方法 小程序端的设计 通过set函数来实现 原生的是通过赋值来实现
        //addMethods(ctx);
        //设置padding
        ctx.translate(padding, padding);
        ctx.setTextBaseline('top');
        //绘制商标
        createImg(brandSrc, function (img) {
            ctx.drawImage(img, 0, 0, brandImg.w, brandImg.h);
        });
        //绘制二维码
        createImg(brandSrc, function (img) {
            ctx.drawImage(img, width - 130 - 20, 0, 130, 130);
            //ctx.fillRect(width - 130 - 40, 0, 130, 130);
        });
        //绘制头部信息 start
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

        ctx.setFillStyle('#000');
        ctx.fillRect(0, 176, width - 40, 2);

        ctx.setFontSize(17);
        ctx.setFillStyle('#000');
        ctx.fillText(data.s_tLabel, 0, 190);
        ctx.setFillStyle('green');
        ctx.fillText(data.s_tValue, 110, 190);

        ctx.setFillStyle('#000');
        ctx.fillText(data.bz, width - (data.bz.length * 16), 190);
        ctx.fillText(data.remark, 0, 220);

        ctx.fillRect(0, 250, width - 40, 2);
        //绘制头部信息 end
        //绘制表格
        this.drawTable(ctx);
        //绘制备注
        ctx.setFillStyle('red');
        ctx.setFontSize(18);
        ctx.fillText("以上数据仅供交流使用,本网不承担任何法律责任,如有疑义,请参照国家公证检验数据!", 0, 1160);


        ctx.draw();
    }


    componentWillMount() {
        Taro.getSystemInfo({
            success: (res) => {
                const { windowWidth: width, windowHeight: height } = res;
                const scale = width / 750;
                this.setState({
                    width: width,
                    height: height,
                    scale,
                    ...res
                });
                const ctx = this.getCtx('myCanvas');
                this.createdQuoteList({ ctx, width: 750, padding: 20, scale, isScale: true });
                //this.createdQuoteList({ ctx: this.getCtx('saveCanvas'), width: 750, padding: 20, scale, isScale: false });
            }
        })
    }

    save = () => {
        const { width, height, scale } = this.state;;
        Taro.canvasToTempFilePath({
            width: 750, height: 1240,
            destWidth: 750 * 8,  //生成图片的大小设置成canvas大小的四倍
            destHeight: 1240 * 8,
            canvasId: 'myCanvas',
            fileType: 'jpg',
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
        const { width, scale = 1 } = this.state;
        return (
            <div className="container">
                <Canvas canvasId="myCanvas" className="canvas" style={`width:${width}px;height:${1240 * scale}px`} />
                <TButton onClick={this.save} className="btn">
                    <Text className="btn-text">保存</Text>
                </TButton>
            </div>

        )
    }
}

export default Index;