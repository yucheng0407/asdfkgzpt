/**
 *  数据绑定
 */
(function() {
	rivets.inputEvent = document.addEventListener ? 'input' : 'keyup';

	//输入框绑定
	rivets.binders.input = {
	  publishes: true,
	  routine: rivets.binders.value.routine,
	  bind: function(el) {
	    return $(el).bind("" + rivets.inputEvent + ".rivets", this.publish);
	  },
	  unbind: function(el) {
	    return $(el).unbind("" + rivets.inputEvent + ".rivets");
	  }
	};
	
	
	//选项绑定
	rivets.binders.checkedarray = {
	  publishes: true,
	  routine: function(el, value) {
	    return el.checked = _.contains(value, el.value);
	  },
	  bind: function(el) {
	    if (el.type === 'radio') {
	      return $(el).bind('change.rivets', (function(_this) {
	        return function() {
	          return _this.model.set(_this.keypath, [el.value]);
	        };
	      })(this));
	    } else {
	      return $(el).bind('change.rivets', (function(_this) {
	        return function() {
	          var newVal, val;
	          val = _this.model.get(_this.keypath) || [];
	          newVal = el.checked ? _.uniq(val.concat(el.value)) : _.without(val, el.value);
	          return _this.model.set(_this.keypath, newVal);
	        };
	      })(this));
	    }
	  },
	  unbind: function(el) {
	    return $(el).unbind('change.rivets');
	  }
	};
	
	
	rivets.binders.dobtradiogroup = {
	  publishes: true,
	  routine: function(el, value) {
	    return el.checked = $(el).hasClass('js_other_option') ? this.model.get('value.other_checked') : _.contains(value, el.value);
	  },
	  bind: function(el) {
	    return $(el).bind('change.rivets', (function(_this) {
	      return function() {
	        if ($(el).hasClass('js_other_option')) {
	          _this.model.set('value.other_checked', true);
	          return _this.model.set(_this.keypath, []);
	        } else {
	          _this.model.unset('value.other_checked');
	          _this.model.unset('value.other_text');
	          return _this.model.set(_this.keypath, [el.value]);
	        }
	      };
	    })(this));
	  }
	};
	
	  // 转换成Boolean值
	rivets.toBoolean = function(str) {
	    return _.contains(['True', 'Yes', 'true', '1', 1, 'yes','Y','y','T','t', true], str);
	  };
	
	
	//选项绑定
	rivets.binders.checkedboolen = {
	  publishes: true,
	  routine: function(el, value) {
	    return el.checked = (rivets.toBoolean(el.value) == value);
	  },
	  bind: function(el) {
	      return $(el).bind('change.rivets', (function(_this) {
	        return function() {
	          return _this.model.set(_this.keypath, rivets.toBoolean(el.value));
	        };
	      })(this));
	  },
	  unbind: function(el) {
	    return $(el).unbind('change.rivets');
	  }
	};
	
	rivets.binders.checkednull = {
		  publishes: true,
		  routine: function(el, value) {
			  	if($.isEmpty(value)){
			  		 el.checked = true ;
			  		 $(el).trigger("change.rivets");
			  	}else{
			  		return el.checked = !!value ;
			  	}    
		  },
		  bind: function(el) {
		      return $(el).bind('change.rivets', (function(_this) {
		        return function() {
		          return _this.model.set(_this.keypath, el.checked);
		        };
		      })(this));
		  },
		  unbind: function(el) {
		    return $(el).unbind('change.rivets');
		  }
	  };
	
	//选项绑定
	rivets.binders.checkedarraystr = {
	  publishes: true,
	  routine: function(el, value) {
		  value =  value?value.split(","):[];
	    return el.checked = _.contains(value, el.value);
	  },
	  bind: function(el) {
	    if (el.type === 'radio') {
	      return $(el).bind('change.rivets', (function(_this) {
	        return function() {
	          return _this.model.set(_this.keypath, [el.value]);
	        };
	      })(this));
	    } else {
	      return $(el).bind('change.rivets', (function(_this) {
	        return function() {
	          var newVal, val;
	          val = _this.model.get(_this.keypath) || "";
	          val = _.isEmpty(val)?[]: val.split(",");
	          newVal = el.checked ? _.uniq(val.concat(el.value)) : _.without(val, el.value);
	          return _this.model.set(_this.keypath, newVal.join(","));
	        };
	      })(this));
	    }
	  },
	  unbind: function(el) {
	    return $(el).unbind('change.rivets');
	  }
	};

	rivets.configure({
	  prefix: "rv",
	  adapter: {
	    subscribe: function(obj, keypath, callback) {
	      callback.wrapped = function(m, v) {
	        return callback(v);
	      };
	      return obj.on('change:' + keypath, callback.wrapped);
	    },
	    unsubscribe: function(obj, keypath, callback) {
	      return obj.off('change:' + keypath, callback.wrapped);
	    },
	    read: function(obj, keypath) {
	      if (keypath === "cid") {
	        return obj.cid;
	      }
	      return obj.get(keypath);
	    },
	    publish: function(obj, keypath, value) {
	      if (obj.cid) {
	        return obj.set(keypath, value);
	      } else {
	        return obj[keypath] = value;
	      }
	    }
	  }
	});
	
	rivets.formatters.eq = function(v1, v2) { 
		return v1===v2;};
	
}).call(this);
