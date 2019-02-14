export default {
    removeChinese(strValue) {
        const reg = /[\u4e00-\u9fa5]/g;
        return strValue.replace(reg, "");
    },
    isPassword(v) {
        return v && /^[a-z\d]*$/i.test(v);
    },
    isMobole(mobile){
        return /^[1][3,4,5,7,8][0-9]{9}$/i.test(mobile);
    }
};
