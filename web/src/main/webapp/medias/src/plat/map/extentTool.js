/**
 * 该类暂时舍弃，先不删除文件
 */
define(["RXMap/mapGlobal", "esri/tasks/PrintTask", "esri/tasks/PrintParameters", "esri/dijit/Print",
    "esri/tasks/PrintTemplate", "dojo/_base/array", "dojo/dom"], function (MapGlobal, PrintTask, PrintParameters, Print, PrintTemplate, arrayUtils, dom) {
    var me;
    var tool = {
        init: function () {
            me = this;
            me._bindEvent();
        },

        //绑定扩展工具事件
        _bindEvent: function () {
            //注册地图工具按钮
            $(" .map-tool-button").click(function () {
                switch ($(this).attr("data-tool")) {
                    case "export": {      //放大
                        me._export();
                        break
                    }
                    case "print": {      //放大
                        me._print();
                        break
                    }

                }
            });
        },



        //输出图片
        _export: function () {
            this._a();
        },

        //输出地图
        _print: function () {
            this._createPrintDijit("")
        },
        _createPrintDijit: function (printTitle) {
            var layoutTemplate, templateNames, mapOnlyIndex, templates;

            // create an array of objects that will be used to create print templates
            var layouts = [{
                name: "Letter ANSI A Landscape",
                label: "Landscape (PDF)",
                format: "pdf",
                options: {
                    legendLayers: [], // empty array means no legend
                    scalebarUnit: "Miles",
                    titleText: printTitle + ", Landscape PDF"
                }
            }, {
                name: "Letter ANSI A Portrait",
                label: "Portrait (Image)",
                format: "jpg",
                options: {
                    legendLayers: [],
                    scalebarUnit: "Miles",
                    titleText: printTitle + ", Portrait JPG"
                }
            }];

            // create the print templates
            var templates = arrayUtils.map(layouts, function (lo) {
                var t = new PrintTemplate();
                t.layout = lo.name;
                t.label = lo.label;
                t.format = lo.format;
                t.layoutOptions = lo.options;
                return t;
            });
            var printer = new Print({
                map: MapGlobal.map,
                templates: templates,
                url: "http://172.28.1.131:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
            }, dom.byId("print_button"));
            printer.startup();

        },
        _a: function () {
            var printTask = new PrintTask("http://172.28.1.131:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
            var template = new PrintTemplate();
            template.layoutOptions = {
                "authorText": "Made by:  Esri's JS API Team",
                "copyrightText": "copyright info here",
                "legendLayers": [],
                "titleText": "Pool Permits",
                "scalebarUnit": "Miles"
            };
            // var dpi = document.getElementById("dpi").value ;
            template.exportOptions = {
                width: 800,
                height: 600,
                dpi: Number(90)
            };
            template.format = "png32";
            template.layout = "MAP_ONLY";
            template.preserveScale = false;
            var params = new PrintParameters();
            params.map = MapGlobal.map;
            params.template = template;
            printTask.execute(params, function (evt) {
                window.open(evt.url, "_blank");
            });
        },

    };
    return tool;
});