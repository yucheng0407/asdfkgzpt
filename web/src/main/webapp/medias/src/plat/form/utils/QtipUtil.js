
QtipUtils = {
	// 提示
	qtip : function($thisEl) {
		var defaultSetting = {
			position : {
				viewport : $(window),
				adjust : {
					mouse : true
				},
				my : 'top center',
				at : 'bottom center'
			},
			hide : {
				event : 'mouseleave',
				leave : false,
				fixed : true,
				delay : 100
			},
			style : {
				classes : 'qtip-default  qtip qtip-bootstrap qtip-shadow'
			}
		}, options = {};

		$('[data-tip]', $thisEl).each(function() {
			var $el = $(this);
			options = {
				content : {
					title : $el.data("title"),
					text : $el.data("text")
				}
			};
			$el.qtip($.extend({}, defaultSetting, options));
		});
	}
};