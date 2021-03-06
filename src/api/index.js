import { get, file } from './base';

const login = (params) => {
    return get('Login', params);
}
export function getHome() {
    return get('HomeData', null, { loading: false });
}
//定制需求页面
export function getDemandCustomLayout(params) {
    return get('CloudArticleUI', params);
}
//报价页面
export function getOfferLayout(params) {
    return get('CloudQuoteUI', params);
}
//云筛选页面
export function getFilterLayout(params) {
    return get('CloudQuoteFiltrateUI', params, { loading: false });
}
//报价列表
export function getOfferList(params) {
    return get('CloudQuoteList', params, { loading: false });
}
//搜索报价列表
export function getSearchOfferList(params) {
    return get('Search', params, { loading: false });
}
//提交
export function doSubmit(url, params) {
    return get(url, params);
}
//获取需求列表
export function getDemandList(params) {
    return get('CloudArticleList', params);
}
//获取自己发布的需求
export function getMySelfDemandList(params) {
    return get('CloudArticleMyList', params);
}
//获取指标
export function getSpotIndicators(params) {
    return get('QCList', params);
}
//获取仓单证书
export function getCertificate(params) {
    return get('QC2List', params);
}
//获取openid
export function getOpenId(params) {
    return get('openid', params);
}
//加入购物车
export function addShoppingCar(params) {
    return get('CartAdd', params);
}
//获取购物车列表
export function getShoppingCarList(params) {
    return get('CartList', params);
}
//从购物车移除
export function removeFromCart(params) {
    return get('CartDelete', params);
}
//我的报价列表
export function getMyOfferList(params) {
    return get('CloudArticleMyPriceList', params);
}
//获取我的云报价
export function getMyCloudOfferList(params) {
    return get('CloudQuoteMyList', params, { loading: false });
}
//报价
export function offer(params) {
    return get('CloudArticlePrice', params);
}

//获取需求的报价
export function getOfferByDemand(params) {
    return get('CloudArticleUIPriceList', params);
}
//删除我发布的需求
export function deleteMyDemand(params) {
    return get('CloudArticleDelete', params);
}
//删除我发布的报价
export function deleteMyOffer(params) {
    return get('CloudArticleMyPriceListDelete', params);
}
//删除我发布的云报价
export function deleteMyCloudOffer(params) {
    return get('CloudQuoteDelete', params);
}
//上传图片 
export function uploadImg() {
    return file('upload');
}
//认证企业信息 
export function authInfo(params) {
    return get('ruzhu', params);
}
//获取认证信息
export function getAuthInfo(params) {
    return get('MyRuZhu', params);
}
//获取手机号
export function getMobile(params) {
    return get('UserPhone', params);
}
//获取excel数据
export function uploadExcelData(params) {
    delete params['升贴水'];
    return get('PCUpdateGetExcel', params);
}
//获取excel列表进度 
export function getUpdateGetExcelListPer(params) {
    return get('PCUpdateGetExcelListPer', params, { loading: false });
}
//获取excel列表
export function getExcelList(params) {
    return get('PCUpdateGetExcelList', params);
}
//发布编辑后的excel数据
export function publishExcelData(params) {
    return get('CloudQuotePC', params);
}

//获取客服列表
export function getKFList(params) {
    return get('KFList', params);
}
//添加客服
export function addKF(params) {
    return get('KFAdd', params);
}
//删除客服 KFDelete
export function deleteKF(params) {
    return get('KFDelete', params);
}
//获取棉花分类列表
export function getCottonArticleTypeList() {
    return get('ArticleTypeList', null, { loading: false });
}
//根据分类获取文章列表
export function getCottonArticleList(params) {
    return get('ArticleList', params, { loading: false });
}
//根据文章内容
export function getArticleContent(params) {
    return get('ArticleInfo', params, { loading: false });
}
//获取浏览记录
export function getHistory(params) {
    return get('CloudQuoteHistory', params, { loading: false });
}
//获取物流列表
export function getLogisticsList(params) {
    return get('WLList', params, { loading: false });
}

//发布物流
export function publishLogisticsList(params) {
    return get('WLAdd', params);
}
//删除发布的物流
export function deleteLogistics(params) {
    return get('WLDelete', params);
}
//编辑物流信息
export function editLogistics(params) {
    return get('WLEdit', params);
}
//获取俩地距离
export function getDistance(params) {
    return get('WLDistance', params);
}
//意见反馈
export function feedback(params) {
    return get('IdeaAdd', params);
}
export {
    login
}