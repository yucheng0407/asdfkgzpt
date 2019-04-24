/**
 * 为页面中所有带date及datetime日期样式加上控制处理
 */
$(function(){
	//日期格式
	$(document).delegate(".date",'click',function(){
		WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true});
		$(this).blur();
	});
	//日期时间格式
	$(document).delegate(".datetime",'click',function(){
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true});
		$(this).blur();
	});
	//自定义格式
	$(document).delegate(".wdateTime",'click',function(){
		var me = $(this), dateFmt=  (!$.isEmpty(me.attr('datefmt'))?me.attr('datefmt'):'yyyy-MM-dd');
		WdatePicker({dateFmt:dateFmt,alwaysUseStartDate:true});
		$(this).blur();
	});
	
	//自定义格式
	$(document).delegate(".datepicker",'click',function(){
		var me = $(this), dateFmt=  (!$.isEmpty(me.attr('datefmt'))?me.attr('datefmt'):'yyyy-MM-dd');
		WdatePicker({dateFmt:dateFmt,alwaysUseStartDate:true});
		$(this).blur();
	});
	//自定义格式 点击图标
	$(document).delegate(".datepicker-icon",'click',function(){
		var me = $(this),
			$el =  me.siblings(".datepicker");
    	if(!$el && $el.length == 0 )
    		return;
		var dateFmt=  (!$.isEmpty($el.attr('datefmt'))?$el.attr('datefmt'):'yyyy-MM-dd');
		WdatePicker({
			el:$el[0],
			dateFmt:dateFmt,
			alwaysUseStartDate:true});
		$el.blur();
	});
	// 日期控件
	DatetimepickerUtil.initDateRange();
	
	//处理开始时间和结束时间
	$(document).delegate(".dateRange",'click',function(){
		var me = $(this),it =0,nextValue='',
		dateType=me.attr('datetype'),dateFmt=  (me.attr('datefmt')?me.attr('datefmt'):'yyyy-MM-dd');
		var timeObj = DatetimepickerUtil.CONSTANTS.dateRangeObj;
		//取得当前所在的位置
		$.each(timeObj,function(i,n){
			if(me.get(0)===$(n).get(0)){
				if(dateType=='begin')
					it = i+1; 
				else if(dateType=='end')
					it = i-1; 
			}
		});
		//取得下个的值
		$.each(timeObj,function(i,n){
			if(i==it) nextValue =$(n).val();
		});
		if(dateType == 'begin')
			WdatePicker({el:me[0],dateFmt:dateFmt,alwaysUseStartDate:true,maxDate:nextValue});
		else
			WdatePicker({el:me[0],dateFmt:dateFmt,alwaysUseStartDate:true,minDate:nextValue});
		me.blur();
	});

});