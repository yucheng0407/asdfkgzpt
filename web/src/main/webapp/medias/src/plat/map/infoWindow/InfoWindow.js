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

            isContentShowing :false,

            constructor: function(parameters) {

                this.map=parameters.map;
                this.showMapPoint=parameters.chartPoint;
                this.width=parameters.width;
                this.height=parameters.height;
                lang.mixin(this, parameters);
                domClass.add(this.domNode, "buttonInfoWindow");

                this._closeButton = domConstruct.create("div",{"class": "close", "title": "Close"}, this.domNode);
                this._title = domConstruct.create("div",{"class": "title"}, this.domNode);
                this._content = domConstruct.create("div",{"class": "content"}, this.domNode);
                on(this._closeButton, "click", lang.hitch(this, function(){
                    //hide the content when the info window is toggled close.
                    this.destroy();
                }));

                this.setMap(parameters.map);
                this.show(parameters.chartPoint);
                this.resize(parameters.width,parameters.height);
                this.setTitle(parameters.title);
                //hide initial display
                // domUtils.hide(this.domNode);
                // this.isShowing = false;
            },

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
            setTitle: function(title){
                this.place(title, this._title);

            },
            setContent: function(content){
                this.place(content, this._content);
            },
            show: function(location){
                if(location.spatialReference){
                    location = this.map.toScreen(location);
                }

                domStyle.set(this.domNode,{
                    "left": (location.x -this.width/2) + "px",
                    "top": (location.y -this.height-60) + "px"
                });

                //display the info window
                domUtils.show(this.domNode);
                this.isShowing = true;
                this.onShow();
            },
            hide: function(){
                domUtils.hide(this.domNode);
                this.isShowing = false;
                this.onHide();

            },
            resize: function(width, height){
                domStyle.set(this._content,{
                    "width": width + "px",
                    "height": height + "px"
                });
                domStyle.set(this._title,{
                    "width": width + "px"
                });

            },
            destroy: function(){
                domConstruct.destroy(this.domNode);
                this._closeButton = this._title = this._content = null;

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
                    "left": (showScreenPoint.x-this.width/2) + "px",
                    "top": (showScreenPoint.y-this.height-60) + "px"
                });

                domUtils.show(this.domNode);
                this.isShowing = true;
                this.onShow();
            },


        });

    });
