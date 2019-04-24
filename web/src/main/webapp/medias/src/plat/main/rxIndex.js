/*
* 首页构建接口
*
*  todo 注意暴露接口处理参数，url可能需要动态传入
*  可以考虑自定义标签
*/

/**
 * 主接口，渲染首页
 *
 \ *          那块的都有reload
 *            以code作为标志，重新渲染，数据什么的重新获取，url条件会根据修改，暴露数据获取前、获取后等一系列事件
 *            nullData的页面提示
 *            按钮挂载布局下面
 *
 *        消息列表类推荐高度？？？，并不是活的？？？
 * @param $el
 * @param options
 */
function renderMainPage($el, options) {
    //配置参数
    var DEFAULTS = {
        code: "",      //唯一标识，记录了位置，用于调用reload接口
        type: "",     //类型，layout（布局），content（内容）
        height: "",   //高度
        width: "",      //宽度
        children: [],   //为布局时，下级数据
        renderType: "",  //内容的布局方式，li（消息类型），image（图标方式），iframe（创建iframe）,
                         // 可以是自定义渲染方式，渲染方式为接口名称
        url: "",     //renderType为iframe时是链接url，其它时是获取接口
        nullDataTip: "",   //无数据的提示
        buttons: [{icon: "", name: "", click: ""}]    //为布局时设置的属性，功能按钮
    };

    //存储div的dom
    var divPool = {};
    //存储code的option
    var optionsPool = {};

    /**
     * 内置渲染方式
     */
    var MainRender = {
        /**
         * li型，消息提醒类的渲染
         * ps：存在的问题
         *      title过长直接在后面拼接，不显示省略号
         * @param data
         * @param options
         * @param $el
         */
        li: function (data, options, $el) {
            //实例化具体视图
            new Rxvm({
                //视图容器
                el: $el[0],
                //视图模板
                template: "#messageListTpl",
                //基础配置
                settings: {
                    //获取数据
                    getData: {
                        defaultData: {data: data}
                    }
                }
            });
            var func = options.click;
            //绑定点击事件
            func = turnIntoFunc(func);
            $el.off("rxIndex");
            if (func) {
                $el.on("click.rxIndex", "ul li a", function () {
                    var index = this.getAttribute("index");
                    func(data[index]);
                });
            }
        },
        /**
         * 图标型的渲染方式
         *  ps：布局存在的问题
         *      宽度高度的问题（大三行的问题等）
         * @param data
         * @param options
         * @param $el
         */
        image: function (data, options, $el) {
            var $ul = $("<ul class='tbtx'></ul>");
            var limit = options.limit || 12;
            var func = options.click;

            /**
             * 渲染li
             * @param star 起始位置
             * @param end 结束位置
             */
            function renderLi(star, end) {
                var obj;
                for (var maxLength = data.length; star < maxLength && star < end; star++) {
                    obj = data[star];
                    $ul.append("<li index='" + star + "'><a href='javascript:void(0)' title='" + obj.name + "'><span><i class='iconfont'>" + obj.icon + "</i> </span>" + (obj.num ? "<em>" + (obj.num > 99 ? "99+" : obj.num) + "</em>" : "") + "<p>" + obj.name + "</p></a></li>");
                }
            }

            renderLi(0, limit);
            var $nextPage = $("<div class='slide_lr'></div>");
            var num = maxLength = Math.ceil(data.length / limit);
            if (num > 1) {
                for (var i = 0, maxLength = num; i < maxLength; i++) {
                    $nextPage.append("<span index='" + i + "'" + (i === 0 ? " class='cur'" : "") + "></span>");
                }
            }
            //绑定点击事件
            func = turnIntoFunc(func);
            if (func) {
                $ul.on("click", "li", function () {
                    var index = this.getAttribute("index");
                    func(data[index]);
                });
            }
            //绑定翻页事件
            if (num > 1) {
                $nextPage.on("click", "span", function () {
                    var index = this.getAttribute("index");
                    $ul.html("");
                    $nextPage.find("span").removeClass("cur");
                    $(this).addClass("cur");
                    renderLi(parseInt(index) * limit, (parseInt(index) + 1) * limit);
                });
            }
            if ($el){
                var $cont = $("<div class='ibox_content'></div>");
                $cont.append($ul);
                $el.append($cont).append($nextPage);
            }
        },
        /**
         * iframe型的渲染方式
         * @param data
         * @param options
         * @param $el
         */
        iframe: function (data, options, $el) {
            var $iframe = $("<iframe src='/" + RX.ctxPath + options.url + "' frameborder='0' width='100%' height='100%'></iframe>");
            $el.append($iframe);
        }
    };

    /**
     * 初始化
     */
    function init() {
        //处理无内容的div，高度和宽度处理
        //数据进行预处理，去除无内容的布局数据
        optionsFilter();
        $.each(options, function (index, option) {
            //创建最外层div
            var $div = $("<div class='m_box'></div>");
            //处理下级资源
            renderChild($div, option.children, option);
            $el.append($div);
        });
    }

    /**
     * 根据资源的第一层下级渲染
     * @param $parent
     * @param childOpts
     * @param parentOption
     */
    function renderChild($parent, childOpts, parentOption) {
        function renderDiv(opt, childs, pOptions) {
            var $div = $("<div style='height:" + (opt.height || "100%") + ";width:" + (opt.width || "100%") + "' class='b_box'></div>");
            var $content;
            if (opt.children[0].title) {
                var $xbox = $("<div class='x_box'></div>");
                $div.append($xbox);
                //默认是带标题的布局，在此进行定制
                $content = $("<div class='boxcenter'></div>");
                renderTab($content, childs, pOptions);
                $xbox.append($content);
            } else {
                //标题，直接增加
                $content = $("<div></div>");
                renderNoTitle($content, childs, pOptions);
                $div.append($content);
            }
            $parent.append($div);
        }

        $.each(childOpts, function (index, opt) {
            if (opt.type === "layout") {
                //处理layout
                renderDiv(opt, opt.children, opt);
            } else if (opt.type === "content") {
                renderDiv(opt, childOpts, parentOption);
                return true;
            }
        })
    }

    function renderNoTitle($div, contents, pOptions) {
        $.each(contents, function (index, content) {
            renderContent($div, content);
        });
    }

    function renderTab($div, contents, pOptions) {
        //先创建tab
        var $hdd = $("<div  class='hdd'></div>");
        //放置title的div
        var $titles = $("<div class='boxcentertop'></div>");
        //放置内容的div
        var $content = $("<div class='boxbody'></div>");
        var $inner = $("<div class='ibox_content' style='height:" + pOptions.height + ";' ></div>");
        if (contents.length === 1) {
            $titles.append("<h1>" + contents[0].title + "</h1>");
            //处理内容
            renderContent($content, contents[0]);
        } else {
            //布局下是布局，之后的布局下是内容
            var $titleUl = $("<ul class='tab_holder_remind'></ul>"), li,
                $contentDiv = $("<div class='lib_Contentbox_remind'></div>"), $conDiv, length = contents.length;
            //生成id
            var tabDivId = RX.uuid();
            $.each(contents, function (index, content) {
                li = "<li><a href='javascript:void(0);' " + (index === 0 ? "class='ts'" : "") + " id='" + (tabDivId + "_" + index) + "' onClick='setTabDiv(\"" + tabDivId + "\"," + index + "," + length + ")'>" + content.title + "</a></li>";
                $titleUl.append(li);
                $conDiv = $("<div " + (index === 0 ? "" : "style='display:none'") + " id='" + (tabDivId + "_con_" + index) + "'></div>");
                renderContent($conDiv, content);
                $contentDiv.append($conDiv);
            });
            $titles.append($titleUl);
            $inner.append($contentDiv);
            $content.append($inner);
        }
        //之后处理按钮
        if (pOptions && pOptions.buttons && pOptions.buttons.length) {
            var $button;
            $.each(pOptions.buttons, function (i, button) {
                $button = $("<a href='javascript:void(0)' title='" + (button.name || "") + "'>" + (button.icon ? "<i class='iconfont'>" + button.icon + "</i>" : button.name) + "</a>");
                var clickFunc = turnIntoFunc(button.click);
                clickFunc && $button.bind("click", function () {
                    clickFunc();
                });
                $titles.append($button);
            });
        }
        $hdd.append($titles).append($content);
        $div.append($hdd);
    }

    /**
     * 配置进行处理，去除下级无内容的块
     *
     */
    function optionsFilter() {
        var newOptions = [];
        //规则，布局下无内容则去除，宽度需要处理
        $.each(options, function (index, option) {
            if (option.children && option.children.length && option.children[0].type === "layout") {
                //处理子集
                var newChild = [];
                for (var i = 0, maxLength = option.children.length; i < maxLength; i++) {
                    var childOpt = option.children[i];
                    if (childOpt.type === "layout" && childOpt.children && childOpt.children.length) {
                        newChild.push(childOpt);
                    }
                }
                option.children = newChild;
            }
            //判断有没有子集
            if (option.children && option.children.length) {
                newOptions.push(option);
            }
        });
        //将宽度转化为百分比
        $.each(newOptions, function (index, option) {
            if (option.children.length === 1) {
                option.children[0].width = "100%";
            } else {
                var num = 0;
                //计算总值
                $.each(option.children, function (i, v) {
                    //默认为50
                    if (!v.width) {
                        v.width = 50;
                    } else {
                        v.width = parseInt(v.width);
                    }
                    num += v.width;
                });
                //处理宽度百分比
                $.each(option.children, function (i, v) {
                    v.width = (v.width / num) * 100 + "%";
                });
            }
        });
        options = newOptions;
    }

    /**
     * 获取数据以及渲染
     * @param $el 位置
     * @param options 配置参数
     */
    function renderContent($el, options) {
        /**
         * 根据不同类型渲染
         * @param $el
         * @param options
         */
        function rendeView($el, options) {
            var data = options.renderData;
            if (options.renderType) {
                if (MainRender[options.renderType]) {
                    MainRender[options.renderType](data, options, $el);
                } else {
                    RX.runGlobalFunc(options.renderType, data, options, $el);
                }
            }
        }

        //options进行处理，转化为可识别的
        switch (options.renderType) {
            case "dbrw":
                options.renderType = "li";
                options.title = options.title || "代办任务";
                options.url = "/mainPage/getDbrw";
        }
        //预处理，清空dom
        $el.empty();
        //缓存code与div区域进行关联
        divPool[options.code] = $el;
        optionsPool[options.code] = options;
        //存在url则获取，iframe是url
        if (options.url && options.renderType !== "iframe") {
            $.ajax({
                type: "post",
                url: options.url,
                success: function (ar) {
                    if (ar.success) {
                        options.renderData = options.data ? options.data.concat(ar.data) : ar.data;
                        rendeView($el, options);
                    } else {
                        RX.alert(ar.msg);
                    }
                }
            });
            //存在数据，直接根据数据渲染
        } else {
            rendeView($el, options);
        }
    }

    /**
     * 转变为函数
     * @param func 函数字符串
     * @return {Object|*}
     */
    function turnIntoFunc(func) {
        if (func) {
            func = RX.getGlobalFunc(func);
            if (typeof func === "function") {
                return func;
            }
        }
    }

    init();

    return {
        /**
         * 刷新模块区域
         * @param code
         */
        reload: function (code) {
            var $div = divPool[code];
            var opt = optionsPool[code];
            renderContent($div, opt);
        }
    };
}


function setTabDiv(id, cursel, n) {
    for (i = 0; i < n; i++) {
        var menu = document.getElementById(id + "_" + i);
        var con = document.getElementById(id + "_con_" + i);
        menu.className = i == cursel ? "ts" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}
