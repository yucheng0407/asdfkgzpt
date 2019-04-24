/**
 * 继承InfoWindowBase的弹出框，用于放地图统计图
 */
define([
        "dojo/Evented",
        "dojo/parser",
        "dojo/on",
        "dojo/_base/declare",
        "dojo/dom-construct",
        "dojo/_base/array",
        "dojo/dom-style",
        "dojo/_base/lang",
        "dojo/dom-class",
        "dojo/fx/Toggler",
        "dojo/fx",
        "dojo/Deferred",
        "esri/domUtils",
        "esri/InfoWindowBase",
        "esri/geometry/screenUtils"
    ],
    function(
        Evented,
        parser,
        on,
        declare,
        domConstruct,
        array,
        domStyle,
        lang,
        domClass,
        Toggler,
        coreFx,
        Deferred,
        domUtils,
        InfoWindowBase,
        screenUtils
    ) {
        return declare([InfoWindowBase, Evented], {
            map:null,
            showMapPoint:null,
            width:null,
            height:null,

            /**
             * 构造函数
             * @param parameters
             */
            constructor: function(parameters) {
                this.map=parameters.map;
                this.showMapPoint=parameters.chartPoint;
                this.width=parameters.width;
                this.height=parameters.height;
                lang.mixin(this, parameters);

                domClass.add(this.domNode, "myInfoWindow");

                this._content = domConstruct.create("div",{"class": ""}, this.domNode);

                this.setMap(parameters.map);
                this.show(parameters.chartPoint);
                this.resize(parameters.width,parameters.height);
            },

            /**
             * 绑定地图
             * @param map 地图
             */
            setMap: function(map){
                this.inherited(arguments);
                map.on("pan", lang.hitch(this, function(evt){
                    if (this.isShowing) {
                        this._showInfoWindow(evt.extent);
                    }
                }));
                map.on("zoom-start", lang.hitch(this, function(){
                    this.hide();
                }));
                map.on("zoom-end", lang.hitch(this, function(evt){
                    this._showInfoWindow(evt.extent);
                }));
            },

            /**
             * 设置标题
             * @param title 标题
             */
            setTitle: function(title){
               // this.place(title, this._title);

            },

            /**
             * 设置内容
             * @param content
             */
            setContent: function(content){
                this.place(content, this._content);
            },


            /**
             * 显示小窗口，每次地图移动时重新计算显示位置
             * @param extent
             * @private
             */
            _showInfoWindow: function (extent) {
                var me=this;
                if (me.showMapPoint == null)return;
                var showScreenPoint = screenUtils.toScreenGeometry(extent, this.map.width, this.map.height, me.showMapPoint);
                domStyle.set(this.domNode, {
                    "left": (showScreenPoint.x-this.width/2 ) + "px",
                    "top": (showScreenPoint.y-this.height/2 ) + "px"
                });

                domUtils.show(this.domNode);
                this.isShowing = true;
                this.onShow();
            },

            /**
             * 显示小窗口
             * @param location 地理位置
             */
            show: function(location){
                if(location.spatialReference){
                    location = this.map.toScreen(location);
                }

                domStyle.set(this.domNode,{
                    "left": (location.x -this.width/2) + "px",
                    "top": (location.y -this.height/2) + "px"
                });

                //display the info window
                domUtils.show(this.domNode);
                this.isShowing = true;
                this.onShow();
            },

            /**
             * 隐藏小窗口
             */
            hide: function(){
                domUtils.hide(this.domNode);
                this.isShowing = false;
                this.onHide();
            },

            /**
             * 设置尺寸
             * @param width
             * @param height
             */
            resize: function(width, height){
                domStyle.set(this._content,{
                    "width": width + "px",
                    "height": height + "px"
                });
            },

            /**
             * 销毁
             */
            destroy: function(){
                domConstruct.destroy(this.domNode);
                this._content = null;
            }


        });

    });