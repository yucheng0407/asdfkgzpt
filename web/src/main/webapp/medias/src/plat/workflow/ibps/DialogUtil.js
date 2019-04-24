/**
 * 
 * 为了layer的顶层dialog显示
 * 相关API请看<a herf="http://layer.layui.com/api.html">http://layer.layui.com/api.html</a>
 
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-11-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
DialogUtil = {
	/**
	 * 获取顶部窗口
	 */
	getParent : function(w) {
		var win = w ? w : window;
		if (win.parent != win) // 找到最顶层窗口
			return this.getParent(win.parent);
		return win;
	},
	/**
	 * 格式化 var str=String.format("姓名:{0},性别:{1}","hugh","男"); alert(str);
	 * 
	 * @returns
	 */
	format : function() {
		var template = arguments[0], args = arguments, str = template.replace(
				/\{(\d+)\}/g, function(m, i) {
					return args[parseInt(i) + 1];
				});
		return str;
	},
	layer : function() {
		return this.getParent().laydialog;
	},
	open : function(options) {
		return this.layer().open(options);
	},
	/**
	 * 关闭指定的弹窗
	 * @param index 对话框的index
	 * @returns
	 */
	close : function(index) {
		return this.layer().close(index);
	},
	/**
	 * 关闭当前的弹窗
	 * @returns
	 */
	closeDialog : function() {
		if(frameElement &&frameElement.dialog){
			return this.close(frameElement.dialog.index);
		}else{
		   if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {  
		        window.location.href="about:blank";  
		        window.close();  
		    } else {  
		        window.opener = null;  
		        window.open("", "_self");  
		        window.close();  
		    }  
		}
	},
	/**
	 * 关闭所有的弹窗
	 * @returns
	 */
	closeAll : function() {
		return this.layer().closeAll();
	},
	/**
	 * 获得弹出窗口的Window对象<br>
	 * DialogUtil.getChildFrameWindow().xxx();
	 * xxx ：是具体的方法。
	 * @param index 这个是对话框的id
	 * @returns
	 */
	getChildFrameWindow:function(index){
		return this.layer().getChildFrameWindow(index);
	},
	/**
	 * 可以通过选择器查找对象
	 * @param selector 
	 * @param index
	 * @returns
	 */
	getChildFrame:function(selector, index){
		return this.layer().getChildFrame(selector,index);
	},
	/**
	 * 弹窗框
	 * @param options 
	 * params  传递的参数 
	 * callback 回调
	 * 
	 * @returns
	 */
	dialog:function(options){
		var opts = jQuery.extend({}, {
		    type: 2,
		    area: ['90%', '90%'],
		    fix: true, //固定
		    maxmin: true,
		    btnAlign:'c'
		}, options);
		return this.layer().open(opts);
	},
	/**
	 * 窗口回调
	 * @param options
	 */
	callback:function(options){
		if(frameElement.dialog){
			if(frameElement.dialog.callback){
				frameElement.dialog.callback(options);
			}
		}
	},
	/**
	 * 全屏窗口
	 * @returns
	 */
	openFullWindow:function(){
		var options={},
    		defaultOptions = {
			    type: 2,
			    area: ['100%', '100%'],
			    fix: true, //固定
			    maxmin: true
			};
	    if (typeof arguments[0] === 'object' ) {
	        options = jQuery.extend(true, defaultOptions, arguments[0]);
	    } else {
	        options = jQuery.extend(true, defaultOptions, {
	        	content: arguments[0],
	        	title:typeof arguments[1] !== 'undefined' ? arguments[1] : null
	        });
	    }
	    options = jQuery.extend(true, defaultOptions, options);
		return this.layer().open(options);
	},
	/**
	 * alert
	 * 
	 * @param content  【必填】 提示消息 //注意这个是字符串，
	 * @param title  【选填】 如果是function类型 ,则是回调（callback），如果是String类型 则是提示标题,不传入为默认值‘提示'
	 * @param callback 【选填】  如果是function类型 ,则是回调（callback）
	 * @returns
	 */
	alert : function(content,title,callback){
			var  o = {
				content: content
			 };
			if (typeof (title) == "function") o.callback = title;
			if(callback) o.callback = callback;
			if (typeof (title) == "string" && title != "") o.title = title;
		return this.layer().alert(o);
	},
	/**
	 * 警告
	 * 
	 * @param content  【必填】 提示消息
	 * @param title  【选填】 如果是function类型 ,则是回调（callback），如果是String类型 则是提示标题,不传入为默认值‘提示'
	 * @param callback 【选填】  如果是function类型 ,则是回调（callback）
	 * @returns
	 */
	warn:function(content,title,callback){
		var  o = {
				content: content,
				icon:0
			 };
			if (typeof (title) == "function") o.callback = title;
			if(callback) o.callback = callback;
			if (typeof (title) == "string" && title != "") o.title = title;
		return this.layer().alert(o);
	},
	/**
	 * 错误提示信息
	 * @param content 【必填】 错误信息简述
	 * @param detail 【必填】 详细错误信息
	 * @param title  【选填】  如果是function类型 ,则是回调（callback），如果是String类型 则是提示标题,不传入为默认值‘提示'
	 * @param callback 【选填】  如果是function类型 ,则是回调（callback）
	 * @returns
	 */
	error : function(content,detail,title,callback){ 
		if(detail){
			var divTemplate="<div class='div_error' >" +
			"<div class='div_error_msg'><i class='fa fa-times-circle'></i>&nbsp;{0}</div>" +
				"<div style='text-align:left; padding-bottom:10px; padding-left:10px;'></div>" +
			"<div class='div_error_detail'>{1}</div>" +
			"</div>";
			var msg=this.format(divTemplate,content,detail);
			if (typeof (title) == "function") {
				callback = title;
				title ="提示";
			}
			if (typeof (title) == "string" && title != "") title = title;
		    return this.layer().alert({
		    	content: msg,
		    	title:title,
		    	callback:callback
		    });
		}else{
		    return this.layer().alert({
		    	content: content,
				icon:2
		    });
		}
	
	},
	/**
	 *  确认对话框
	 *  
	 * @param content 【必填】 提示消息
	 * @param title 【选填】     如果是function类型 ,则是回调（callback），如果是String类型 则是提示标题,不传入为默认值‘提示’；
	 * @param callback 【选填】  如果是function类型 ,则是回调（callback），如果是boolean类型 并且为true 则是按钮为是否  否则是默认
	 * @param buttonsLabel 【选填】 如果是boolean类型 则是按钮为是否
	 * @returns 
	 */
	confirm : function(content,title,callback,buttonsLabel) {
		var  o = {content:content };
		if (typeof (title) == "function") o.callback = title;
		if (typeof (callback) == "boolean") buttonsLabel = callback;
		if (typeof (callback) == "function") o.callback  = callback;
		if (typeof (title) == "string" && title != "") o.title = title;
		if(buttonsLabel){
			o.btn = [{
				label: '&#x662F;'//是
	           }, {
	        	   label: '&#x5426;'//否
	           }];
		}
		return this.layer().confirm(o);
	},
	/**
	 * 加载的对话框
	 * @param icon 【选填】加载的图标 0-2可选 如果是0，无需传
	 * @param options  【选填】 可以设置时间等参数
	 * @returns
	 */
	load : function(icon, options) {
		if(!options)
			options = {};
		if(typeof (icon) == "string"){
			options = {title:icon};
			icon = 0;
		}
		
		return this.layer().load(icon, options);
	},
	/**
	 * 顶部通知框
	 * @param content  【必填】提示消息
	 * @param options  【选填】选项
	 * @param callback 【选填】回调
	 * @returns
	 */
	toastr : function(content,options, callback) {
		var opts ={
				offset : 0,
				shift :6};
		if(typeof (options)  == "boolean") {
			opts.shift = options?0:6;
		}else if(typeof (options)  == "function"){
			callback = options;
		}
		return this.msg(content,opts, callback);
	},
	/**
	 * 提示消息 【中间】
	 * @param content 【必填】提示消息
	 * @param options 【必填】选项
	 * @param callback 【选填】回调
	 * @returns
	 */
	msg : function(content, options, callback) {
		return this.layer().msg(content, options, callback);
	},
	/**
	 * 气泡提示
	 * @param content 【必填】提示消息
	 * @param follow  位置
	 * @param options 【必填】选项
	 * @returns
	 */
	tips : function(content, follow, options) {
		return this.layer().tips(content, follow, options);
	},
	// 导出专用
	tipDialog : function(title, message, detail, type, callback) {
		var divTemplate = "<div class='div_error' >"
				+ "<div class='div_error_msg'>{0}</div>"
				+ "<div style='text-align:left; padding-bottom:10px; padding-left:10px;'></div>"
				+ "<div class='div_error_detail'>{1}</div>" + "</div>";
		var content = this.format(divTemplate, message, detail);
		return this.layer().alert( {
			title:title,
			content:content,
			icon :  type
		});
	},
	/**
	 * tab 层
	 * @param options
	 */
	tab:function(options){
		return this.layer().tab(options);
	},
	/**
	 * prompt层
	 */
	prompt:function(options,yes){
		return this.layer().prompt(options,yes);
	}
};