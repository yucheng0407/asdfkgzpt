		$(function() {
			//初始化内容区域高度
			$(".parBd").height($(window).height() - $(".parHd").outerHeight() - 40);
		});
		//页面大小改变时，触发jquery的resize方法，自适应拖拽
		$(window).resize(function() {
			$(".parBd").height($(window).height() - $(".parHd").outerHeight() - 40);
		});
		//运行代码
		$(function() {
			//阻止默认事件
			window.event? window.event.cancelBubble = true : e.stopPropagation();
			//获取当前时间
			var date = new Date();
			//对ul 追加li 并添加事件
			appendLi(date);
			var number = date.getDate() - 1;
			cjJs(number);
			//触发点击事件
			$("#time li:eq(" + (number) + ")").click();
			//上个月
			$("#left_time").click(function() {
				var date = $('#time li:eq(1)').html();
				date = date.replace('.', '-');
				date = date.replace('.', '-');
				//切换上个月
				var lastMonth = getPreMonth(date);
				//插件js
				appendLi(new Date(lastMonth));
			});
			//下个月
			$("#right_time").click(function() {
				var date = $('#time li:eq(1)').html();
				date = date.replace('.', '-');
				date = date.replace('.', '-');
				//切换下个月
				var nextMonth = getNextMonth(date);
				//插件js
				appendLi(new Date(nextMonth));
			});
		});
	/**
	 * 
	 *绑定选中事件 
	 *@param date 格式为yyyy-mm-dd的日期，如：2014-01-25
	 * */
	function getTime(date) {
		var arr = new Array();
		var month = parseInt(date.getMonth() + 1);
		var day = date.getDate();
		if(month < 10) {
			month = '0' + month
		}
		arr.push(date.getFullYear() + '.' + month + '.' + 01);
		var currentMonth = date.getMonth();
		var nextMonth = ++currentMonth;
		var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
		var oneDay = 1000 * 60 * 60 * 24;
		var lastTime = new Date(nextMonthFirstDay - oneDay);
		var month = parseInt(lastTime.getMonth() + 1);
		var day = lastTime.getDate();
		if(month < 10) {
			month = '0' + month;
		}
		if(day < 10) {
			day = '0' + day;
		}
		arr.push(new Date(date.getFullYear() + '-' + month + '-' + day).getFullYear() + '.' + month + '.' + day);
		return arr;
	};
	/**
	 * 获取上一个月
	 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
	 */
	function getPreMonth(date) {
		var arr = date.split('-');
		var year = arr[0]; //获取当前日期的年份
		var month = arr[1]; //获取当前日期的月份
		var day = arr[2]; //获取当前日期的日
		var days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中月的天数
		var year2 = year;
		var month2 = parseInt(month) - 1;
		if(month2 == 0) {
			year2 = parseInt(year2) - 1;
			month2 = 12;
		}
		var day2 = day;
		var days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if(day2 > days2) {
			day2 = days2;
		}
		if(month2 < 10) {
			month2 = '0' + month2;
		}
		var t2 = year2 + '-' + month2 + '-' + day2;
		return t2;
	}
	/**
	 * 获取下一个月
	 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
	 */
	function getNextMonth(date) {
		var arr = date.split('-');
		var year = arr[0]; //获取当前日期的年份
		var month = arr[1]; //获取当前日期的月份
		var day = arr[2]; //获取当前日期的日
		var days = new Date(year, month, 0);
		days = days.getDate(); //获取当前日期中的月的天数
		var year2 = year;
		var month2 = parseInt(month) + 1;
		if(month2 == 13) {
			year2 = parseInt(year2) + 1;
			month2 = 1;
		}
		var day2 = day;
		var days2 = new Date(year2, month2, 0);
		days2 = days2.getDate();
		if(day2 > days2) {
			day2 = days2;
		}
		if(month2 < 10) {
			month2 = '0' + month2;
		}

		var t2 = year2 + '-' + month2 + '-' + day2;
		return t2;
	}
	/**
	 *对ul 追加li 并添加事件
	 *@date 格式为yyyy-mm-dd的日期，如：2014-01-25
	 */
	function appendLi(date) {
		var arr = getTime(date);
		//获取当前日期第一天
		var dayFirst = arr[0];
		//获取当前日期最后一天
		var dayLast = arr[1];
		//获取日期模板
		var temp = dayFirst.substr(0, 7);
		//开始
		var begin = parseInt(dayFirst.substr(8, 9));
		//结束
		var last = parseInt(dayLast.substr(8, 9));
		//对ul追加li
		var ul = $("#time");
		ul.empty();
		for(var i = 1; i <= last; i++) {
			var c = temp + ".";
			if(i < 10) {
				c += "0" + i;
			} else {
				c += i;
			}
			var $li = "<li class='green_icon'>" + c + "</li>";
			ul.append($li);
		}
		
		if(last==28){
		   ul.append( "<li class='none_icon'  >"+this.getNumberNextDay(dayLast,1)+"</li>");
		   ul.append( "<li class='none_icon'  >"+this.getNumberNextDay(dayLast,2)+"</li>");
		   ul.append( "<li class='none_icon'  >"+this.getNumberNextDay(dayLast,3)+"</li>");
		}
		if(last==29){
		   ul.append( "<li class='none_icon'  >"+this.getNumberNextDay(dayLast,1)+"</li>");
		   ul.append( "<li class='none_icon'  >"+this.getNumberNextDay(dayLast,2)+"</li>");
		}
		if(last==30){
		   ul.append( "<li class='none_icon' disabled='disabled' >"+this.getNumberNextDay(dayLast,1)+"</li>");
		}
		//对ul 中的li添加点击事件
		var li = $("#time li");
		for(var i = 0; i < li.length; i++) {
			//点击添加样式
			$(li[i]).click(function() {
				//移除样式
				for(var j = 0; j < li.length; j++) {
					if($(li[j]).attr('class') == 'blue_icon') {
						$(li[j]).attr('class', 'green_icon');
					}
				}
				$(this).attr('class', 'blue_icon');
				//dosomething
				var value=this.innerHTML;
				if( gridVm.autoQuery!=undefined&& gridVm.autoQuery!=null){
                    gridVm.autoQuery.set('query.date',value);
                    RX.page.reload();
				}
            });
		$(li[i]).hover(function () {
		     
       }, function () {
          
        });
	         //页面大小改变时，触发jquery的resize方法，自适应拖拽
			$ (window).resize(function() {
				$(".parBd").height($(window).height() - $(".parHd").outerHeight() - 40);
			});
		};
	}
	/**
	 * 插件js
	 */
	function cjJs(number) {
		//插件js
		jQuery(".event_box").slide({
			titCell: ".parHd li",
			mainCell: ".parBd",
			defaultPlay: false,
			titOnClassName: "act",
			prevCell: ".sPrev",
			nextCell: ".sNext",
			pnLoop: false,
		});
		jQuery(".parHd").slide({
			mainCell: "ul",
			vis: 6,
			effect: "left",
			defaultPlay: false,
			prevCell: ".sPrev",
			nextCell: ".sNext",
			pnLoop: false,
			autoPage: true,
			defaultIndex: number
		});
	}
	/**
	 * 获取当前日期后多少天
	 * @param date number
	 */
	function getNumberNextDay(date,number){
		//明天的时间
		date=date.replace('.','-');
		date=date.replace('.','-');
		var day = new Date(date);
        day.setTime(day.getTime()+24*60*60*1000*number);
        var year=day.getFullYear();
        var month=(day.getMonth()+1);
        if(month<10){
        	month="0"+month;
        }
        var day=day.getDate();
         if(day<10){
        	day="0"+day;
        }
        return year+"." +month+ "." +day;
	}