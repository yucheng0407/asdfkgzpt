/* ========================================================================
 *  右键菜单 扩展
 * ========================================================================
 * Copyright 2011-2015 lc, Inc.
 * 作者：hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-10-20-上午11:15:52
 * 版权：广州流辰信息技术有限公司版权所有
 * ======================================================================== */
(function($) {
	var ContextMenu = function(element, options) {
		this.self = element;
		this.$element = $(element);
		this.onItem = options.onItem || this.onItem;
		this.listen();
	};
	
	ContextMenu.prototype  = {
		init:function(e){
			this.$menu=this.getMenu();
			//修复隐藏之前的样式
			$('.bootstrap-contextmenu').hide();
			this.show(e);
			$('html')
			.on('click.context.data-api', this.$menu.selector, $.proxy(this.closemenu, this));
			e.stopPropagation();
		},
		show:function(e){
			var tp ,
				  evt,
				  items = 'li:not(.divider)',
				 $menu= this.getMenu(),
				  relatedTarget = { relatedTarget: this.self, target: e.currentTarget };
			//隐藏其他
			this.closemenu(e);
			$menu.trigger(evt = $.Event('show.bs.context', relatedTarget));
			tp = this.getPosition(e, $menu);
			$menu.attr('style', '').css(tp).addClass('open')
				.on('click.context.data-api', items, $.proxy(this.onItem, this, $(e.currentTarget)))
				.trigger('shown.bs.context', relatedTarget);
		},
		getMenu: function () {
			return  this.$element;
		},
		closemenu: function(e) {
			var $menu
				, evt
				, items
				, relatedTarget;
			$menu = this.getMenu();
			if(!$menu)  return;
			if(!$menu.hasClass('open')) return;

			relatedTarget = { relatedTarget: this };
			$menu.trigger(evt = $.Event('hide.bs.context', relatedTarget));

			items = 'li:not(.divider)';
			$menu.removeClass('open')
				.attr('style', '')
				.off('click.context.data-api', items)
				.trigger('hidden.bs.context', relatedTarget);

			$('html')
				.off('click.context.data-api', $menu.selector);
			// Don't propagate click event so other currently
			// opened menus won't close.
			e.stopPropagation();
		},
		/**
		 * 获取菜单的位置
		 */
		getPosition: function(e, $menu) {
			if($menu.length  == 0)
				return {};
			var mouseX = e.clientX
				, mouseY = e.clientY
				, boundsX = $(window).width()
				, boundsY = $(window).height()
				, menu = $menu.find('.dropdown-menu')
				, menuWidth = menu.outerWidth()
				, menuHeight = menu.outerHeight()
				, tp = {"position":"absolute","z-index":9999}
				, Y, X, parentOffset;
			//修复菜单bug
			if(menuHeight <= 0){
				var	liNum = menu.children("li").length,
				 		aNum =menu.find("a").length,
				 		flexHeight = 0 ;
				if(liNum > aNum)
					flexHeight = 3*(liNum-aNum);
				menuHeight = 35*aNum+flexHeight;
			}

			if (mouseY + menuHeight > boundsY) {
				Y = {"top": mouseY - menuHeight + $(window).scrollTop()};
			} else {
				Y = {"top": mouseY + $(window).scrollTop()};
			}

			if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
				X = {"left": mouseX - menuWidth + $(window).scrollLeft()};
			} else {
				X = {"left": mouseX + $(window).scrollLeft()};
			}

			// If context-menu's parent is positioned using absolute or relative positioning,
			// the calculated mouse position will be incorrect.
			// Adjust the position of the menu by its offset parent position.
			parentOffset = $menu.offsetParent().offset();
			X.left = X.left - parentOffset.left;
			Y.top = Y.top - parentOffset.top;
			return $.extend(tp, Y, X);
		},
		onItem: function(e) {
			return true;
		},
		keydown: function(e) {
			if (e.which == 27) this.closemenu(e);
		},
		listen: function () {
			this.$element.on('contextmenu.context.data-api', this.scopes, $.proxy(this.show, this));
			$('html').on('click.context.data-api', $.proxy(this.closemenu, this));
			$('html').on('keydown.context.data-api', $.proxy(this.keydown, this));
		}
	};
	$.fn.contextMenu = function(e,opts) {
		var menu = new ContextMenu(this,opts);
		menu.init(e);
		return menu;
	};
})(jQuery);