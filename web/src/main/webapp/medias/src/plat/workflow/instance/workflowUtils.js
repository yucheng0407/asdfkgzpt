var parentPage = RX.page.parent();
if (parentPage && parentPage.pageType === "handleWf" && RX.page._wfObj) {
    //工作流第一个页面
    if (RX.page._wfObj.firstPageFlag) {
        //需要确保页面加载完成
        RX.pushCallbackFunc(function () {
            parentPage._base.firstIframeOnload(window);
        });
    }
    (function (globle) {
        window.WorkflowReturn = _top.WorkflowReturn;
        window.SubmitReturn = _top.SubmitReturn;
        var ywDataId;   //记录aidSubmit时提交返回的id
        var wfFormObj = {
            /**
             * 設置主vm
             */
            setMainVm: function (vm) {
                this._mainVm = vm;
            },
            /**
             * 获取表单参数
             * @param obj 配置参数，可以直接传入字符串url
             *      type:请求方式
             *      url:请求路径
             *      async：同步异步
             *      success：异步成功执行的回调函数，应该是render操作的接口
             *      param:参数
             * @returns {*}
             */
            get: function (obj) {
                //异步处理与同步处理，先考虑同步的情况
                var wfObj;
                if (this.param.page && this.param.page.tmpData) {
                    wfObj = JSON.parse(this.param.page.tmpData);
                    obj && typeof obj.success === "function" && obj.success(wfObj);
                } else {
                    //obj为空，obj.url为空
                    if (obj) {
                        if (obj && typeof obj === "string") {
                            obj = {url: obj};
                        }
                        if (obj.url) {
                            //可以进行一些预处理，random
                            $.ajax({
                                type: obj.type || "post",
                                url: obj.url,
                                data: obj.param,
                                async: obj.async || false,
                                success: function (ar) {
                                    if (ar.success) {
                                        wfObj = ar.data;
                                        typeof obj.success === "function" && obj.success(wfObj);
                                    } else {
                                        layer.alert(ar.msg);
                                    }
                                }
                            });
                        }
                    }
                }
                return wfObj;
            },
            /**
             * 辅助工作流表单提交（异步）
             * @param obj
             *          {type：提交类型，get、post，默认post
         *            url：路径
          *           data：后台参数
           *          success：成功之后执行的操作
            *         error：失败执行的操作}
             */
            save: function (obj) {
                var result = new SubmitReturn();
                $.ajax({
                    type: obj.type || "post",
                    url: obj.url,
                    async: false,
                    data: obj.data,
                    success: function (ar) {
                        if (ar.success) {
                            result.flg = true;
                            //业务数据ID
                            result.ywDataId = ar.data.ywDataId;
                            //流程变量
                            result.wfVars = ar.data.wfVars;
                            //流程实例标题
                            result.wfTitle = ar.data.wfTitle;
                            ywDataId = ar.data.ywDataId;
                            //个性处理的数据，title可能处理，或者其它参数
                            typeof obj.success === "function" && obj.success(ar.data, result);
                        } else {
                            result.msg = ar.msg;
                            typeof obj.error === "function" && obj.error(ar.data, result);
                        }
                    }
                });
                return result
            },
            /**
             * 辅助工作流删除
             * @param obj
             *          {
         *             type： 类型，get，post，默认为post
         *             url：可在之后拼接id，或者传入id
         *             id：数据id
         *
         *            }
             */
            del: function (obj) {
                var result = {msg: "", flg: false};
                var id = obj.id || this._getParamByUrl(obj.url, id) || ywDataId;
                if (id) {
                    $.ajax({
                        type: obj.type || "post",
                        url: obj.url,
                        async: false,
                        data: {id: id},
                        success: function (ar) {
                            if (ar.success) {
                                result.flg = true;
                            } else {
                                result.msg = ar.msg;
                            }
                        }
                    });
                } else {
                    result.flg = true;
                }
                return result;
            },
            /**
             * 从url中获取指定param的值
             * @param url
             * @param name
             * @returns {*}
             * @private
             */
            _getParamByUrl: function (url, name) {
                var value;
                if (url) {
                    var reg = new RegExp('([?]|&)' + name + '=([^&]*)(&|$)');
                    var r = url.substr(url.lastIndexOf("?")).match(reg);
                    if (r) value = RX.decode(r[2]);
                }
                return value;
            }
        };
        //工作流表单操作辅助处理
        RX.page.makeup(wfFormObj);
    })(window);
}
