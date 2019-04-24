// 替换html中的特殊符号
function _replaceSymbols(s) {
    if (s) {
        s = s.toString().replace(/</g, "&lt;");
        s = s.toString().replace(/>/g, "&gt;");
    }
    return s;
}

//替换"."为"_"
function _replacePointToUderline(s) {
    if (s) {
        s = s.toString().replace(/\./g, "_");
    }
    return s;
}

//CR:配置渲染器，剥离出来，方便维护
var CR = {
    /*****************************************************************
     *  参数：字段初始配置默认值
     *****************************************************************/
    defaultPropertyJson: {
        //核心结构
        main: {
            disabled: false, //禁用标志，权限高于状态json。可选值：true/false。
            display: true, //显示标志。可选值：true/false。
            width: "",  //Zp add. 字段控件宽度设置，可根据具体情况个性定制
            defaultValue: null, //默认值，不设置则为null，否则为具体值。如果是日期格式的话需要和fmt相同的字符串或者是日期毫秒数
            maxLength: null, //最大长度，不设置则为null，否则为具体数字。
            type: "normal",  //控件类型，默认为“normal”,否则为具体的控件类型：“normal”、“dict”、“date”、“layer”、“file”、“img”。
            changeFunc: null,  //后置接口名称，当字段值变更时触发该处注册的方法。该处填写为字符串方法名。
            tagName: "",  //Zp add. searchView用，作为字段的中文显示。
            spanShow: true,  //Zp add. 当字段被禁用时，是否开启spanshow
            spanType: "ellipsis",  //Pc add. ellipsis:超出多行，multiline:换行显示
            ifForm: true,    //是否提交，getJson时会根据该项判断是否需要转换成json。可选值：true/false。同时getSearchJson作为是否提交搜索条件的标志。
            canThink: false,    //输入可联想
            thinkFunc: "",       //联想函数，获取数据，根据输入值
            thinkUrl: "",       //获取联想数据的url，内部实现异步加载数据，不需要处理项目路径
            linkId: "",      //关联字段，联想可能输入选择数据时将id值赋值给linkId
            clearIfNotSelectThinkItem: false, //如果未选择联想项，是否清除字段内容
            thinkIfEmpty: false,   //若值为空，是否联想
            canClear: false, //搜索区字段专用：字段是否可清空，true可被清空成defaultValue或“”，同时当有显示的字段canClear为true，则搜索面板显示“恢复”按钮
            colLength: 1    //搜索区字段专用：字段所占列数
        },
        rules: {//规则配置
            //选择具体的验证方法名填入下面合适的数组中：参考validate.js.
            //具体方法有：1、"notNull"非空验证 2、"isIntEqZero" 3、判断整数是否等于0 4、"isIntGtZero"判断整数num是否大于0
            //5、"isIntGteZero"判断整数num是否大于或等于0 6、"isEmail"匹配Email地址 7、"isNumber"判断数值类型，包括整数和浮点数
            //8、"isDigits"只能输入数字[0-9] 9、"isPhone"手机或固定电话 10、"isTel"匹配固定电话 11、"isMobile"匹配手机号
            //12、"isQq"匹配qq 13、"isIp"判断是否为ip地址 14、"isDate"匹配日期（“2016-01-01”） 15、"inOneAndHundred"判断输入值是否在0-100之间
            //16、"isEnglish"匹配英文  17、"isInteger"匹配整数 18、"isDouble"匹配Double或float  19、"isZipCode"匹配邮政编码 20、"isUrl"匹配URL
            //21、"isRightfulString"判断是否为合法字符(a-zA-Z0-9-_) 22、"isNumAndEnglish"判断是否为数字和字母的组合 23、"isIdCardNo“匹配身份证号码
            //24、"isChinese"匹配汉字 25、"isChineseChar"匹配中文(包括汉字和字符) 26、"stringCheck"字符验证，只能包含中文、英文、数字、下划线等字符。
            //27、"isCode"验证是否为编码（字母数字下划线）
            checkKeyup: [],  //输入验证，挂载输入事件。
            checkValue: [],  //失焦验证，挂载失焦事件，同时当调用模型验证接口时优先触发。
            checkSave: []    //保存验证，当调用模型验证接口时触发。
        },
        //字典项类型配置，type:"dict"时生效
        dictConfig: {
            dictCode: null, //请求的字段类型编码，对应数据库zdlxcode，字符串类型。
            reqInterface: null, //个性化字典请求接口名，如为个性化字典，则请求该处注册的个性字典，获取具体的字典数据。该处填写为字符串方法名。
            pcode: null, //供筛选的父级字典值，默认为null。
            checkType: null, //字典项控件类型，可为“checkbox”、“radio”，null则为默认下拉字典项。
            dependence: null, //依赖的级联字典项字段名
            showPlsSelect: true,   //若为下拉字典项，显示“请选择”项，可选值true/false。
            plsSelectName: "请选择",    //为选择内容的“请选择”可定制。
            ifSearch: false //若为下拉字典项，是否为搜索下拉框，可选值true/false。
        },
        //日期类型配置，type:"date"时生效
        dateConfig: {
            type: "",                   //日期可选择的类型，根据fmt自动填入（yyyy（年|-|/）等基础格式可以自动转化，不满足需要自己填写）
                                        // year(年),month(年、月),date(年、月、日),time(时、分、秒),datetime(年、月、日、时、分、秒)。
            dateFmt: "yyyy-MM-dd", //显示日期格式，默认为年月日，如“2016-06-22”,可根据需要具体配置,
            // yyyy（年份，至少四位数。如果不足四位，则前面补零）|y（年份，不限制位数，即不管年份多少位，前面均不补零），其它类似，无十二小时制，所以小时是HH
            defaultDate: false,  //是否默认为系统时间，可选值：true/false。
            maxDate: null, //最大日期（包含），可为具体的日期字符串（根据fmt拼写），也可为渲染最大日期的字段（只能为当前instance中的字段），也可为“sysdate”表示以系统时间为限，
            // 可以是数字。数字＜86400000，则数字代表天数，如：min: -7，即代表最小日期在7天前，正数代表若干天后，0表示当前时间
            //todo 日期类型未time时不支持sysdate和0
            maxDateExtend: null,//对象，可以配置year(年),month（月）,date(日)，hours（时），minutes（分），seconds（秒），+（大于）+num，-（小于）+num多少天
            minDate: null, //最小日期，可为具体的日期字符串，也可为渲染最小日期的字段，也可为“sysdate”表示以系统时间为限。
            minDateExtend: null,  //对象，可以配置year(年),month（月）,date(日)，hours（时），minutes（分），seconds（秒），+（大于）+num，-（小于）+num多少天
            focusPosit: null,     //聚焦到下一日期位置
            range: false         //时间段选择，存在开启，为true是分割字符是-，也可直接传入分割字符
        },
        //弹出层类型配置，type:"layer"时生效
        layerConfig: {
            type: "frame",     //弹出方式，默认为frame，弹出窗口，可以为div，浮动在输入框下面
            divWidth: "",     //设置为div时设置的宽度
            divHeight: "200px",
            title: "弹出层",  //弹出层标题，字符串类型。
            style: "medium", //弹出层样式类型，可选值：“small”（小）、“medium”（中）、“big”（大）、“tree”（树）或是个性配置,两项的字符串数组，如：["200px","300px"]。
            url: null, //请求url，字符串类型，如“sggl/getSgry?”需带上第一个连接符。
            param: {},   //弹出层参数
            checkFunc: null, //弹出层前置接口名称，该处填写为字符串方法名。当方法返回false，则不弹出弹出层，若返回字符串，则拼接到url中，如“dwlx=1&rylx=2”。
            callbackFunc: null,  //弹出层回调接口名称，该处填写为字符串方法名。
            canDelete: false, //弹出层内容是否可删除，true则显示删除按钮，可选值：true/false。
            deleteProperty: null,   //当点击删除按钮时，同时删除的字段，若为单子段可为string，若为多字段可为array
            name: "",    //关联的名称属性,在id中配置，名称如果不需要存储到数据库，可配置
            canInput: false   //是否可以输入
        },
        //附件类型配置，type:"file"时生效
        fileConfig: {
            type: "list",  //附件控件类型，可为：“list”手风琴附件、"table"附件列表、“inner”横向附件块。
            fileType: null, //文件类型限制，配置为字符串，如：“*.jpg;*.png;*.gif”。
            fileSize: null, //文件大小限制  5KB  5M
            dictCode: null, //若为手风琴附件，配置字典名称。
            pcode: null, //若为手风琴附件，若字典有上级字典依赖，则配置上级字典编号。
            reqInterface: null, //个性化字典请求接口名，如为个性化字典，则请求该处注册的个性字典，获取具体的字典数据。该处填写为字符串方法名。
            defaultType: null, //默认附件类型编码，同字典项编码。
            uploadName: "上传附件", //上传按钮名称，null则上传按钮显示为“上传资料”。
            minNum: null,  //上传最小数量，配置为数字，若设置弹出层各字典项。
            maxNum: 99, //上传附件的最大数量。
            listName: "上传附件",//附件列表名称,
            canDelete: true //附件类型为image时，当为true时，显示删除按钮
        },
        //弹出层类型配置，type:"img"时生效
        imgConfig: {
            imgSrc: null,  //图片路径。
            imgGetFunc: null //获取图片方法名。该处填写为字符串方法名。
        },
        //多行文本类型配置
        textareaConfig: {
            type: "textarea",
            rich: false, //富文本
            showNum: false, //是否显示输入文字的数目
            richConfig: { //富文本配置
                tools: 'Cut,Copy,Paste,PastetextTip,Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Align,List,Outdent,Indent,Link,Unlink,Img,Hr,Emot,Table,WYSIWYG',
                skin: RX.cookie("skin") === 'dark' ? "dark" : "default",
                showBlocktag: false,
                internalScript: false,
                internalStyle: true,
                width: '100%',
                height: '450',
                fullscreen: false,
                sourceMode: false,
                forcePtag: true,
                html5Upload: false,
                upMultiple: '1',
                upImgUrl: RX.handlePath('/attachment/upload'),
                upImgExt: 'jpg,jpeg,gif,png',
                localUrlTest: /^https?:\/\/[^\/]*?(xheditor\.com)\//i,
                emots: {
                    msn: {name: 'MSN', count: 40, width: 22, height: 22, line: 8},
                    pidgin: {
                        name: 'Pidgin',
                        width: 22,
                        height: 25,
                        line: 8,
                        list: {
                            smile: '微笑',
                            cute: '可爱',
                            wink: '眨眼',
                            laugh: '大笑',
                            victory: '胜利',
                            sad: '伤心',
                            cry: '哭泣',
                            angry: '生气',
                            shout: '大骂',
                            curse: '诅咒',
                            devil: '魔鬼',
                            blush: '害羞',
                            tongue: '吐舌头',
                            envy: '羡慕',
                            cool: '耍酷',
                            kiss: '吻',
                            shocked: '惊讶',
                            sweat: '汗',
                            sick: '生病',
                            bye: '再见',
                            tired: '累',
                            sleepy: '睡了',
                            question: '疑问',
                            rose: '玫瑰',
                            gift: '礼物',
                            coffee: '咖啡',
                            music: '音乐',
                            soccer: '足球',
                            good: '赞同',
                            bad: '反对',
                            love: '心',
                            brokenheart: '伤心'
                        }
                    },
                    ipb: {
                        name: 'IPB',
                        width: 20,
                        height: 25,
                        line: 8,
                        list: {
                            smile: '微笑',
                            joyful: '开心',
                            laugh: '笑',
                            biglaugh: '大笑',
                            w00t: '欢呼',
                            wub: '欢喜',
                            depres: '沮丧',
                            sad: '悲伤',
                            cry: '哭泣',
                            angry: '生气',
                            devil: '魔鬼',
                            blush: '脸红',
                            kiss: '吻',
                            surprised: '惊讶',
                            wondering: '疑惑',
                            unsure: '不确定',
                            tongue: '吐舌头',
                            cool: '耍酷',
                            blink: '眨眼',
                            whistling: '吹口哨',
                            glare: '轻视',
                            pinch: '捏',
                            sideways: '侧身',
                            sleep: '睡了',
                            sick: '生病',
                            ninja: '忍者',
                            bandit: '强盗',
                            police: '警察',
                            angel: '天使',
                            magician: '魔法师',
                            alien: '外星人',
                            heart: '心动'
                        }
                    }
                },
                loadCSS: '<style>body{ no-repeat right bottom fixed},pre{margin-left:2em;border-left:3px solid #CCC;padding:0 1em;}</style>'
            }
        },
        //数字类型p配置，type:"number"时生效
        numberConfig: {
            type: "float",    //数字类型，interger整数，float浮点数
            ifKeyupCheck: true,   //是否输入时就验证，否整在输入完成之后验证
            max: null,         //最大值
            min: null,         //最小值
            decimal: null      //小数位
        }
    },
    /*****************************************************************
     *  方法：核心方法，渲染字段
     *  reRenderFlag 重新绘制进入的标志
     *****************************************************************/
    renderProperty: function (t, config, reRenderFlag, instance) {
        //数据准备
        var $el = $(t);
        var initJson = instance.initJson;
        var tagName = $el.prop("tagName");
        var keypath = $el.attr("rx-path");
        var pro = (keypath || "").split(".").pop();
        var keyValue = instance.get(keypath);
        var cid = $el.attr("rx-cid");

        /**
         * 清空render渲染的个性操作
         */
        function clearRender() {
            var $jParent = $el.parent();
            var $select2 = $jParent.find(".select2-container");
            if ($select2.length) {
                $select2.remove();
            }
        }

        /**
         * 重新渲染时，清空render渲染的个性操作
         */
        function clearReRender() {
            //清除图标
            var $jParent = $el.parent();
            //标志位class，本次添加的icon
            //Zp 20180809 关闭判断，解决“禁用字段后，日期组件按钮未去除”的问题
            // if (!$jParent.hasClass("_addFlag")) {
            var $iconDom = $el.siblings(".auto_ico_box");
            if ($iconDom.length) {
                $iconDom.remove();
                $el.parent().removeClass("ele_1 ele_2");
            }
            // }
            //去除laydate绑定的事件
            $el.off("._laydate");
            //去除laydate时间绑定的标识
            $el[0].eventHandler = false;
            //去除textarea的字数目区域
            if ($el.parent().next().hasClass("trans_language")) {
                $el.parent().next().remove();
            }
            //清除挂载事件和readonly属性
            $el.unbind("ModelEvent");
        }

        /**
         * 根据配置处理dom，数据等
         */
        function handleByConfig() {
            $el.prop("readonly", false);

            //可见、不可见的控制
            if (config.display) {
                $el.removeClass("hideElement");
            } else {
                $el.addClass("hideElement");
            }
            //最大长度的控制
            if (config.maxLength) {
                $el.prop("maxlength", config.maxLength);
                if (keyValue) {
                    keyValue = keyValue.toString().substring(0, config.maxLength);
                    instance.set(keypath, keyValue);
                }
            } else {
                //存在maxlength才移除，不然ie会报错
                $el.attr("maxlength") != undefined && $el.removeAttr("maxlength");
            }

            //控件宽度设置
            if (config.width) {
                $el.width(config.width);
            }
        }

        /**
         * 绑定验证事件
         */
        function bindEvent() {
            var objselect = $el[0];
            //规则绑定
            //如果变量存在valueRules验证规则，则在DOM上添加相应事件
            if (config.rules.checkValue && config.rules.checkValue.length > 0) {
                //对DOM添加事件
                //4-19 zhan修改keyup为blur，部分验证需要输入完成再验证
                $el.bind("blur.ModelEvent", function () {
                    $el.removeClass("TextBoxErr").removeClass("ValueErrorTag");
                    $el.parent().find(".invalidtip").remove();
                    for (var i = 0; i < config.rules.checkValue.length; i++) {
                        if (config.rules.checkValue[i] == "checkNumlength") {
                            var iLength = config.numLength[0];
                            var fLength = config.numLength[1];
                            // var func = eval(config.rules.checkValue[i]);
                            // if (typeof func === "function" && !func(objselect, iLength, fLength)) {
                            //     $el.addClass("ValueErrorTag");
                            // }
                            var func = RX.getGlobalFunc(config.rules.checkValue[i]);
                            if (func && !func(objselect, iLength, fLength)) {
                                $el.addClass("ValueErrorTag");
                            }
                        } else {
                            // var func = eval(config.rules.checkValue[i]);
                            // if (typeof func === "function" && !func(objselect)) {
                            //     $el.val("");
                            //     $el.addClass("ValueErrorTag");
                            // }
                            var func = RX.getGlobalFunc(config.rules.checkValue[i]);
                            if (func && !func(objselect, false, config, instance)) {
                                instance.set(keypath, "");
                                $el.addClass("ValueErrorTag");
                            }
                        }
                    }
                });
            }
            //如果变量存在valueRules验证规则，则在DOM上添加相应事件
            if (config.rules.checkKeyup && config.rules.checkKeyup.length > 0) {
                //对DOM添加事件
                //4-19 zhan修改keyup为blur，部分验证需要输入完成再验证
                $el.bind("keyup.ModelEvent", function () {
                    $el.removeClass("TextBoxErr");
                    $el.parent().find(".invalidtip").remove();
                    for (var i = 0; i < config.rules.checkKeyup.length; i++) {
                        // var func = window[config.rules.checkKeyup[i]];
                        // if (typeof func === "function" && !func(objselect)) {
                        //     $el.val("");
                        // }
                        var func = RX.getGlobalFunc(config.rules.checkKeyup[i]);
                        if (func) {
                            var funcResult = func(objselect, false, config, instance);
                            if (typeof funcResult === "boolean") {
                                if (!funcResult) {
                                    instance.set(keypath, "");
                                    break;
                                }
                            } else {
                                instance.set(keypath, funcResult);
                            }
                        }
                    }
                });

                $el.bind("blur.ModelEvent", function () {
                    $el.removeClass("TextBoxErr");
                    $el.parent().find(".invalidtip").remove();
                })
            }
            //挂载后置事件
            if (config.changeFunc && tagName !== "SELECT") {
                $el.bind("change.ModelEvent", function () {
                    // eval(config.changeFunc + "(instance,keypath)");
                    RX.runGlobalFunc(config.changeFunc, instance, keypath);
                })
            }
            if (tagName === "SELECT") {
                $el.parent().bind("click.ModelEvent", function () {
                    $el.removeErrorTip();
                    $el.addClass("prompt");
                });
            }
            //挂载失焦去验证事件
            $el.bind("focus.ModelEvent", function () {
                $el.removeErrorTip();
                $el.addClass("prompt");
            });
            $el.bind("blur.ModelEvent", function () {
                $el.removeClass("prompt");
                if (tagName === "INPUT" && !$el.hasClass("TextBoxErr")) {
                    $el.prop("title", $el.val());
                }
            });
        }

        /**
         * 设置显示的值
         */
        function setShowValue() {
            //值渲染
            if (tagName === "INPUT") {
                if (config.type === "date") {    //若为日期控件，需将毫秒数转为日期格式
                    if (keyValue != null && $.trim(keyValue.toString()) != "") {
                        var keyValueStr = keyValue.toString();
                        var floatValue = parseFloat(keyValueStr);
                        if (floatValue == keyValueStr && floatValue > 86400000) {
                            //是日期
                            var datestr = new Date(parseFloat(keyValueStr)).Format(config.dateConfig.dateFmt);
                            keyValue = datestr;
                            instance.set(keypath, datestr);
                        } else {
                            //日期格式，和fmt想同
                            instance.set(keypath, keyValue);
                        }
                    } else {
                        if (!config.dateConfig.defaultDate) {
                            keyValue = "";
                            instance.set(keypath, "");
                        }
                    }
                }
                else {
                    var type = $el.prop("type");
                    switch (type) {
                        case "text":
                            if (keyValue != null)
                                instance.set(keypath, keyValue);
                            break;
                        case "hidden":
                            if (keyValue != null)
                                instance.set(keypath, keyValue);
                            break;
                        case "checkbox":
                            disableLabelByInput($el);
                            setCheckLabelByInput($el);
                            break;
                        case "radio":
                            disableLabelByInput($el);
                            setRadioLabelByInput($el);
                            $el.click(function () {
                                $("*[rx-cid='" + instance.cid + "'][rx-path='" + keypath + "']").parent().removeClass("TextBoxErr");
                            });
                            break;
                    }
                }
                $el.bind("keyup.ModelEvent", function () {
                    $el.prop("title", instance.get(keypath));
                })
            }

            else if (tagName == "SELECT") {
                //若为字典项，先获取字典项
                if (config.type == "dict") {
                    var zdx = null;
                    if (config.dictConfig.reqInterface) {//自定义获取字典项json接口
                        // zdx = eval(config.dictConfig.reqInterface + "(instance,keypath)");
                        zdx = RX.runGlobalFunc(config.dictConfig.reqInterface, instance, keypath);
                        CR.fillDict($el, instance.cid, config, instance, zdx, pro);
                        instance.set(keypath, $(t).setSelectVal(keyValue));
                    } else if (config.dictConfig.dictCode) {//dictCode定义的条件下调用统一请求
                        //暂不考虑不可编辑状态下时获取所有字典项，addEvent 时有问题。一起考虑
                        //if($el.hasClass("disabled")){
                        //    zdx = CR.getZdDict(config.dictConfig.dictCode);
                        //}else{
                        //    zdx = CR.getZdDict(config.dictConfig.dictCode, config.dictConfig.pcode);
                        //}

                        zdx = CR.getZdDict(config.dictConfig.dictCode, config.dictConfig.pcode);
                        if (zdx != null) {
                            CR.fillDict($el, instance.cid, config, instance, zdx, pro);
                            instance.set(keypath, $(t).setSelectVal(keyValue));
                        }
                    }

                    //zxh edit 20180408 start
                    if (!RX.browser.isIE6 && !RX.browser.isIE7) {
                        if ($el.hasClass("select2-hidden-accessible")) {
                            if ($el.next().hasClass("select2")) {
                                $el.next().remove();
                            }
                            $el.removeClass("select2-hidden-accessible");
                        }
                        if (!$el.hasClass("disabled") && !$el.is(":hidden")) {
                            if (config.dictConfig.ifSearch) {
                                $el.select2();
                                $el.attr("rx-ifsearch", "1");
                            } else {
                                $el.select2({minimumResultsForSearch: -1});
                                $el.attr("rx-ifsearch", "0");
                            }
                            $el.off("select2:open").on("select2:open", function () {
                                $(".layui-laydate").hide();
                            })
                            //绑定点击样式事件
                            $el.next().find(".select2-selection--single").click(function () {
                                $(this).addClass('click');
                            });
                            $el.off("select2:select").on("select2:select", function (event) {
                                instance.set(keypath, $el.val());
                                $el.trigger("change");
                                Rxvm.dom.trigger($el[0], "change", event, instance);
                                if (config.changeFunc) {
                                    // eval(config.changeFunc + "(instance,keypath)");
                                    RX.runGlobalFunc(config.changeFunc, instance, keypath);
                                }
                            });
                            if (config.width) {
                                $el.next().width(config.width);
                            } else {
                                $el.next().width("100%");
                            }
                        }
                    }
                    //zxh edit 20180408 end
                } else {
                    if (keyValue != null)
                    // setTimeout(function () {
                        try {
                            $el.val(keyValue)
                        } catch (e) {

                        }
                    // }, 1);
                }
                //下拉框所在td冒泡解决
                $el.parent().click(function () {
                    return false;
                })
            } else if (tagName == "LABEL" || tagName == "SPAN") {
                if (config.type == "date") {
                    if (keyValue != null && $.trim(keyValue.toString()) != "") {
                        var keyValueStr = keyValue.toString();
                        var floatValue = parseFloat(keyValueStr);
                        if (floatValue == keyValueStr && floatValue > 86400000) {
                            //是日期
                            var datestr = new Date(parseFloat(keyValueStr)).Format(config.dateConfig.dateFmt);
                            keyValue = datestr;
                            instance.set(keypath, datestr);
                        } else {
                            //日期格式，和fmt想同
                            instance.set(keypath, keyValue);
                        }
                    } else {
                        if (!config.dateConfig.defaultDate) {
                            keyValue = "";
                            instance.set(keypath, "");
                        }
                    }
                } else if (keyValue != null) {
                    $el.text(keyValue);
                }
            } else if (tagName == "DIV") {
                //若为字典项，先获取字典项
                if (config.type == "dict") {
                    var zdx = null;
                    if (config.dictConfig.reqInterface) {//自定义获取字典项json接口
                        // zdx = eval(config.dictConfig.reqInterface + "(instance)");
                        zdx = RX.runGlobalFunc(config.dictConfig.reqInterface, instance);
                        CR.fillDict($el, instance.cid, config, instance, zdx, pro);
                        if (keyValue != null) {
                            var checkval = keyValue.toString().split(",");
                            instance.set(keypath, keyValue);
                            for (var i = 0; i < checkval.length; i++) {
                                $el.find('input[type=checkbox][value=' + checkval[i] + ']').each(function () {
                                    $(this).attr("checked", "checked");
                                    setCheckLabelByInput(this);
                                });
                                $el.find('input[type=radio][value=' + checkval[i] + ']').each(function () {
                                    $(this).attr("checked", "checked");
                                    setRadioLabelByInput(this);
                                });
                            }
                        }
                    } else if (config.dictConfig.dictCode) {//dictCode定义的条件下调用统一请求
                        var zdx = CR.getZdDict(config.dictConfig.dictCode, config.dictConfig.pcode);
                        if (zdx != null) {
                            CR.fillDict($el, instance.cid, config, instance, zdx, pro);
                            if (keyValue != null) {
                                var checkval = keyValue.toString().split(",");
                                for (var i = 0; i < checkval.length; i++) {
                                    $el.find('input[type=checkbox][value=' + checkval[i] + ']').each(function () {
                                        $(this).attr("checked", "checked");
                                        setCheckLabelByInput(this);
                                    });
                                    $el.find('input[type=radio][value=' + checkval[i] + ']').each(function () {
                                        $(this).attr("checked", "checked");
                                        setRadioLabelByInput(this);
                                    });
                                }
                            }
                        }
                    }
                    //设置初值
                    var chkArr = [];
                    $el.find("input").each(function (i, t) {
                        var $t = $(t);
                        if ($t.prop("checked")) {
                            chkArr.push($t.val());
                        }
                    })
                    instance.set(keypath, chkArr.join());
                    //禁用处理
                    if ($el.hasClass("disabled")) {
                        $el.find('input[type=checkbox]').each(function () {
                            $(this).prop("disabled", true);
                            $(this).addClass("disabled");
                            disableLabelByInput($(this));
                        });
                        $el.find('input[type=radio]').each(function () {
                            $(this).prop("disabled", true);
                            $(this).addClass("disabled");
                            disableLabelByInput($(this));
                        });
                    } else {
                        $el.find('input[type=checkbox]').each(function () {
                            disableLabelByInput($(this));
                        });
                        $el.find('input[type=radio]').each(function () {
                            disableLabelByInput($(this));
                        });
                    }
                    $el.off("change.ModelEvent").on("change.ModelEvent", function (event) {
                        var chkArr = [];
                        $el.find("input").each(function (i, t) {
                            var $t = $(t);
                            if ($t.prop("checked")) {
                                chkArr.push($t.val());
                            }
                        })
                        instance.set(keypath, chkArr.join());
                    })
                }
            }
        }

        /************渲染接口********************/

        /**
         * layer形式的渲染
         */
        function layerRender() {
            if (config.layerConfig.canDelete) {
                if (!$el.hasClass("doc_layer") && !$el.hasClass("disabled")) {
                    var $div = $('<div class="auto_ico_box ico_2"></div>');
                    $div.append('<span class="popup" title="选择"><i class="iconfont">&#xe662;</i></span>');
                    $div.append('<span class="eliminate" title="删除"><i class="iconfont">&#xe606;</i></span>');
                    $el.parent().addClass("ele_2").append($div);
                    reRenderFlag && $el.parent().addClass("_addFlag");
                    //同时删除字段数组初始化
                    var deleteProperty = config.layerConfig.deleteProperty;
                    if (!deleteProperty) {
                        deleteProperty = [];
                    } else if (typeof deleteProperty === "string") {
                        deleteProperty = [deleteProperty];
                    } else if (!(deleteProperty instanceof Array)) {
                        deleteProperty = [];
                    }
                    //删除事件绑定
                    $div.find(".eliminate").click(function () {
                        // $el.val("");
                        instance.set(keypath, "");
                        //同时删除字段
                        $.each(deleteProperty, function (i, t) {
                            instance.set(instance.replacePath(keypath, t), "");
                        })
                        //触发change事件
                        $el.trigger("change");
                    });
                    //选择事件绑定
                    $div.find(".popup").click(function () {
                        $el.trigger("click", ["popup"]);
                    });
                }
            }
            else {
                if (!$el.hasClass("doc_layer") && !$el.hasClass("disabled") && !config.display == false) {
                    var $div = $('<div class="auto_ico_box ico_1"></div>');
                    $div.append('<span class="popup" title="选择"><i class="iconfont">&#xe662;</i></span>');
                    $el.parent().addClass("ele_1").append($div);
                    reRenderFlag && $el.parent().addClass("_addFlag");
                    //选择事件绑定
                    $div.find(".popup").click(function () {
                        $el.trigger("click", ["popup"]);
                    });
                }
            }
            if (!config.layerConfig.canInput) {
                $el.prop("readonly", true);
            }
            $el.unbind("click.ModelEvent");
            if (config.layerConfig.type == "frame") {
                $el.bind("click.ModelEvent", function (event, param) {
                    if (param == "popup" || !config.layerConfig.canInput) {
                        var urldata = "";
                        if (config.layerConfig.checkFunc) {
                            // var result = eval(config.layerConfig.checkFunc + "(instance)");
                            var result = RX.runGlobalFunc(config.layerConfig.checkFunc, instance);
                            if (result !== undefined) {
                                if (result === false) {
                                    return;
                                } else if (result === true) {

                                } else {
                                    urldata = result;
                                }
                            }
                        }
                        var url = config.layerConfig.url;
                        if (typeof url === "string" && (!url.endWith("?") || !url.endWith("&"))) {
                            if (url.indexOf("?") > -1) {
                                url = url + "&";
                            } else {
                                url = url + "?";
                            }
                        }
                        RX.page.open({
                            title: config.layerConfig.title,
                            areaType: config.layerConfig.style,
                            url: url + "cid=" + cid + "&keypath=" + keypath + "&func=" + config.layerConfig.callbackFunc + urldata,
                            param: $.extend({viewModel: instance}, config.layerConfig.param)
                        });
                    } else {
                        return;
                    }
                });
            }

            else if (config.layerConfig.type == "div") {
                if ($("#_treeAidSelect").length == 0) {
                    var _div = document.createElement("div");
                    _div.id = "_treeAidSelect";
                    _div.className = "_layerDiv";
                    _div.style.cssText = "display:none;";
                    _div.innerHTML = '<iframe class="_treeAidFrame" frameborder="0" style="width:100%;height:100%" src=""></iframe>';
                    document.body.appendChild(_div);
                }
                $el.bind("click.ModelEvent", function (event) {
                    var urldata = "";
                    if (config.layerConfig.checkFunc) {
                        // var result = eval(config.layerConfig.checkFunc + "(instance)");
                        var result = RX.runGlobalFunc(config.layerConfig.checkFunc, instance);
                        if (result !== undefined) {
                            if (result === false) {
                                return;
                            } else if (result === true) {

                            } else {
                                urldata = result;
                            }
                        }
                    }
                    var $target = $(event.target);
                    $target.addClass("_aidTree");
                    var $treeAidSel = $("#_treeAidSelect");
                    var url;
                    if (config.layerConfig.url.indexOf("?") > -1) {
                        url = config.layerConfig.url + "&func=" + config.layerConfig.callbackFunc + "&cid=" + cid + "&keypath=" + keypath + urldata;
                    } else {
                        url = config.layerConfig.url + "?func=" + config.layerConfig.callbackFunc + "&cid=" + cid + "&keypath=" + keypath + urldata;
                    }
                    $treeAidSel.find("._treeAidFrame").attr("src", RX.handlePath(url));
                    var left = $target.offset().left;
                    var top = $target.height() + $target.offset().top;
                    var width = config.layerConfig.divWidth || ($target.outerWidth() + "px");
                    var height = config.layerConfig.divHeight || "200px";
                    $treeAidSel.css({
                        left: left + "px",
                        top: top + "px",
                        width: width,
                        height: height
                    }).slideDown("fast");
                    $("body").bind("mouseover.aidZtree", function (event) {
                        var target = event.target;
                        if (!($(target).hasClass("_aidTree") || target.className == "thinkDiv" || target.className == "_treeAidFrame")) {
                            $("#_treeAidSelect").hide();
                            $("body").unbind(".aidZtree");
                            $target.removeClass("_aidTree");
                        }
                    });
                });
            }

            //非可输入的失焦
            if (!(config.layerConfig && config.layerConfig.canInput)) {
                $el.click(function () {
                    $el.blur();
                })
            }
        }

        /**
         * 附件类型的渲染
         */
        function fileRender() {
            if (typeof(config.fileConfig) != "undefined") {
                if ($el.next().hasClass("file_box")) {
                    $el.next().unbind();
                    $el.next().children().unbind();
                    $el.next().empty();
                } else {
                    $el.after("<div class='file_box'></div>")
                }
                if (config.fileConfig.type != "image" && config.fileConfig.type != "detailImage") {
                    if (keyValue == null || $.trim(keyValue) == "") {
                        keyValue = RX.uuid(); //生成附件uuid
                        instance.set(keypath, keyValue);
                    }
                }
                $el.val(keyValue);
                var zdx = null;
                var dictCode = null;
                var pcode = null;
                //ps 此获取接口需要和dict的配置接口，都是一个功能
                if (config.fileConfig.reqInterface) {
                    // var reqFunc = eval(config.fileConfig.reqInterface);
                    var reqFunc = RX.getGlobalFunc(config.fileConfig.reqInterface);
                    if (reqFunc) {
                        var zdxArr = reqFunc(instance);
                        dictCode = zdxArr;
                        zdx = JSON.stringify(zdxArr);
                    } else {
                        RXLog("不存在" + config.fileConfig.reqInterface + "接口");
                    }
                } else if (typeof(config.fileConfig.dictCode) != "undefined") {//dictCode定义的条件下调用统一请求
                    pcode = config.fileConfig.pcode;
                    zdx = JSON.stringify(CR.getZdDict(config.fileConfig.dictCode, config.fileConfig.pcode));
                    dictCode = config.fileConfig.dictCode;
                }
                var fjState = "xz";
                if ($el.hasClass("disabled")) {
                    fjState = "ck";
                }
                var vm;
                if (config.fileConfig.type === "list") { //手风琴样式附件
                    vm = new Rxvm({
                        widget: RX.ListFile,
                        el: $el.next()[0],
                        data: {
                            uuid: keyValue,
                            listName: config.fileConfig.listName,
                            uploadName: config.fileConfig.uploadName,
                            fileType: config.fileConfig.fileType,
                            fileSize: config.fileConfig.fileSize,
                            minNum: config.fileConfig.minNum,
                            disabled: config.disabled, //编辑查看的标识
                            dictCode: dictCode,
                            pcode: pcode
                        },
                        _afterRender: function () {
                            if (instance.get(keypath) != this.get("uuid")) {
                                instance.set(keypath, this.get("uuid"));
                            }
                        },
                        _afterCreate: function () {
                            instance._registerFileVm(keypath, this);
                            this.initShow();
                        }
                    });
                }
                else if (config.fileConfig.type === "table") { //表格样式附件
                    vm = new Rxvm({
                        widget: RX.TableFile,
                        el: $el.next()[0],
                        data: {
                            uuid: keyValue,
                            listName: config.fileConfig.listName,
                            uploadName: config.fileConfig.uploadName,
                            canDelete: config.fileConfig.canDelete,
                            fileType: config.fileConfig.fileType,
                            fileSize: config.fileConfig.fileSize,
                            minNum: config.fileConfig.minNum,
                            maxNum: config.fileConfig.maxNum,
                            disabled: config.disabled
                        },
                        _afterRender: function () {
                            if (instance.get(keypath) != this.get("uuid")) {
                                instance.set(keypath, this.get("uuid"));
                            }
                        },
                        _afterCreate: function () {
                            instance._registerFileVm(keypath, this);
                            this.makeAttListData();
                        }
                    });
                }
                else if (config.fileConfig.type === "inner") {  //表单内部样式附件
                    vm = new Rxvm({
                        widget: RX.InnerFile,
                        el: $el.next()[0],
                        data: {
                            uuid: keyValue,
                            fileType: config.fileConfig.fileType,
                            fileSize: config.fileConfig.fileSize,
                            minNum: config.fileConfig.minNum,
                            maxNum: config.fileConfig.maxNum,
                            disabled: config.disabled //编辑查看的标识
                        },
                        _afterRender: function () {
                            if (instance.get(keypath) != this.get("uuid")) {
                                instance.set(keypath, this.get("uuid"));
                            }
                        },
                        _afterCreate: function () {
                            instance._registerFileVm(keypath, this);
                            this.makeInnerListData();
                        }
                    });
                }
                else if (config.fileConfig.type === "image") {
                    vm = new Rxvm({
                        widget: RX.Image,
                        el: $el.next()[0],
                        data: {
                            zpId: keyValue,
                            canDelete: config.fileConfig.canDelete,
                            fileSize: config.fileConfig.fileSize,
                            fileType: config.fileConfig.fileType,
                            disabled: config.disabled
                        },
                        _afterRender: function () {
                            if (instance.get(keypath) != this.get("zpId")) {
                                instance.set(keypath, this.get("zpId"));
                            }
                        },
                        _afterCreate: function () {
                            instance._registerFileVm(keypath, this);
                        }
                    });
                }
                else if (config.fileConfig.type === "list2") {
                    // new AttachmentListView2({
                    //     ModelName: cid,
                    //     property: pro,
                    //     uuid: keyValue,
                    //     state: fjState,
                    //     listName: config.fileConfig.listName,
                    //     collection: new AttachmentCollection(),
                    //     el: $el.next(),
                    //     element: $el,
                    //     dictStr: zdx,
                    //     dictCode: dictCode,
                    //     pcode: pcode,
                    //     fileType: config.fileConfig.fileType,
                    //     minNum: config.fileConfig.minNum, //最小值
                    //     defaultType: config.fileConfig.defaultType //默认类型
                    // });
                }
                // if (vm) {
                //     instance._registerFileVm(keypath, vm);
                // }

                //挂载失焦去验证事件
                $el.next().bind("click.ModelEvent", function () {
                    // $el.removeClass("TextBoxErr");
                    //$(t).parent().find(".invalidtip").remove();
                })
            }
        }

        /**
         * textarea渲染
         */
        function textareaRender() {
            if (instance.$richPool && instance.$richPool[keypath]) {
                instance.$richPool[keypath].remove();
                delete instance.$richPool[keypath];
            }
            //富文本
            if (config.textareaConfig.rich) {
                instance._registerRichArea(keypath, $el.xheditor(config.textareaConfig.richConfig));
            }
            //多行文本显示输入的字
            if (config.textareaConfig.showNum) {
                var idTemp = _replacePointToUderline(keypath) + instance.cid;
                if (!$el.parent().next().hasClass("trans_language")) {
                    $el.parent().after('<div class="trans_language" id="' + idTemp + '"><strong>' + (keyValue ? keyValue.length : 0) + '/' + ($el.attr("maxLength") || $el.prop("maxLength")) + '</strong></div>');
                    $el.bind("keyup.ModelEvent", function () {
                        RX.textareachk(this, idTemp, true);
                    });
                    $el.bind("blur.ModelEvent", function () {
                        RX.textareachk(this, idTemp, false);
                    });
                    $el.bind("paste.ModelEvent", function () {
                        var that = this;
                        setTimeout(function () {
                            RX.textareachk(that, idTemp, true);
                        }, 0)
                    });
                }
            }
        }

        /**
         * 日期型渲染
         */
        function dateRender() {
            CR._handleDateType(pro, instance, $el, config, reRenderFlag);
        }

        /**
         * img类型渲染
         */
        function imgRender() {
            if (config.imgConfig.imgSrc) {
                $el.attr("src", config.imgConfig.imgSrc);
            } else if (config.imgConfig.imgGetFunc) {
                // eval(config.imgConfig.imgGetFunc + "(instance)");
                RX.runGlobalFunc(config.imgConfig.imgGetFunc, instance);
            }
        }

        /**
         * 数字控件渲染，使用checkKeyup和checkValue控制
         */
        function numberRender() {
            var numberConfig = config.numberConfig;
            var checkKeyUpArr = [], checkValueArr = [];
            if ("integer" === numberConfig.type) {
                if (typeof numberConfig.min === "string" || typeof numberConfig.max === "string") {
                    //暂时不处理
                    // config.rules.checkKeyup.push("checkIntKeyUp");
                    // config.rules.checkValue.push("checkInt");
                } else {
                    if (null !== numberConfig.min && numberConfig.min >= 0) {
                        //正整数
                        checkKeyUpArr.push("checkPlusIntKeyUp");
                    } else if (null !== numberConfig.max && numberConfig.max <= 0) {
                        //负整数
                        checkKeyUpArr.push("checkNegativeIntKeyUp");
                        checkValueArr.push("checkNegativeInt");
                    } else {
                        //整数
                        checkKeyUpArr.push("checkIntKeyUp");
                        checkValueArr.push("checkInt");
                    }
                }
            } else {
                //浮点数
                if (typeof numberConfig.min === "string") {
                    //暂时不处理
                    // config.rules.checkKeyup.push("checkFloatKeyUp");
                    // config.rules.checkValue.push("checkFloat");
                } else {
                    if (null !== numberConfig.min && numberConfig.min >= 0) {
                        checkKeyUpArr.push("checkPlusFloatKeyUp");
                        checkValueArr.push("checkPlusFloat");
                    } else if (null !== numberConfig.max && numberConfig.max <= 0) {
                        //负
                        checkKeyUpArr.push("checkNegativeFloatKeyUp");
                        checkValueArr.push("checkNegativeFloat");
                    } else {
                        //浮点数
                        checkKeyUpArr.push("checkFloatKeyUp");
                        checkValueArr.push("checkFloat");
                    }
                }
                if (null !== numberConfig.decimal) {
                    checkKeyUpArr.push("checkNumJdKeyup");
                    //如果需要补正精度，需要重写接口
                    checkValueArr.push("checkNumJd")
                }
            }
            if (null !== numberConfig.max || null !== numberConfig.min) {
                checkValueArr.push("numberCheck");
            }
            //在输入时验证
            if (numberConfig.ifKeyupCheck) {
                for (var i = checkKeyUpArr.length; i > 0; i--) {
                    config.rules.checkKeyup.unshift(checkKeyUpArr[i - 1]);
                }
            }
            for (var i = checkValueArr.length; i > 0; i--) {
                config.rules.checkValue.unshift(checkValueArr[i - 1]);
            }
        }

        /**
         * 禁用处理
         */
        function setDisabled() {
            var disabled = false;
            if (config.disabled) {
                disabled = config.disabled;
            } else {
                // disabled = !instance.getState(keypath);
            }
            if (disabled) {
                $el.prop("disabled", true);
                $el.addClass("disabled");
            } else {
                $el.prop("disabled", false);
                $el.removeClass("disabled");
            }
        }

        /**
         * 标签处理
         */
        function setTag() {
            if (config.tagName != null && typeof config.tagName !== "undefined") {
                var tagHtml = config.tagName;
                if (config.rules && config.rules.checkSave && $.inArray("notNull", config.rules.checkSave) > -1) {
                    tagHtml = "<b>*</b>" + tagHtml;
                }
                var $tags = $(instance.$node.el).find("*[rx-cid='" + instance.cid + "'][rx-tag='" + keypath + "']");
                if ($tags.length) {
                    $tags.html(tagHtml);
                }
            }
        }

        /**
         * 查看元素渲染
         */
        function viewDomRender() {
            if (config.type === "dict") {
                var hasZdx = false,
                    zdx,
                    text = "";
                if (config.dictConfig.reqInterface) {
                    // var reqFunc = eval(config.fileConfig.reqInterface);
                    var reqFunc = RX.getGlobalFunc(config.dictConfig.reqInterface);
                    if (reqFunc) {
                        var zdxArr = reqFunc(instance);
                        zdx = (typeof zdxArr === "string" ? JSON.parse(zdxArr) : (zdxArr || []));
                        hasZdx = true;
                    } else {
                        RXLog("不存在" + config.dictConfig.reqInterface + "接口");
                    }
                }
                if (!hasZdx) {
                    zdx = CR.getZdDict(config.dictConfig.dictCode) || [];
                }
                if (keyValue || keyValue === 0 || keyValue === "0") {
                    var textArr = [];
                    var cprValue = "," + keyValue + ",";
                    $.each(zdx, function (i, t) {
                        if (cprValue.indexOf("," + t.code + ",") > -1) {
                            textArr.push(t.value);
                        }
                    })
                    text = textArr.join(",");
                }
                $el.text(text);
            } else if (config.type == "date") {
                var text = keyValue || "";
                if (keyValue != null && $.trim(keyValue.toString()) != "") {
                    var keyValueStr = keyValue.toString();
                    var floatValue = parseFloat(keyValueStr);
                    if (floatValue == keyValueStr && floatValue > 86400000) {
                        //是日期
                        var datestr = new Date(parseFloat(keyValueStr)).Format(config.dateConfig.dateFmt);
                        instance.set(keypath, datestr);
                        text = datestr;
                    }
                }
                keyValue = text;
                $el.text(text);
            } else if (keyValue || keyValue === 0 || keyValue === "0") {
                $el.text(keyValue);
            } else {
                keyValue = "";
                $el.text("");
            }
            $el.attr("title", $el.text() || "");
        }

        if (config) {
            //去除隐藏
            if ($el.hasClass("hideElement")) {
                $el.removeClass("hideElement");
            }

            //设置标签
            setTag();

            //清除渲染时效果
            // FixMe：select2等元素在Rxvm局部渲染时，可能会被带到别的dom中，简化处理为渲染前清除其他交互效果元素
            clearRender();

            //重新渲染，reRender之前清除上次个性的操作
            if (reRenderFlag) {
                clearReRender();
            }

            //根据配置项处理数据以及dom等等
            handleByConfig();

            if (tagName === "SPAN" || tagName === "LABEL") {

                //span元素渲染
                viewDomRender();

            } else {
                //禁用控制
                setDisabled();

                //控件渲染，如果是disabled状态不进行控件的渲染
                if (config.type === "layer" || config.type === "file" || config.type === "textarea" || (!$el.hasClass("disabled") && !$el.is(":hidden"))) {
                    var renderFunc;
                    try {
                        renderFunc = eval(config.type + "Render");
                    } catch (e) {
                        //不存在
                        renderFunc = null;
                    }
                    renderFunc && renderFunc($el, config);
                }

                //设置显示值
                setShowValue();

                if (!$el.hasClass("disabled")) {
                    //绑定事件
                    bindEvent();
                }
                //联想输入处理，在原本类型的渲染控件外，额外添加辅助操作
                if (config.canThink) {
                    CR._handleThinkInput($el, config, instance);
                }

                //禁用效果处理
                CR.disabledHandle($el, config, keyValue);

                //FixMe:(待原作者解决) Rxvm在IE8下，第一次键入不同步数据问题修复
                if (RX.browser.isIE8 && ((tagName === "INPUT" && $el.prop("type") === "text") || tagName === "TEXTAREA")) {
                    $el.one("keyup", function () {
                        instance.set($el.attr("rx-path"), $el.val());
                    });
                }
            }
        }
        //更新标题
        CR.updateTitle($el, keyValue);
    },
    /*****************************************************************
     *  方法：检查补全字段配置
     *****************************************************************/
    checkPropertyJson: function (propertyJson) {
        propertyJson._hasChecked = true;
        //main配置
        var json = this.defaultPropertyJson;
        for (key in json.main) {
            if (!propertyJson[key] && typeof(propertyJson[key]) != "boolean") {
                propertyJson[key] = json.main[key];
            }
        }
        //rules规则配置
        if (!propertyJson.rules) {
            propertyJson.rules = {};
        }
        for (key in json.rules) {
            if (!propertyJson.rules[key]) {
                propertyJson.rules[key] = json.rules[key];
            }
        }

        //控件详细配置
        var type = propertyJson.type;
        if (type != "normal") {
            if (!propertyJson[type + "Config"]) {
                propertyJson[type + "Config"] = {};
            }
            for (key in json[type + "Config"]) {
                if (key === "richConfig") {
                    if (propertyJson[type + "Config"].rich) {
                        if (!propertyJson[type + "Config"].richConfig) {
                            propertyJson[type + "Config"].richConfig = {};
                        }
                        for (key2 in json[type + "Config"].richConfig) {
                            if (typeof propertyJson[type + "Config"].richConfig[key2] == "undefined") {
                                propertyJson[type + "Config"].richConfig[key2] = json[type + "Config"].richConfig[key2];
                            }
                        }
                    }
                } else {
                    if (typeof propertyJson[type + "Config"][key] == "undefined") {
                        propertyJson[type + "Config"][key] = json[type + "Config"][key];
                    }
                }
            }
        }
    },
    /*****************************************************************
     *  方法：禁用效果实现（spanshow等）
     *****************************************************************/
    disabledHandle: function ($el, config, keyValue) {
        function setSpanShow(text) {
            var showText = (text || text === 0) ? text : "";
            if (config.spanType === "multiline") {
                $el.after("<span class='span_show_multiline' title='" + showText + "'>" + showText + "</span>");
            } else {
                $el.after("<span class='span_show_ellipsis' title='" + showText + "'>" + showText + "</span>");
            }
        }

        //spanshow的去除
        var tagName = $el.prop("tagName");
        if ($el.hasClass("spanparent")) {
            $el.removeClass("spanparent");
            $el.show();
            if ($el.next().hasClass("span_show_ellipsis") || $el.next().hasClass("span_show_multiline")) {
                $el.next().remove();
            }
            if ($el.next().hasClass("clearLayer")) {
                if ($el.next().next().hasClass("span_show_ellipsis") || $el.next().next().hasClass("span_show_multiline")) {
                    $el.next().next().remove();
                }
            }
        }

        if (config.type === "layer" && $el.prop("disabled")) {
            if ($el.next().hasClass("auto_ico_box")) {
                $el.next().remove();
            }
            if ($el.parent().hasClass("ele_1") || $el.parent().hasClass("ele_2")) {
                $el.parent().removeClass("ele_1") || $el.parent().removeClass("ele_2");
            }
        }

        if (config.spanShow) {
            //spanShow的实现
            if ($el.hasClass("disabled") && !$el.is(":hidden")) {
                if (tagName === "INPUT" && $el.prop("type") === "text") {
                    $el.addClass("spanparent");
                    $el.hide();
                    setSpanShow(_replaceSymbols(keyValue));
                } else if (tagName === "SELECT") {
                    $el.addClass("spanparent");
                    $el.hide();
                    if ($el.next().hasClass("select2")) {
                        $el.next().hide();
                    }
                    var text = "";
                    if (keyValue) {
                        if (RX.browser.isIE6) {
                            $el.each(function (i, options) {
                                for (var i = 0; i < options.length; i++) {
                                    if (options[i].value == keyValue) {
                                        text = options[i].text;
                                    }
                                }
                            });
                        } else {
                            var selObj = $el.find("option:selected");
                            if (selObj.val() == keyValue) {
                                text = selObj.text();
                            }
                        }
                        text = _replaceSymbols(text);
                    }
                    setSpanShow(text);
                } else if (tagName == "DIV" && config.type == "dict") {
                    $el.addClass("spanparent");
                    $el.hide();
                    var text = "";
                    $el.find('input[type=checkbox]:checked').each(function () {
                        text = text + $(this).parent().text() + "，";
                    });
                    $el.find('input[type=radio]:checked').each(function () {
                        text = text + $(this).parent().text() + "，";
                    });
                    if (text != "") {
                        text = text.substr(0, text.length - 1);
                    }
                    text = _replaceSymbols(text);
                    setSpanShow(text);
                } else if (tagName == "TEXTAREA") {
                    //直接修改不行
                    setTimeout(function () {
                        $el.prop("disabled", false);
                        $el.prop("readonly", true);
                    }, 1);
                }
            }
        } else {

        }
    },
    /**
     * 更新spanshow值
     * @param el
     * @param value
     */
    updateSpanShow: function (el, value, spanShowEl) {
        if (!el) {
            return;
        }
        var $el = $(el),
            tagName = $el.prop("tagName");
        if ($el.hasClass("spanparent")) {
            var $spanShow;
            if (spanShowEl) {
                $spanShow = $(spanShowEl);
            } else {
                $spanShow = $el.next();
                if (!$spanShow.hasClass("span_show_ellipsis") && !$spanShow.hasClass("span_show_multiline")) {
                    $spanShow = null;
                }
                if (!$spanShow && $el.next().hasClass("clearLayer")) {

                    if ($el.next().next().hasClass("span_show_ellipsis") || $el.next().next().hasClass("span_show_multiline")) {
                        $spanShow = $el.next().next();
                    }
                }
            }
            if ($spanShow) {
                if (tagName === "INPUT" && $el.prop("type") === "text") {
                    $spanShow.text(_replaceSymbols(value));
                } else if (tagName === "SELECT") {
                    var text = "";
                    if (value) {
                        if (RX.browser.isIE6) {
                            $el.each(function (i, options) {
                                for (var i = 0; i < options.length; i++) {
                                    if (options[i].value == keyValue) {
                                        text = options[i].text;
                                    }
                                }
                            });
                        } else {
                            var selObj = $el.find("option:selected");
                            if (selObj.val() == value) {
                                text = selObj.text();
                            }
                        }
                        text = _replaceSymbols(text);
                    }
                    $spanShow.text(text);
                } else if (tagName == "DIV") {
                    var text = "";
                    $el.find('input[type=checkbox]:checked').each(function () {
                        text = text + $(this).parent().text() + "，";
                    });
                    $el.find('input[type=radio]:checked').each(function () {
                        text = text + $(this).parent().text() + "，";
                    });
                    if (text != "") {
                        text = text.substr(0, text.length - 1);
                    }
                    text = _replaceSymbols(text);
                    $spanShow.text(text);
                }
            }
        }
    },
    /**
     * 更新spanshow值
     * @param el
     * @param value
     */
    updateTitle: function (el, value) {
        if (!el) {
            return;
        }
        var $el = $(el),
            tagName = $el.prop("tagName");
        if ($el.length) {
            if (tagName === "INPUT") {
                $el.attr("title", _replaceSymbols(value));
            } else if (tagName === "SELECT") {
                var text = "";
                if (value) {
                    if (RX.browser.isIE6) {
                        $el.each(function (i, options) {
                            for (var i = 0; i < options.length; i++) {
                                if (options[i].value == keyValue) {
                                    text = options[i].text;
                                }
                            }
                        });
                    } else {
                        var selObj = $el.find("option:selected");
                        if (selObj.val() == value) {
                            text = selObj.text();
                        }
                    }
                    text = _replaceSymbols(text);
                }
                $el.attr("title", text);
            } else if (tagName == "DIV") {
                var text = "";
                $el.find('input[type=checkbox]:checked').each(function () {
                    text = text + $(this).parent().text() + "，";
                });
                $el.find('input[type=radio]:checked').each(function () {
                    text = text + $(this).parent().text() + "，";
                });
                if (text != "") {
                    text = text.substr(0, text.length - 1);
                }
                text = _replaceSymbols(text);
                $el.attr("title", text);
            }
        }
    },
    /*****************************************************************
     *  方法：请求字典
     *****************************************************************/
    getZdDict: function (dictCode, pcode) {
        if (typeof(dictCode) == "string") {
            if (this.dictJson) {
                var json = this.dictJson;
                for (var key in json) {
                    if (json[key].length > 0) {
                        if ($.inArray(dictCode, json[key]) != -1) {
                            return JsMergeCache(key, json[key], dictCode, pcode);
                        }
                    }
                }
                return RX.getDictByCode(dictCode, pcode);
            } else {
                return RX.getDictByCode(dictCode, pcode);
            }
        } else {
            return dictCode;
        }
    },
    /*****************************************************************
     *  方法：渲染字典项
     *****************************************************************/
    fillDict: function (obj, key, config, instance, zdx, key2) {
        if (zdx != null) {
            if (config.dictConfig.dependence) {
                CR.addDependEvent(key, zdx, key2, obj, config, instance);
            } else {
                CR.fillDictByZd(key, zdx, key2, obj, config, instance);
            }
        }
    },
    /*****************************************************************
     *  方法：为字典项添加级联事件
     *****************************************************************/
    addDependEvent: function (key, zdx, key2, obj, config, instance) {
        var keypath = obj.attr("rx-path");
        //获取依赖项keypath
        var keyArr = keypath.split(".");
        keyArr.pop();
        keyArr.push(config.dictConfig.dependence);
        var parentKeyPath = keyArr.join(".");
        var parentConfig = instance.getConfig(parentKeyPath) || {};
        var $parentObj = $(instance.$node.el).find("*[rx-cid='" + instance.cid + "'][rx-path='" + parentKeyPath + "']");
        var parentTagName;
        if (!config.dictConfig.checkType) {
            //构建提示语
            parentTagName = parentConfig.tagName;
        }
        $parentObj.unbind("change.RebuildChild").bind("change.RebuildChild",
            function () {
                var type = obj.prop("tagName");
                var pValue = [];
                //获取关联数据
                if (type == "SELECT") {
                    pValue = $(this).val();
                } else {
                    $(this).find(':checked').each(function () {
                        pValue.push($(this).val());
                    });
                }
                //生成子项
                CR.fillDictByZd(key, zdx, key2, obj, config, instance, pValue, parentTagName);
                $(obj).trigger("change");
                if (parentConfig.changeFunc != "undefined" && parentConfig.changeFunc != undefined) {
                    // eval(parentConfig.changeFunc + "(instance, keypath)");
                    RX.runGlobalFunc(parentConfig.changeFunc, instance, keypath);
                }
            });
        //若dependence项有初值，触发依赖项的change事件，完成级联渲染
        var depobj = $("*[rx-cid='" + instance.cid + "'][rx-path='" + parentKeyPath + "']");
        if ($(depobj).val() != null && $(depobj).val() != "") {
            $(depobj).trigger("change");
        } else {
            if (config.dictConfig.showPlsSelect) {
                obj.html("<option value=''>" + (parentTagName ? ("请先选择" + parentTagName) : config.dictConfig.plsSelectName) + "</option>");
            }
            instance.set(keypath, "");
        }
    },
    /*****************************************************************
     *  方法：生成字典相关dom要素（select、radio、checkbox）
     *****************************************************************/
    fillDictByZd: function (key, zdx, key2, obj, config, instance, pValue, parentTagName) {
        var check = "";
        if (config.dictConfig.checkType) {
            //checkbox || radio 的前置处理
        } else {
            //select的前置处理
            var showValue;
            if (config.dictConfig.showPlsSelect) {
                if (parentTagName && !pValue) {
                    showValue = "请先选择" + parentTagName;
                } else {
                    showValue = config.dictConfig.plsSelectName;
                }
                check += "<option value=''>" + showValue + "</option>";
            }

        }
        if (pValue || !config.dictConfig.dependence) {
            //根据字典生成子项
            check += CR.getChild(pValue, zdx, config.dictConfig.checkType, key2);
        }
        obj.html(check);
        //checkbox || radio
        if (config.dictConfig.checkType) {
            obj.click(function () {
                if (obj.parent().find(".err").length > 0) {
                    obj.removeErrorTip();
                }
            });
        }
        //带搜索框的验证去除
        else if (config.dictConfig.ifSearch) {
            obj.parent().click(function () {
                if (obj.parent().find(".err").length > 0) {
                    obj.removeErrorTip();
                }
            });
        }
    },
    /*****************************************************************
     *  方法：生成select子项 ,div子项，还有默认值
     *****************************************************************/
    getChild: function (pValue, zdx, zdType, key2) {
        var labelType = "";
        var check = "";
        if (zdType) {
            labelType = zdType === "radio" ? "label_radio" : "label_check";
        }
        if (zdx instanceof Array || Object.prototype.toString.apply(zdx) == "[object Array]") {
            for (var i = 0; i < zdx.length; i++) {
                if (pValue) {
                    if (typeof(pValue) == "object") {
                        for (var m = 0; m < pValue.length; m++) {
                            if (zdx[i].pcode == pValue[m] || (zdx[i].pcode && zdx[i].pcode == pValue[m])) {
                                check += this.getChild(null, zdx[i], zdType, key2);
                            }
                        }
                    } else if (zdx[i].pcode == pValue || (zdx[i].pcode && zdx[i].pcode == pValue)) {
                        check += this.getChild(null, zdx[i], zdType, key2);
                    }
                } else {
                    for (var i = 0; i < zdx.length; i++) {
                        check += this.getChild(null, zdx[i], zdType, key2);
                    }
                }
            }
        } else {
            if (typeof(zdx.code) != "undefined" && zdx.code != null) {
                if (zdType) {
                    check += "<label class='" + labelType + "'><input type='" + zdType + "' name='" + key2 + "' value='" +
                        zdx.code + "'/>" + zdx.value + "</label>";
                } else {
                    check += this.parseOption(zdx, false);
                }
            }
        }
        return check;
    },
    /**
     *  处理日期型
     * @param pro 字段
     * @param instance instance
     * @param $el jquery对象，当前位置
     * @param config 字段的config
     * @param reRenderFlag 重新render标志
     * @private
     */
    _handleDateType: function (pro, instance, $el, config, reRenderFlag) {
        var $document = $(document);
        var keypath = $el.attr("rx-path");
        var keyId = keypath.replace(/\./g, "_");

        //存储日期对象，设置的元素影响此单位，如：maxDate,minDate指定的元素
        //{pro:[]}  []存放pro日期对象影响的laydate对象,max表示影响最大值，min表示影响最小值
        //记载日期对象
        if (!$document.data("layDateObj")) {
            $document.data("layDateObj", {});
        }
        //记载最大日期影响的对象
        if (!$document.data("dateMaxObj")) {
            $document.data("dateMaxObj", {});
        }
        //记载最小日期影响的对象
        if (!$document.data("dateMinObj")) {
            $document.data("dateMinObj", {});
        }

        /**
         * 根据传入的值获取偏移值
         * @param maxDate
         * @returns {*}  为num是指定的数值，string是的动态的，根据元素
         */
        function getOffsetDate(maxDate) {
            var resultObj = {};
            if (typeof maxDate === "string") {
                if (parseFloat(maxDate) == maxDate) {
                    resultObj = parseFloat(minDate);
                } else if (RX.parseDateByFmt(maxDate, config.dateConfig.dateFmt)) {
                    //验证符合一定规则的字符串日期
                    //如果日期是time，则需要当前的日期
                    var date1 = RX.parseDateByFmt(maxDate, config.dateConfig.dateFmt);
                    if (config.dateConfig.type === "time") {
                        //当前日期
                        var date2 = new Date();
                        //时间为time时打开的是当前的年月日的时分秒，直接设置max会从1970的时分秒
                        resultObj.num = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date1.getHours(), date1.getMinutes(), date1.getSeconds()).getTime();
                    } else {
                        resultObj.num = date1.getTime();
                    }
                } else if (maxDate === "sysdate") {
                    resultObj.num = 0;
                } else {
                    //指定的元素
                    resultObj.str = maxDate;
                }
            } else if (typeof maxDate === "number") {
                resultObj.num = maxDate;
            } else if (maxDate instanceof Date) {
                resultObj.num = maxDate.getTime();
            }
            return resultObj;
        }

        /**
         * 修改pro元素影响元素的最大值最小值
         *
         * @param pro 指定元素
         * @param instance
         * @param date 日期，laydate传给的日期类型，其中是{date，hours}对象
         * @param endDate 结束日期，事件范围选择时有效
         * @param value 显示值
         * @param laydateObj 日期对象
         */
        function setLayOffsetDate(pro, instance, date, endDate, value, laydateObj) {
            function setOffsetDate(layDateObj, type, offsetType, date) {
                //也不是当前的配置，是影响值得配置
                var instanceProPath = instance.replacePath(keypath, layDateObj._instancePro);
                var objConfig = instance.getConfig(instanceProPath);
                var offestDate = objConfig.dateConfig[offsetType] || {};
                if (value) {
                    var newDate = new Date(date.year + (offestDate.year || 0), date.month - 1 + (offestDate.month || 0),
                        date.date + (offestDate.date || 0), date.hours + (offestDate.hours || 0), date.minutes + (offestDate.minutes || 0), date.seconds + (offestDate.seconds || 0));
                    layDateObj.config[type] = {
                        year: newDate.getFullYear(),
                        month: newDate.getMonth(),
                        date: newDate.getDate(),
                        hours: newDate.getHours(),
                        minutes: newDate.getMinutes(),
                        seconds: newDate.getSeconds()
                    };
                    //数据不符合需要清除
                    //获取当前值
                    var instanceProVal = instance.getElement(instanceProPath).val();
                    if (instanceProVal) {
                        //是范围选择
                        var startDate;
                        var endDate;
                        if (objConfig.dateConfig.range) {
                            //存在空格
                            startDate = instanceProVal.substring(0, Math.floor(instanceProVal.length / 2) - 1);
                            endDate = instanceProVal.substring(Math.ceil(instanceProVal.length / 2) + 1);
                        } else {
                            startDate = instanceProVal;
                            endDate = instanceProVal;
                        }
                        //根据日日期格式再次获取，因为可能是时间格式，一个是带了年月日的，一个没带，以统一的年月日来比较时间
                        var newTime = RX.parseDateByFmt(newDate.Format(layDateObj.config.format), layDateObj.config.format).getTime();
                        //开始时间小于最小值  ||  结束事件大于最大值
                        if ((type === "min" && RX.parseDateByFmt(startDate, layDateObj.config.format).getTime() < newTime) ||
                            (type === "max" && RX.parseDateByFmt(endDate, layDateObj.config.format).getTime() > newTime)) {
                            var unHfDom = instance.getElement(instanceProPath);
                            unHfDom.val("");
                            unHfDom.makeTip(unHfDom, "日期超过限制");
                        }

                    }
                } else {
                    //清空操作，需要初始化关联日期的最大值最小值
                    if (type === "max") {
                        layDateObj.config[type] = {
                            year: 2099,
                            month: 11,
                            date: 31,
                            hours: 0,
                            minutes: 0,
                            seconds: 0
                        };
                    } else {
                        layDateObj.config[type] = {
                            year: 1900,
                            month: 0,
                            date: 1,
                            hours: 0,
                            minutes: 0,
                            seconds: 0
                        };
                    }
                }
            }

            var maxDataArr = $document.data("dateMaxObj")[keyId + instance.cid];
            if (maxDataArr) {
                for (var i = 0, maxLength = maxDataArr.length; i < maxLength; i++) {
                    //设置最大值
                    setOffsetDate(maxDataArr[i], "max", "maxDateExtend", endDate.year !== undefined ? endDate : date);
                }
            }
            //当前元素影响其它元素的最小值
            //当前元素影响其它元素的最小值
            var minDataArr = $document.data("dateMinObj")[keyId + instance.cid];
            if (minDataArr) {
                for (var i = 0, maxLength = minDataArr.length; i < maxLength; i++) {
                    //设置最小值
                    setOffsetDate(minDataArr[i], "min", "minDateExtend", date);
                }
            }
        }

        /**
         * 缓存laydate对象
         * @param renderObj  laydate对象
         * @param pro        哪个元素生成的laydate
         * @param maxStr     影响的最大值元素
         * @param minStr     影响的最大值元素
         */
        function cacheLaydate(renderObj, pro, maxStr, minStr) {
            renderObj._instancePro = pro;
            /*********3、存储layDate对象************/
            //存储日期对象，设置的元素影响此单位，如：maxDate,minDate指定的元素
            $document.data("layDateObj")[keyId + instance.cid] = renderObj;
            if (maxStr) {
                var maxPath = instance.replacePath(keypath, maxStr);
                var maxKeyId = maxPath.replace(/\./g, "_");
                if ($document.data("dateMaxObj")[maxKeyId + instance.cid]) {
                    $document.data("dateMaxObj")[maxKeyId + instance.cid].push(renderObj);
                } else {
                    $document.data("dateMaxObj")[maxKeyId + instance.cid] = [renderObj];
                }
            }
            if (minStr) {
                var minPath = instance.replacePath(keypath, minStr);
                var minKeyId = minPath.replace(/\./g, "_");
                if ($document.data("dateMinObj")[minKeyId + instance.cid]) {
                    $document.data("dateMinObj")[minKeyId + instance.cid].push(renderObj);
                } else {
                    $document.data("dateMinObj")[minKeyId + instance.cid] = [renderObj];
                }
            }
        }

        /******1、根据配置生成layDate的配置*******/
        var layObj = {};
        var dateId = keyId + instance.cid;
        var domId = $el.attr("id");
        if (!domId) {
            $el.attr("id", dateId);
            domId = dateId;
        }
        //位置
        layObj.elem = "#" + domId;
        //格式
        layObj.format = config.dateConfig.dateFmt;
        //需要根据format选择不同的类型，防止解析失败，可以直接传入选择的格式
        layObj.type = config.dateConfig.type || this._getDateType(layObj.format);
        //根据日期格式赋值当前时间
        if (typeof(config.dateConfig.defaultDate) !== "undefined") {
            if (config.dateConfig.defaultDate) {
                //可能是时间，但是fmt还是yyyy-MM-dd，laydate有默认配置
                var fmt;
                if (config.dateConfig.type && config.dateConfig.type !== "date" && config.dateConfig.dateFmt === "yyyy-MM-dd") {
                    //是laydate内置的格式
                    fmt = {
                        year: "yyyy",
                        month: "yyyy-MM",
                        date: "yyyy-MM-dd",
                        time: "HH:mm:ss",
                        datetime: "yyyy-MM-dd HH:mm:ss"
                    }[config.dateConfig.type];
                } else {
                    fmt = config.dateConfig.dateFmt;
                }
                $el.val(RX.getNow(fmt));
                instance.set(keypath, $el.val());
            }
        }
        //时间段
        layObj.range = config.dateConfig.range;
        //最大时间控制
        var maxDate = config.dateConfig.maxDate;
        var maxStr;
        //设置最大值和最小值
        if (maxDate || maxDate === 0) {
            //获取偏移值
            var res = getOffsetDate(maxDate);
            res.str ? maxStr = res.str : (layObj.max = res.num, layObj.initMax = res.num);
        }
        //最小时间控制
        var minDate = config.dateConfig.minDate;
        var minStr;
        if (minDate || minDate === 0) {
            var res = getOffsetDate(minDate);
            res.str ? minStr = res.str : (layObj.min = res.num, layObj.initMin = res.num);
        }
        layObj.ready = function (date) {
            $el.data("_beforeDate", $el.val());
        };
        //laydate设置值回调函数
        layObj.setVal = function (e) {
            instance.set(keypath, e);
        };
        //元素每次选择日期之后的事件，之后设置与此单位有关联的最大值最小值，change事件触发，聚焦位置
        layObj.done = function (value, date, endDate) {
            if (!config.dateConfig.range && value === RX.getNow(config.dateConfig.dateFmt)) {
                //尽可能判断是点击“现在”的操作，因为只有“现在“操作”日期才会超出限制
                //range的操作无“现在”
                var selDate = new Date(date.year, date.month - 1, date.date, date.hours, date.minutes, date.seconds).getTime();
                var maxDate = this.max, minDate = this.min;
                if (config.dateConfig.maxDate === "sysdate") {
                    maxDate.hours = 23;
                    maxDate.minutes = 59;
                    maxDate.seconds = 59;
                }
                if (selDate > new Date(maxDate.year, maxDate.month, maxDate.date, maxDate.hours, maxDate.minutes, maxDate.seconds).getTime() ||
                    selDate < new Date(minDate.year, minDate.month, minDate.date, minDate.hours, minDate.minutes, minDate.seconds).getTime()) {
                    date = {};
                    value = "";
                    $el.val("");
                    $el.makeTip($el, "日期超过限制");
                }
            }
            instance.set(keypath, value);
            //当前元素影响其它元素的值得范围，可能是最大值，可能是最小值
            setLayOffsetDate(pro, instance, date, endDate, value, this);
            if (config.changeFunc && $el.data("_beforeDate") !== value) {
                // eval(config.changeFunc + "(value,date,endDate,instance,keypath)");
                RX.runGlobalFunc(config.changeFunc, value, date, endDate, instance, keypath);
            }
            //聚焦到另一位置，id获取方式需要修改
            config.dateConfig.focusPosit && $.getEle(instance.cid, config.dateConfig.focusPosit).trigger(this.trigger);
        };
        /********** 2、render************/
        //记录影响元素
        cacheLaydate(laydate.render(layObj), pro, maxStr, minStr);
        /***************4、图标的处理******************/
        if (!$el.hasClass("doc_date") && !$el.hasClass("disabled")) {
            //非文本日期，渲染时间控件
            var $div = $('<div class="auto_ico_box ico_1"></div>');
            $div.append('<span class="date" title="日期" id="_laydate' + keyId + instance.cid + '"><i class="iconfont">&#xe604;</i></span>');
            $el.parent().addClass("ele_1").append($div);
            reRenderFlag && $el.parent().addClass("_addFlag");
            //选择事件绑定
            $div.parent().find(".date").bind("click.ModelEvent", function (e) {
                //不使用上面的laydate是因为下面会生成新的，实时改变
                var laydateObj = $document.data("layDateObj")[keyId + instance.cid];
                if (laydateObj) {
                    //移除图标
                    $el.removeErrorTip();
                    var config = $.extend(true, {}, laydateObj.config);
                    //需要继承don的一些事件
                    config.elem = "#" + domId;
                    config.show = true;
                    config.closeStop = "#" + this.getAttribute("id");
                    var configMax = config.max;
                    config.max = configMax.year + "-" + (configMax.month + 1) + "-" + configMax.date + " " + configMax.hours + ":" + configMax.minutes + ":" + configMax.seconds;
                    var configMin = config.min;
                    //1900年new date .getTime()会变成负数
                    config.min = configMin.year + "-" + (configMin.month + 1) + "-" + configMin.date + " " + configMin.hours + ":" + configMin.minutes + ":" + configMin.seconds;
                    cacheLaydate(laydate.render(config), pro, maxStr, minStr);
                }
                RX.stopBubble(e);
            });
        }
    },
    /**
     * 处理option
     * @param zdx
     * @param ifSelect
     * @returns {string}
     */
    parseOption: function (zdx, ifSelect) {
        var opstr = "<option ";
        for (okey in zdx) {
            if (okey == "code") {
                opstr += "value='" + zdx[okey] + "' ";
            } else if (okey != "value") {
                opstr += okey + "='" + zdx[okey] + "' ";
            }
        }
        opstr += (ifSelect ? "selected" : "") + ">" + zdx.value + "</option>";
        return opstr;
    },
    /**
     * 根据日期格式获取日期类型，只能正向解析
     * @param dateFmt 日期格式
     * @private
     */
    _getDateType: function (dateFmt) {
        var dateType = "date";
        if (dateFmt.match(/^(yyyy|y)([-\/年])(MM|M)([-\/月])(dd|d)(日)? (HH|H)([时:])?/)) {
            //年月日时分秒
            dateType = "datetime";
        } else if (dateFmt.match(/^(yyyy|y)([-\/年])(MM|M)([-\/月])(dd|d)(日)?$/)) {
            //年月日
            dateType = "date";
        } else if (dateFmt.match(/^(yyyy|y)([-\/年])(MM|M)(月)?$/)) {
            //年月
            dateType = "month";
        } else if (dateFmt.match(/^(yyyy|y)(年)?$/)) {
            //年
            dateType = "year";
        } else if (dateFmt.match(/^(HH|H)([时:点])?/)) {
            //时分秒
            dateType = "time";
        }
        return dateType;
    },
    /**
     * 处理联想输入
     * @param $el
     * @param config
     * @param instance
     * @private
     */
    _handleThinkInput: function ($el, config, instance) {
        //去除change事件，change事件联想内部处理，不采用原生的
        //前置修改一些处理
        //前置修改一些处理，如果linkId存在解决change事件，如果不是，不去除，可能不是选中联想列表中的数据的
        if (config.linkId && config.changeFunc) {
            $el.unbind("change.ModelEvent");
        }
        //创建窗口
        ifAddThinkIframe() && createThinkIframe();
        //添加事件
        addThinkIframeEvent();

        //是否需要添加iframe
        function ifAddThinkIframe() {
            //判断逻辑，不存在添加
            return $(".thinkDiv").length === 0;
        }

        //创建iframe，thinkDiv标志位
        function createThinkIframe() {
            var thinkDiv = $("<div class='thinkDiv' style='display: none'></div>");
            //创建空白iframe
            var thinkIframe = $("<iframe src=\"about:blank\" frameborder=0 border=0 scrolling=no name='thinkFrame' style='width:100%;height:100%' class='thinkIframe'></iframe>");
            thinkIframe.appendTo(thinkDiv);
            $("body").append(thinkDiv);
            $(window).data("addFlag", true);
            //添加iframe中的内容
            addIframeContent();

            function addIframeContent() {
                //添加的方法可修改
                setTimeout(function () {
                    var frameDocument;
                    if (window.frames["thinkFrame"].document) {
                        frameDocument = window.frames["thinkFrame"].document;      // IE
                    } else if (window.frames["thinkFrame"].contentDocument) {
                        frameDocument = window.frames["thinkFrame"].contentDocument;       // chrome,firefox
                    }
                    var addContent = ["<html>", "<head>", "<link rel=\"stylesheet\" href=\"" + RX.ctxPath + "/medias/style/plat/thinkInput.css\">", "</head>",
                        "<body><div class=\"thinkTable\"><ul class=\"thinkUl\"></ul></div></body></html>"];
                    frameDocument && frameDocument.write(addContent.join("")) && frameDocument.close();
                    var thinkDiv1 = $(".thinkDiv");
                    $(window).data("thinkParam", {doc1: frameDocument, thinkDiv1: thinkDiv1});
                }, 97);
            }
        }

        function addThinkIframeEvent() {
            var timeoutId,    //记录延时器id
                selectedItem = -1,
                maxTrLength = 0,
                haverFlag = false,   //是否有由击事件触发的失焦事件
                changeFlag,
                thinkUl,
                thinkDiv,
                doc;
            //设置选中的数据,item：第几条
            var setSelectedItem = function (item) {
                //更新索引变量
                selectedItem = item;
                //按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0
                if (selectedItem < 0) {
                    selectedItem = maxTrLength - 1;
                }
                else if (selectedItem > maxTrLength - 1) {
                    selectedItem = 0;
                }
                //首先移除其他列表项的高亮背景，然后再高亮当前索引的背景
                thinkUl.find('li').removeClass('highLight')
                    .eq(selectedItem).addClass('highLight');
            };
            //复制值需不需要考虑？？
            $el.bind("keyup.ModelEvent1  click.ModelEvent1", function (event) {
                    var $tvalue = $.trim($el.val());  //去除左右空格
                    if ($tvalue || config.thinkIfEmpty) {
                        if (event.keyCode === 38) {      //上
                            if (selectedItem === -1) {
                                setSelectedItem(0);
                            } else {
                                setSelectedItem(selectedItem - 1);
                            }
                        } else if (event.keyCode === 40) {      //下
                            if (selectedItem === -1) {
                                setSelectedItem(0);
                            } else {
                                //索引加1
                                setSelectedItem(selectedItem + 1);
                            }
                        } else {
                            clearTimeout(timeoutId);
                            timeoutId = setTimeout(function () {
                                if (!doc) {
                                    var docParam = $(window).data("thinkParam");
                                    if (!docParam) {
                                        if (window.frames["thinkFrame"].document) {
                                            doc = window.frames["thinkFrame"].document;      // IE
                                        } else if (window.frames["thinkFrame"].contentDocument) {
                                            doc = window.frames["thinkFrame"].contentDocument;       // chrome,firefox
                                        }
                                        thinkUl = $(doc).find(".thinkUl ");
                                        thinkDiv = $(".thinkDiv");
                                        $(window).data("thinkParam", {
                                            doc1: doc,
                                            thinkUl: thinkUl,
                                            thinkDiv1: thinkDiv
                                        });
                                    } else {
                                        doc = docParam.doc1;
                                        thinkUl = docParam.thinkUl;
                                        if (!thinkUl || (thinkUl && thinkUl.length === 0)) {
                                            thinkUl = $(doc).find(".thinkUl ");
                                            $(window).data("thinkParam").thinkTable1 = thinkUl;
                                        }
                                        thinkDiv = docParam.thinkDiv1;
                                    }
                                }
                                addThinkLiEvent();

                                //绑定事件
                                function addThinkLiEvent() {
                                    //添加滚动事件：滚动时将div隐藏，全局添加，只要添加一次即可
                                    if ($(window).data("addFlag")) {
                                        if (document.addEventListener) {
                                            document.addEventListener('DOMMouseScroll', scrollFunc, false);
                                        }//W3C
                                        window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
                                        function scrollFunc() {
                                            thinkDiv.hide();
                                        }

                                        $(window).data("addFlag", false);
                                    }
                                    //先去除li的事件
                                    $(".thinkUl", doc).off("click mouseover mouseout", "li");
                                    //添加li的点击事件
                                    $(".thinkUl", doc).on("click", "li", function () {
                                        var linkName = $(this).text();
                                        //val无法为vm字段赋值
                                        // $el.val(linkName);
                                        instance.set(keypath, linkName);
                                        var linkId = $(this).attr("linkId");
                                        if (config.linkId) {
                                            instance.set(config.linkId, linkId);
                                        }
                                        thinkDiv.hide();
                                        if (config.changeFunc) {
                                            // eval(config.changeFunc + "(instance,linkName,linkId)");
                                            RX.runGlobalFunc(config.changeFunc, instance, linkName, linkId);
                                        }
                                    });
                                    //添加li的鼠标移进移出事件
                                    $(".thinkUl", doc).on("mouseover mouseout", "li", function (event) {
                                        if (event.type === "mouseover") {
                                            //记录这时是鼠标移进的状态
                                            haverFlag = true;
                                            $(this).siblings().removeClass('highLight');
                                            $(this).addClass("highLight");
                                            selectedItem = $(".thinkUl li", doc).index(this);
                                        } else if (event.type === "mouseout") {
                                            haverFlag = false;
                                            $(this).removeClass("highLight");
                                            selectedItem = -1;
                                        }
                                    });
                                }

                                if (!event.keyCode || event.keyCode > 40 || event.keyCode === 8 || event.keyCode === 32) {
                                    //先前有值，
                                    if (config.linkId && instance.get(config.linkId)) {
                                        changeFlag = true;
                                    }
                                    selectedItem = -1;
                                    if (config.linkId) {
                                        instance.set(config.linkId, "");
                                    }
                                    if (config.thinkUrl) {
                                        $.ajax({
                                            type: "POST",
                                            data: {keyWord: $tvalue},
                                            url: config.thinkUrl,
                                            success: function (ar) {
                                                handleThinkFunc(ar.data);
                                            }
                                        });
                                    } else if (config.thinkFunc) {
                                        // handleThinkFunc(eval(config.thinkFunc + "('" + $tvalue + "')"));
                                        handleThinkFunc(RX.runGlobalFunc(config.thinkFunc, $tvalue));
                                    }

                                    function handleThinkFunc(lxJson) {
                                        thinkUl.empty();
                                        if (lxJson && ((maxTrLength = lxJson.length) > 0)) {
                                            maxTrLength = maxTrLength < 10 ? maxTrLength : 10;
                                            var childDivHtml = [];
                                            if (maxTrLength > 0) {
                                                for (var lx = 0; lx < maxTrLength; lx++) {
                                                    childDivHtml.push("<li title='" + (typeof lxJson[lx] === "object" ? lxJson[lx].NAME : lxJson[lx]) + "' ");
                                                    if (typeof lxJson[lx] === "object" && (lxJson[lx].ID || lxJson[lx].ID === 0)) {
                                                        childDivHtml.push("linkId=" + lxJson[lx].ID);
                                                    }
                                                    childDivHtml.push(">");
                                                    childDivHtml.push(typeof lxJson[lx] === "object" ? lxJson[lx].NAME : lxJson[lx]);
                                                    childDivHtml.push("</li>");
                                                }
                                                childDivHtml.push("");
                                                thinkUl.append(childDivHtml.join(""));
                                                thinkDiv.width($el.outerWidth());
                                                var $parentEl = $el.parent();
                                                var $offsetEl;
                                                if ($parentEl.hasClass("element_box")) {
                                                    $offsetEl = $parentEl;
                                                } else {
                                                    $offsetEl = $el;
                                                }
                                                thinkDiv.css("left", $offsetEl.offset().left + "px");
                                                thinkDiv.css("top", ($offsetEl.height() + $offsetEl.offset().top) + "px");
                                                thinkDiv.show();
                                            }
                                        } else {
                                            thinkUl.empty();
                                            thinkDiv.hide();
                                        }
                                    }
                                }
                                event.preventDefault();
                            }, 500);
                        }
                    } else {
                        //隐藏div
                        if (thinkDiv) {
                            clearTimeout(timeoutId);
                            if (config.linkId) {
                                instance.set(config.linkId, "");
                            }
                            thinkDiv.hide();
                        }
                    }
                }
            ).bind("keydown.ModelEvent1", function (event) {
                //enter键
                if (event.keyCode === 13) {
                    //列表为空或者鼠标离开导致当前没有索引值
                    if (thinkUl.find('li').length === 0 || selectedItem === -1) {
                        if (config.clearIfNotSelectThinkItem) {
                            return;
                        } else {
                            thinkUl.empty();
                            thinkDiv.hide();
                            if (config.changeFunc) {
                                // eval(config.changeFunc + "(instance,'" + ($(this).val() || "") + "','')");
                                RX.runGlobalFunc(config.changeFunc, instance, $(this).val() || "", "");
                            }
                            $(this).blur();
                            return;
                        }
                    }
                    var selDiv = thinkUl.find('li').eq(selectedItem);
                    var trLinkName = selDiv.text();
                    $el.val(trLinkName);
                    var trLinkId = selDiv.attr("linkId");
                    if (config.linkId) {
                        instance.set(config.linkId, trLinkId);
                    }
                    thinkUl.empty();
                    thinkDiv.hide();
                    if (config.changeFunc) {
                        // eval(config.changeFunc + "(instance,trLinkName,trLinkId)");
                        RX.runGlobalFunc(config.changeFunc, instance, trLinkName, trLinkId);
                    }
                    event.preventDefault();
                }
            }).bind("blur.ModelEvent1", function () {    //失焦事件处理
                var domObj = $(this);
                selectedItem = -1;
                if (thinkDiv && !haverFlag) {
                    //失焦事件
                    thinkDiv.hide();
                    if (config.clearIfNotSelectThinkItem) {
                        if (config.linkId && (!instance.get(config.linkId) && instance.get(config.linkId) !== 0)) {
                            domObj.val("");
                        }
                    }
                    if (changeFlag) {
                        if (config.changeFunc) {
                            // eval(config.changeFunc + "(instance,'','')");
                            RX.runGlobalFunc(config.changeFunc, instance, '', '');
                        }
                    }
                }
            });
        }
    },
    renderSelectValue: function (el, value, instance) {
        var $el = $(el),
            validValue = $el.setSelectVal(value);
        if ($el.hasClass("select2-hidden-accessible")) {
            $el.select2($el.attr("rx-ifsearch") === "1" ? null : {minimumResultsForSearch: -1});
            //绑定点击样式事件
            $el.next().find(".select2-selection--single").click(function () {
                $(this).addClass('click');
            });
            instance && instance.set($el.attr("rx-path"), validValue);
        }
        return validValue;
    },
    renderRadioValue: function (el) {
        var $el = $(el);
        if ($el.parent().hasClass("label_radio")) {
            setRadioLabelByInput(el);
        }
    },
    renderCheckboxValue: function (el) {
        var $el = $(el);
        if ($el.parent().hasClass("label_check")) {
            setCheckLabelByInput(el);
        }
    },
    renderDivValue: function (el) {
        var $el = $(el);
        if ($el.prop("tagName") == "DIV") {
            var keyValue = $el.val();
            if (keyValue != null) {
                var checkval = keyValue.toString().split(",");
                $el.find('input[type=checkbox]').prop("checked", false);
                $el.find('input[type=radio]').prop("checked", false);
                for (var i = 0; i < checkval.length; i++) {
                    $el.find('input[type=checkbox][value=' + checkval[i] + ']').each(function () {
                        $(this).attr("checked", "checked");
                        setCheckLabelByInput(this);
                    });
                    $el.find('input[type=radio][value=' + checkval[i] + ']').each(function () {
                        $(this).attr("checked", "checked");
                        setRadioLabelByInput(this);
                    });
                }
            }
        }
    }
};