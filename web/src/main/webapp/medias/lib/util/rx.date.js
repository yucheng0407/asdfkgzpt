(function () {
    RX.Date = {
        YMD: "yyyy-MM-dd",
        YMDH: "yyyy-MM-dd hh",
        YMDHM: "yyyy-MM-dd hh:mm",
        YMDHMS: "yyyy-MM-dd hh:mm:ss"
    };
    /**
     * 根据格式获取当前时间
     * @param {string} format
     */
    RX.getNow = function (format) {
        var now = new Date();
        return now.Format(format);
    };
    /**
     * 计算两个日期的时间差
     * @param {string}startDate
     * @param {string} endDate
     * @returns {number}
     */
    RX.compareDate = function (startDate, endDate) {
        //判断对象不是null也不是空字符串
        function isNotNull(str) {
            return str != null && str != '';
        }

        if (isNotNull(startDate) && isNotNull(endDate)) {
            var startTime = (new Date(startDate)).getTime();//传过来的开始时间转换为毫秒
            var endTime = (new Date(endDate)).getTime();
            var result = (startTime - endTime) / 24 / 60 / 60 / 1000;
            if (result >= 0) {
                return result;
            }
        }
    };
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    /**
     * @description 日期解析,将日期字符串根据特定的匹配字符串解析为日期格式
     * 解析失败会返回null,如果传入了奇怪的匹配字符串,会产生奇怪的时间
     * @param {String} dateString 日期字符串
     * @param {String} pattern 匹配字符串,可以手动传入,或者采取默认
     * 手动传入需要和日期字符串保持一致
     */
    RX.parseDateByFmt = function(dateString, pattern) {
        try {
            var matchs1 = (pattern || (dateString.length === 10 ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss')).match(/([yMdHsm])(\1*)/g);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length === matchs2.length) {
                var $d = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var $i = parseInt(matchs2[i], 10);
                    switch (matchs1[i].charAt(0) || '') {
                        case 'y' :
                            $d.setFullYear($i);
                            break;
                        case 'M' :
                            $d.setMonth($i - 1);
                            break;
                        case 'd' :
                            $d.setDate($i);
                            break;
                        case 'H' :
                            $d.setHours($i);
                            break;
                        case 'm' :
                            $d.setMinutes($i);
                            break;
                        case 's' :
                            $d.setSeconds($i);
                            break;
                        default :
                        //
                    }
                }
                return $d;
            }
        } catch (err) {

        }
        return null;
    }

}).call(this);