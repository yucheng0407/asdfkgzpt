/*!
 * CityPicker v@VERSION
 * https://github.com/tshi0912/citypicker
 *
 * Copyright (c) 2015-@YEAR Tao Shi
 * Released under the MIT license
 *
 * Date: @DATE
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery', 'WorldDistricts'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'), require('WorldDistricts'));
    } else {
        // Browser globals.
        factory(jQuery, WorldDistricts);
    }
})(function ($, WorldDistricts) {

    'use strict';

    if (typeof WorldDistricts === 'undefined') {
        throw new Error('The file "city-picker-custom.data.js" must be included first!');
    }

    var NAMESPACE = 'citypicker';
    var EVENT_CHANGE = 'change.' + NAMESPACE;
    var COUNTRY = 'country';
    var PROVINCE = 'province';
    var CITY = 'city';
    var DISTRICT = 'district';

    function CityPicker(element, options) {
        this.$element = $(element);
        this.$dropdown = null;
        this.options = $.extend({}, CityPicker.DEFAULTS, $.isPlainObject(options) && options);
        this.active = false;
        this.dems = [];
        this.needBlur = false;
        this.init();
    }

    CityPicker.prototype = {
        constructor: CityPicker,

        init: function () {

            this.defineDems();

            this.render();

            this.bind();

            this.active = true;
        },

        render: function () {
            var p = this.getPosition(),
                placeholder = this.$element.attr('placeholder') || this.options.placeholder,
                textspan = '<span class="city-picker-span" style="' +
                    this.getWidthStyle(p.width) + 'height:' +
                    p.height + 'px;line-height:' + (p.height - 1) + 'px;">' +
                    (placeholder ? '<span class="placeholder">' + placeholder + '</span>' : '') +
                    '<span class="title"></span><div class="arrow"></div>' + '</span>',

                dropdown = '<div class="city-picker-dropdown" style="left:0px;top:100%;' +
                    this.getWidthStyle(p.width, true) + '">' +
                    '<div class="city-select-wrap">' +
                    '<div class="city-select-tab">' +
                    
                    /*//TODO modified*/
                    (this.includeDem('country') ? '<a '+('country' === this.options.top?'class="active"':'')+' data-count="country">国家</a>' : '') +
                    (this.includeDem('province') ? '<a '+('province' === this.options.top?'class="active"':'')+' data-count="province">省份</a>' : '') +
                    (this.includeDem('city') ? '<a '+('city' === this.options.top?'class="active"':'')+' data-count="city">城市</a>' : '') +
                    (this.includeDem('district') ? '<a '+('district' === this.options.top?'class="active"':'')+' data-count="district">区县</a>' : '') +
                    '<span title="清除" class="reset">x</span>'+
                    '</div>' +
                    
                    '<div class="city-select-content">' +
                    
                    /*//TODO modified*/
                    (this.includeDem('country') ? '<div class="city-select country" data-count="country"></div>' : '') +
                    (this.includeDem('province') ? '<div class="city-select province" data-count="province"></div>' : '') +
                    (this.includeDem('city') ? '<div class="city-select city" data-count="city"></div>' : '') +
                    (this.includeDem('district') ? '<div class="city-select district" data-count="district"></div>' : '') +
                    '</div></div>';

            this.$element.addClass('city-picker-input');
            this.$textspan = $(textspan).insertAfter(this.$element);
            this.$dropdown = $(dropdown).insertAfter(this.$textspan);
            var $select = this.$dropdown.find('.city-select');

            // setup this.$country, this.$province, this.$city and/or this.$district object
            $.each(this.dems, $.proxy(function (i, type) {
                this['$' + type] = $select.filter('.' + type + '');
            }, this));
            var _this=this;
          this.$dropdown.find('.reset').on("click",function(){
            	_this.reset();
            });

            this.refresh();
        },

        refresh: function (force) {
            // clean the data-item for each $select
            var $select = this.$dropdown.find('.city-select');
            $select.data('item', null);
            // parse value from value of the target $element
            var val = this.$element.val() || '';
            var data_split_ = this.getSplitStr();/*//TODO modified*/
            val = val.split(data_split_);
            $.each(this.dems, $.proxy(function (i, type) {
                if (val[i] && i < val.length) {
                    this.options[type] = val[i];
                } else if (force) {
                    this.options[type] = '';
                }
                this.output(type);
            }, this));
            this.tab(this.getTop());/*//TODO modified*/
            this.feedText();
            this.feedVal();
        },

        defineDems: function () {
            var start = false;
            var stop = false;
            $.each([COUNTRY, PROVINCE, CITY, DISTRICT], $.proxy(function (i, type) {
            	if (type === this.options.top) {
            		start = true;
                }
            	if (start && !stop) {
                    this.dems.push(type);
                }
                if (type === this.options.level) {
                    stop = true;
                }
            }, this));
        },

        includeDem: function (type) {
            return $.inArray(type, this.dems) !== -1;
        },

        getPosition: function () {
            var p, h, w, s, pw;
            p = this.$element.position();
            s = this.getSize(this.$element);
            h = s.height;
            w = s.width;
            if (this.options.responsive) {
                pw = this.$element.offsetParent().width();
                if (pw) {
                    w = w / pw;
                    if (w > 0.99) {
                        w = 1;
                    }
                    w = w * 100 + '%';
                }
            }

            return {
                top: p.top || 0,
                left: p.left || 0,
                height: h,
                width: w
            };
        },

        getSize: function ($dom) {
            var $wrap, $clone, sizes;
            if (!$dom.is(':visible')) {
                $wrap = $("<div />").appendTo($("body"));
                $wrap.css({
                    "position": "absolute !important",
                    "visibility": "hidden !important",
                    "display": "block !important"
                });

                $clone = $dom.clone().appendTo($wrap);

                sizes = {
                    width: $clone.outerWidth(),
                    height: $clone.outerHeight()
                };

                $wrap.remove();
            } else {
                sizes = {
                    width: $dom.outerWidth(),
                    height: $dom.outerHeight()
                };
            }

            return sizes;
        },

        getWidthStyle: function (w, dropdown) {
            if (this.options.responsive && !$.isNumeric(w)) {
                return 'width:' + w + ';';
            } else {
                return 'width:' + (dropdown ? Math.max(320, w) : w) + 'px;';
            }
        },

        bind: function () {
            var $this = this;

            $(document).on('click', (this._mouteclick = function (e) {
                var $target = $(e.target);
                var $dropdown, $span, $input;
                if ($target.is('.city-picker-span')) {
                    $span = $target;
                } else if ($target.is('.city-picker-span *')) {
                    $span = $target.parents('.city-picker-span');
                }
                if ($target.is('.city-picker-input')) {
                    $input = $target;
                }
                if ($target.is('.city-picker-dropdown')) {
                    $dropdown = $target;
                } else if ($target.is('.city-picker-dropdown *')) {
                    $dropdown = $target.parents('.city-picker-dropdown');
                }
                if ((!$input && !$span && !$dropdown) ||
                    ($span && $span.get(0) !== $this.$textspan.get(0)) ||
                    ($input && $input.get(0) !== $this.$element.get(0)) ||
                    ($dropdown && $dropdown.get(0) !== $this.$dropdown.get(0))) {
                    $this.close(true);
                }

            }));

            this.$element.on('change', (this._changeElement = $.proxy(function () {
                this.close(true);
                this.refresh(true);
            }, this))).on('focus', (this._focusElement = $.proxy(function () {
                this.needBlur = true;
                this.open();
            }, this))).on('blur', (this._blurElement = $.proxy(function () {
                if (this.needBlur) {
                    this.needBlur = false;
                    this.close(true);
                }
            }, this)));

            this.$textspan.on('click', function (e) {
                var $target = $(e.target), type;
                $this.needBlur = false;
                if ($target.is('.select-item')) {
                    type = $target.data('count');
                    $this.open(type);
                } else {
                    if ($this.$dropdown.is(':visible')) {
                        $this.close();
                    } else {
                        $this.open();
                    }
                }
            }).on('mousedown', function () {
                $this.needBlur = false;
            });

            this.$dropdown.on('click', '.city-select a', function () {
                var $select = $(this).parents('.city-select');
                var $active = $select.find('a.active');
                var last = $select.next().length === 0;
                $active.removeClass('active');
                $(this).addClass('active');
                if ($active.data('code') !== $(this).data('code')) {
                    $select.data('item', {
                        address: $(this).attr('title'), code: $(this).data('code')
                    });
                    $(this).trigger(EVENT_CHANGE);
                    $this.feedText();
                    $this.feedVal(true);
                    if (last) {
                        $this.close();
                    }
                }
            }).on('click', '.city-select-tab a', function () {
                if (!$(this).hasClass('active')) {
                    var type = $(this).data('count');
                    $this.tab(type);
                }
            }).on('mousedown', function () {
                $this.needBlur = false;
            });
            
            if (this.$country) {/*//TODO modified*/
                this.$country.on(EVENT_CHANGE, (this._changeCountry = $.proxy(function () {
                    this.output(PROVINCE);
                    this.output(CITY);
                    this.output(DISTRICT);
                    this.tab(PROVINCE);
                }, this)));
            }

            if (this.$province) {
                this.$province.on(EVENT_CHANGE, (this._changeProvince = $.proxy(function () {
                    this.output(CITY);
                    this.output(DISTRICT);
                    this.tab(CITY);
                }, this)));
            }

            if (this.$city) {
                this.$city.on(EVENT_CHANGE, (this._changeCity = $.proxy(function () {
                    this.output(DISTRICT);
                    this.tab(DISTRICT);
                }, this)));
            }
        },

        open: function (type) {
            type = type || COUNTRY;/*//TODO modified*/
            this.$dropdown.show();
            this.$textspan.addClass('open').addClass('focus');
            this.tab(type);
        },

        close: function (blur) {
            this.$dropdown.hide();
            this.$textspan.removeClass('open');
            if (blur) {
                this.$textspan.removeClass('focus');
            }
        },

        unbind: function () {

            $(document).off('click', this._mouteclick);

            this.$element.off('change', this._changeElement);
            this.$element.off('focus', this._focusElement);
            this.$element.off('blur', this._blurElement);

            this.$textspan.off('click');
            this.$textspan.off('mousedown');

            this.$dropdown.off('click');
            this.$dropdown.off('mousedown');

            if (this.$country) {/*//TODO modified*/
                this.$country.off(EVENT_CHANGE, this._changeCountry);
            }
            
            if (this.$province) {
                this.$province.off(EVENT_CHANGE, this._changeProvince);
            }

            if (this.$city) {
                this.$city.off(EVENT_CHANGE, this._changeCity);
            }
        },

        getText: function () {
        	var data_split_ = this.getSplitStr();/*//TODO modified*/
        	var data_top_ = this.getTop();/*//TODO modified*/
            var text = '';
            this.$dropdown.find('.city-select')
                .each(function () {
                    var item = $(this).data('item'),
                        type = $(this).data('count');
                    if (item) {
                        text += ($(this).hasClass(data_top_) ? '' : data_split_) /*//TODO modified*/
                        	+ '<span class="select-item" data-count="'
                            + type + '" data-code="' + item.code + '">' + item.address + '</span>';
                    }
                });
            return text;
        },
        
        getTop: function () {/*//TODO modified*/
            return this.$element.attr('data-top') || this.options.top;
        },
        
        getTopval: function () {/*//TODO modified*/
            return this.$element.attr('data-topval') || this.options.topval;
        },
        
        getSplitStr: function () {/*//TODO modified*/
            return this.$element.attr('data-split') || this.options.split;
        },

        getPlaceHolder: function () {
            return this.$element.attr('placeholder') || this.options.placeholder;
        },

        feedText: function () {
            var text = this.getText();
            if (text) {
                this.$textspan.find('>.placeholder').hide();
                this.$textspan.find('>.title').html(this.getText()).show();
            } else {
                this.$textspan.find('>.placeholder').text(this.getPlaceHolder()).show();
                this.$textspan.find('>.title').html('').hide();
            }
        },

        getCode: function (count) {
        	var data_split_ = this.getSplitStr();/*//TODO modified*/
            var obj = {}, arr = [];
            this.$textspan.find('.select-item')
                .each(function () {
                    var code = $(this).data('code');
                    var count = $(this).data('count');
                    obj[count] = code;
                    arr.push(code);
                });
            return count ? obj[count] : arr.join(data_split_);/*//TODO modified*/
        },

        getVal: function () {
        	var data_split_ = this.getSplitStr();/*//TODO modified*/
        	var data_top_ = this.getTop();/*//TODO modified*/
            var text = '';
            this.$dropdown.find('.city-select')
                .each(function () {
                    var item = $(this).data('item');
                    if (item) {
                        text += ($(this).hasClass(data_top_) ? '' : data_split_) + item.address;/*//TODO modified*/
                    }
                });
            return text;
        },

        feedVal: function (trigger) {
        	if('' !== this.options.key){
        		$(this.options.key).val(this.getCode());
        	}
            this.$element.val(this.getVal());
            if(trigger) {
                this.$element.trigger('cp:updated');
            }
        },

        output: function (type) {
            var options = this.options;
            //var placeholders = this.placeholders;
            var $select = this['$' + type];
            var data = [];/*//TODO modified*/
            var item;
            var districts;
            var code;
            var matched = null;
            var value;

            if (!$select || !$select.length) {
                return;
            }

            item = $select.data('item');

            value = (item ? item.address : null) || options[type];

            //type === options.top ? options.topval :
            if(options.top === COUNTRY){
            	code = (/*//TODO modified*/
            			type === COUNTRY ? 0 :
            				type === PROVINCE ? this.$country && this.$country.find('.active').data('code') :
            					type === CITY ? this.$province && this.$province.find('.active').data('code') :
            						type === DISTRICT ? this.$city && this.$city.find('.active').data('code') : code
            	);
            }else if(options.top === PROVINCE){
            	code = (/*//TODO modified*/
            			type === COUNTRY ? 0 :
            				type === PROVINCE ? options.topval :
            					type === CITY ? this.$province && this.$province.find('.active').data('code') :
            						type === DISTRICT ? this.$city && this.$city.find('.active').data('code') : code
            	);
            }else if(options.top === CITY){
            	var topvalArr = options.topval.split(',');
            	code = (/*//TODO modified*/
            			type === COUNTRY ? 0 :
            				type === PROVINCE ? topvalArr[0] :
            					type === CITY ? topvalArr[1] :
            						type === DISTRICT ? this.$city && this.$city.find('.active').data('code') : code
            	);
            }else if(options.top === DISTRICT){
            	var topvalArr = options.topval.split(',');
            	code = (/*//TODO modified*/
            			type === COUNTRY ? 0 :
            				type === PROVINCE ? topvalArr[0] :
            					type === CITY ? topvalArr[1] :
            						type === DISTRICT ? topvalArr[2] : code
            	);
            }

            //districts = $.isNumeric(code) ? WorldDistricts[code] : null;
            districts = WorldDistricts[code] ? WorldDistricts[code] : null;

            if ($.isPlainObject(districts)) {
                $.each(districts, function (code, address) {
                	if (type === COUNTRY || type === PROVINCE) {
                        var cps = [];
                        for (var i = 0; i < address.length; i++) {
                            if (address[i].address === value) {
                                matched = {
                                    code: address[i].code,
                                    address: address[i].address
                                };
                            }
                            cps.push({
                                code: address[i].code,
                                address: address[i].address,
                                selected: address[i].address === value
                            });
                        }
                        data.push({
                        	code:code,
                        	data:cps
                        });
                    }else{
                    	if (address === value) {
                            matched = {
                                code: code,
                                address: address
                            };
                        }
                        data.push({
                            code: code,
                            address: address,
                            selected: address === value
                        });
                    }
                });
            }

            var html = type === COUNTRY || type === PROVINCE ? this.getCPList(data, type) ://TODO modified*/
                this.getList(data, type);
            
            $select.html(html);
            $select.data('item', matched);
        },
        
        getCPList: function (data, type) {
            var list = [],
                $this = this,
                simple = this.options.simple;

            $.each(data, function (i, n) {
                list.push('<dl class="clearfix">');
                list.push('<dt>' + n.code + '</dt><dd>');
                $.each(n.data, function (j, m) {
                    list.push(
                        '<a' +
                        ' title="' + (m.address || '') + '"' +
                        ' data-code="' + (m.code || '') + '"' +
                        ' class="' +
                        (m.selected ? ' active' : '') +
                        '">' +
                        ( simple ? $this.simplize(m.address, type) : m.address) +
                        '</a>');
                });
                list.push('</dd></dl>');
            });
            
            return list.join('');
        },

        getList: function (data, type) {
        	var list = [],
                $this = this,
                simple = this.options.simple;
            list.push('<dl class="clearfix"><dd>');

            $.each(data, function (i, n) {
                list.push(
                    '<a' +
                    ' title="' + (n.address || '') + '"' +
                    ' data-code="' + (n.code || '') + '"' +
                    ' class="' +
                    (n.selected ? ' active' : '') +
                    '">' +
                    ( simple ? $this.simplize(n.address, type) : n.address) +
                    '</a>');
            });
            list.push('</dd></dl>');

            return list.join('');
        },

        simplize: function (address, type) {
            address = address || '';
            if (type === COUNTRY) {/*//TODO modified*/
            	return address;
            }else if (type === PROVINCE) {
                return address.replace(/[省,市,自治区,壮族,回族,维吾尔]/g, '');
            } else if (type === CITY) {
                return address.replace(/[市,地区,回族,蒙古,苗族,白族,傣族,景颇族,藏族,彝族,壮族,傈僳族,布依族,侗族]/g, '')
                    .replace('哈萨克', '').replace('自治州', '').replace(/自治县/, '');
            } else if (type === DISTRICT) {
                return address.length > 2 ? address.replace(/[市,区,县,旗]/g, '') : address;
            }
        },

        tab: function (type) {
            var $selects = this.$dropdown.find('.city-select');
            var $tabs = this.$dropdown.find('.city-select-tab > a');
            var $select = this['$' + type];
            var $tab = this.$dropdown.find('.city-select-tab > a[data-count="' + type + '"]');
            if ($select) {
                $selects.hide();
                $select.show();
                $tabs.removeClass('active');
                $tab.addClass('active');
            }
        },

        reset: function () {
            this.$element.val(null).trigger('change')
             this.$element.trigger('cp:reset');
        },

        destroy: function () {
            this.unbind();
            this.$element.removeData(NAMESPACE).removeClass('city-picker-input');
            this.$textspan.remove();
            this.$dropdown.remove();
        }
    };

    CityPicker.DEFAULTS = {
        simple: false,
        responsive: false,
        key: '',
        placeholder: '请选择国家/省/市/区',
        split: '/',
        top: COUNTRY,
        topval: '0',
        level: 'district',
        country: '',
        province: '',
        city: '',
        district: ''
    };

    CityPicker.setDefaults = function (options) {
        $.extend(CityPicker.DEFAULTS, options);
    };

    // Save the other citypicker
    CityPicker.other = $.fn.citypicker;

    // Register as jQuery plugin
    $.fn.citypicker = function (option) {
        var args = [].slice.call(arguments, 1);

        return this.each(function () {
            var $this = $(this);
            var data = $this.data(NAMESPACE);
            var options;
            var fn;

            if (!data) {
                if (/destroy/.test(option)) {
                    return;
                }

                options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
                $this.data(NAMESPACE, (data = new CityPicker(this, options)));
            }

            if (typeof option === 'string' && $.isFunction(fn = data[option])) {
                fn.apply(data, args);
            }
        });
    };

    $.fn.citypicker.Constructor = CityPicker;
    $.fn.citypicker.setDefaults = CityPicker.setDefaults;

    // No conflict
    $.fn.citypicker.noConflict = function () {
        $.fn.citypicker = CityPicker.other;
        return this;
    };

    $(function () {
        $('[data-toggle="city-picker"]').citypicker();
    });
});