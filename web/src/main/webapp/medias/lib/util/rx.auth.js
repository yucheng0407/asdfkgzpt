/**
 * 权限判断接口
 */
(function () {

    /**
     * 否具有该功能权
     * @param url
     * @returns {*} true/false
     */
    RX.hasAuth = function (url) {
        var cacheFlag = RX.cache(_top, "CACHE_AUTH_FLAG"), userResUrl, result;
        if (cacheFlag) {
            userResUrl = RX.cache(_top, "USER_RESOURCE_URL");
        } else {
            $.ajax({
                type: "post",
                url: "/resource/getUserResUrl",
                async: false,
                success: function (ar) {
                    if (ar.success) {
                        RX.cache(_top, "CACHE_AUTH_FLAG", true);
                        RX.cache(_top, "USER_RESOURCE_URL", ar.data);
                        userResUrl = ar.data;
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
        if (userResUrl) {
            if (userResUrl === "all") {
                result = true;
            } else {
                result = !!userResUrl[url];
            }
        } else {
            result = false;
        }
        return result;
    }

    /**
     * 是否具有该功能权限
     * @param funcCode 功能权限编码
     * @param parentPageCode 上级编码
     * @returns {boolean}
     */
    RX.hasFuncAuth = function (funcCode, parentPageCode) {
        var cacheFlag = RX.cache(_top, "CACHE_FUNC_AUTH_FLAG"), userResFunc, result;
        if (cacheFlag) {
            userResFunc = RX.cache(_top, "USER_RESOURCE_FUNC");
        } else {
            $.ajax({
                type: "post",
                url: "/resource/getUserResFunc",
                async: false,
                success: function (ar) {
                    if (ar.success) {
                        RX.cache(_top, "CACHE_FUNC_AUTH_FLAG", true);
                        RX.cache(_top, "USER_RESOURCE_FUNC", ar.data);
                        userResFunc = ar.data;
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
        }
        if (userResFunc) {
            if (userResFunc === "all") {
                result = true;
            } else {
                result = false;
                RX.eachArray(userResFunc, function (i, t) {
                    if (t.code == funcCode && (!parentPageCode || t.parentCode == parentPageCode)) {
                        result = true;
                    }
                    return !result;
                })
            }
        } else {
            result = false;
        }
        return result;
    }

    /**
     * 获取用户权限资源
     * @param type 资源类型
     * @param parentCode 上级编码
     * @returns {*}
     */
    RX.getUserResource = function (type, parentCode, zxtCode) {
        var result;
        $.ajax({
            type: "post",
            url: "/resource/getUserResource",
            async: false,
            dataType: "json",
            data: {type: type, parentCode: parentCode, zxtCode: zxtCode},
            success: function (ar) {
                if (ar.success) {
                    result = ar.data;
                } else {
                    RX.alert(ar.msg);
                }
            }
        });
        return result;
    }

}).call(this);