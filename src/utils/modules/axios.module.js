/*********************
       Axios 封装
**********************/
import axios from 'axios'
import qs from 'qs'

// 创建实例
// 更多配置查询:https://www.kancloud.cn/yunye/axios/234845
const http = axios.create({
    // API URL
    baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_TEST_URL : process.env.VUE_APP_API_BESE_URL,
    // 超时时长（毫秒）
    timeout: 60000,
    // 跨域请求是否提供凭据信息
    withCredentials: true,
})

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 处理 POST 请求
        if (config.method === 'post') {
            // 设置头部
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            // 处理 Data 参数
            config.data = qs.stringify(config.data)
        } 
        return config
    },
    error => {
        // 处理请求错误
        return Promise.reject(error)
    }
)

// 响应拦截器
http.interceptors.response.use(
    response => {
        // 处理响应数据
        return response
    },
    error => {
        // 处理响应错误
        return Promise.reject(error)
    }
)

export default function(options) {
    return new Promise((cback, reject) => {
        http({
            url: options.url,
            params: options.params,
            method: options.method,
            headers: Object.assign({}, options.headers, { token: this.$cookie.get('token') || '' }),  // 每次请求带上 Token
            data: options.data
        }).then(res => { // status >= 200 && status < 300 会调用 then 方法, 详见: https://blog.csdn.net/weixin_42505098/article/details/82426464
            // 判断 Token 是否失效
            if (parseInt(res.data.code) === 401) this.$router.push({ path: '/401', replace: true })
            cback(res.data)
        }).catch(err => {
            if (err.response) {
                reject(err.response)
            } else {
                reject('请求错误')
            }
        })
    })
}
