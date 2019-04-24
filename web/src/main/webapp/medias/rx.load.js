/*****************************************************************************
 * RX前端配置
 * 项目路径在RX.config.ctxPath上设置，可由RX.ctxPath /RX.config.ctxPath 获取
 * 所属项目：plat
 * 创建时间：2017-10-12
 * 创建人：Zp
 *
 * 更新时间：2018-3-28
 * 更新人：Zp
 * 更新内容：
 * 1、RX相关工具方法依赖层级调整：RX.log提到RX.load中，保证引入的各文件均可调用；跨域、_top判断提到RX.load中，保证引入的各文件均可使用。
 * 2、RX.error封装。
 * 3、注释统一调整。
 * 4、调整参数命名空间。
 * 5、优化默认加载、顶层加载结构。
 * 6、调整RX.ctxPath，保持和${ctxPath}统一,非空则RX.ctxPath以“/”开头，项目路径为空则为空字符串。
 * TODO：调整样式相关注释
 *****************************************************************************/
//注册RX空间
window.RX = window.RX || {};

//callback执行的函数集合
var _callbackFunc = [];

//获取当前js中传递的参数，加载同步才可以这样获取，异步需要传递js文件名称
RX.getCurrentJsParams = function (jsName) {
    var arraytemp;
    var jsArr = document.getElementsByTagName("script");
    if (jsName) {
        for (var i = 0; i < jsArr.length; i++) {
            //遍历引用的script，找到引用jsName.js一行的script
            if (jsArr[i].src.indexOf(jsName + ".js") >= 0) {
                arraytemp = jsArr[i].src.split('?');
                break;
            }
        }
    } else {
        arraytemp = jsArr[jsArr.length - 1].src.split('?');
    }
    var obj = {};
    //如果不带参数，则不执行下面的代码
    if (arraytemp && arraytemp.length > 1) {
        var params = arraytemp[1].split('&');
        for (var i = 0; i < params.length; i++) {
            var parm = params[i].split("=");
            //将key和value定义给obj
            obj[parm[0]] = parm[1];
        }
    }
    return obj;
};

//浏览器参数获取
RX.browser = {
    type: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
            return "IE";
        }
        else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari")) {
            return "Chrome";
        }
        else if (userAgent.indexOf("Firefox")) {
            return "Firefox";
        }
        else if (userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE) {
            return "Edge";
        }
        else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1) {
            return "Safari";
        }
        else if (userAgent.indexOf("Opera") > -1) { //判断是否Opera浏览器
            return "Opera";
        } else {
            return "not found";
        }
    }(),
    version: function () {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
            // var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            // reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            }
            else if (fIEVersion == 8) {
                return 8;
            }
            else if (fIEVersion == 9) {
                return 9;
            }
            else if (fIEVersion == 10) {
                return 10;
            }
            else if (fIEVersion == 11) {
                return 11;
            }
            else {
                if (!!window.ActiveXObject && !window.XMLHttpRequest) {
                    return 6;
                }
            }
        }
    }()
};

RX.browser.isIE6 = RX.browser.type === "IE" && RX.browser.version === 6;
RX.browser.isIE7 = RX.browser.type === "IE" && RX.browser.version === 7;
RX.browser.isIE8 = RX.browser.type === "IE" && RX.browser.version === 8;

//控制台日志类型，可作为RX.log第二参数传入
RX.logType = {
    NORMAL: {
        code: "NORMAL",
        title: "通用输出"
    },
    LOAD: {
        code: "LOAD",
        title: "加载日志"
    },
    FORM: {
        code: "FORM",
        title: "表单日志"
    },
    VIEW: {
        code: "VIEW",
        title: "视图日志"
    }
};

//加载项配置
RX.config = {

    //存在皮肤，会由loadCss传入，或从顶层页自动获取
    selectSkin: "default",

    //加载js、css是否可缓存
    canCache: false,

    //可输出的控制台日志类型
    printLogType: ["NORMAL", "VIEW"],

    // 项目路径(项目code)
    ctxPath: function () {
        var pathName = document.location.pathname;
        if (pathName.substr(1).indexOf('/') === -1) {
            pathName += "/";
        }
        var result = pathName.substring(1, pathName.substr(1).indexOf('/') + 1);
        return result ? "/" + result : "";
    }(),

    // 设置路径片段别名，结合RX.handlePath接口使用,替换url中用双竖线包括的内容
    // 如RX.handlePath("|rx|/main/index")输出"www.ruixin.net"
    paths: {
        rx: "www.ruixin.net"
    },

    //设置工作平台的处理的页面（多系统跨域时考虑使用）
    platformUrl: 'http://localhost:8080/qbgzpt/oragn/crossDomain',

    // Javascript别名管理，方便调用
    alias: {
        //--------------------------三方-------------------------
        //jquery1.8.3
        'jquery': RX.getCurrentJsParams()["formdesign"] ? '/medias/src/plat/form/lib/jquery/jquery.min.js' : '/medias/lib/common/jquery-1.8.3.js',
        //json2,用于IE8以下的JSON异常修复和接口声明
        'json2': '/medias/lib/common/store+json2.min.js',
        //IE6frame展示通用背景解决方案
        'bgiframe': '/medias/lib/common/jquery.bgiframe.min.js',

        //--------------------------平台-------------------------
        //平台缓存工具库
        'cache-util': '/medias/lib/util/rx.cache.js',
        //平台常量工具库
        'const-util': '/medias/lib/util/rx.const.js',
        //平台全局基础工具库
        'global-util': '/medias/lib/util/rx.global.js',
        //平台DOM操作工具库
        'dom-util': '/medias/lib/util/rx.dom.js',
        //平台数据工具库
        'data-util': '/medias/lib/util/rx.data.js',
        //平台日期工具库
        'date-util': '/medias/lib/util/rx.date.js',
        //平台对象工具库
        'object-util': '/medias/lib/util/rx.object.js',
        //平台事件工具库
        'event-util': '/medias/lib/util/rx.event.js',
        //平台页面工具库
        'page-util': '/medias/lib/util/rx.page.js',
        //验证方法库
        'validate': '/medias/lib/util/validate.js',
        //平台列表控件
        'datagrid': '/medias/plugin/rx-grid/datagrid.RX.2.0.js',
        //新版ui日期控件laydate
        "laydate": '/medias/plugin/laydate/laydate.js',
        //数据加载loading
        'msgbox': '/medias/plugin/loading/msgbox.js',
        //弹出层2.1
        'layer': '/medias/plugin/layer/layer.js',
        //弹出层扩展
        'layerExtend': "/medias/plugin/layer/extend/layer.ext.js",
        //jquery.cookie
        'cookie': '/medias/lib/common/jquery.cookie.js',
        //tab页签控件
        'tabPanel': '/medias/plugin/tabPanel/TabPanel.js',
        //select交互增强控件
        'select2': '/medias/plugin/select2/dist/js/select2.full.min.js',
        //附件控件
        'uploadify': '/medias/plugin/uploadify/jquery.uploadify.min.js',
        //jquery.url
        "jqueryUrl": "/medias/lib/common/jquery.url.js",
        //jquery.json
        "jqueryJson": "/medias/lib/common/jquery.json-2.3.min.js",
        //jquery.form
        "jqueryForm": "/medias/lib/common/jquery.form.js",
        //页面加载遮蔽
        "perfectLoad": "/medias/plugin/perfectLoad/PerfectLoad.js",
        //平台按钮控件
        "button": "/medias/lib/widget/rx.button-0.1.js",
        //ui全局基础逻辑
        "global": '/medias/lib/common/global.js',
        //权限工具
        "auth-util": "/medias/lib/util/rx.auth.js",

        //———————————————————————————————————新版———————————————————————————————————————————
        //平台类基础结构
        "base": "/medias/lib/rx.base.js",
        //yox框架（兼容版）
        "rxvm": "/medias/lib/rxvm/rxvm.js",
        //视图字段配置渲染器
        "confRenderer": "/medias/lib/rxvm/config.renderer.js",
        //平台视图框架
        "rxvmExt": "/medias/lib/rxvm/rxvm.ext.js",
        //平台列表组件
        "rxGrid": "/medias/lib/widget/rx.grid-rxvm.js",
        //平台头像组件
        "rxImage": "/medias/lib/widget/rx.image-rxvm.js",
        //平台表格附件组件
        "rxTableFile": "/medias/lib/widget/rx.table.file-rxvm.js",
        //平台手风琴附件组件
        "rxListFile": "/medias/lib/widget/rx.list.file-rxvm.js",
        //平台表单内附件组件
        "rxInnerFile": "/medias/lib/widget/rx.inner.file-rxvm.js",
        //平台头像组件
        "rxAutoQuery": "/medias/lib/widget/rx.auto.query-rxvm.js",
        //平台头像组件
        "rxTag": "/medias/lib/widget/rx.tag-rxvm.js",

        //———————————————————————————————————插件———————————————————————————————————————————
        //树控件
        'zTree': '/medias/plugin/ztree/jquery.ztree.all.js',
        'zTreeCore': '/medias/plugin/ztree/jquery.ztree.core.js',
        //标签输入控件
        'tagsInput': '/medias/plugin/tagsInput/jquery.tagsinput.js',
        //———————————————————————————————————项目增加———————————————————————————————————————————
        //echarts
        "echarts":"/medias/plugin/echarts/echarts.min.js"
    },

    //Javascript模板管理，方便复用
    template: {
        //列表模板
        'grid': [['json2', 'rxvm'],
            ['validate', 'datagrid', 'button', 'confRenderer'],
            ['rxvmExt', 'rxGrid', "rxAutoQuery"]],
        //表单编辑模板
        'form': [['json2', 'rxvm'],
            ['validate', 'datagrid', 'button', 'confRenderer'],
            ['rxvmExt', 'jqueryForm', 'rxGrid', "rxAutoQuery", 'rxImage', 'rxTableFile', 'rxListFile', 'rxInnerFile']],
        //表单查看模板
        'view': [['json2', 'rxvm'],
            ['datagrid', 'button', 'confRenderer'],
            ['rxvmExt', 'rxGrid', "rxAutoQuery", 'rxImage', 'rxTableFile', 'rxListFile', 'rxInnerFile']],
        //列表表单全兼容模板
        "all": [['json2', 'rxvm'],
            ['validate', 'datagrid', 'button', 'confRenderer'],
            ['rxvmExt', 'jqueryForm', 'rxGrid', "rxAutoQuery", 'rxImage', 'rxTableFile', 'rxListFile', 'rxInnerFile']]
    },

    // Css别名管理，方便调用
    cssAlias: {
        'validTip': '/medias/style/plat/validate.css',
        'platMenu': '/medias/style/plat/platMenu.css',
        //FixMe：支持皮肤的样式，无需在cssAlias里注册，而是根据选择的skin，增加后缀
        'platMain': '/medias/style/plat/default/css/plat.css',
        'model': '/medias/style/plat/Model.css',
        'global': '/medias/style/plat/default/css/Global.css',
        'iconfont': '/medias/style/plat/iconfont.css',
        'uploadify': '/medias/plugin/uploadify/uploadify.css',
        'tabPanel': '/medias/plugin/tabPanel/skin/default/css/TabPanel.css',
        'treeIcon': '/medias/style/plat/TreeIcon.css',
        //树样式
        'zTree': '/medias/style/plat/default/css/ztree/zTreeStyle.css',
        'layer': '/medias/plugin/layer/skin/default/layer.css',
        'msgbox': '/medias/plugin/loading/msgbox.css',
        //工作流
        'tabPanelJb': '/medias/plugin/tabPanel/skin/default/css/TabPanelJb.css',
        'doc': '/medias/style/plat/documents.css',
        'roleRelate': '/medias/style/plat/default/css/roleRelate.css',
        'flow': '/medias/style/plat/default/css/flow.css',
        'select2': '/medias/style/plat/default/css/select2.css',
        "laydate": '/medias/plugin/laydate/theme/default/laydate.css',
        //标签输入控件
        // 'tagsInput': '/medias/plugin/tagsInput/skin/default/jquery.tagsinput.css'
        //资源标注样式
        // 'zybzGlobal': '/medias/style/zybz/default/css/Global.css',
        // 'zybzMainDe': '/medias/style/zybz/default/css/Main_default.css',
        // 'zybziconfont': '/medias/style/zybz/default/css/iconfont.css'
    },

    //存在的皮肤类型，以及各类皮肤类型支持的文件
    skin: {
        "light": ["platMain"],
        "dark": ["platMain", "global", "roleRelate", "zTree", "select2", "tabPanel", "flow", "layer", "tagsInput"],
        "gray": ["platMain", "global", "roleRelate", "zTree", "tabPanel", "layer", "select2"]
    },

    //设置模板，方便复用
    cssTemplate: {
        'platMain': ['global', 'platMain', 'iconfont', 'validTip', 'select2'],
        // 'zybzMain': ['zybzGlobal', 'zybzMainDe', 'zybziconfont']
    },

    //默认加载js，自动加载所需的库文件（阻塞式）
    defaultJs: [
        "jquery", "base", "cache-util", "global", "json2", "const-util", "global-util", "object-util", "page-util", "data-util", "dom-util", "event-util", "date-util",
        "auth-util", "bgiframe", "perfectLoad", 'button', "select2", "laydate", "/medias/src/plat/workflow/instance/workflowUtils.js"
    ],

    //默认加载Css，自动加载所需的库文件（阻塞式）
    defaultCss: [],

    //临时顶层默认加载js，自动加载所需的库文件（阻塞式）
    tempTopJs: ["layer", "msgbox", "/medias/lib/util/defaultCache.js", "/medias/src/plat/workflow/instance/workflowReturn.js"],

    //临时顶层默认加载css，自动加载所需的库文件（阻塞式）
    tempTopCss: ["layer", "/medias/plugin/loading/msgbox.css"]
};

//项目路径，RX命名调整
RX.ctxPath = RX.config.ctxPath || "";

/*****************************************************************
 * 文件加载器内核与封装
 * 项目开发人员请勿调整！
 * 最后更新时间：2017-10-12
 * 最后更新人：Zp
 *****************************************************************/
(function (global) {

    /*****自定义_top层实现*****/

        //父级window
    var _parent,
        //跨域标志位
        _crossOrigin = false,
        //临时top标志位
        _tempTop = false;

    try {
        _parent = window.parent;
        //为顶层页，则parent依然为当前window
        if (window == _parent) {
            _tempTop = true;
        }
        if (_parent.location.origin !== window.location.origin) {
            //域地址（origin）不同的项目
            _tempTop = true;
            _crossOrigin = true;
        } else if (_parent.RX) {
            //平台开发的系统
            //IE可跨域读取，故需判断项目路径是否相同
            if (_parent.RX.ctxPath != window.RX.ctxPath) {
                _tempTop = true;
                _crossOrigin = true;
            }
        } else {
            //外部系统
            _tempTop = true;
            //未命名RX空间的parentWin,默认为外部系统且跨域
            _crossOrigin = true;
        }
    } catch (e) {
        //异常，确定跨域
        _crossOrigin = true;
        _tempTop = true;
    }
    this._tempTop = _tempTop;
    this._crossOrigin = _crossOrigin;
    this._top = (function () {
        if (_tempTop) {
            return window;
        } else {
            var twin = window.parent;
            var i = 0;
            while (!twin._tempTop) {
                twin = twin.parent;
                i++;
                if (i > 10) {
                    twin = window;
                    _tempTop = true;
                }
            }
            return twin;
        }
    })();

    //LAB.js引擎代码
    var _$LAB = global.$LAB,

        // constants for the valid keys of the options object
        _UseLocalXHR = "UseLocalXHR",
        _AlwaysPreserveOrder = "AlwaysPreserveOrder",
        _AllowDuplicates = "AllowDuplicates",
        _CacheBust = "CacheBust",
        /*!START_DEBUG*/_Debug = "Debug", /*!END_DEBUG*/
        _BasePath = "BasePath",

        // stateless variables used across all $LAB instances
        root_page = /^[^?#]*\//.exec(location.href)[0],
        root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
        append_to = document.head || document.getElementsByTagName("head"),

        // inferences... ick, but still necessary
        opera_or_gecko = (global.opera && Object.prototype.toString.call(global.opera) == "[object Opera]") || ("MozAppearance" in document.documentElement.style),

        /*!START_DEBUG*/
        // console.log() and console.error() wrappers
        log_msg = function () {
        },
        log_error = log_msg,
        /*!END_DEBUG*/

        // feature sniffs (yay!)
        test_script_elem = document.createElement("script"),
        explicit_preloading = typeof test_script_elem.preload == "boolean", // http://wiki.whatwg.org/wiki/Script_Execution_Control#Proposal_1_.28Nicholas_Zakas.29
        real_preloading = explicit_preloading || (test_script_elem.readyState && test_script_elem.readyState == "uninitialized"), // will a script preload with `src` set before DOM append?
        script_ordered_async = !real_preloading && test_script_elem.async === true, // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order

        // XHR preloading (same-domain) and cache-preloading (remote-domain) are the fallbacks (for some browsers)
        xhr_or_cache_preloading = !real_preloading && !script_ordered_async && !opera_or_gecko
    ;

    /*!START_DEBUG*/
    // define console wrapper functions if applicable
    if (global.console && global.console.log) {
        if (!global.console.error) global.console.error = global.console.log;
        log_msg = function (msg) {
            global.console.log(msg);
        };
        log_error = function (msg, err) {
            global.console.error(msg, err);
        };
    }
    /*!END_DEBUG*/

    // test for function
    function is_func(func) {
        return Object.prototype.toString.call(func) == "[object Function]";
    }

    // test for array
    function is_array(arr) {
        return Object.prototype.toString.call(arr) == "[object Array]";
    }

    // make script URL absolute/canonical
    function canonical_uri(src, base_path) {
        var absolute_regex = /^\w+\:\/\//;

        // is `src` is protocol-relative (begins with // or ///), prepend protocol
        if (/^\/\/\/?/.test(src)) {
            src = location.protocol + src;
        }
        // is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)
        else if (!absolute_regex.test(src) && src.charAt(0) != "/") {
            // prepend `base_path`, if any
            src = (base_path || "") + src;
        }
        // make sure to return `src` as absolute
        return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
    }

    // merge `source` into `target`
    function merge_objs(source, target) {
        for (var k in source) {
            if (source.hasOwnProperty(k)) {
                target[k] = source[k]; // TODO: does this need to be recursive for our purposes?
            }
        }
        return target;
    }

    // does the chain group have any ready-to-execute scripts?
    function check_chain_group_scripts_ready(chain_group) {
        var any_scripts_ready = false;
        for (var i = 0; i < chain_group.scripts.length; i++) {
            if (chain_group.scripts[i].ready && chain_group.scripts[i].exec_trigger) {
                any_scripts_ready = true;
                chain_group.scripts[i].exec_trigger();
                chain_group.scripts[i].exec_trigger = null;
            }
        }
        return any_scripts_ready;
    }

    // creates a script load listener
    function create_script_load_listener(elem, registry_item, flag, onload) {
        elem.onload = elem.onreadystatechange = function () {
            if ((elem.readyState && elem.readyState != "complete" && elem.readyState != "loaded") || registry_item[flag]) return;
            elem.onload = elem.onreadystatechange = null;
            onload();
        };
    }

    // script executed handler
    function script_executed(registry_item) {
        registry_item.ready = registry_item.finished = true;
        for (var i = 0; i < registry_item.finished_listeners.length; i++) {
            registry_item.finished_listeners[i]();
        }
        registry_item.ready_listeners = [];
        registry_item.finished_listeners = [];
    }

    // make the request for a scriptha
    function request_script(chain_opts, script_obj, registry_item, onload, preload_this_script) {
        // setTimeout() "yielding" prevents some weird race/crash conditions in older browsers
        setTimeout(function () {
            var script, src = script_obj.real_src, xhr;

            // don't proceed until `append_to` is ready to append to
            if ("item" in append_to) { // check if `append_to` ref is still a live node list
                if (!append_to[0]) { // `append_to` node not yet ready
                    // try again in a little bit -- note: will re-call the anonymous function in the outer setTimeout, not the parent `request_script()`
                    setTimeout(arguments.callee, 25);
                    return;
                }
                // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
                append_to = append_to[0];
            }
            script = document.createElement("script");
            if (script_obj.type) script.type = script_obj.type;
            if (script_obj.charset) script.charset = script_obj.charset;

            // should preloading be used for this script?
            if (preload_this_script) {
                // real script preloading?
                if (real_preloading) {
                    /*!START_DEBUG*/
                    if (chain_opts[_Debug]) log_msg("start script preload: " + src);
                    /*!END_DEBUG*/
                    registry_item.elem = script;
                    if (explicit_preloading) { // explicit preloading (aka, Zakas' proposal)
                        script.preload = true;
                        script.onpreload = onload;
                    }
                    else {
                        script.onreadystatechange = function () {
                            if (script.readyState == "loaded") onload();
                        };
                    }
                    script.src = src;
                    // NOTE: no append to DOM yet, appending will happen when ready to execute
                }
                // same-domain and XHR allowed? use XHR preloading
                else if (preload_this_script && src.indexOf(root_domain) == 0 && chain_opts[_UseLocalXHR]) {
                    xhr = new XMLHttpRequest(); // note: IE never uses XHR (it supports true preloading), so no more need for ActiveXObject fallback for IE <= 7
                    /*!START_DEBUG*/
                    if (chain_opts[_Debug]) log_msg("start script preload (xhr): " + src);
                    /*!END_DEBUG*/
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            xhr.onreadystatechange = function () {
                            }; // fix a memory leak in IE
                            registry_item.text = xhr.responseText + "\n//@ sourceURL=" + src; // http://blog.getfirebug.com/2009/08/11/give-your-eval-a-name-with-sourceurl/
                            onload();
                        }
                    };
                    xhr.open("GET", src);
                    xhr.send();
                }
                // as a last resort, use cache-preloading
                else {
                    /*!START_DEBUG*/
                    if (chain_opts[_Debug]) log_msg("start script preload (cache): " + src);
                    /*!END_DEBUG*/
                    script.type = "text/cache-script";
                    create_script_load_listener(script, registry_item, "ready", function () {
                        append_to.removeChild(script);
                        onload();
                    });
                    script.src = src;
                    append_to.insertBefore(script, append_to.firstChild);
                }
            }
            // use async=false for ordered async? parallel-load-serial-execute http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
            else if (script_ordered_async) {
                /*!START_DEBUG*/
                if (chain_opts[_Debug]) log_msg("start script load (ordered async): " + src);
                /*!END_DEBUG*/
                script.async = false;
                create_script_load_listener(script, registry_item, "finished", onload);
                script.src = src;
                append_to.insertBefore(script, append_to.firstChild);
            }
            // otherwise, just a normal script element
            else {
                /*!START_DEBUG*/
                if (chain_opts[_Debug]) log_msg("start script load: " + src);
                /*!END_DEBUG*/
                create_script_load_listener(script, registry_item, "finished", onload);
                script.src = src;
                append_to.insertBefore(script, append_to.firstChild);
            }
        }, 0);
    }

    // create a clean instance of $LAB
    function create_sandbox() {
        var global_defaults = {},
            can_use_preloading = real_preloading || xhr_or_cache_preloading,
            queue = [],
            registry = {},
            instanceAPI
        ;

        // global defaults
        global_defaults[_UseLocalXHR] = true;
        global_defaults[_AlwaysPreserveOrder] = false;
        global_defaults[_AllowDuplicates] = false;
        global_defaults[_CacheBust] = false;
        /*!START_DEBUG*/
        global_defaults[_Debug] = false;
        /*!END_DEBUG*/
        global_defaults[_BasePath] = "";

        // execute a script that has been preloaded already
        function execute_preloaded_script(chain_opts, script_obj, registry_item) {
            var script;

            function preload_execute_finished() {
                if (script != null) { // make sure this only ever fires once
                    script = null;
                    script_executed(registry_item);
                }
            }

            if (registry[script_obj.src].finished) return;
            if (!chain_opts[_AllowDuplicates]) registry[script_obj.src].finished = true;

            script = registry_item.elem || document.createElement("script");
            if (script_obj.type) script.type = script_obj.type;
            if (script_obj.charset) script.charset = script_obj.charset;
            create_script_load_listener(script, registry_item, "finished", preload_execute_finished);

            // script elem was real-preloaded
            if (registry_item.elem) {
                registry_item.elem = null;
            }
            // script was XHR preloaded
            else if (registry_item.text) {
                script.onload = script.onreadystatechange = null;	// script injection doesn't fire these events
                script.text = registry_item.text;
            }
            // script was cache-preloaded
            else {
                script.src = script_obj.real_src;
            }
            append_to.insertBefore(script, append_to.firstChild);

            // manually fire execution callback for injected scripts, since events don't fire
            if (registry_item.text) {
                preload_execute_finished();
            }
        }

        // process the script request setup
        function do_script(chain_opts, script_obj, chain_group, preload_this_script) {
            var registry_item,
                registry_items,
                ready_cb = function () {
                    script_obj.ready_cb(script_obj, function () {
                        execute_preloaded_script(chain_opts, script_obj, registry_item);
                    });
                },
                finished_cb = function () {
                    script_obj.finished_cb(script_obj, chain_group);
                }
            ;

            script_obj.src = canonical_uri(script_obj.src, chain_opts[_BasePath]);
            script_obj.real_src = script_obj.src +
                // append cache-bust param to URL?
                (chain_opts[_CacheBust] ? ((/\?.*$/.test(script_obj.src) ? "&_" : "?_") + ~~(Math.random() * 1E9) + "=") : "")
            ;

            if (!registry[script_obj.src]) registry[script_obj.src] = {items: [], finished: false};
            registry_items = registry[script_obj.src].items;

            // allowing duplicates, or is this the first recorded load of this script?
            if (chain_opts[_AllowDuplicates] || registry_items.length == 0) {
                registry_item = registry_items[registry_items.length] = {
                    ready: false,
                    finished: false,
                    ready_listeners: [ready_cb],
                    finished_listeners: [finished_cb]
                };

                request_script(chain_opts, script_obj, registry_item,
                    // which callback type to pass?
                    (
                        (preload_this_script) ? // depends on script-preloading
                            function () {
                                registry_item.ready = true;
                                for (var i = 0; i < registry_item.ready_listeners.length; i++) {
                                    registry_item.ready_listeners[i]();
                                }
                                registry_item.ready_listeners = [];
                            } :
                            function () {
                                script_executed(registry_item);
                            }
                    ),
                    // signal if script-preloading should be used or not
                    preload_this_script
                );
            }
            else {
                registry_item = registry_items[0];
                if (registry_item.finished) {
                    finished_cb();
                }
                else {
                    registry_item.finished_listeners.push(finished_cb);
                }
            }
        }

        // creates a closure for each separate chain spawned from this $LAB instance, to keep state cleanly separated between chains
        function create_chain() {
            var chainedAPI,
                chain_opts = merge_objs(global_defaults, {}),
                chain = [],
                exec_cursor = 0,
                scripts_currently_loading = false,
                group
            ;

            // called when a script has finished preloading
            function chain_script_ready(script_obj, exec_trigger) {
                /*!START_DEBUG*/
                if (chain_opts[_Debug]) log_msg("script preload finished: " + script_obj.real_src);
                /*!END_DEBUG*/
                script_obj.ready = true;
                script_obj.exec_trigger = exec_trigger;
                advance_exec_cursor(); // will only check for 'ready' scripts to be executed
            }

            // called when a script has finished executing
            function chain_script_executed(script_obj, chain_group) {
                /*!START_DEBUG*/
                if (chain_opts[_Debug]) log_msg("script execution finished: " + script_obj.real_src);
                /*!END_DEBUG*/
                script_obj.ready = script_obj.finished = true;
                script_obj.exec_trigger = null;
                // check if chain group is all finished
                for (var i = 0; i < chain_group.scripts.length; i++) {
                    if (!chain_group.scripts[i].finished) return;
                }
                // chain_group is all finished if we get this far
                chain_group.finished = true;
                advance_exec_cursor();
            }

            // main driver for executing each part of the chain
            function advance_exec_cursor() {
                while (exec_cursor < chain.length) {
                    if (is_func(chain[exec_cursor])) {
                        /*!START_DEBUG*/
                        if (chain_opts[_Debug]) log_msg("$LAB.wait() executing: " + chain[exec_cursor]);
                        /*!END_DEBUG*/
                        try {
                            chain[exec_cursor++]();
                        } catch (err) {
                            /*!START_DEBUG*/
                            if (chain_opts[_Debug]) log_error("$LAB.wait() error caught: ", err);
                            /*!END_DEBUG*/
                            if (window.console && window.console.log) {
                                console.log(err)
                            }
                        }
                        continue;
                    }
                    else if (!chain[exec_cursor].finished) {
                        if (check_chain_group_scripts_ready(chain[exec_cursor])) continue;
                        break;
                    }
                    exec_cursor++;
                }
                // we've reached the end of the chain (so far)
                if (exec_cursor == chain.length) {
                    scripts_currently_loading = false;
                    group = false;
                }
            }

            // setup next chain script group
            function init_script_chain_group() {
                if (!group || !group.scripts) {
                    chain.push(group = {scripts: [], finished: true});
                }
            }

            // API for $LAB chains
            chainedAPI = {
                // start loading one or more scripts
                script: function () {
                    for (var i = 0; i < arguments.length; i++) {
                        (function (script_obj, script_list) {
                            var splice_args;

                            if (!is_array(script_obj)) {
                                script_list = [script_obj];
                            }
                            for (var j = 0; j < script_list.length; j++) {
                                init_script_chain_group();
                                script_obj = script_list[j];

                                if (is_func(script_obj)) script_obj = script_obj();
                                if (!script_obj) continue;
                                if (is_array(script_obj)) {
                                    // set up an array of arguments to pass to splice()
                                    splice_args = [].slice.call(script_obj); // first include the actual array elements we want to splice in
                                    splice_args.unshift(j, 1); // next, put the `index` and `howMany` parameters onto the beginning of the splice-arguments array
                                    [].splice.apply(script_list, splice_args); // use the splice-arguments array as arguments for splice()
                                    j--; // adjust `j` to account for the loop's subsequent `j++`, so that the next loop iteration uses the same `j` index value
                                    continue;
                                }
                                if (typeof script_obj == "string") script_obj = {src: script_obj};
                                script_obj = merge_objs(script_obj, {
                                    ready: false,
                                    ready_cb: chain_script_ready,
                                    finished: false,
                                    finished_cb: chain_script_executed
                                });
                                group.finished = false;
                                group.scripts.push(script_obj);

                                do_script(chain_opts, script_obj, group, (can_use_preloading && scripts_currently_loading));
                                scripts_currently_loading = true;

                                if (chain_opts[_AlwaysPreserveOrder]) chainedAPI.wait();
                            }
                        })(arguments[i], arguments[i]);
                    }
                    return chainedAPI;
                },
                // force LABjs to pause in execution at this point in the chain, until the execution thus far finishes, before proceeding
                wait: function () {
                    if (arguments.length > 0) {
                        for (var i = 0; i < arguments.length; i++) {
                            chain.push(arguments[i]);
                        }
                        group = chain[chain.length - 1];
                    }
                    else group = false;

                    advance_exec_cursor();

                    return chainedAPI;
                }
            };

            // the first chain link API (includes `setOptions` only this first time)
            return {
                script: chainedAPI.script,
                wait: chainedAPI.wait,
                setOptions: function (opts) {
                    merge_objs(opts, chain_opts);
                    return chainedAPI;
                }
            };
        }

        // API for each initial $LAB instance (before chaining starts)
        instanceAPI = {
            // main API functions
            setGlobalDefaults: function (opts) {
                merge_objs(opts, global_defaults);
                return instanceAPI;
            },
            setOptions: function () {
                return create_chain().setOptions.apply(null, arguments);
            },
            script: function () {
                return create_chain().script.apply(null, arguments);
            },
            wait: function () {
                return create_chain().wait.apply(null, arguments);
            },

            // built-in queuing for $LAB `script()` and `wait()` calls
            // useful for building up a chain programmatically across various script locations, and simulating
            // execution of the chain
            queueScript: function () {
                queue[queue.length] = {type: "script", args: [].slice.call(arguments)};
                return instanceAPI;
            },
            queueWait: function () {
                queue[queue.length] = {type: "wait", args: [].slice.call(arguments)};
                return instanceAPI;
            },
            runQueue: function () {
                var $L = instanceAPI, len = queue.length, i = len, val;
                for (; --i >= 0;) {
                    val = queue.shift();
                    $L = $L[val.type].apply(null, val.args);
                }
                return $L;
            },

            // rollback `[global].$LAB` to what it was before this file was loaded, the return this current instance of $LAB
            noConflict: function () {
                global.$LAB = _$LAB;
                return instanceAPI;
            },

            // create another clean instance of $LAB
            sandbox: function () {
                return create_sandbox();
            }
        };

        return instanceAPI;
    }

    // create the main instance of $LAB
    global.$LAB = create_sandbox();


    /* The following "hack" was suggested by Andrea Giammarchi and adapted from: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
     NOTE: this hack only operates in FF and then only in versions where document.readyState is not present (FF < 3.6?).

     The hack essentially "patches" the **page** that LABjs is loaded onto so that it has a proper conforming document.readyState, so that if a script which does
     proper and safe dom-ready detection is loaded onto a page, after dom-ready has passed, it will still be able to detect this state, by inspecting the now hacked
     document.readyState property. The loaded script in question can then immediately trigger any queued code executions that were waiting for the DOM to be ready.
     For instance, jQuery 1.4+ has been patched to take advantage of document.readyState, which is enabled by this hack. But 1.3.2 and before are **not** safe or
     fixed by this hack, and should therefore **not** be lazy-loaded by script loader tools such as LABjs.
     */
    (function (addEvent, domLoaded, handler) {
        if (document.readyState == null && document[addEvent]) {
            document.readyState = "loading";
            document[addEvent](domLoaded, handler = function () {
                document.removeEventListener(domLoaded, handler, false);
                document.readyState = "complete";
            }, false);
        }
    })("addEventListener", "DOMContentLoaded");

    var head = document.head || document.getElementsByTagName('head')[0];
    var styleSheets = document.styleSheets;
    var env = getEnv(); //获取用户代理信息，为浏览器差异化加载提供判断依据
    var queue = []; //CSS加载队列
    /*
     @格式1 queue队列内元素格式
     {
     urls: ['a.css', 'b.css', 'd.css'],
     callback: function(param){},  //urls里面所有CSS文件加载完成后的回调方法，可选
     obj: {age:24} //callback回调方法传入的实参
     }
     */

    /**
     * @private
     * @description 获取元素下标
     */
    function indexOf(arr, ele) {
        var ret = -1;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] == ele) ret = i;
        }
        return ret;
    }

    /**
     * @private
     * @description 返回用户浏览器代理信息，为判断不同浏览器提供依据
     * @return {Object} 格式见内部代码
     */
    function getEnv() {
        var ua = navigator.userAgent;
        var env = {};

        (env.webkit = /AppleWebKit\//.test(ua))
        || (env.ie = /MSIE/.test(ua))
        || (env.opera = /Opera/.test(ua))
        || (env.gecko = /Gecko\//.test(ua))
        || (env.unknown = true);

        return env;
    }

    /**
     * @private
     * @description gecko内核的浏览器轮询检测方法
     * 参考：http://www.zachleat.com/web/2010/07/29/load-css-dynamically/
     * @param {HTMLElement} node style节点，node.nodeName == 'STYLE'
     * @param {Object} queueObj 见@格式1
     */
    function pollGecko(node, queueObj) {
        try {
            node.sheet.cssRules;
        } catch (ex) {
            node.pollCount++;
            if (node.pollCount < 200) {
                setTimeout(function () {
                    pollGecko(node, queueObj);
                }, 50);
            } else {
                finishLoading(node.href, queueObj);  //用不用略做些延迟，防止神一样的渲染问题？？
            }
            return;
        }
        finishLoading(node.href, queueObj);
    }

    /**
     * @private
     * @description webkit内核的浏览器轮询检测方法
     * @param {HTMLElement} node link节点，node.nodeName == 'LINK'
     * @param {Object} queueObj 见@格式1
     */
    function pollWebKit(node, queueObj) {
        for (var i = styleSheets.length; i > 0; i--) {
            if (styleSheets[i - 1].href === node.href) {
                finishLoading(node.href, queueObj);
                return;
            }
        }
        node.pollCount++; //轮询次数加1
        if (node.pollCount < 200) {
            setTimeout(function () {
                pollWebKit(node, queueObj);
            }, 50);
        } else {
            finishLoading(node.href, queueObj);
        }
    }

    //检查css加载是否成功
    function checkSucc(className, attr, value) {
        var div = document.createElement('div');
        div.style.cssText += 'height:0; line-height:0; visibility:hidden;';
        div.className = className;
        document.body.appendChild(div);
        return getComputedStyle(div, attr) == value;
    }

    /**
     * @description 获取节点样式值——只能获取比较简单的样式的值，一些兼容性问题不是重点，在这里不做处理，有兴趣可以看下jquery源码
     * @param {HTMLElement} node dom节点
     * @param {String} attr 样式名字，如display、visibility等
     */
    function getComputedStyle(node, attr) {
        var getComputedStyle = window.getComputedStyle;
        if (getComputedStyle) {
            return getComputedStyle(node, null)[attr];
        } else if (node.currentStyle) {
            return node.currentStyle[attr];
        } else {
            return node.style[attr];
        }
    }

    /**
     * @private
     * @description url对应的CSS文件加载完成时的回调（404也包括在内）
     * @param {String} url CSS文件的url
     * @param {Object} queueObj 见@格式1
     */
    function finishLoading(url, queueObj) {
        var index = indexOf(queueObj.urls, url);
        queueObj.urls.splice(index, 1);
        if (!queueObj.urls.length) {
            queueObj.callback(queueObj.obj);
            index = indexOf(queue, queueObj);
            queue.splice(index, 1);
        }
    }

    /**
     * @description 加载CSS的方法
     * @param {Array} urls 加载的CSS文件名队列
     * @param {Function} [callback] CSS文件队列全部加载完的回调
     * @param {Object} obj callback的参数
     * @param {Object} context
     * @return {Undefined}
     */
    function _loadCSS(urls, callback, obj) {
        var queueObj = {
            urls: urls,
            callback: callback,
            obj: obj
        };
        queue.push(queueObj);
        var pendingUrls = queueObj.urls;
        for (var i = 0, len = pendingUrls.length; i < len; ++i) {
            var url = pendingUrls[i];
            var node;
            if (env.gecko) {
                node = document.createElement('style');
            } else {
                node = document.createElement('link');
                node.rel = 'stylesheet';
                node.href = url;
            }
            //node.setAttribute('charset', 'utf-8');  //设不设置有木有影响，持保留态度
            if (env.gecko || env.webkit) {  //老版本webkit、gecko不支持onload
                node.pollCount = 0;
                queueObj.urls[i] = node.href; //轮询判断的时候用到，因为不同浏览器里面取到的node.href值会不一样，有的只有文件名，有的是完整文件名？（相对路径、绝对路径）
                if (env.webkit) {  //之所以要用轮询，后面讨论，@TODO: 新版本的webkit已经支持onload、onerror，优化下？
                    pollWebKit(node, queueObj);
                } else {
                    node.innerHTML = '@import "' + url + '";';  //为什么这样做，猛点击这里：http://www.phpied.com/when-is-a-stylesheet-really-loaded/
                    pollGecko(node, queueObj);
                }
            } else {
                node.onload = node.onerror = function () {
                    finishLoading(this.href, queueObj);
                };
            }
            head.appendChild(node);

        }
    }


    /**
     * @private
     * @description 处理js加载队列
     * @param {Array} queue 加载的JS队列
     * @param {Object} 详见@格式2
     * @return {Undefined}
     */
    function _handleQueue(queue, options) {
        var moduleArr = options.module, length = moduleArr.length;
        for (var i = 0; i < length; i++) {
            if (typeof(moduleArr[i]) == "object") {
                queue.push(moduleArr[i]);
            } else {
                queue.push([moduleArr[i]]);
            }
        }
    }

    /**
     * @private
     * @description 处理模板配置
     * @param {Array} queue 加载的JS队列
     * @param {Object} 详见@格式2
     * @return {Undefined}
     */
    function _handletemplate(queue, options) {
        var templateQueue = RX.config.template[options.template], length = templateQueue.length;
        if (templateQueue) {
            for (var i = 0; i < length; i++) {
                queue.push(templateQueue[i]);
            }
        }
    }

    /**
     * @private
     * @description 获取Js别名对应的详细地址
     * @param {String} alias 别名
     * @return {String} 详细地址
     */
    function _handleAlias(alias) {
        var tLocation = RX.config.alias[alias];
        //20180709zp:调整逻辑，仅无别名文件加随机数后缀，业务代码可无缓存
        if (!tLocation) {
            tLocation = alias;
            if (!RX.config.canCache) {
                if (tLocation.indexOf("?") > -1) {
                    tLocation = tLocation + "&r=" + Math.random();
                } else {
                    tLocation = tLocation + "?r=" + Math.random();
                }
            }
        }
        // tLocation = tLocation ? tLocation : alias;
        // if (!RX.config.canCache) {
        //     if (tLocation.indexOf("?") > -1) {
        //         tLocation = tLocation + "&r=" + Math.random();
        //     } else {
        //         tLocation = tLocation + "?r=" + Math.random();
        //     }
        // }
        return tLocation;
    }

    /**
     * @private
     * @description 获取Css别名对应的详细地址
     * @param {String} alias 别名
     * @return {String} 详细地址
     */
    function _handleCssAlias(alias) {
        var tLocation = RX.config.cssAlias[alias];
        //20180709zp:调整逻辑，仅无别名文件可加随机数后缀，业务代码可无缓存
        if (tLocation) {
            tLocation = tLocation.trim();

            //拼接皮肤后缀
            // if (RX.config.selectSkin && RX.config.selectSkin !== "default") {
            var skinPool = RX.config.skin[RX.config.selectSkin];
            if (skinPool && $.inArray(alias, skinPool) > -1) {
                if (tLocation.endWith(".css")) {
                    tLocation = tLocation.replace('default', RX.config.selectSkin);
                    tLocation = tLocation.substring(0, tLocation.length - 4) +
                        "_" + RX.config.selectSkin + ".css";
                }
            }
            // }
        } else {
            tLocation = alias;
            if (!RX.config.canCache) {
                if (tLocation.indexOf("?") > -1) {
                    tLocation = tLocation + "&r=" + Math.random();
                } else {
                    tLocation = tLocation + "?r=" + Math.random();
                }
            }
        }
        // tLocation = tLocation ? tLocation : alias;
        // if (!RX.config.canCache) {
        //     if (tLocation.indexOf("?") > -1) {
        //         tLocation = tLocation + "&r=" + Math.random();
        //     } else {
        //         tLocation = tLocation + "?r=" + Math.random();
        //     }
        // }
        return tLocation;
    }

    /**
     * @private
     * @description 按照队列内容，加载js
     * @param {String} queue js队列
     * @param {Object} options 详见@格式2
     * @return {Undefined}
     */
    function _loadScript(queue, options) {
        var i = 0, l = queue.length;
        var loadstr = ["$LAB"];
        for (; i < l; i++) {
            var subqueue = queue[i], si = 0, sl = subqueue.length;
            for (; si < sl; si++) {
                var turl = subqueue[si];
                if (si == sl - 1) {
                    if (i == l - 1 && options.callback) {
                        loadstr.push(".script('" + turl + "').wait(options.callback)");
                        RX.log("RX.load:(script)" + turl, RX.logType.LOAD);
                        RX.log("RX.load:wait and callback", RX.logType.LOAD);
                    } else {
                        loadstr.push(".script('" + turl + "').wait()");
                        RX.log("RX.load:(script)" + turl, RX.logType.LOAD);
                        RX.log("RX.load:wait", RX.logType.LOAD);
                    }
                } else {
                    loadstr.push(".script('" + turl + "')");
                    RX.log("RX.load:(script)" + turl, RX.logType.LOAD);
                }
            }
        }
        if (loadstr.length > 1) {
            eval(loadstr.join(""));
        }
    }

    /**
     * 处理加载的js，别名以及项目路径等
     * @param alias
     * @returns {String} 为null表示不添加
     * @private
     */
    function _handleLoadJs(alias) {
        //处理别名，以及判断是否可以添加
        var url = _handleAlias(alias);
        return url && RX.handlePath(url);
    }

    /**
     * @private
     * @description JS文件加载入口方法
     * @param {String} queue js队列
     * @param {Object} options 详见@格式2
     * @return {Undefined}
     */
    function _loadJS(options) {
        var loadQueue = [];
        options.template && _handletemplate(loadQueue, options);
        options.module && (typeof(options.module) == "object" ? _handleQueue(loadQueue, options) : loadQueue.push([options.module]));
        handleAlisAndFilter(loadQueue);
        _loadScript(loadQueue, options);
    }

    /**
     * 过滤以及处理别名
     *
     * @param loadQueue 加载队列
     */
    function handleAlisAndFilter(loadQueue) {
        var loadArr, replaceArr;
        for (var i = 0, maxLength = loadQueue.length; i < maxLength; i++) {
            loadArr = loadQueue[i];
            replaceArr = [];
            $.each(loadArr, function (index, value) {
                var url = _handleLoadJs(value);
                if (url) {
                    replaceArr.push(url);
                }
            });
            loadQueue[i] = replaceArr;
        }
    }

    /*
     * 同步加载js
     * */
    function _loadBlockJS(options) {
        var loadQueue = [];
        options.template && _handletemplate(loadQueue, options);
        options.module && (typeof(options.module) == "object" ? _handleQueue(loadQueue, options) : loadQueue.push([options.module]));
        RX.loadScriptBlocked(loadQueue);
    }

    // 阻塞式加载css脚本文件
    RX.loadCssBlocked = function (urls, hasHandleTag) {
        if (urls) {
            if (typeof(urls) == "object") {
                for (var i = 0; i < urls.length; i++) {
                    document.write('<link rel="stylesheet" href="' + (hasHandleTag ? urls[i] : RX.handlePath(_handleCssAlias(urls[i]))) + '"/>');
                }
            } else if (typeof(urls) == "string") {
                document.write('<link rel="stylesheet" href="' + (hasHandleTag ? urls : RX.handlePath(_handleCssAlias(urls))) + '"/>');
            }
        }
    };

    /*
     @格式1 queue队列内元素格式
     {
     urls: ['a.css', 'b.css', 'd.css'],
     callback: function(param){},  //urls里面所有CSS文件加载完成后的回调方法，可选
     obj: {age:24} //callback回调方法传入的实参
     }
     */
    /**
     * @public
     * @description 加载CSS
     * @param {Object} 加载CSS参数，详见@格式1
     * @return {Object} RX 链式调用
     */
    RX.loadCSS = function (options) {
        //若顶层传入skin类型，则调整配置皮肤类型
        // if (options.skin) {
        //     RX.config.selectSkin = options.skin;
        // }
        if (!options.skin) {
            if (RX.cookie("skin")) {
                RX.config.selectSkin = RX.cookie("skin");
            }
            else if (_top) {
                RX.config.selectSkin = _top.RX.config.selectSkin || "default";
            }
        } else {
            RX.config.selectSkin = options.skin;
        }

        var loadQueue = [];
        options.template && (loadQueue = loadQueue.concat(RX.config.cssTemplate[options.template]));
        if (options.module) {
            if (typeof(options.module) == "object") {
                loadQueue = loadQueue.concat(options.module)
            } else {
                loadQueue.push(options.module);
            }
        }
        var length = loadQueue.length;
        for (var i = 0; i < length; i++) {
            loadQueue[i] = RX.handlePath(_handleCssAlias(loadQueue[i]));
        }
        if (options.async) {
            _loadCSS([].concat(loadQueue), options.callback || function () {
            }, options.obj || {});
        } else {
            RX.loadCssBlocked([].concat(loadQueue), true);
        }

        //FixMe:20170709增加自动逻辑，须在测试IE8环境下测试效果
        if (RX.browser.isIE8) {
            window.onload = function () {
                _loadCSS([RX.handlePath(_handleCssAlias("iconfont"))], function () {
                }, {});
            };
        }

        return RX;
    };
    /*
     @格式2 js加载参数格式
     {
     template: 'grid',  //按模板加载JS文件，优先处理，可选
     module: ['a.js', 'b.js', 'd.js'],  //待加载的js队列，可为js地址，也可为别名注册的名称，可选
     callback: function(){}  //所有JS文件加载完成后的回调方法，可选
     }
     */
    /**
     * @public
     * @description 加载JS
     * @param {Object} 加载JS参数，详见@格式2
     * @return {Object} RX 链式调用
     */
    RX.load = function (options) {
        if (!options || typeof(options) != "object") {
            RX.browser.debug && RXLog("RX.load:参数异常");
        }
        //处理内置的callback
        handleCallback(options);
        // //FIXME:异步加载有问题，如果打了debugger,加载次序出错，先改成同步加载
        // _loadBlockJS(options);
        if (options.async == false) {
            _loadBlockJS(options);
        } else {
            _loadJS(options);
        }
        return RX;
    };

    /**
     * 处理默认的callback事件
     * @param options
     */
    function handleCallback(options) {
        //是页面调用的最后一个RX.load
        if (typeof options.mainFlag === "undefined" ? options.template : options.mainFlag) {
            //记录初始的callback
            var oldCallback = options.callback;
            options.callback = function () {
                //执行记录的callback函数
                for (var i = 0, maxLength = _callbackFunc.length; i < maxLength; i++) {
                    typeof _callbackFunc[i] === "function" && _callbackFunc[i]();
                }
                oldCallback && oldCallback();
            };
        }
    }

    RX.fixPng = function (str) {
        str = str || '*';
        RX.load({
            module: "pngFix", callback: function () {
                $(function () {
                    if (RX.browser.isIE6) {         //IE6
                        DD_belatedPNG.fix(str);
                    }
                })
            }
        });
    };

    /**
     * 汉字转码
     * @param {string} val 待转的汉字
     * @returns {string} 转码后的字符串
     * @example RX.encode("中国");
     */
    RX.encode = function (val) {
        return !val ? "" : encodeURI(encodeURI(val));
    };
    /**
     * 汉字解码
     * @param {string} val 待解码的字符串
     * @returns {string} 解码后的字符串
     * @example RX.decode("");
     */
    RX.decode = function (val) {
        return !val ? "" : decodeURI(decodeURI(val));
    };

    String.prototype.endWith = function (s) {
        if (s == null || s == "" || this.length == 0 || s.length > this.length)
            return false;
        if (this.substring(this.length - s.length) == s)
            return true;
        else
            return false;
    };
    String.prototype.startWith = function (s) {
        if (s == null || s == "" || this.length == 0 || s.length > this.length)
            return false;
        if (this.substr(0, s.length) == s)
            return true;
        else
            return false;
    };
    String.prototype.trim = function (str) {
        if (!str) {
            str = this;
        }
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };

    //处理路径
    RX.handlePath = function (url) {
        if (url) {
            var us = url.toString().split("|");
            if (us.length == 3) {
                if (us[1] != "") {
                    var withPath = RX.config.paths[us[1]];
                    var resultUrl = us[0] || "";
                    if (!us[0] || us[0].charAt(us[0].length - 1) != "/") {
                        resultUrl += "/";
                    }
                    resultUrl += withPath || "";
                    if (us[2] && us[2].charAt(0) != "/") {
                        resultUrl += "/";
                    }
                    resultUrl += us[2] || "";
                    return resultUrl;
                }
            } else {
                var surl = url.toString();
                var withPath = RX.config.ctxPath;
                if (withPath && withPath !== "/" && surl.charAt(0) == "/") {
                    if (!surl.startWith(withPath + "/")) {
                        return withPath + surl;
                    }
                }
                return surl;
            }
        }
        return "";
    };

    //处理src
    RX.fixSrc = function (obj) {
        if (obj && obj.getAttribute("_srcFixed") != "1") {
            var osrc = obj.getAttribute("src");
            if (osrc) {
                obj.src = RX.handlePath(osrc);
                obj.setAttribute("_srcFixed", "1");
            }
        }
    };

    //页面加载后img与iframe的真实路径处理
    RX.handleSrc = function () {
        window.document.ready = function () {
            var imgs = window.document.getElementsByTagName("img");
            for (var i = 0; i < imgs.length; i++) {
                var osrc = imgs[i].getAttribute("src");
                if (osrc) {
                    var osrc2 = RX.handlePath(osrc);
                    if (osrc2 != osrc) {
                        imgs[i].src = osrc2;
                    }
                } else {
                    var tsrc = imgs[i].getAttribute("basesrc");
                    if (tsrc) {
                        var tsrc2 = RX.handlePath(tsrc);
                        imgs[i].src = tsrc2;
                    }
                }
            }

            var atags = window.document.getElementsByTagName("a");
            for (var i = 0; i < atags.length; i++) {
                var osrc = atags[i].getAttribute("href");
                if (osrc) {
                    var osrc2 = RX.handlePath(osrc);
                    if (osrc2 != osrc) {
                        atags[i].href = osrc2;
                    }
                } else {
                    var tsrc = atags[i].getAttribute("basehref");
                    if (tsrc) {
                        var tsrc2 = RX.handlePath(tsrc);
                        atags[i].href = tsrc2;
                    }
                }
            }

            var frames = window.document.getElementsByTagName("iframe");
            for (var i = 0; i < frames.length; i++) {
                var osrc = frames[i].getAttribute("src");
                if (osrc) {
                    var osrc2 = RX.handlePath(osrc);
                    if (osrc2 != osrc) {
                        frames[i].src = osrc2;
                    }
                } else {
                    var tsrc = frames[i].getAttribute("basesrc");
                    if (tsrc) {
                        var tsrc2 = RX.handlePath(tsrc);
                        frames[i].src = tsrc2;
                    }
                }
            }
        }
    };

    // 阻塞式加载js脚本文件
    RX.loadScriptBlocked = function (urls) {
        if (urls) {
            if (typeof(urls) == "object") {
                for (var i = 0; i < urls.length; i++) {
                    RX.loadScriptBlocked(urls[i]);
                }
            } else if (typeof(urls) == "string") {
                document.write('<script type="text/javascript" src="' + RX.handlePath(_handleAlias(urls)) + '"></script>');
            }
        }
    };
    //
    RX.cookie = function (key, value, options) {
        var days, time, result, decode;

        // A key and value were given. Set cookie.
        if (arguments.length > 1 && String(value) !== "[object Object]") {
            // Enforce object
            options = extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                days = (options.expires * 24 * 60 * 60 * 1000);
                time = options.expires = new Date();

                time.setTime(time.getTime() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // Key and possibly options given, get cookie
        options = value || {};

        decode = options.raw ? function (s) {
            return s
        } : decodeURIComponent;

        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
    };

    /**
     * 控制台输出信息
     * @param {string} content 输出内容
     * @param {*} type 日志类型，在rx.load.js中维护，没有则不输出
     */
    RX.log = function (content, type) {
        type = type || RX.logType.NORMAL;
        if (type.code && $.inArray(type.code, RX.config.printLogType) > -1) {
            if (window.console && window.console.log) {
                console.log(type.title + ": " + content);
            }
        }
    };

    /**
     * 控制台输出异常信息
     * @param {string} content 输出异常内容
     */
    RX.error = function (content) {
        if (window.console && window.console.error) {
            console.error("平台输出异常：" + content);
        } else {  //若浏览器不支持输出异常，则输出日志
            RX.log(content);
        }
    };

    /**
     * 公共接口：文件模板获取
     * @param tplName 模板名称
     * @returns {*}
     */
    RX.loadTpl = function (tplName) {
        var tpl = null;
        $.ajax({
            type: "post",
            url: "/template/getTemplate",
            async: false,
            data: {tplPath: tplName},
            success: function (ar) {
                tpl = ar[tplName];
            }
        });
        return tpl;
    };

    /**
     * 放在callback中执行的逻辑
     * 限制：接口调用只能在最外层
     * @param func
     */
    RX.pushCallbackFunc = function (func) {
        _callbackFunc.push(func);
    };

    //自动操作代码
    //加载默认css
    RX.loadCssBlocked(RX.config.defaultCss);

    //加载默认js
    RX.loadScriptBlocked(RX.config.defaultJs);

    //判断是临时顶层
    if (_tempTop) {
        //加载临时顶层css
        RX.loadCssBlocked(RX.config.tempTopCss);

        //加载临时顶层js
        RX.loadScriptBlocked(RX.config.tempTopJs);
    }

    //自动处理页面元素项目路径
    RX.handleSrc();

})(this);

(function (d) {
    if (navigator.userAgent.indexOf('MSIE 9') === -1) return;

    d.addEventListener('selectionchange', function() {
        var el = d.activeElement;

        if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT')) {
            var ev = d.createEvent('CustomEvent');
            ev.initCustomEvent('input', true, true, {});
            el.dispatchEvent(ev);
        }
    });
})(document);



