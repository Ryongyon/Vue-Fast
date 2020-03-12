/*********************
    localStorage 封装
**********************/
export default {

    // 设置
    set: function(key, value, json = false) {
        json ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, value)
    },

    // 获取
    get: function(key, json = false) {
        return json ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)
    },

    // 删除
    del: function(key) {
        localStorage.removeItem(key)
    },

    // 删除所有
    delAll: function() {
        localStorage.clear()
    }

}
