/**
 * 表单编辑器中字段渲染配置
 *
 */
(function () {
    var optionsConst = {
        //字段类型映射
        TYPE: {
            //单行文本
            TEXT: 'text',
            //数字
            NUMBER: 'number',
            //多行文本
            TEXTAREA: 'textarea',
            //单选
            RADIO: 'radio',
            //多选
            CHECKBOX: 'checkbox',
            //下拉
            SELECT: 'select',
            //日期
            DATEPICKER: 'datePicker',
            //附件
            ATTACHMENT: 'attachment',
            //选择器
            SELECTOR: 'selector',
            //数据库字段
            DATABASE: 'database'
        },
        //字段属性的映射
        OPTIONS: {
            //是否需要设置最大长度
            IS_MAX_LENGTH: "is_max_length",
            //最大长度
            MAX_LENGTH: "max_length",
            //禁用标志
            DISABLED: "read_rights",
            DEFAULTVALUE: "default_value",
            //只读显示的状态，original原生显示，不使用spanshow
            //数据格式，为custom是自定义的正则
            DATA_FORMAT: "data_format",
            //是否必填
            REQUIRED: "required",
            //字典值集合
            DICTOPTIONS: "options",
            //若为下拉字典项，显示“请选择”项
            SHOWPLSSELECT: "include_blank_option",
            //下拉"请选择"定制
            PLSSELECTNAME: "include_blank_value",
            //日期类型
            DATEFMT_TYPE: "datefmt_type",
            //日期格式
            DATEFMT: "datefmt",
            //默认值类型
            DEFAULT_VALUE_TYPE: "default_value_type",
            //是否开始日期
            IS_START_DATE: "is_start_date",
            //开始日期类型：specific（特定日期），today（当前日期），before（当前日期之前），after（之后）
            START_DATE_TYPE: "start_date_type",
            //开始日期
            START_DATE: "start_date",

            //是否结束日期
            IS_END_DATE: "is_end_date",
            //结束日期类型：specific（特定日期），today（当前日期），before（当前日期之前），after（之后）
            END_DATE_TYPE: "end_date_type",
            //结束日期
            END_DATE: "end_date"


        },
        //选择器
        SELECTOR: {
            user: {
                title: "请选择用户",
                url: "/user/sysUserSelect"
            },
            org: {
                title: "请选择机构",
                url: "/form/organTree",
                style: "tree",
                param: {
                    cascadeSel: "-"    //暂时这样，取消级联
                }
            }
        },
        //默认数值
        DEFAULTVALUE: {
            //普通文本
            TEXT_MAX_LENGTH: 50,
            //长文本
            TEXTAREA_MAX_LENGTH: 500
        },
        //验证规则映射
        RULE_MAPPING: {
            'phone': 'isMobile',
            'telephone': 'isPhone2',
            'zip': 'isZipCode',
            'idcard': 'isIdCardNo',
            'email': 'isEmail',
            'isTel': 'isTel',
            'isUrl': 'isUrl'
        },
        FILE_TYPE: {
            "images": "*.bmp;*.gif;*.jpg;*.jpeg;*.png;*.psd;*.tif;*.tiff",
            "videos": "*.mkv;*.mp4;*.avi;*.swf;*.wmv;*.rmvb;*.mov;*.mpg",
            "audios": "*.mp3;*.flac;*.ape;*.wma;*.wav;*.aac;*.m4a;*.au;*.ram;*.mmf;*.ai",
            "docs": "doc;*.docx;*.pdf;*.rtf;*.txt;*.csv;*.xls;*.xlsx;*.ppt;*.pptx",
            "compress": "*.rar;*.zip;*.7z;*.gz;*.arj;*.z"
        }
    };
    /**
     * 通用工具类
     */
    var commonUtils = {
        /**
         *
         * 通用基础配置
         * @param options
         * @param formConfig
         * @returns {{}}
         */
        getCommonConfig: function (options, formConfig) {
            var obj = {};
            //最大长度
            if (options[optionsConst.OPTIONS.MAX_LENGTH]) {
                obj["maxLength"] = options[optionsConst.OPTIONS.MAX_LENGTH];
            }
            //disabled
            if (options[optionsConst.OPTIONS.DISABLED] == true) {
                obj["disabled"] = true;
            }
            //defaultValue
            if (options[optionsConst.OPTIONS.DEFAULTVALUE]) {
                obj["defaultValue"] = options[optionsConst.OPTIONS.DEFAULTVALUE];
            }
            //spanShow原样展示
            if (formConfig && formConfig[optionsConst.OPTIONS.READ_STYLE] === "original") {
                obj["spanShow"] = false;
            }
            return obj;
        },
        /**
         * 规则的获取
         * @param fieldOptions
         * @returns {{checkKeyup: Array, checkValue: Array, checkSave: Array}}
         */
        getCheckRules: function (fieldOptions) {
            var ruleConfig = {
                checkKeyup: [],  //输入验证，挂载输入事件。
                checkValue: [],  //失焦验证，挂载失焦事件，同时当调用模型验证接口时优先触发。
                checkSave: []    //保存验证，当调用模型验证接口时触发。
            };
            var ruleArr = [];
            if (fieldOptions[optionsConst.OPTIONS.REQUIRED]) {
                //notnull
                ruleConfig["checkSave"].push("notNull");
            }
            //数据格式的验证
            if (fieldOptions[optionsConst.OPTIONS.DATA_FORMAT]) {
                if (fieldOptions[optionsConst.OPTIONS.DATA_FORMAT] === "custom") {
                    //todo 自定义格式，暂不支持

                } else {
                    ruleConfig["checkValue"].push(optionsConst.RULE_MAPPING[fieldOptions[optionsConst.OPTIONS.DATA_FORMAT]]);
                }
            }
            return ruleConfig;
        },
        /**
         * 获取字典值和默认值
         * @param fieldOptions
         */
        getDictCodeAndValue: function (fieldOptions) {
            var options = fieldOptions[optionsConst.OPTIONS.DICTOPTIONS];
            //构建字典项
            var dictCode = [];
            var defaultValue = [];
            for (var i = 0, maxLength = options.length; i < maxLength; i++) {
                dictCode.push({
                    code: options[i].val,
                    value: options[i].label
                });
                if (options[i].checked) {
                    defaultValue.push(options[i].val)
                }
            }
            return {
                dictCode: fieldOptions.dictCode || dictCode,
                defaultValue: defaultValue.join(",")
            };
        },
        /**
         * 搜索json
         */
        combineSearch: function (commonConfig, field) {
            commonConfig["tagName"] = field.label;
            commonConfig["canClear"] = true;
        }
    };

    function FieldControl() {
        var that = this;

        init();

        function init() {
            //初始化render控制器
            that.fieldRender = {};
        }
    }

    /**
     * 渲染控件注册接口，可以使用继承来处理通用属性
     * @param fieldType
     * @param opts
     */
    FieldControl.prototype.registerFieldRender = function (fieldType, opts) {
        this.fieldRender[fieldType] = opts;
    };

    //获取配置
    FieldControl.prototype.getConfig = function (fieldType, code, fieldOptions, formConfig, type) {
        return this.fieldRender[fieldType].getConfig(code, fieldOptions, formConfig, type);
    };

    //获取配置
    FieldControl.prototype.getSearchConfig = function (fieldType, code, fieldOptions, field) {
        return this.fieldRender[fieldType].getConfig("query." + code, fieldOptions, null, null, field);
    };

    //获取编辑html
    FieldControl.prototype.getEditHtml = function (fieldType, modelName, fieldOptions) {
        return this.fieldRender[fieldType].getEditHtml(modelName, fieldOptions);
    };

    //获取查看html
    FieldControl.prototype.getViewHtml = function (fieldType, modelName, fieldOptions) {
        return this.fieldRender[fieldType].getViewHtml(modelName, fieldOptions);
    };

    //获取column的配置，目前只是获取渲染相关的配置
    FieldControl.prototype.getColumnConfig = function (fieldType, fieldOptions, field) {
        return this.fieldRender[fieldType].getColumnConfig(fieldOptions, field);
    };

    //获取column的配置，目前只是获取渲染相关的配置
    FieldControl.prototype.getHtmlTemConfig = function (fieldType, fieldOptions, field) {
        //createTime:2019-1-17 处理选择器不显示问题
        if(fieldType=="selector"){
            var  dictCode =fieldControl.getViewHtml(field["fieldType"], field["code"], field).toUpperCase();
            var label=field.label;
            return "<tr><th>"+label+":</th><td>"+dictCode+"</td></tr>"
        }
       return this.fieldRender[fieldType].getHtmlTemConfig(fieldOptions, field);
    };

    var fieldControl = new FieldControl();

    /***************************************类型渲染配置****************************************************************/
    /**
     *  可在页面中自行扩展
     *      getConfig ： 获取配置
     *      getEditHtml ： 编辑html
     *      getViewHtml ： 查看html
     */

    /**
     * 单行文本
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.TEXT, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type, field) {
            var config = {};
            var commonConfig = {
                maxLength: optionsConst.DEFAULTVALUE.TEXT_MAX_LENGTH
            };
            if (field) {
                commonUtils.combineSearch(commonConfig, field);
            } else {
                commonConfig["rules"] = commonUtils.getCheckRules(fieldOptions)
            }
            config[code] = $.extend(commonConfig, commonUtils.getCommonConfig(fieldOptions, formConfig));
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            //html的格式，是否添加套层div？？？
            return '<div class="element_box"><input type="text" class="i_text" model="' + modelName + '"/></div>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "{{" + modelName + " || ''}}";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions) {
            return {
                renderer: "String"
            };
        },
        getHtmlTemConfig:function(fieldOptions,field){
           /**
            * fixedTimeBy cr DATE:2019-1-18
            * 防止字符串名称过长显示问题
            * */
           return "<tr><th>"+field.label+":</th><td>{{formatName("+field.code.toUpperCase()+") || ''}}</td></tr>";
        }
    });

    /**
     * 数字
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.NUMBER, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type, field) {
            var config = {};
            var commonConfig = {};
            if (field) {
                commonUtils.combineSearch(commonConfig, field);
            } else {
                commonConfig["rules"] = commonUtils.getCheckRules(fieldOptions)
            }
            var commConfig = $.extend(commonConfig, commonUtils.getCommonConfig(fieldOptions, formConfig));
            commConfig.type = "number";
            var numberConfig = {};
            if (fieldOptions.integer) {
                numberConfig.type = "integer";
            } else {
                //为浮点数配置
                //小数位
                if (fieldOptions.decimal && !isNaN(parseInt(fieldOptions.decimal))) {
                    numberConfig.decimal = parseInt(fieldOptions.decimal);
                }
            }
            //最大值
            if (fieldOptions.max && !isNaN(parseInt(fieldOptions.max))) {
                numberConfig.max = parseInt(fieldOptions.max);
            }
            //最小值
            if (fieldOptions.min && !isNaN(parseInt(fieldOptions.min))) {
                numberConfig.min = parseInt(fieldOptions.min);
            }
            commConfig.numberConfig = numberConfig;
            config[code] = commConfig;
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            //html的格式，是否添加套层div？？？
            return '<div class="element_box"><input type="text" class="i_text" model="' + modelName + '"/></div>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "{{" + modelName + " || ''}}";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions) {
            return {
                renderer: "String"
            };
        }
        ,
        getHtmlTemConfig:function(fieldOptions,field){
            return   "<tr><th>"+field.label+":</th><td>{{"+field.code.toUpperCase()+" || ''}}</td></tr>";
        }
    });

    /**
     * 多行文本
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.TEXTAREA, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig) {
            var config = {};
            config[code] = $.extend({
                type: "textarea",
                rules: commonUtils.getCheckRules(fieldOptions),
                textareaConfig: {
                    showNum: true
                },
                maxLength: optionsConst.DEFAULTVALUE.TEXTAREA_MAX_LENGTH
            }, commonUtils.getCommonConfig(fieldOptions, formConfig));
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            return '<div class="element_box"><textarea class="i_textarea" model="' + modelName + '"></textarea></div>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "{{html(" + modelName + ")}}";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions) {
            return {
                renderer: "String"
            };
        },
        getHtmlTemConfig:function(fieldOptions,field){
            return   "<tr><th>"+field.label+":</th><td>{{html(" + field.code.toUpperCase() + ")}}</td></tr>";
        }

    });

    /**
     * 单选
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.RADIO, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type, field) {
            var obj = commonUtils.getDictCodeAndValue(fieldOptions);
            var config = {};
            var commonConfig = {
                type: "dict",
                dictConfig: {
                    dictCode: obj.dictCode,
                    checkType: "radio"
                }
            };
            if (field) {
                commonUtils.combineSearch(commonConfig, field);
            } else {
                commonConfig["rules"] = commonUtils.getCheckRules(fieldOptions);
                commonConfig["defaultValue"] = obj.defaultValue;
            }
            config[code] = $.extend(commonConfig, commonUtils.getCommonConfig(fieldOptions, formConfig));
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            return '<div class="element_box"><div model="' + modelName + '"></div></div>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "{{dict(" + modelName + ",\'get" + modelName + "()\')}}";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions) {
            if(fieldOptions.dictCode){
                return {
                    renderer: "Dict",
                    dictCode: commonUtils.getDictCodeAndValue(fieldOptions).dictCode,
                    dictCodeForMap:fieldOptions.dictCode
                };
            }else{
                return {
                    renderer: "Dict",
                    dictCode: commonUtils.getDictCodeAndValue(fieldOptions).dictCode
                };
            }
        },
        getHtmlTemConfig:function(fieldOptions,field){
            return "<tr><th>"+field.label+":</th><td>{{dict(" + field.code.toUpperCase() + ",'"+fieldOptions.dictCode+"')}}</td></tr>";
        }
    });

    /**
     * 多选
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.CHECKBOX, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type, field) {
            var obj = commonUtils.getDictCodeAndValue(fieldOptions);
            var config = {};
            var commonConfig = {
                type: "dict",
                dictConfig: {
                    dictCode: obj.dictCode,
                    checkType: "checkbox"
                }
            };
            if (field) {
                commonUtils.combineSearch(commonConfig, field);
            } else {
                commonConfig["rules"] = commonUtils.getCheckRules(fieldOptions);
                commonConfig["defaultValue"] = obj.defaultValue;
            }
            config[code] = $.extend(commonConfig, commonUtils.getCommonConfig(fieldOptions, formConfig));
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            return '<div class="element_box"><div model="' + modelName + '"></div></div>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "{{dict(" + modelName + ",\'get" + modelName + "()\')}}";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions) {
            if(fieldOptions.dictCode){
                return {
                    renderer: "Dict",
                    dictCode: commonUtils.getDictCodeAndValue(fieldOptions).dictCode,
                    dictCodeForMap:fieldOptions.dictCode
                };
            }else{
                return {
                    renderer: "Dict",
                    dictCode: commonUtils.getDictCodeAndValue(fieldOptions).dictCode
                };
            }
        },
        getHtmlTemConfig:function(fieldOptions,field){
            return "<tr><th>"+field.label+":</th><td>{{dict(" + field.code.toUpperCase() + ",'"+fieldOptions.dictCode+"')}}</td></tr>";
        }
    });

    /**
     * 下拉
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.SELECT, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type, field) {
            var obj = commonUtils.getDictCodeAndValue(fieldOptions);
            var config = {};
            var commonConfig = {
                type: "dict",
                dictConfig: {
                    dictCode: obj.dictCode,
                    plsSelectName: fieldOptions[optionsConst.OPTIONS.SHOWPLSSELECT] ? fieldOptions[optionsConst.OPTIONS.PLSSELECTNAME] : undefined,
                    showPlsSelect: fieldOptions[optionsConst.OPTIONS.SHOWPLSSELECT]
                }
            };
            if (field) {
                commonUtils.combineSearch(commonConfig, field);
            } else {
                commonConfig["rules"] = commonUtils.getCheckRules(fieldOptions);
                commonConfig["defaultValue"] = obj.defaultValue;
            }
            config[code] = $.extend(commonConfig, commonUtils.getCommonConfig(fieldOptions, formConfig));
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            return '<div class="element_box ele_0"> <select class="i_select" model="' + modelName + '"></select> </div>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "{{dict(" + modelName + ",\'get" + modelName + "()\')}}";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions) {
            if(fieldOptions.dictCode){
                return {
                    renderer: "Dict",
                    dictCode: commonUtils.getDictCodeAndValue(fieldOptions).dictCode,
                    dictCodeForMap:fieldOptions.dictCode
                };
            }else{
                return {
                    renderer: "Dict",
                    dictCode: commonUtils.getDictCodeAndValue(fieldOptions).dictCode
                };
            }
        },
        getHtmlTemConfig:function(fieldOptions,field){
            return "<tr><th>"+field.label+":</th><td>{{dict(" + field.code.toUpperCase() + ",'"+fieldOptions.dictCode+"')}}</td></tr>";
        }
    });

    /**
     * 日期
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.DATEPICKER, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type, field) {
            var initConfig = $.extend({
                type: "date",
                dateConfig: {
                    type: fieldOptions[optionsConst.OPTIONS.DATEFMT_TYPE],
                    dateFmt: fieldOptions[optionsConst.OPTIONS.DATEFMT],
                    defaultDate: fieldOptions[optionsConst.OPTIONS.DEFAULT_VALUE_TYPE] === "today"
                }
            }, commonUtils.getCommonConfig(fieldOptions, formConfig));
            var dateConfig = initConfig["dateConfig"];
            if (fieldOptions[optionsConst.OPTIONS.IS_START_DATE]) {
                dateConfig["minDate"] = fieldOptions[optionsConst.OPTIONS.START_DATE_TYPE] === "specific" ? fieldOptions[optionsConst.OPTIONS.START_DATE] : "";
                if (fieldOptions[optionsConst.OPTIONS.END_DATE_TYPE] === "today") {
                    dateConfig["maxDate"] = "sysdate";
                } else if (fieldOptions[optionsConst.OPTIONS.START_DATE_TYPE] !== "specific" && fieldOptions[optionsConst.OPTIONS.START_DATE_TYPE] !== "today") {
                    dateConfig["minDate"] = parseInt((fieldOptions[optionsConst.OPTIONS.START_DATE_TYPE] === "before" ? "-" : "+") + (fieldOptions[optionsConst.OPTIONS.START_DATE] || 0))
                }
            }
            if (fieldOptions[optionsConst.OPTIONS.IS_END_DATE]) {
                dateConfig["maxDate"] = fieldOptions[optionsConst.OPTIONS.END_DATE_TYPE] === "specific" ? fieldOptions[optionsConst.OPTIONS.END_DATE] : "";
                if (fieldOptions[optionsConst.OPTIONS.END_DATE_TYPE] === "today") {
                    dateConfig["maxDate"] = "sysdate";
                } else if (fieldOptions[optionsConst.OPTIONS.END_DATE_TYPE] !== "specific" && fieldOptions[optionsConst.OPTIONS.END_DATE_TYPE] !== "today") {
                    dateConfig["maxDate"] = parseInt((fieldOptions[optionsConst.OPTIONS.END_DATE_TYPE] === "before" ? "-" : "+") + (fieldOptions[optionsConst.OPTIONS.END_DATE] || 0))
                }
            }
            if (field) {
                commonUtils.combineSearch(initConfig, field);
            } else {
                initConfig["rules"] = commonUtils.getCheckRules(fieldOptions);
                if (fieldOptions[optionsConst.OPTIONS.DEFAULT_VALUE_TYPE] === "today") {
                    initConfig["defaultValue"] = null;
                }
            }
            var config = {};
            config[code] = initConfig;
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            return '<div class="element_box"><input type="text" class="i_date" model="' + modelName + '"/></div>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "{{date(" + modelName + "," + fieldOptions[fieldOptions[optionsConst.OPTIONS.DATEFMT]] + ")}}";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions) {
            return {
                renderer: "Date",
                format: fieldOptions.datefmt
            };
        },
        getHtmlTemConfig:function(fieldOptions,field){
            return "<tr><th>"+field.label+":</th><td>{{date(" + field.code.toUpperCase() + ",'yyyy-MM-dd')}}</td></tr>";        }
    });

    /**
     * 附件
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.ATTACHMENT, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type) {
            var attConfig = {
                type: "file",
                rules: commonUtils.getCheckRules(fieldOptions),
                fileConfig: {
                    type: "inner",
                    fileType: fieldOptions.media_type === "custom" ? fieldOptions.media : optionsConst.FILE_TYPE[fieldOptions.media_type],
                    fileSize: fieldOptions.max_file_size ? fieldOptions.max_file_size + "MB" : null,
                    minNum: fieldOptions.min_file_quantity > 0 ? parseInt(fieldOptions.min_file_quantity) : null,
                    maxNum: fieldOptions.max_file_quantity > 0 ? parseInt(fieldOptions.max_file_quantity) : 99,
                    listName: fieldOptions.placeholder
                }
            };
            //查看状态
            if (type === "ck") {
                attConfig.disabled = true;
            }
            var config = {};
            config[code] = attConfig;
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            return '<input type="hidden" model="' + modelName + '"/>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return '<input type="hidden" model="' + modelName + '"/>';
        }
    });

    /**
     * 选择器
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.SELECTOR, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type, field) {
            //todo 测试需要调整
            var obj = {};
            //需要配置code和name
            obj[code] = {
                display: false
            };
            //获取选择器类型
            var selectObj = optionsConst.SELECTOR[fieldOptions.selector_type];
            var layerConfig = {
                canDelete: true,
                deleteProperty: code
            };
            var param = selectObj.param || {};
            if (fieldOptions.is_single === true || fieldOptions.is_single === "true") {
                //多选
                param["multyFlag"] = "false";
            } else {
                //多选
                param["selectType"] = "mul";
            }
            //还需要排除已经选择过的
            obj[code + "_name"] = {
                type: "layer",
                layerConfig: {
                    title: selectObj.title,
                    url: selectObj.url,
                    style: selectObj.style,
                    param: param,
                    callbackFunc: code + "_nameFunc",
                    canDelete: true,
                    deleteProperty: code
                },
                ifForm: false
            };
            if (field) {
                commonUtils.combineSearch(obj[code + "_name"], field);
            } else {
                obj[code + "_name"]["rules"] = commonUtils.getCheckRules(fieldOptions);

            }
            window[code + "_nameFunc"] = function (ids, names, viewModel) {
                viewModel.set(code + "_name", names);
                viewModel.set(code, ids);
            };
            return obj;
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            return '<div class="element_box"><input type="text" class="i_layer" model="' + (modelName + '_name') + '" />' +
                '<input type="hidden" model="' + modelName + '"/></div>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "{{" + modelName + "_name}}";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions, field) {
            return {
                id: field["code"].toUpperCase() + "_NAME",
                renderer: "String"
            };
        },
        getHtmlTemConfig:function(fieldOptions,field){
            return  "";
        }
    });

    /**
     * 数据库字段
     */
    fieldControl.registerFieldRender(optionsConst.TYPE.DATABASE, {
        //编辑时的配置
        getConfig: function (code, fieldOptions, formConfig, type, field) {
            var config = {};
            config[code] = {
                display: false
            };
            return config
        },
        //编辑视图
        getEditHtml: function (modelName, fieldOptions) {
            //html的格式，是否添加套层div？？？
            return '<input type="hidden" model="' + modelName + '"/>';
        },
        //查看视图
        getViewHtml: function (modelName, fieldOptions) {
            return "";
        },
        /**
         * 获取column配置
         */
        getColumnConfig: function (fieldOptions) {
            return {
                renderer: "String"
            };
        },
        getHtmlTemConfig:function(fieldOptions,field){
            return "";
        }
    });

    window.fieldControl = fieldControl;
}).call(this);
