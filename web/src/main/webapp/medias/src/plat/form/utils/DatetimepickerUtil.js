/**
 * 日期控件
 */

DatetimepickerUtil ={
		show:function($el,options){
			if(!options)
				options ={};
			var dateFmt = options.dateFmt?options.dateFmt:'yyyy-MM-dd';
				
			if(typeof WdatePicker !== 'undefined'){//my97DatePicker
			      WdatePicker({
			    	  el:$el[0],
			    	  dateFmt:dateFmt,
			    	  onpicking : function(dp) {
							if(options.onpicking)
								options.onpicking(dp.cal.getNewDateStr());
							 return false;
						},onclearing: function(dp) {
							if(options.onclearing)
								options.onclearing('');
							 return false;
						}});
			}else{//bootstrap-datetimepicker
				this.dealFmt(dateFmt);
		    	$el.datetimepicker({
		    		language:'zh_CN',
		    		bootcssVer:3,
					format:dateFmt,
					autoclose:true,
					todayBtn:  1,
					startView: this.$dp.startView,
					minView: this.$dp.minView,
					maxView: this.$dp.maxView
		    	}).on('changeDate', function(ev){
					if(options.onpicking)
						options.onpicking($el.val());
		    	});
				$el.datetimepicker('show');
			}
			
			
		},
		$dp:{
			has:{},
    		dateFmt:'yyyy-MM-dd',
    		//日期格式[一般情况下不需要修改](RealValue)	
    		realDateFmt: 'yyyy-MM-dd',
    		//时间格式[一般情况下不需要修改](RealValue)	
    		realTimeFmt: 'HH:mm:ss',
    		//日期时间选择器打开之后首先显示的视图。 可接受的值：
    		startView:2,
    		//日期时间选择器所能够提供的最精确的时间选择视图。
    		minView:0,
    		//日期时间选择器最高能展示的选择范围视图。
    		maxView:4
		},
		dealFmt:function(dateFmt){
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
	    		
	    		this.$dp.has.sd = (this.$dp.has.y || this.$dp.has.M || this.$dp.has.d) ? true : false;
	    		this.$dp.has.st = (this.$dp.has.H || this.$dp.has.m || this.$dp.has.s) ? true : false;
	    		if (this.$dp.has.sd) {
	    			if (this.$dp.has.st) { //有时间有日期
	    				this.$dp.startView = 2;
	    				this.$dp.minView =0;
	    				this.$dp.maxView = 4;
	    			}
	    			else { //没有时间有日期
	    				if(this.$dp.has.M && !this.$dp.has.d ) { //有月没日
	    					this.$dp.startView = 3;
	    					this.$dp.minView =3;
		    				this.$dp.maxView = 2;
	    				}else  if(this.$dp.has.y && !this.$dp.has.M && !this.$dp.has.d ) { //只有年
	    					this.$dp.startView = 4;
	    					this.$dp.minView =4;
		    				this.$dp.maxView = 4;
	    				}else{
	    					this.$dp.startView = 2;
	    					this.$dp.minView =2;
	    					this.$dp.maxView =2;
	    				}
	    			}
	    		}
	    		else { //只有时间
	    			this.$dp.startView = 1;
	    			this.$dp.minView =0;
    				this.$dp.maxView = 1;
	    		}
	    	return this.$dp;
		},
		_setHas:function(re){
			var p = (re+'').slice(1,2);
			this.$dp.has[p] = re.exec(this.$dp.dateFmt) ? (this.$dp.has.minUnit = p, true) : false;
		},
		CONSTANTS:{
			dateRangeObj:[]
		},
		initDateRange:function(){
			this.CONSTANTS.dateRangeObj =[];
			//时间区间【范围】
			var inputs = $(".dateRange");
			if(inputs.length <= 0)
				return;
			for(var i=0;i<inputs.length;i++){
				var input=$(inputs[i]);
				this.CONSTANTS.dateRangeObj.push(input);
			}
		}
};


		    