/*********************
       Date 封装
**********************/
export default {

    // 时间格式化
    dateFormat: function(date = new Date(), mode = 0) {
        // 变量赋值
        let year    = date.getFullYear(),                               // 年
            month   = (date.getMonth() + 1).toString().padStart(2, 0),  // 月
            day     = date.getDate().toString().padStart(2, 0),         // 日
            hours   = date.getHours().toString().padStart(2, 0),        // 时
            minutes = date.getMinutes().toString().padStart(2, 0),      // 分
            seconds = date.getSeconds().toString().padStart(2, 0);      // 秒
        // 模式规则
        const modeRules = {
            0: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,    // 完整
            1: `${year}-${month}-${day}`,                                   // 仅日期
            2: this.dateWord(date)                                          // 词义化
        }
        // 匹配规则并返回结果
        return modeRules[mode] || modeRules[0]
    },

    // 时间词义化
    dateWord: function(dateStart, dateEnd = new Date()) {
        let between = ((dateEnd - dateStart) / 1000),
            postfix = between > 0 ? '前' : '后',
            arrr    = ['年', '个月', '周', '天', '小时', '分钟', '秒'],
            arrn    = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
        if (between === 0) return '刚刚';
        // 取绝对值
        between = Math.abs(between)
        // 遍历数组返回匹配结果
        for (let i = 0; i < 7; i++) {
            let inm = Math.floor(between / arrn[i]);
            if (inm != 0) return inm + arrr[i] + postfix;
        }
    },

    // 获取日期之间的天数差异
    dateDiff: function(dateStart, dateEnd = new Date()) {
        return Math.round((dateEnd - dateStart) / (1000 * 3600 * 24))
    },

    // 日期字符串转时间戳 / 获取当前时间戳
    timestamp: function(dateStr) {
        return dateStr ? Math.round(Date.parse(dateStr.replace(/-/gi,"/"))) : Math.round(new Date())
    }
    
}
