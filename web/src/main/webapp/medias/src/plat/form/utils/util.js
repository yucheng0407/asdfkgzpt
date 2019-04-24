var Namespace = new Object();

Namespace.register = function(path) {
	var arr = path.split(".");
	var ns = "";
	for ( var i = 0; i < arr.length; i++) {
		if (i > 0)
			ns += ".";
		ns += arr[i];
		eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
	}
};

/** **************String 处理****************** */
/**
 * 判断结束是否相等
 * 
 * @param str
 * @param isCasesensitive
 * @returns {Boolean}
 */
String.prototype.endWith = function(str, isCasesensitive) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	var tmp = this.substring(this.length - str.length);
	if (isCasesensitive == undefined || isCasesensitive) {
		return tmp == str;
	} else {
		return tmp.toLowerCase() == str.toLowerCase();
	}

};
/**
 * 功能：给url添加一个当前时间日期数值，使页面不会被缓存。
 * 
 */
String.prototype.getNewUrl = function() {
	// 如果url中没有参数。
	var time = new Date().getTime(), url = this;
	// 去除‘#’后边的字符
	if (url.indexOf("#") != -1) {
		var index = url.lastIndexOf("#", url.length - 1);
		url = url.substring(0, index);
	}

	while (url.endWith("#")) {
		url = url.substring(0, url.length - 1);
	}
	url = url.replace(/(\?|&)rand=\d*/g, "");
	if (url.indexOf("?") == -1) {
		url += "?rand=" + time;
	} else {
		url += "&rand=" + time;
	}
	return url;
};

/**
 * 功能：给url添加jsessionId 防止session丢失。
 * 
 * @returns {String}
 */
String.prototype.getSessionUrl = function() {
	// jsessionid
	var url = this;
	if (url.indexOf(";jsessionid=") != -1) {
		return url;
	}
	if (url.indexOf("?") == -1) {
		url += ";jsessionid=" + __jsessionid;
	} else {
		var aryUrl = url.split("?");
		url = aryUrl[0] + ";jsessionid=" + __jsessionId + "?" + aryUrl[1];
	}
	return url;
};

/**
 * 功能：移除首尾空格
 */
String.prototype.trim = function() {
	return this.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
};
/**
 * 功能:移除左边空格
 */
String.prototype.lTrim = function() {
	return this.replace(/(^\s*)/g, "");
};
/**
 * 功能:移除右边空格
 */
String.prototype.rTrim = function() {
	return this.replace(/(\s*$)/g, "");
};

/**
 * 判断结束是否相等
 * 
 * @param str
 * @param isCasesensitive
 * @returns {Boolean}
 */
String.prototype.endWith = function(str, isCasesensitive) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	var tmp = this.substring(this.length - str.length);
	if (isCasesensitive == undefined || isCasesensitive) {
		return tmp == str;
	} else {
		return tmp.toLowerCase() == str.toLowerCase();
	}

};
/**
 * 判断开始是否相等
 * 
 * @param str
 * @param isCasesensitive
 * @returns {Boolean}
 */
String.prototype.startWith = function(str, isCasesensitive) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	var tmp = this.substr(0, str.length);
	if (isCasesensitive == undefined || isCasesensitive) {
		return tmp == str;
	} else {
		return tmp.toLowerCase() == str.toLowerCase();
	}
};
/**
 * 字符串替换
 * 
 * @param s1
 *            需要替换的字符
 * @param s2
 *            替换的字符。
 * @returns
 */
if(!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(s1, s2) {
		return this.replace(new RegExp(s1, "gm"), s2);
	};
}

/** **************String 处理 结束****************** */

/**
 * 字符串操作 使用方法： var sb=new StringBuffer(); sb.append("aa"); sb.append("aa"); var
 * str=sb.toString();
 * 
 * @returns {StringBuffer}
 */
function StringBuffer() {
	this.content = new Array;
}
StringBuffer.prototype.append = function(str) {
	this.content.push(str);
};
StringBuffer.prototype.toString = function() {
	return this.content.join("");
};

/**
 * 日期格式化 格式 YYYY/yyyy/YY/yy 表示年份 MM/M 月份 W/w 星期 dd/DD/d/D 日期 hh/HH/h/H 时间 mm/m
 * 分钟 ss/SS/s/S 秒
 */
Date.prototype.format = function(formatStr) {
	var str = formatStr;
	var Week = [ '日', '一', '二', '三', '四', '五', '六' ];

	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/,
			(this.getYear() % 100) > 9 ? (this.getYear() % 100).toString()
					: '0' + (this.getYear() % 100));

	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1)
			.toString() : '0' + (this.getMonth() + 1));
	str = str.replace(/M/g, (this.getMonth() + 1));

	str = str.replace(/w|W/g, Week[this.getDay()]);

	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString()
			: '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());

	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString()
			: '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes()
			.toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());

	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds()
			.toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());

	return str;
};
// 禁用刷新。通过传入浏览器类型 来指定禁用某个浏览器的刷新
function forbidF5(exp) {
	var currentExplorer = window.navigator.userAgent;
	// ie "MSIE" ,, firefox "Firefox" ,,Chrome "Chrome",,Opera "Opera",,Safari
	// "Safari"
	if (currentExplorer.indexOf(exp) >= 0) {
		document.onkeydown = function(e) {
			var ev = window.event || e;
			var code = ev.keyCode || ev.which;
			if (code == 116) {
				ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
				cancelBubble = true;
				return false;
			}
		};
	}
}



/**   
 * Simple Map   
 *    
 *    
 * var m = new Map();   
 * m.put('key','value');   
 * ...   
 * var s = "";   
 * m.each(function(key,value,index){   
 *      s += index+":"+ key+"="+value+"/n";   
 * });   
 * alert(s);   
 *    
 * @author hugh zhuang
 * @date 2008-05-24   
 */    
function Map() {     
    /** 存放键的数组(遍历用到) */    
    this.keys = new Array();     
    /** 存放数据 */    
    this.data = new Object();     
         
    /**   
     * 放入一个键值对   
     * @param {String} key   
     * @param {Object} value   
     */    
    this.put = function(key, value) {     
        if(this.data[key] == null){     
            this.keys.push(key);     
        }     
        this.data[key] = value;     
    };     
         
    /**   
     * 获取某键对应的值   
     * @param {String} key   
     * @return {Object} value   
     */    
    this.get = function(key) {     
        return this.data[key];     
    };     
         
    /**   
     * 删除一个键值对   
     * @param {String} key   
     */    
    this.remove = function(key) {     
        this.keys.remove(key);     
        this.data[key] = null;     
    };     
         
    /**   
     * 遍历Map,执行处理函数   
     *    
     * @param {Function} 回调函数 function(key,value,index){..}   
     */    
    this.each = function(fn){     
        if(typeof fn != 'function'){     
            return;     
        }     
        var len = this.keys.length;     
        for(var i=0;i<len;i++){     
            var k = this.keys[i];     
            fn(k,this.data[k],i);     
        }     
    };     
         
    /**   
     * 获取键值数组(类似Java的entrySet())   
     * @return 键值对象{key,value}的数组   
     */    
    this.entrys = function() {     
        var len = this.keys.length;     
        var entrys = new Array(len);     
        for (var i = 0; i < len; i++) {     
            entrys[i] = {     
                key : this.keys[i],     
                value : this.data[i]     
            };     
        }     
        return entrys;     
    };     
         
    /**   
     * 判断Map是否为空   
     */    
    this.isEmpty = function() {     
        return this.keys.length == 0;     
    };     
         
    /**   
     * 获取键值对数量   
     */    
    this.size = function(){     
        return this.keys.length;     
    };     
         
    /**   
     * 重写toString    
     */    
    this.toString = function(){     
        var s = "{";     
        for(var i=0;i<this.keys.length;i++,s+=','){     
            var k = this.keys[i];     
            s += k+"="+this.data[k];     
        }     
        s+="}";     
        return s;     
    };     
}  
/**
 * 浏览器判断模块
 * 
 * @since 2.0.0
 * @author hugh zhuang 提供浏览器检测的模块
 */
$.browser = function() {
	var agent = navigator.userAgent.toLowerCase(), opera = window.opera, browser = {
		/**
		 * @property {boolean} ie 检测当前浏览器是否为IE
		 * @example ```javascript if ( $.browser.ie ) { console.log( '当前浏览器是IE' ); }
		 *          ```
		 */
		ie : /(msie\s|trident.*rv:)([\w.]+)/.test(agent),

		/**
		 * @property {boolean} opera 检测当前浏览器是否为Opera
		 * @example ```javascript if ( $.browser.opera ) { console.log(
		 *          '当前浏览器是Opera' ); } ```
		 */
		opera : (!!opera && opera.version),

		/**
		 * @property {boolean} webkit 检测当前浏览器是否是webkit内核的浏览器
		 * @example ```javascript if ( $.browser.webkit ) { console.log(
		 *          '当前浏览器是webkit内核浏览器' ); } ```
		 */
		webkit : (agent.indexOf(' applewebkit/') > -1),

		/**
		 * @property {boolean} mac 检测当前浏览器是否是运行在mac平台下
		 * @example ```javascript if ( $.browser.mac ) { console.log(
		 *          '当前浏览器运行在mac平台下' ); } ```
		 */
		mac : (agent.indexOf('macintosh') > -1),

		/**
		 * @property {boolean} quirks 检测当前浏览器是否处于“怪异模式”下
		 * @example ```javascript if ( $.browser.quirks ) { console.log(
		 *          '当前浏览器运行处于“怪异模式”' ); } ```
		 */
		quirks : (document.compatMode == 'BackCompat')
	};

	/**
	 * @property {boolean} gecko 检测当前浏览器内核是否是gecko内核
	 * @example ```javascript if ( $.browser.gecko ) { console.log(
	 *          '当前浏览器内核是gecko内核' ); } ```
	 */
	browser.gecko = (navigator.product == 'Gecko' && !browser.webkit
			&& !browser.opera && !browser.ie);

	var version = 0;

	// Internet Explorer 6.0+
	if (browser.ie) {

		var v1 = agent.match(/(?:msie\s([\w.]+))/);
		var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
		if (v1 && v2 && v1[1] && v2[1]) {
			version = Math.max(v1[1] * 1, v2[1] * 1);
		} else if (v1 && v1[1]) {
			version = v1[1] * 1;
		} else if (v2 && v2[1]) {
			version = v2[1] * 1;
		} else {
			version = 0;
		}

		browser.ie11Compat = document.documentMode == 11;
		/**
		 * @property { boolean } ie9Compat 检测浏览器模式是否为 IE9 兼容模式
		 * @warning 如果浏览器不是IE， 则该值为undefined
		 * @example ```javascript if ( $.browser.ie9Compat ) { console.log(
		 *          '当前浏览器运行在IE9兼容模式下' ); } ```
		 */
		browser.ie9Compat = document.documentMode == 9;

		/**
		 * @property { boolean } ie8 检测浏览器是否是IE8浏览器
		 * @warning 如果浏览器不是IE， 则该值为undefined
		 * @example ```javascript if ( $.browser.ie8 ) { console.log(
		 *          '当前浏览器是IE8浏览器' ); } ```
		 */
		browser.ie8 =  version == 8;

		/**
		 * @property { boolean } ie8Compat 检测浏览器模式是否为 IE8 兼容模式
		 * @warning 如果浏览器不是IE， 则该值为undefined
		 * @example ```javascript if ( $.browser.ie8Compat ) { console.log(
		 *          '当前浏览器运行在IE8兼容模式下' ); } ```
		 */
		browser.ie8Compat = document.documentMode == 8;

		/**
		 * @property { boolean } ie7Compat 检测浏览器模式是否为 IE7 兼容模式
		 * @warning 如果浏览器不是IE， 则该值为undefined
		 * @example ```javascript if ( $.browser.ie7Compat ) { console.log(
		 *          '当前浏览器运行在IE7兼容模式下' ); } ```
		 */
		browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7);

		/**
		 * @property { boolean } ie6Compat 检测浏览器模式是否为 IE6 模式 或者怪异模式
		 * @warning 如果浏览器不是IE， 则该值为undefined
		 * @example ```javascript if ( $.browser.ie6Compat ) { console.log(
		 *          '当前浏览器运行在IE6模式或者怪异模式下' ); } ```
		 */
		browser.ie6Compat = (version < 7 || browser.quirks);

		browser.ie9above = version > 8;

		browser.ie9below = version < 9;

		browser.ie11above = version > 10;

		browser.ie11below = version < 11;

	}

	// Gecko.
	if (browser.gecko) {
		var geckoRelease = agent.match(/rv:([\d\.]+)/);
		if (geckoRelease) {
			geckoRelease = geckoRelease[1].split('.');
			version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100
					+ (geckoRelease[2] || 0) * 1;
		}
	}

	/**
	 * @property { Number } chrome 检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号
	 * @warning 如果浏览器不是chrome， 则该值为undefined
	 * @example ```javascript if ( $.browser.chrome ) { console.log(
	 *          '当前浏览器是Chrome' ); } ```
	 */
	if (/chrome\/(\d+\.\d)/i.test(agent)) {
		browser.chrome = +RegExp['\x241'];
	}
	
	/**
	 * @property { Number } firefox 检测当前浏览器是否为Firefox, 如果是，则返回Chrome的大版本号
	 * @warning 如果浏览器不是firefox， 则该值为undefined
	 * @example ```javascript if ( $.browser.firefox ) { console.log(
	 *          '当前浏览器是Chrome' ); } ```
	 */
	if (/firefox\/(\d+\.\d)/i.test(agent)) {
		browser.firefox = +RegExp['\x241'];
	}

	/**
	 * @property { Number } safari 检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号
	 * @warning 如果浏览器不是safari， 则该值为undefined
	 * @example ```javascript if ( $.browser.safari ) { console.log(
	 *          '当前浏览器是Safari' ); } ```
	 */
	if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent)
			&& !/chrome/i.test(agent)) {
		browser.safari = +(RegExp['\x241'] || RegExp['\x242']);
	}

	// Opera 9.50+
	if (browser.opera)
		version = parseFloat(opera.version());

	// WebKit 522+ (Safari 3+)
	if (browser.webkit)
		version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]);

	/**
	 * @property { Number } version 检测当前浏览器版本号
	 * @remind
	 *           <ul>
	 *           <li>IE系列返回值为5,6,7,8,9,10等</li>
	 *           <li>gecko系列会返回10900，158900等</li>
	 *           <li>webkit系列会返回其build号 (如 522等)</li>
	 *           </ul>
	 * @example ```javascript console.log( '当前浏览器版本号是： ' + $.browser.version );
	 *          ```
	 */
	browser.version = version;

	/**
	 * @property { boolean } isCompatible 检测当前浏览器是否能够与该系统良好兼容
	 * @example ```javascript if ( $.browser.isCompatible ) { console.log(
	 *          '浏览器与该系统能够良好兼容' ); } ```
	 */
	browser.isCompatible = !browser.mobile
			&& ((browser.ie && version >= 8)
					|| (browser.gecko && version >= 10801)
					|| (browser.opera && version >= 9.5)
					|| (browser.air && version >= 1)
					|| (browser.webkit && version >= 522) || false);
	return browser;

}();
var DateDealFmt ={
		$dp :{
			has:{}
		},
		dealFmt:function(dateStr,dateFmt){
			if($.isEmpty(dateStr))
				return null;
			if(dateStr.length !=dateFmt.length  ){//格式化日期不相同
				var date = new Date(dateStr.replace(/-/g, "/"));   
				if(!isNaN(date.getTime())){
					return date; 
				}else{ //IE bug
					var mydate=dateStr.slice(0,dateStr.indexOf("."));//去掉毫秒数
					var date = new Date(mydate.replace(/-/g, "/"));   
					return date;
				}
			}
				
			this.$dp.dateFmt =dateFmt;
			this._setHas(/w/);		
			this._setHas(/WW|W/);
			this._setHas(/DD|D/);
			this._setHas(/yyyy|yyy|yy|y/);
			this._setHas(/MMMM|MMM|MM|M/);
			this._setHas(/dd|d/);
			this._setHas(/HH|H/);
			this._setHas(/mm|m/);
			this._setHas(/ss|s/);
		
			var date = new Date();
			for (var p in this.$dp.has) {
				var has = this.$dp.has[p];
				if(has != null ){
					var val =  parseInt(dateStr.substring(has.index,has.index+has[0].length),10);
					if(p == 'y')
						date.setYear(val);
					if(p == 'M')
						date.setMonth(val-1);
					if(p == 'd')
						date.setDate(val);
					if(p == 'H')
						date.setHours(val);
					if(p == 'm')
						date.setMinutes(val);
					if(p == 's')
						date.setSeconds(val);
				}
			}
			return date;
		},
		_setHas:function(re){
			this.$dp.has[ (re+'').slice(1,2)] = re.exec(this.$dp.dateFmt);
		}
	};
// //////////////////////常用的工具类///////////////////////////////////////////////////////////////////////

jQuery.extend({
/**
     * 克隆对象
     * @method cloneObject
     * @param { Object } source 源对象
     * @return { Object } source的一个副本
     */

    /**
     * 深度克隆对象，将source的属性克隆到target对象， 会覆盖target重名的属性。
     * @method clone
     * @param { Object } source 源对象
     * @param { Object } target 目标对象
     * @return { Object } 附加了source对象所有属性的target对象
     */
    cloneObject:function (source, target) {
        var tmp;
        target = target || {};
        for (var i in source) {
        	try {
            if (source.hasOwnProperty(i)) {
                tmp = source[i];
                if (typeof tmp == 'object') {
                    target[i] = $.isArray(tmp) ? [] : {};
                    $.cloneObject(source[i], target[i]);
                } else {
                    target[i] = tmp;
                }
            }
    		} catch (e) {
			}
        }
        return target;
    },
    /**
     * 判断obj对象是否为空
     * @method isEmpty
     * @param { * } obj 需要判断的对象
     * @remind 如果判断的对象是NULL， 将直接返回true， 如果是数组且为空， 返回true， 如果是字符串， 且字符串为空，
     *          返回true， 如果是普通对象， 且该对象没有任何实例属性， 返回true
     * @return { Boolean } 对象是否为空
     * @example
     * ```javascript
     *
     * //output: true
     * console.log( $.isEmpty( {} ) );
     *
     * //output: true
     * console.log( $.isEmpty( [] ) );
     *
     * //output: true
     * console.log( $.isEmpty( "" ) );
     *
     * //output: false
     * console.log( $.isEmpty( { key: 1 } ) );
     *
     * //output: false
     * console.log( $.isEmpty( [1] ) );
     *
     * //output: false
     * console.log( $.isEmpty( "1" ) );
     *
     * ```
     */
    isEmpty:function (obj,allowBlank) {
        if (obj == null) return true;
        if ($.isArray(obj) )return obj.length === 0;
        if ($.type(obj)=== "string" ) return (allowBlank||obj.length>0?false:true);
        if($.type(obj) == 'object') return $.isEmptyObject(obj);
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return   obj === undefined || (!allowBlank ? obj === '' : false);
    },
    isNotEmpty:function (obj,allowBlank) {
    	return !this.isEmpty(obj,allowBlank);
    },
    uniqueId : function() {
    	var a = function() {
			return Math.floor(Math.random() * 0x10000).toString(16);
		};
		return (a() + a() + "-" + a() + "-" + a() + "-"+ a() + "-" + a() + a() + a());
	},
	/**
	 * 序列化url参数
	 */
    serializeParam:function (json) {
        var strArr = [];
        for (var i in json) {
            //忽略默认的几个参数
            if(i=="method" || i=="timeout" || i=="async") continue;
            //传递过来的对象和函数不在提交之列
            if (!((typeof json[i]).toLowerCase() == "function" || (typeof json[i]).toLowerCase() == "object")) {
                strArr.push( encodeURIComponent(i) + "="+encodeURIComponent(json[i]) );
            } else if ($.isArray(json[i])) {
                //支持传数组内容
                for(var j = 0; j < json[i].length; j++) {
                    strArr.push( encodeURIComponent(i) + "[]="+encodeURIComponent(json[i][j]) );
                }
            }
        }
        return strArr.join("&");
    },
    /**
     * 格式url
     * @method formatUrl
     * @param { * }url
     */
    formatUrl:function (url) {
        var u = url.replace(/&&/g, '&');
        u = u.replace(/\?&/g, '?');
        u = u.replace(/&$/g, '');
        u = u.replace(/&#/g, '#');
        u = u.replace(/&+/g, '&');
        return u;
    },
    	
    /** 
     *在控制台输出日志 
     *@params message 要输出的日志信息 
     */   
    console:function(){
    	var logger = {log: function(){ }, error: function(){ },info:function(){}};
    	   try{     
               if(window.console && window.console.log && window.console.error && window.console.info) {
            	   logger = window.console;
               }else {
            	    logger = {log: function(){ }, error: function(){ },info:function(){}};
               }
           }catch(e){   
           }  
           
           return logger;
    },
    noRights:function(){

    	RX.msg("没有权限！");
    },
    /**
     * 是否授权
     */
    // isGranted:function(alias){
    // 	var __rights = DialogUtil.getParent().__rights;
	 //    if(__rights == 'none')
	 //    	return false;
	 //    if(__rights == 'all')
	 //    	return true;
	 //    var r = eval('(' + __rights + ')');
	 //    if( r[alias])
	 //    	return true;
		// return false;
    // },
    openFullWindow :function(url){
    	if(DialogUtil){
    		DialogUtil.openFullWindow({
    			content:url
    		});
    	}else{
    		
    		var h = screen.availHeight - 65;
    		var w = screen.availWidth - 5;
    		var vars = "top=0,left=0,height="
    				+ h
    				+ ",width="
    				+ w
    				+ ",status=no,toolbar=no,menubar=no,location=no,resizable=1,scrollbars=1";

    		var win = window.open(url, "", vars, true);
    		return win;
    	}
    },
    /**
	 * 日期格式化<br>
	 *  	格式                       说明										返回值例子
	 *   YYYY/yyyy/YY/yy     年份
	 *   MM/M                   	月份 
	 *   W/w 						星期 
	 *   dd/d 						日期
	 *   HH/H 						时间 
	 *   mm/m 					分钟 
	 *   ss/s							秒
	 */
    format:function(date,format){
    	if ($.isEmpty(date)) return '';   
        if (!format) format = "yyyy-MM-dd";   
        switch(typeof date) {   
        case "string":   
            date = DateDealFmt.dealFmt(date,format);
            break;   
        case "number":   
            date = new Date(date);   
            break;   
    }    
        if (!(date instanceof Date)) return '';
    	var Week = [ '日', '一', '二', '三', '四', '五', '六' ];
        var dict = {   
            "yyyy": date.getFullYear(), 
            "YYYY": date.getFullYear(), 
            "yy": (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString()
						: '0' + (date.getYear() % 100), 
            "YY":  (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString()
					: '0' + (date.getYear() % 100), 
            "M": date.getMonth() + 1,  
            "W": Week[date.getDay()],  
            "w": Week[date.getDay()], 
            "d": date.getDate(),   
            "H": date.getHours(),   
            "m": date.getMinutes(),   
            "s": date.getSeconds(),   
            "MM": ("" + (date.getMonth() + 101)).substr(1),   
            "dd": ("" + (date.getDate() + 100)).substr(1),   
            "HH": ("" + (date.getHours() + 100)).substr(1),   
            "mm": ("" + (date.getMinutes() + 100)).substr(1),   
            "ss": ("" + (date.getSeconds() + 100)).substr(1)   
        };       
        return format.replace(/(yyyy|YYYY|yy|YY|MM?|W|w|dd?|HH?|ss?|mm?)/g, function() {   
            return dict[arguments[0]];   
        });                  
    },
    flatten: function(a, b, c) {
        if (c || (c = []),a)
            for (var d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                $.isArray(f) ? $.flatten(f, b, c) : b && !b(f) || c.push(f);
            }
        return c;
    },
    str2Num:function(a){
    	 if ($.isEmpty(a))
	            return 0;
		 return Number(a);
    },
    num2Str: function(a, b) {
        if ($.isEmpty(a))
            return "";
        var c = a + "";
        if ($.isEmpty(b))
            return c;
        var d = /\[Num0\]/;
        if (d.test(b))
            return b.replace(d, c);
        if (d = /\[Num1\]/,
        d.test(b))
            return b.replace(d, $.currency(c, false));
        if (d = /\[Num2\]/,
        d.test(b))
            return b.replace(d, $.currency(c, true));
        d = /[#0]+,?[#0]*\.?[#0]*%?/;
        var e = b.match(d);
        if (e && e.length > 0) {
            var f = e[0];
            return c = $.numberFormat(a, f),
            b.replace(d, c)
        }
        return b
    },
    numberFormat:function(a,b){
    	  var c = ""
              , d = a + "";
            if (/%$/.test(b)) {
                c = "%",
                a = 100 * a,
                b = b.replace("%", "");
                var e = d.indexOf(".");
                if (e > -1) {
                    var f = d.length - 3 - e;
                    f = f < 0 ? 0 : f > 8 ? 8 : f,
                    a = parseFloat(a.toFixed(f))
                }
                d = a + ""
            }
            var g = b.split(".")
              , h = g[0]
              , i = g[1];
            if ("" !== i) {
                var j = i ? i.length : 0;
                d = parseFloat(a).toFixed(j);
                for (var k = d.split(""), l = j; l > 0 && "#" === i.charAt(l - 1); l--) {
                    var m = k.pop();
                    if ("0" !== m) {
                        k.push(m);
                        break
                    }
                }
                var n = k.pop();
                "." === n && (n = ""),
                d = k.join("") + n
            }
            var o = d.split(".")
              , p = o[0];
            if (/,/.test(h))
                o[0] = p.replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
            else {
                var q = h.match(/[0]+[0#]*$/);
                q && q.length > 0 && (o[0] =_.str.lpad(p,q[0].length,"0"))
            }
            return o.join(".") + c
    },
    currency:function(currencyDigits){
    	if(_.isNumber(currencyDigits))
    		currencyDigits = currencyDigits+"";
	    if ((currencyDigits == "") ||  (currencyDigits.match(/[^,.\d]/) != null) || ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null)) { 
	        return ""; 
	    } 
	    var MAXIMUM_NUMBER = 99999999999.99;
/*			    var cnLowercase = ["〇","一","二","三","四","五","六","七","八","九"];
	    var cnUppercase =  ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
	    var radicesLowercase =["","十","百","千","万","亿"];
	    var radicesUppercase  =["","拾","佰","仟","万","亿"];*/
	    var CN_ZERO = "零"; 
	    var CN_ONE = "壹"; 
	    var CN_TWO = "贰"; 
	    var CN_THREE = "叁"; 
	    var CN_FOUR = "肆"; 
	    var CN_FIVE = "伍"; 
	    var CN_SIX = "陆"; 
	    var CN_SEVEN = "柒"; 
	    var CN_EIGHT = "捌"; 
	    var CN_NINE = "玖"; 
	    var CN_TEN = "拾"; 
	    var CN_HUNDRED = "佰"; 
	    var CN_THOUSAND = "仟"; 
	    var CN_TEN_THOUSAND = "万"; 
	    var CN_HUNDRED_MILLION = "亿"; 
	    var CN_SYMBOL = ""; 
	    var CN_DOLLAR = "元"; 
	    var CN_TEN_CENT = "角"; 
	    var CN_CENT = "分"; 
	    var CN_INTEGER = "整"; 
	    var integral,decimal;   
	    var outputCharacters;
	    var parts; 
	    var digits, radices, bigRadices, decimals; 
	    var zeroCount; 
	    var i, p, d; 
	    var quotient, modulus; 
	    currencyDigits = currencyDigits.toString(); 
	    currencyDigits = currencyDigits.replace(/,/g, "");    
	    currencyDigits = currencyDigits.replace(/^0+/, "");   
	    
	    if (Number(currencyDigits) > MAXIMUM_NUMBER) { 
	        return ""; 
	    } 

	    parts = currencyDigits.split("."); 
	    if (parts.length > 1) { 
	        integral = parts[0]; 
	        decimal = parts[1]; 
	       
	        decimal = decimal.substr(0, 2); 
	    } 
	    else { 
	        integral = parts[0]; 
	        decimal = ""; 
	    } 
	    
	    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE); 
	    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND); 
	    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION); 
	    decimals = new Array(CN_TEN_CENT, CN_CENT); 
	    
	    outputCharacters = ""; 
	 
	    if (Number(integral) > 0) { 
	        zeroCount = 0; 
	        for (i = 0; i < integral.length; i++) { 
	            p = integral.length - i - 1; 
	            d = integral.substr(i, 1); 
	            quotient = p / 4; 
	            modulus = p % 4; 
	            if (d == "0") { 
	                zeroCount++; 
	            } 
	            else { 
	                if (zeroCount > 0)  { 
	                    outputCharacters += digits[0]; 
	                } 
	                zeroCount = 0; 
	                outputCharacters += digits[Number(d)] + radices[modulus]; 
	            } 
	            if (modulus == 0 && zeroCount < 4) { 
	                outputCharacters += bigRadices[quotient]; 
	            } 
	        } 
	        outputCharacters += CN_DOLLAR; 
	    } 
	    
	    if (decimal != "") { 
	        for (i = 0; i < decimal.length; i++) { 
	            d = decimal.substr(i, 1); 
	            if (d != "0") { 
	                outputCharacters += digits[Number(d)] + decimals[i]; 
	            } 
	        } 
	    } 
	  
	    if (outputCharacters == "") { 
	        outputCharacters = CN_ZERO + CN_DOLLAR; 
	    } 
	    if (decimal == "") { 
	        outputCharacters += CN_INTEGER; 
	    } 
	    outputCharacters = CN_SYMBOL + outputCharacters; 
	    return outputCharacters; 
    },
	thousands:function(num,opts){
		if(!$.isNumeric(num))
			return num;
		if(!opts)	 opts = {};
		var bNegative = (num < 0),
			nDotIndex,
			sDecimalSeparator = opts.decimalSeparator || ".",
			sOutput = String(num),
			sThousandsSeparator = opts.thousandsSeparator|| ",";
		
		nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
		nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
		var sNewOutput = sOutput.substring(nDotIndex);
		var nCount = -1, i;
		for (i=nDotIndex; i>0; i--) {
			nCount++;
			if ((nCount%3 === 0) && (i !== nDotIndex) && (!bNegative || (i > 1))) {
				sNewOutput = sThousandsSeparator + sNewOutput;
			}
			sNewOutput = sOutput.charAt(i-1) + sNewOutput;
		}
		return sNewOutput;
	},
});

//This must be applied to a form (or an object inside a form).
jQuery.fn.addHidden = function (name, value) {
    return this.each(function () {
        var input = $("<input>").attr("type", "hidden").attr("name", name).val(value);
        $(this).append($(input));
    });
};

//搜索当前权限，获得所有父级权限id
JSON.getPnodeBySub=function(source, key, isPath) {
	
	var selfNode, 
		pnodes=[];
	
	var findPnsBySn = function(source, key){
		
		for (var i = 0; i < source.length; i++) {
			
			if(selfNode){
				break; 
			}

			var obj = source[i];
			
	        if (obj.key == key) {
	            //找到了与nodeId匹配的节点，结束递归
	        	selfNode = obj;
        		pnodes.push(selfNode);
	        	if(!isPath){
	        		return pnodes;
	        	} 
	            break;
	        } else {

                if(typeof(obj.children)!="undefined"){
                	pnodes.push(obj);
                    //递归往下找
                	findPnsBySn(obj.children, key);
                }else{
                	if(i==source.length-1){
                		pnodes.splice(pnodes.length-1,1);
                	}
                }
	        }
			
		}
		
		return pnodes;
	}
	
	pnodes = findPnsBySn(source, key);
	
	return pnodes;
};

// json tree得到某个节点
JSON.getNode=function(source, key) { 
	
	var selfNode,
	pnodes=[];

	var findSelf = function(source, key){
		
		for (var i = 0; i < source.length; i++) {
			
			if(selfNode){
				break; 
			}
			
			var obj = source[i];
			
	        if (obj.key == key) {
	        	selfNode = obj;
	            break;
	        } else {
	      
	            if(typeof(obj.children)!="undefined"){
	                //递归往下找
	            	findSelf(obj.children, key);
	            }
	        }
			
		}
	}
	
	findSelf(source, key);
	
	return selfNode;
};

JSON.getSubByPnode=function(source, key) { 
	
	var selfNode, subsNode=[];
	
	selfNode = JSON.getNode(source, key);
    
    if(selfNode){
    	if(typeof(selfNode.children)!="undefined"){
    		subsNode = JSON.getSubs(selfNode.children);
    	}else{
    		subsNode.push(selfNode);
    	}
    }

    return subsNode;
};

JSON.getSubs=function(chds){
	var subs = []
	if(typeof(chds)!="undefined"){
		for(var ix=0;ix<chds.length;ix++){
			subs.push(chds[ix]);
			if(chds[ix]){
				JSON.getSubs(chds[ix].children);
			}
		}
	}
	return subs;
};


$(function(){
	$('a[href="#"]').click(function(event) {
		event.preventDefault();
	});
});