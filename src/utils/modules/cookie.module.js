/*********************
       Cookie 封装
**********************/
export default {

    // 设置
    set: function(key, value, day = 0) {
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};${day ? `max-age=${day * 86400}` : ''}`
    },

    // 获取
    get: function(key) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key) + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
    },

    // 删除
    del: function(key) {
        document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    },

    // 删除所有
    delAll: function() {
        let keys = document.cookie.match(/[^ =;]+(?==)/g) || []
        keys.forEach(key => {
            this.del(key)
        })
    }

}
