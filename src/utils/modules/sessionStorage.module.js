/*********************
  sessionStorage 封装
**********************/
export default {

    // 设置
    set: function(key, value, json = false) {
        json ? sessionStorage.setItem(key, JSON.stringify(value)) : sessionStorage.setItem(key, value)
    },

    // 获取
    get: function(key, json = false) {
        return json ? JSON.parse(sessionStorage.getItem(key)) : sessionStorage.getItem(key)
    },

    // 删除
    del: function(key) {
        sessionStorage.removeItem(key)
    },

    // 删除所有
    delAll: function() {
        sessionStorage.clear()
    }

}
