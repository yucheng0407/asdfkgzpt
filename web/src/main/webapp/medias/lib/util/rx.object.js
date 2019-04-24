(function () {
    /**
     * 列表模型检验选择事件
     * @param gridModel 模型名称
     * @param msg 提示消息
     * @returns {object|null}
     * @example  RX.checkSelected(model);
     */
    RX.checkSelected = function (gridModel, msg) {
        msg = msg ? msg : "请选择数据";
        var sel = gridModel.getSelect();
        if (sel.length > 0) {
            return sel;
        } else {
            RX.msg(RX.ICON_WARNING, msg);
        }
        return null;
    };
    /**
     * 数组插入
     * @param index  数组索引
     * @param value 插入值
     * @returns {Array}
     */
    Array.prototype.insert = function (index, value) {
        this.splice(index, 0, value);
        var argLength = arguments.length;
        if (argLength > 2) {
            for (var i = 2; i < argLength; i++) {
                this.splice(++index, 0, arguments[i]);
            }
        }
        return this;
    };
    /**
     * 数组替换
     * @param index 数组索引
     * @param value 替换值
     * @returns {Array}
     */
    Array.prototype.replace = function (index, value) {
        this.splice(index, 1, value);
        return this;
    };
    /**
     * 数组删除
     * @param index 索引值
     */
    Array.prototype.remove = function (index) {
        this.splice(index, 1);
        return this;
    };

    Array.prototype.removeChild = function (child) {
        var _index = this.indexOf(child);
        if (_index > -1) {
            this.splice(_index, 1)
        }
        return this;
    };
    /**
     * 数组包含
     * @param val
     * @returns {boolean}
     */
    Array.prototype.contains = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) {
                return true;
            }
        }
        return false;
    };
    /**
     * 得到一个数组不重复的元素集合
     * 唯一化一个数组
     * @returns {Array} 由不重复元素构成的数组
     */
    Array.prototype.uniquelize = function () {
        var ra = [];
        for (var i = 0; i < this.length; i++) {
            if (!ra.contains(this[i])) {
                ra.push(this[i]);
            }
        }
        return ra;
    };
    /**
     * 得到本集合与参数集合的并集（合并且去重）
     * @param arr 参数集合
     * @returns {Array}
     */
    Array.prototype.union = function (arr) {
        return this.concat(arr).uniquelize();
    };

    /**
     * 获取数组最后一个元素
     * @returns {*}
     */
    Array.prototype.last = function () {
        if (this.length) {
            return this[this.length - 1];
        } else {
            return null;
        }
    };
}).call();