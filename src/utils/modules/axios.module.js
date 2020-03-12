/*********************
       Axios 封装
**********************/
import axios from 'axios'

// 创建实例
const http = axios.create({ // 更多配置详见: https://www.kancloud.cn/yunye/axios/234845
    // API URL
    baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_TEST_URL : process.env.VUE_APP_API_BESE_URL,
    // 超时时长（毫秒）
    timeout: 60000,
    // 跨域请求是否提供凭据信息
    withCredentials: true,
    // 头部信息
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    // 向服务器发送前修改请求数据
    transformRequest: function(data) {
        // 将 JavaScript 值转换为 JSON 字符串
        return JSON.stringify(data)
    },
    // 在传递给 then/catch 前修改响应数据
    transformResponse: function(data) {
        // 将 JSON 字符串转换为 JavaScript 对象
        return JSON.parse(data)
    }
})

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 在发出请求前做点什么...
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
