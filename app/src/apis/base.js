import Axios from "axios";
import qs from "qs";


import { Tip, Storage } from "commons";

const server = `http://58.49.10.99:8090`;
const host = `https://58.49.10.99`;


/**
 * 请求拦截器
 * */
// 拦截响应response，并做一些错误处理
Axios.interceptors.response.use(
    response => response,
    err => {
        //console.log(err.message);
        // 这里是返回状态码不为200时候的错误处理
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = "请求错误";
                    break;

                case 401:
                    err.message = "未授权，请登录";
                    break;

                case 403:
                    err.message = "拒绝访问";
                    break;

                case 404:
                    err.message = `未找到资源`;
                    break;

                case 408:
                    err.message = "请求超时";
                    break;

                case 500:
                    err.message = "服务器内部错误";
                    break;

                case 501:
                    err.message = "服务未实现";
                    break;

                case 502:
                    err.message = "网关错误";
                    break;

                case 503:
                    err.message = "服务不可用";
                    break;

                case 504:
                    err.message = "网关超时";
                    break;

                case 505:
                    err.message = "HTTP版本不受支持";
                    break;

                default:
            }
        }
        err.message = err.message.replace("Network Error", "网络错误");
        err.message = err.message.replace(
            /timeout of ([\d]+)ms exceeded/,
            "请求超时"
        );
        return Promise.reject(err);
    }
);
Axios.interceptors.request.use(
    config => {
        return Storage.get("Token")
            .then(data => {
                if (data) {
                    config.headers["Access-Token"] = data;
                }
                config.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";
                return config;
            })
            .catch(e => {
                config.headers["Content-Type"] =
                    "application/x-www-form-urlencoded";
                return config;
            });
    },
    error => {
        //请求错误时做些事
        return Promise.reject(error);
    }
);

/**
 * 打印错误信息
 * */
const logError = ({ url, params, res, error }) => {
    console.log(`
    --     start    --
    url:${url} 
    params:${JSON.stringify(params)}
    res:${JSON.stringify(res)}
    error:${JSON.stringify(error)}
    --      end     --
    `);
};

/**
 * 请求
 * */
const requestWrapper = (method, url, param = {}) => {
    const params =
        method === "post" ? { data: qs.stringify(param) } : { params: param };

    return Axios.request({
        baseURL: url.includes('http') ? '' : server,
        url,
        method,
        timeout: 600000,
        ...params
    });
};

const base = (type, url, params, config) => {
    const { handleCatch, loading } = config;
    loading && Tip.loading();

    return new Promise((resolve, reject) => {
        requestWrapper(type, url, params)
            .then(res => {

                const { data = {} } = res;
                // console.log(`
                // 路径:${url}
                // 参数:${JSON.stringify(params)}
                // 服务端响应:`,data);
                Tip.dismiss();
                if (data) {
                    return resolve(data);
                } else {
                    if (handleCatch) {
                        // logError({
                        //     url,
                        //     params,
                        //     res: res.data,
                        //     error: msg
                        // });
                        Tip.fail('');
                        return reject('');
                    }
                    return reject('');
                }
            })
            .catch(e => {
                console.log(e, 'url' + url)
                const err = e.message || e;
                Tip.dismiss();
                if (handleCatch) {
                    Tip.fail(err);
                    return reject(err);
                }
                return reject(err);
            });
    });
};
const post = (
    url,
    params = {},
    { loading = true, handleCatch = true } = {}
) => {
    return base("post", url, params, { loading, handleCatch });
};

const get = (url, params = {}, { loading = true, handleCatch = true } = {}) => {
    return base("get", url, params, { loading, handleCatch });
};

export { post, get, server, host };
