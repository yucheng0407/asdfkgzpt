/**
 * 表单构建工具
 *
 */
(function () {
    var BuilderView, EditFieldView, Formbuilder, FormbuilderCollection, FormbuilderModel, ViewFieldView, FormHeaderView,
        FormPropertyView, SubTableColumn = {}, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
        __hasProp = {}.hasOwnProperty,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        $query = [],

        Select2Util = {
            init: function ($el, options) {
                if ($el.length <= 0)
                    return;

                var _this = this,
                    $val = '',
                    url = options.url,
                    multiple = options.multiple ? options.multiple : false,
                    clear = $.isNotEmpty(options.clear) ? options.clear : false,
                    split = $.isNotEmpty(options.split) ? ',' : options.split;

                var params = {
                    placeholder: '请选择',
                    theme: "bootstrap",
                    language: "zh-CN",
                    multiple: multiple,
                    allowClear: clear,
                    separator: split,
                    formatSelection: options.formatSelection,
                    formatResult: options.formatResult,
                    escapeMarkup: function (markup) {
                        return markup;
                    },
                    createSearchChoice: options.createSearchChoice,
                    initSelection: options.initSelection,
                    templateSelection: options.templateSelection,
                    templateResult: options.templateResult,
                    ajax: {
                        url: url,
                        dataType: 'json',
                        delay: 250,
                        data: function (_params) {
                            var params = options.params || {};
                            params["queryName"] = _params.term;
                            return params;
                        }
                        , processResults: function (results) {
                            if (options.loadData)
                                options.loadData(results.data);
                            return {
                                results: results.data
                            };
                        },
                        cache: true
                    }
                };

                $el.select2(params);
            }
        };


    // ====================字段模型==================
    FormbuilderModel = (function (_super) {
        __extends(FormbuilderModel, _super);

        function FormbuilderModel() {
            _ref = FormbuilderModel.__super__.constructor.apply(this, arguments);
            return _ref;
        }

        FormbuilderModel.prototype.sync = function () {
        };

        FormbuilderModel.prototype.indexInDOM = function () {
            var $wrapper, _this = this;
            $wrapper = $(".fb-field-wrapper").filter((function (_, el) {
                return $(el).data('cid') === _this.cid;
            }));
            return $(".fb-field-wrapper").index($wrapper);
        };

        FormbuilderModel.prototype.is_input = function () {
            return Formbuilder.inputFields[this.get(FormOptions.t.mappings.FIELD_TYPE)] != null;
        };


        FormbuilderModel.prototype.is_valid = function () {
            return _.isEmpty(this.get(FormOptions.t.mappings.FIELD_TYPE));
        };

        return FormbuilderModel;

    })(Backbone.DeepModel);

    // ====================字段集合==================
    FormbuilderCollection = (function (_super) {
        __extends(FormbuilderCollection, _super);

        function FormbuilderCollection() {
            _ref1 = FormbuilderCollection.__super__.constructor.apply(this, arguments);
            return _ref1;
        }

        FormbuilderCollection.prototype.initialize = function () {
            return this.on('add', this.copyCidToModel);
        };

        FormbuilderCollection.prototype.model = FormbuilderModel;

        FormbuilderCollection.prototype.comparator = function (model) {
            return model.indexInDOM();
        };

        FormbuilderCollection.prototype.copyCidToModel = function (model) {
            if ($.isEmpty(model.name) && !model.is_input())//只针对只读控件
                model.attributes.name = $.uniqueId();

            return model.attributes.cid = model.cid;
        };

        FormbuilderCollection.prototype.is_not_input = function (model) {
            return Formbuilder.nonInputFields[model.attributes[FormOptions.t.mappings.FIELD_TYPE]] != null;
        };

        return FormbuilderCollection;

    })(Backbone.Collection);

    // ====================表单header属性==================
    FormHeaderView = (function (_super) {
        __extends(FormHeaderView, _super);

        function FormHeaderView() {
            _ref2 = FormHeaderView.__super__.constructor.apply(this, arguments);
            return _ref2;
        }

        FormHeaderView.prototype.className = "form-header";

        FormHeaderView.prototype.events = {
            'click': 'focusEditView'
        };

        FormHeaderView.prototype.initialize = function (options) {
            this.parentView = options.parentView;
            this.listenTo(this.model, "change", this.render);
            return this;
        };

        FormHeaderView.prototype.render = function () {
            var html = Formbuilder.templates["view/form-header"]({
                rf: this.model
            });

            this.$el.html(html);

            //在改变时设置节点的title
            this.parentView.formDefDesign.setRootNodeTitle(this.model.get("name"));
            return this;
        };

        FormHeaderView.prototype.focusEditView = function () {
            this.parentView.$responseFormHeader.addClass('editing');
            this.parentView.$responseFields.find(".fb-field-wrapper").removeClass('editing');
            return this.parentView.activeTab("form_property");
        };
        return FormHeaderView;
    })(Backbone.View);
    // ====================表单属性==================
    FormPropertyView = (function (_super) {
        __extends(FormPropertyView, _super);

        function FormPropertyView() {
            _ref3 = FormPropertyView.__super__.constructor.apply(this, arguments);
            return _ref3;
        }

        FormPropertyView.prototype.className = "edit-form-property";

        FormPropertyView.prototype.events = {
            'blur [data-toggle="dropdownTree"]': 'dropdownTree', // 设置分类
            // 'click .js-form-verify': 'formVerify',// 表单提交校验（包含新增和编辑）
            // 'click .js-remove-verify': 'removeVerify', // 移除表单提交校验
            // 'click .js-form-rules': 'setFormRules',
            // 'click .js-form-script': 'setFormScript'
            'change #formName': 'setKey'
        };

        FormPropertyView.prototype.setKey = function () {
            var mode = this.model;
            //新增情况下设置
            if (!mode.get("tableName")) {
                var name = mode.get(FormOptions.t.propertys.NAME);
                var keyStr = getEnglish(mode.get("preName") + name);
                mode.set(FormOptions.t.propertys.KEY, (keyStr.length > 26 ? keyStr.substring(0, 26) : keyStr));
            }
        };

        FormPropertyView.prototype.initialize = function (options) {
            this.parentView = options.parentView;
            this.model.bind('change', this.parentView.handleFormUpdate, this.parentView);
            return this;
        };

        FormPropertyView.prototype.render = function () {
            var html = Formbuilder.templates["edit/form-property"]({
                rf: this.model
            });

            this.$el.html(html);

            rivets.bind(this.$el, {
                model: this.model
            });

            QtipUtils.qtip(this.$el);
            return this;
        };

        // 选择分类树
        FormPropertyView.prototype.dropdownTree = function (e) {
            var $el = $(e.currentTarget), id = $el.data("id");
            this.model.set("typeName", $el.val());
            this.model.set("typeId", $(id).val());
        };

        // // 表单提交校验 编辑、新增
        // FormPropertyView.prototype.formVerify = function (e) {
        //     var _this = this,
        //         $el = $(e.currentTarget),
        //         url = RX.ctxPath + '/platform/form/formDef/verify.htm',
        //         key = FormOptions.t.propertys.VERIFYS,
        //         verifys = this.model.get(key) || [],
        //         keywords = _.allKeys(FormulaUtil),
        //         params = {},
        //         formula = '',
        //         msg = '',
        //         i = -1;
        //     if ($el.hasClass("js-edit-verify")) {
        //         var item = '.verify';
        //         i = this.$el.find(item).index($el.closest(item));
        //         formula = verifys[i].formula;
        //         msg = verifys[i].msg;
        //     }
        //
        //     params = {
        //         bo: Formbuilder.boDef,
        //         label: '公式',
        //         value: formula || '',
        //         msg: msg || '',
        //         keywords: keywords
        //     };
        //
        //     DialogUtil.dialog({
        //         title: "表单提交校验",
        //         params: params,
        //         area: ['780px', '600px'],
        //         content: url,
        //         btn: [{
        //             label: '确定',
        //             iconCls: 'btn btn-primary fa fa-ok',
        //             action: function (dialog, index) {
        //                 var data = DialogUtil.getChildFrameWindow(index).getVerifyData();
        //                 if (_.isEmpty(data.formula)) {
        //                     layer.msg("请设置校验公式");
        //                     return;
        //                 }
        //                 if (_.isEmpty(data.msg)) {
        //                     layer.msg("请设置校验错误提示");
        //                     return;
        //                 }
        //                 if (i > -1) {
        //                     verifys.splice(i, 1, data);
        //                 } else {
        //                     verifys.push(data);
        //                 }
        //                 _this.model.set(key, verifys);
        //                 _this.model.trigger("change:" + key);
        //                 _this.forceRender();
        //                 DialogUtil.close(index);
        //             }
        //         }, {
        //             label: '取消',
        //             iconCls: 'btn btn-danger fa fa-cancel',
        //             action: function (dialog, index) {
        //                 DialogUtil.close(index);
        //             }
        //         }]
        //     });
        // };

        // /**
        //  * 删除验证
        //  */
        // FormPropertyView.prototype.removeVerify = function (e) {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     var $el, index, options, key, clz;
        //     clz = ".js-remove-verify";
        //     key = FormOptions.t.propertys.VERIFYS;
        //
        //     index = this.$el.find(clz).index($el);
        //     options = this.model.get(key);
        //     options.splice(index, 1);
        //     this.model.set(key, options);
        //     this.model.trigger("change:" + key);
        //     return this.forceRender();
        // };

        // FormPropertyView.prototype.setFormRules = function () {
        //     var _this = this,
        //         models = this.parentView.collection.models,
        //         key = FormOptions.t.propertys.RULES,
        //         fields = [];
        //
        //     _.filter(models, function (m) {
        //         fields.push(m.attributes);
        //     });
        //     if (fields.length == 0) {
        //         layer.msg("请设置字段");
        //         return;
        //     }
        //
        //     DialogUtil.dialog({
        //         title: '表单规则设置',
        //         area: ['850px', '600px'],
        //         params: {
        //             data: this.model.get(key),
        //             fields: fields
        //         },
        //         content: RX.ctxPath + '/platform/form/formDef/rules.htm',
        //         btn: [{
        //             label: '确定',
        //             iconCls: 'btn btn-primary fa fa-ok',
        //             action: function (dialog, index) {
        //                 var data = DialogUtil.getChildFrameWindow(index).formDefRules.getData();
        //                 if (!data) return;
        //                 _this.model.set(key, data);
        //                 DialogUtil.close(index);
        //             }
        //         }, {
        //             label: '清空',
        //             iconCls: 'btn btn-success fa fa-clean',
        //             action: function (dialog, index) {
        //                 _this.model.set(key, null);
        //                 layer.msg("清空成功！");
        //                 DialogUtil.close(index);
        //             }
        //         }, {
        //             label: '取消',
        //             iconCls: 'btn btn-danger fa fa-cancel',
        //             action: function (dialog, index) {
        //                 DialogUtil.close(index);
        //             }
        //         }]
        //     });
        // };

        // FormPropertyView.prototype.setFormScript = function () {
        //     var _this = this,
        //         key = FormOptions.t.propertys.SCRIPT;
        //
        //     DialogUtil.dialog({
        //         title: '表单脚本设置',
        //         area: ['90%', '90%'],
        //         params: {
        //             data: this.model.get(key),
        //             bo: Formbuilder.boDef,
        //         },
        //         content: RX.ctxPath + '/platform/form/formDef/script.htm',
        //         callback: function (data) {
        //             _this.model.set(key, data);
        //         },
        //         btn: [{
        //             label: '确定',
        //             iconCls: 'btn btn-primary fa fa-ok',
        //             action: function (dialog, index) {
        //                 var data = DialogUtil.getChildFrameWindow(index).formDefScript.getData();
        //                 if (!data) {
        //                     layer.msg("请设置表单脚本");
        //                     return;
        //                 }
        //                 _this.model.set(key, data);
        //                 DialogUtil.close(index);
        //             }
        //         }, {
        //             label: '清空',
        //             iconCls: 'btn btn-success fa fa-clean',
        //             action: function (dialog, index) {
        //                 _this.model.set(key, null);
        //                 layer.msg("清空单脚本成功");
        //                 DialogUtil.getChildFrameWindow(index).formDefScript.cleanData();
        //             }
        //         }, {
        //             label: '取消',
        //             iconCls: 'btn btn-danger fa fa-cancel',
        //             action: function (dialog, index) {
        //                 DialogUtil.close(index);
        //             }
        //         }]
        //     });
        // };


        FormPropertyView.prototype.forceRender = function () {
            return this.model.trigger('change');
        };

        return FormPropertyView;
    })(Backbone.View);

    // ====================表单设计区域【中间字段处理】==================
    ViewFieldView = (function (_super) {
        __extends(ViewFieldView, _super);

        function ViewFieldView() {
            _ref4 = ViewFieldView.__super__.constructor.apply(this, arguments);
            return _ref4;
        }

        ViewFieldView.prototype.className = "fb-field-wrapper";

        ViewFieldView.prototype.events = {
            'click': 'focusEditView',// 选择字段
            'click .js-duplicate': 'duplicate',// 复制字段
            'click .js-clear': 'clear'// 删除字段
        };

        ViewFieldView.prototype.initialize = function (options) {
            this.parentView = options.parentView;
            this.listenTo(this.model, "change", this.render);
            return this.listenTo(this.model, "destroy", this.remove);
        };

        ViewFieldView.prototype.render = function () {
            var cid = this.model.cid;
            //兼容之前版本
            if (!this.model.is_input() && $.isEmpty(this.model.get(FormOptions.t.mappings.NAME))) {
                this.model.set(FormOptions.t.mappings.NAME, $.uniqueId());
            }
            //rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY)
            var occupy = this.model.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY);
            var width = occupy ? occupy / 4 * 100 : 100;
            this.$el.addClass('response-field-' + this.model.get(FormOptions.t.mappings.FIELD_TYPE))
                .removeClass("has-error")
                .attr("cid", cid)
                .data('cid', cid)
                .html(Formbuilder.templates["view/base" + (!this.model.is_input() ? '_non_input' : '')]({
                    rf: this.model
                }));
            this.$el.css("width", width + "%");
            //重新渲染编辑器
            this.reRenderEditor();

            return this;
        };
        ViewFieldView.prototype.reRenderEditor = function () {
            return;
            // if (this.model.get(FormOptions.t.mappings.FIELD_TYPE) != 'editor') {
            //     return;
            // }
            //
            // if (this.editor || this._initEditorCid) {
            //     if (this.editor) {
            //         this.editor.destroy();
            //         this.initUeditor();
            //     }
            // } else {
            //     this._initEditorCid = this.model.cid
            //     setTimeout((function (_this) {
            //         return function () {
            //             _this.initUeditor();
            //             return _this;
            //         };
            //     })(this), 0);
            // }
        }

        // 选中
        ViewFieldView.prototype.focusEditView = function () {
            return this.parentView.createAndShowEditView(this.model, true);
        };

        // 删除字段
        ViewFieldView.prototype.clear = function (e) {
            var cb, x,
                _this = this;
            e.preventDefault();
            e.stopPropagation();
            cb = function () {
                _this.parentView.handleFormUpdate();
                _this.model.set("sfyxSt", "UNVALID");
                //已经保存的数据删除增加标志位
                if (_this.model.get("id")) {
                    _this.model.set("changeFlg", true);
                }
                //触发destroy事件
                _this.model.trigger("destroy");
                // return _this.model.destroy();
            };
            x = Formbuilder.options.CLEAR_FIELD_CONFIRM;
            switch (typeof x) {
                case 'string':
                    if (confirm(x)) {
                        return cb();
                    }
                    break;
                case 'function':
                    return x(cb);
                default:
                    return cb();
            }
        };

        // 复制
        ViewFieldView.prototype.duplicate = function () {
            var attrs = _.clone(this.model.attributes);
            delete attrs['cid'];
            delete attrs['id'];
            attrs["code"] = attrs["code"] + "_fz";
            attrs[FormOptions.t.mappings.LABEL] += ' 复制';
            //清楚个性字段
            //是否可以删除
            delete attrs["fieldOptions"]["candelete"];
            delete attrs["fieldOptions"]["canchange"];
            return this.parentView.createField(attrs, {
                position: this.model.indexInDOM() + 1
            }, true);
        };
        return ViewFieldView;

    })(Backbone.View);

    // ====================TODO 编辑字段==================
    EditFieldView = (function (_super) {
        __extends(EditFieldView, _super);

        function EditFieldView() {
            _ref5 = EditFieldView.__super__.constructor.apply(this, arguments);
            return _ref5;
        }

        EditFieldView.prototype.className = "edit-response-field";

        EditFieldView.prototype.events = {
            'blur [data-toggle="dropdownTree"]': 'setDropdownName', // 点击字段名称

            'click .js-add-option': 'addOption',
            'click .js-remove-option': 'removeOption',
            'click .js-default-updated': 'defaultUpdated',// 默认选中的
            'input .option-label-input': 'forceRender',
            'click .js-add-other-option': 'addOption',
            'click .js-clean-bind-other-id': 'cleanBindOtherId',// 清空其他选择绑定字段


            'click .js-add-column': 'addOption',// 添加字段
            'click .js-remove-column': 'removeOption',// 删除字段
            'click .js-add-button': 'addOption',  // 添加按钮
            'click .js-remove-button': 'removeOption',  // 删除按钮
            // 'click .js-setting-button': 'settingOption',// 设置按钮

            'change .js-change-mode': 'changeMode',//改变模式
            'click .js-back-table': 'backTable',

            'click .js-predefined-choices': 'predefinedChoices',
            'click .js-clear-choices': 'clearChoices',
            'click .js-menubar-settings': 'menubarSettings',
            'change .js-change-date-type': 'changeDateType',// 校验-改变日期类型

            'change .js-datefmt-type': 'changeDatefmt',
            'change .js-default-value-type': 'changeDefaultValue',
            'click .js-default-value-btn': 'setDefaultValue',
            'change .js-media-type': 'changeMedia',
            'change .js-data-format': 'changeDataFormat',
            'change .js-think_input-value': 'changeCanThinkValue',

            //选择器
            /*      'change .js-change-store':'changeStore',*/
            'click .js-clean-bind-id': 'cleanBindId',

            'click .js-clean-default-val': 'cleanDefaultVal',      //清除默认值

            'click [data-role="change_field_type"]': 'changeFieldType',// 改变字段类型

            // appLayout
            'click .js-appLayout-remove': 'cleanBindId',
            'click .js-appLayout-select': 'cleanBindId',

            //列表展示
            'click .js-show-table': 'changeShowTable',

            //设置默认标题
            'change #label': 'setCode',

            //字段类型转化为大写
            'change #databaseType': 'translatType'
        };

        EditFieldView.prototype.setCode = function (e) {
            var mode = this.model;
            //未发布的情况下
            if (!this.model.get("columnName") && this.model.get("fieldOptions.canchange") !== false) {
                var name = getEnglish(mode.get(FormOptions.t.mappings.LABEL));
                mode.set(FormOptions.t.mappings.CODE, (name && name.length > 27) ? name.substring(0, 27) : name);
            }
        };

        /**
         * 将database_type值转化为大写
         * @param e
         */
        EditFieldView.prototype.translatType = function (e) {
            var mode = this.model;
            //未发布的情况下
            if (!this.parentView.formProperty.get("columnName")) {
                mode.set("fieldOptions.database_type", mode.get("fieldOptions.database_type").toUpperCase());
            }
        };

        EditFieldView.prototype.changeShowTable = function (e) {
            var checked = e.target.checked;
            if (checked) {
                $(".js-show-search").show();
            } else {
                $(".js-show-search").hide();
                $(".js-show-search-check")[0].checked = false;
                this.mode.set(FormOptions.t.mappings.SHOWSEARCH, false);
            }
        };

        EditFieldView.prototype.initialize = function (options) {
            this.parentView = options.parentView;
            return this.listenTo(this.model, "destroy", this.remove);
        };

        /**
         * 渲染编辑字段
         *
         * @returns {EditFieldView}
         */
        EditFieldView.prototype.render = function () {
            if (this.model.is_valid())
                return this;

            this.$el.html(Formbuilder.templates["edit/base" + (!this.model.is_input() ? '_non_input' : '')]({
                rf: this.model,
                table: this.model.get(FormOptions.t.mappings.IS_SUB) ? this.parentView.subTable : null
            }));
            rivets.bind(this.$el, {
                model: this.model
            });

            // 初始化字段排序
            this.initSortable(this, ".choices", ".option", FormOptions.t.mappings.OPTIONS);
            this.initSortable(this, ".columns", ".column", FormOptions.t.mappings.COLUMNS);
            this.initSortable(this, ".buttons", ".button", FormOptions.t.mappings.BUTTONS);

            QtipUtils.qtip(this.$el);
            return this;
        };

        /**
         * 改变日期类型
         */
        EditFieldView.prototype.changeDateType = function (e) {
            var $el = $(e.currentTarget), name = $el.data("name");
            var val = $el.val();
            if (val == 'specific') {
                $(".js-" + name).show();
                $(".js-" + name + "-interval").hide();
            } else if (val == 'today') {
                $(".js-" + name).hide();
                $(".js-" + name + "-interval").hide();
            } else if (val == 'before') {
                $(".js-" + name).show();
                $(".js-" + name + "-interval").show();
            } else if (val == 'after') {
                $(".js-" + name).show();
                $(".js-" + name + "-interval").show();
            } else {
                $(".js-" + name).hide();
                $(".js-" + name + "-interval").hide();
            }
        };

        /**
         * 更换控件类型
         */
        EditFieldView.prototype.changeFieldType = function (e) {
            var $el = $(e.currentTarget), fieldType = $el.data("fieldtype"),
                origFieldType = this.model.get(FormOptions.t.mappings.FIELD_TYPE),
                origFieldOptions = {},
                defaultFieldOptions = {};

            $.cloneObject(this.model.get(FormOptions.t.mappings.FIELD_OPTIONS), origFieldOptions);

            defaultFieldOptions = this.getDefaultFieldOptions(Formbuilder.helpers.defaultFieldAttrs(fieldType));

            this.model.set(FormOptions.t.mappings.FIELD_TYPE, fieldType);

            // 清空之前的配置 还原默认配置
            this.model.set(FormOptions.t.mappings.FIELD_OPTIONS, {});
            this.model.set(FormOptions.t.mappings.FIELD_OPTIONS, defaultFieldOptions);

            // 有共性的字段替换 (主要是单选、多选、下拉 相互替换),不进行清空
            if ((origFieldType == 'radio' || origFieldType == 'checkbox' || origFieldType == 'select') &&
                (fieldType == 'radio' || fieldType == 'checkbox' || fieldType == 'select')) {
                this.model.set(FormOptions.t.mappings.OPTIONS, origFieldOptions.options);
            }


            this.forceRender();
            // 重新渲染
            this.parentView.createAndShowEditView(this.model, true, true);
        };

        /**
         * 更换控件类型-----获取默认值选项
         */
        EditFieldView.prototype.getDefaultFieldOptions = function (attr) {
            if (!attr)
                return {};
            var field = new Backbone.DeepModel(attr),
                fieldType = field.get(FormOptions.t.mappings.FIELD_TYPE);
            field.set(FormOptions.t.mappings.DEFAULT_VALUE_TYPE, this.model.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE));
            field.set(FormOptions.t.mappings.REQUIRED, this.model.get(FormOptions.t.mappings.REQUIRED));

            if ($.isNotEmpty(this.model.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY))) {
                field.set(FormOptions.t.mappings.GRIDS_TO_OCCUPY, this.model.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY));
            }

            return field.get(FormOptions.t.mappings.FIELD_OPTIONS);
        };

        /**
         * 清除绑定id
         */
        EditFieldView.prototype.cleanBindId = function () {
            this.model.set(FormOptions.t.mappings.BIND_NAME, null);
            this.model.set(FormOptions.t.mappings.BIND_ID, null);
        };

        /**
         * 清除默认值
         */
        EditFieldView.prototype.cleanDefaultVal = function () {
            this.model.set(FormOptions.t.mappings.DEFAULT_VALUE, null);
            this.model.set(FormOptions.t.mappings.DEFAULT_VALUE_NAME, null);
        };

        /**
         * 设置下拉bo、数据字典、分类等 赋值
         */
        EditFieldView.prototype.setDropdownName = function (e) {
            var $el = $(e.currentTarget), _this = this,
                val = $el.val(),
                keyVal = $el.siblings($el.data("key")).val();

            if ($el.data("bind_name")) { // 字段类型 (字段绑定对象)
                this.model.set(FormOptions.t.mappings.SHOW_NAME, val);
                this.model.set(FormOptions.t.mappings.NAME, keyVal);
                // 标题也修改
                if (!this.parentView.formProperty.get(FormOptions.t.propertys.OUT_OF_NAME)) {
                    this.model.set(FormOptions.t.mappings.LABEL, val);
                }
            } else if ($el.data("bind_default_value")) {  // 数据字典默认值
                this.model.set(FormOptions.t.mappings.DEFAULT_VALUE, keyVal);
                this.model.set(FormOptions.t.mappings.DEFAULT_VALUE_NAME, val);
            } else if ($el.data("bind_id")) {// 选择器绑定ID
                this.model.set(FormOptions.t.mappings.BIND_NAME, val);
                this.model.set(FormOptions.t.mappings.BIND_ID, keyVal);
            } else if ($el.data("bind_other_name")) {// 绑定选项其它
                this.model.set(FormOptions.t.mappings.OPTION_OTHER_NAME, val);
                this.model.set(FormOptions.t.mappings.OPTION_OTHER_ID, keyVal);
            } else {// 绑定其它
                // 什么也不做
            }
        };

        /**
         * 删除字段
         *
         * @returns
         */
        EditFieldView.prototype.remove = function () {
            this.parentView.editView = void 0;
            this.parentView.activeTab("form_property");
            return EditFieldView.__super__.remove.apply(this, arguments);
        };

        /**
         * 添加或者编辑选项
         *
         * @param e
         * @returns
         */
        EditFieldView.prototype.addOption = function (e) {
            var $el, i, newOption, options, item, key, type;
            $el = $(e.currentTarget);
            if ($el.hasClass("js-add-option")) {
                item = '.option';
                key = FormOptions.t.mappings.OPTIONS;
                newOption = {
                    label: "选项",
                    checked: false
                };
            } else if ($el.hasClass("js-add-other-option")) {
                item = '.option';
                key = FormOptions.t.mappings.OPTIONS;
                newOption = {
                    label: "其他",
                    checked: false,
                    include_other_option: true
                };
                this.$el.find("#optionOtherIdDiv").removeClass("hidden");
            } else if ($el.hasClass("js-add-column")) {// 字段
                item = '.column';
                key = FormOptions.t.mappings.COLUMNS;
                newOption = Formbuilder.helpers.defaultFieldAttrs($el.data('field_type'));

            } else if ($el.hasClass("js-add-button")) {
                item = '.button';
                key = FormOptions.t.mappings.BUTTONS;
                type = $el.data('button_type');

                newOption = FormOptions.t.BUTTONS[type];
                newOption.type = type;
                newOption.label = Formbuilder.lang.buttons[type];

                options = this.model.get(key) || [];
                var isExist = _.find(options, function (n) {
                    return n.type == type;
                });

                if (isExist && type != 'custom') {
                    layer.msg("该按钮已经添加!");
                    return;
                }
            } else {
                return;
            }

            i = this.$el.find(item).index($el.closest(item));
            options = this.model.get(key) || [];

            if (i > -1) {
                options.splice(i + 1, 0, newOption);
            } else {
                options.push(newOption);
            }
            this.model.set(key, options);
            this.model.trigger("change:" + key);
            return this.forceRender();
        };

        /**
         * 删除选项
         *
         * @param e
         * @returns
         */
        EditFieldView.prototype.removeOption = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $el, index, options, key, clz;
            $el = $(e.currentTarget);
            if ($el.hasClass("js-remove-option")) {
                clz = ".js-remove-option";
                key = FormOptions.t.mappings.OPTIONS;
            } else if ($el.hasClass("js-remove-column")) {
                clz = ".js-remove-column";
                key = FormOptions.t.mappings.COLUMNS;
            } else if ($el.hasClass("js-remove-button")) {
                clz = ".js-remove-button";
                key = FormOptions.t.mappings.BUTTONS;
            } else {
                return;
            }

            index = this.$el.find(clz).index($el);
            options = this.model.get(key);
            options.splice(index, 1);
            this.model.set(key, options);
            this.model.trigger("change:" + key);
            return this.forceRender();
        };

        EditFieldView.prototype.settingOption = function (e) {
            // var $el, i, options, option, clz, key, url, _this = this, title = '', operationType, bo, extBo;
            // $el = $(e.currentTarget);
            // if ($el.hasClass("js-setting-button")) {// 对话框按钮
            //     clz = ".js-setting-button";
            //     title = "操作按钮";
            //     key = FormOptions.t.mappings.BUTTONS;
            //     operationType = "edit";
            //
            //
            //     bo = this.getBo(this.model.get("name"));//子表bo
            //
            //     extBo = this.getBo();//主表bo
            //
            //     url = RX.ctxPath + '/platform/form/formDef/button.htm';
            //
            // }
            //
            // i = this.$el.find(clz).index($el.closest(clz));
            // options = this.model.get(key) || [];
            // option = options.slice(i, i + 1).shift();
            //
            // //	title += "【"+FormButtons.t.buttons[option.type].label+"】";
            //
            // DialogUtil.dialog({
            //     title: title,
            //     area: ['60%', '80%'],
            //     params: {
            //         data: option,
            //         buttonTypeKey: 'type',
            //         settingRights: false,
            //         operationType: operationType,
            //         bo: bo,
            //         extBo: extBo
            //     },
            //     content: url,
            //     btn: [{
            //         label: '确定',
            //         iconCls: 'btn btn-primary fa fa-ok',
            //         action: function (dialog, index) {
            //             var data = DialogUtil
            //                 .getChildFrameWindow(index).getData();
            //             options.splice(i, 1, data);
            //             _this.model.set(key, options);
            //             _this.model.trigger("change:" + key);
            //             _this.forceRender();
            //             DialogUtil.close(index);
            //         }
            //     }, {
            //         label: '取消',
            //         iconCls: 'btn btn-danger fa fa-cancel',
            //         action: function (dialog, index) {
            //             DialogUtil.close(index);
            //         }
            //     }]
            // });
        };


        /**
         * 清除绑定选项其他id
         */
        EditFieldView.prototype.cleanBindOtherId = function () {
            this.model.set(FormOptions.t.mappings.OPTION_OTHER_ID, null);
            this.model.set(FormOptions.t.mappings.OPTION_OTHER_NAME, null);
        };

        /**
         * 默认选中的
         *
         * @param e
         * @returns
         */
        EditFieldView.prototype.defaultUpdated = function (e) {
            var i,
                options = [],
                $el = $(e.currentTarget),
                item = '.js-default-updated',
                key = FormOptions.t.mappings.OPTIONS,
                checkboxs = this.$el.find(item),
                isChecked = $el.prop('checked'),
                isCheckBox = true;

            i = checkboxs.index($el.closest(item));
            options = this.model.get(key) || [];
            if (this.model.get(FormOptions.t.mappings.FIELD_TYPE) !== 'checkbox') {
                checkboxs.not($el).attr('checked', false).trigger('change');
                isCheckBox = false;
            }
            _.each(options, function (option, j) {
                if (i == j)
                    option.checked = isChecked;
                else
                    option.checked = isCheckBox ? option.checked : false;
            });
            this.model.set(key, options);
            return this.forceRender();
        };


        /**
         * 初始化选项排序
         *
         * @param e
         * @param t
         * @param item
         * @returns {EditFieldView}
         */
        EditFieldView.prototype.initSortable = function (e, t, item, key) {
            var _this = this, index;
            var sortableChoices = e.$(t).sortable({
                items: "> " + item,
                handle: "[data-role='sort_choice']",
                forcePlaceholderSize: true,
                scroll: true,
                placeholder: "sortable-placeholder",
                distance: 1,
                axis: "y",
                start: function (event, ui) {
                    // 移动前的位置
                    index = _this.$el.find(item).index($(ui.item).closest(item));
                },
                update: function (ev, ui) {
                    _this.updateSortingIndex(index, ui, item, key);
                }
            });
            return this;
        };

        /**
         * 更新排序位置
         */
        EditFieldView.prototype.updateSortingIndex = function (index, ui, item, key) {
            // 移动后的位置
            var i = this.$el.find(item).index($(ui.item).closest(item)),
                // 值
                options = this.model.get(key) || [];

            var moveOption = options[index];
            // 删除 移动的位置
            options.splice(index, 1);
            // 插入 移动的位置
            options.splice(i, 0, moveOption);
            this.model.set(key, options);
            this.model.trigger("change:" + key);
            this.forceRender();
            this.render(); // 重新渲染
        };

        /**
         * 设置model的值
         */
        EditFieldView.prototype.setModelValue = function (key, value) {
            this.model.set(key, []);
            this.model.trigger("change:" + key);
            this.model.set(key, value);
            this.model.trigger("change:" + key);
            this.forceRender();
        }

        /**
         * 清空字典数据
         */
        EditFieldView.prototype.clearChoices = function () {
            this.setModelValue(FormOptions.t.mappings.DICT_CODE, "");
            this.setModelValue(FormOptions.t.mappings.OPTIONS, []);
        };

        /**
         * 预设的 选项模版
         *
         * @param e
         */
        EditFieldView.prototype.predefinedChoices = function (e) {
            var _this = this, key = FormOptions.t.mappings.OPTIONS;
            RX.page.open({
                title: "选择模板",
                url: "/dict/sysDictSelect",
                param: {
                    canAdd: true,
                    func: function (dictCode) {
                        var dict = RX.getDictByCode(dictCode);
                        var options = [];
                        dict && $.each(dict, function (index, obj) {
                            options.push({
                                val: obj.code,
                                label: obj.value
                            });
                        });
                        _this.setModelValue(FormOptions.t.mappings.DICT_CODE, dictCode);
                        _this.setModelValue(key, options);
                    }
                }
            });
        };

        EditFieldView.prototype.getBo = function (subTableName, curName) {
            var boJson = Formbuilder.boDef;
            var bo = [];
            $.each(boJson, function (i, n) {
                if ($.isNotEmpty(subTableName) && n.attrType == 'field')
                    return true;
                if ($.isEmpty(subTableName) && n.attrType == 'subField')
                    return true;
                if ($.isNotEmpty(subTableName) && n.tableName != subTableName)
                    return true;
                if ($.isNotEmpty(curName) && n.key == curName)//排除自己
                    return true;
                bo.push(n);
            });
            return bo;
        };

        /**
         * @param e
         */
        EditFieldView.prototype.changeCanThinkValue = function (e) {
            var $el = $(e.currentTarget), val = $el.val(),
                fieldType = this.model.get(FormOptions.t.mappings.FIELD_TYPE),
                btn;   //联想需要输入的内容
            if (val == '1') {
                //是
                $("._think_input").show();
            } else if (val == '0') {
                //否
                $("._think_input").hide();
            }
        }

        /**
         * 默认值
         */
        EditFieldView.prototype.changeDefaultValue = function (e) {
            var $el = $(e.currentTarget), val = $el.val(), key = FormOptions.t.mappings.DEFAULT_VALUE,
                defValue = $el.siblings(".js-default-value"),
                btn = $el.siblings(".js-default-value-btn"),
                fieldType = this.model.get(FormOptions.t.mappings.FIELD_TYPE);
            if (val == 'fixed') {
                if (fieldType == 'radio' || fieldType == 'checkbox' || fieldType == 'select' || fieldType == 'attachment') {
                    defValue.val('').hide();
                    btn.hide();
                } else if (fieldType == 'selector') {
                    var text = Formbuilder.lang.default_value_type[val];
                    defValue.val('').hide();
                    btn.show();
                    btn.text(text);
                } else {
                    defValue.val('').show();
                    btn.hide();
                }
            } else if (val == 'today') {
                defValue.hide();
                btn.hide();
            } else {// formula dynamic
                var text = Formbuilder.lang.default_value_type[val];
                defValue.val('').hide();
                btn.show();
                btn.text(text);
            }
            this.model.set(key, "");
        };

        /**
         * 设置默认值
         */
        EditFieldView.prototype.setDefaultValue = function (e) {
            var $el = $(e.currentTarget), type = this.model.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE),
                _this = this,
                key = FormOptions.t.mappings.DEFAULT_VALUE,
                value = this.model.get(key) || [],
                title = Formbuilder.lang.default_value_type[type],
                params = {},
                url = RX.ctxPath + '/platform/form/formDef/formula.htm';
            if (type == 'fixed') { // 固定值
                url = RX.ctxPath + '/platform/form/formDef/fixedSelector.htm';
                params = {
                    selector_type: this.model.get(FormOptions.t.mappings.SELECTOR_TYPE),
                    is_single: this.model.get(FormOptions.t.mappings.IS_SINGLE),
                    data: value
                };
            }
            // else if (type == 'dynamic') { // 动态脚本
            //     url = RX.ctxPath + '/platform/form/formDef/dynamic.htm';
            //     params = {
            //         bo: Formbuilder.boDef,
            //         label: this.model.get('label'),
            //         value: value
            //     };
            // } else if (type == 'linkage') {  // 联动设置
            //     url = RX.ctxPath + '/platform/form/formDef/linkage.htm';
            //     var subName = this.model.get("sub_name") ? this.model.get("sub_name") : null;
            //     params = {
            //         bo: this.getBo(subName),
            //         query: $query,
            //         label: this.model.get('label') || '未命名',
            //         value: value
            //     };
            // } else if (type == 'formula') { // 公式计算
            //     url = RX.ctxPath + '/platform/form/formDef/formula.htm';
            //
            //     // var keywords = _.allKeys(FormulaUtil);
            //     // params = {
            //     //     bo: Formbuilder.boDef,
            //     //     label: this.model.get('label'),
            //     //     value: value,
            //     //     keywords: keywords
            //     // };
            // }

            // DialogUtil.dialog({
            //     title: title,
            //     params: params,
            //     area: ['780px', '600px'],
            //     content: url,
            //     btn: [{
            //         label: '确定',
            //         iconCls: 'btn btn-primary fa fa-ok',
            //         action: function (dialog, index) {
            //             var data = DialogUtil.getChildFrameWindow(index).getData();
            //             if (_.isEmpty(data)) {
            //                 return;
            //             }
            //             _this.model.set(key, data);
            //             DialogUtil.close(index);
            //         }
            //     }, {
            //         label: '取消',
            //         iconCls: 'btn btn-danger fa fa-cancel',
            //         action: function (dialog, index) {
            //             DialogUtil.close(index);
            //         }
            //     }]
            // });
        };

        /**
         * 日期格式改变
         */
        EditFieldView.prototype.changeDatefmt = function (e) {
            var $el = $(e.currentTarget), val = $el.val();
            if (FormOptions.t.DATE_FORMATS[val]) {
                $el.siblings(".js-datefmt").addClass("hidden");
                this.model.set(FormOptions.t.mappings.DATEFMT, FormOptions.t.DATE_FORMATS[val]);
            } else {// 自定义的
                $el.siblings(".js-datefmt").removeClass("hidden");
                this.model.set(FormOptions.t.mappings.DATEFMT, "");
            }
        };
        /**
         * 附件类型
         */
        EditFieldView.prototype.changeMedia = function (e) {
            var $el = $(e.currentTarget), val = $el.val();
            this.model.set(FormOptions.t.mappings.MEDIA, "");
            if (_.isEmpty(val)) {
                return;
            }
            if (FormOptions.t.FILE_TYPES[val]) {
                $el.siblings(".js-media").addClass("hidden");
            } else {// 自定义的
                $el.siblings(".js-media").removeClass("hidden");
            }
        };

        /**
         * 校验的数据的格式
         */
        EditFieldView.prototype.changeDataFormat = function (e) {
            var $el = $(e.currentTarget), val = $el.val();
            this.model.set(FormOptions.t.mappings.DATA_FORMAT_VALUE, "");
            this.model.set(FormOptions.t.mappings.DATA_FORMAT_MSG, "");

            if (_.isEmpty(val) || FormOptions.t.DATA_FORMAT[val]) {
                $el.siblings(".js-data-format-value").addClass("hidden");
            } else {// 自定义的
                $el.siblings(".js-data-format-value").removeClass("hidden");
            }
        };

        EditFieldView.prototype.forceRender = function () {
            return this.model.trigger('change');
        };

        return EditFieldView;
    })(Backbone.View);

    // ====================TODO 编辑视图==================
    BuilderView = (function (_super) {
        __extends(BuilderView, _super);

        function BuilderView() {
            _ref6 = BuilderView.__super__.constructor.apply(this, arguments);
            return _ref6;
        }

        BuilderView.prototype.SUBVIEWS = [];

        BuilderView.prototype.events = {
            'click .js-save-form': 'saveForm', // 保存表单
            'click .js-close': 'closeDialog',
            'click .js-preview-from': 'previewForm', // 预览表单
            'click .fb-tabs a': 'showTab', // 显示tab
            'click .fb-add-field-types a': 'addField' // 点击字段->添加字段
        };

        BuilderView.prototype.getFormDef = function (data) {
            if (!data)
                return {name: "新建表单", sfyxSt: "VALID", key: "XJBD"};
            var d = _.clone(data);
            if (d.fields)
                delete d.fields;
            return d;

        };

        BuilderView.prototype.initialize = function (options) {
            var selector, d = {};
            selector = options.selector;
            this.formBuilder = options.formBuilder;
            d = options.data;
            this.options = options;
            this.formDefDesign = options.formDefDesign;
            // 字段
            this.fields = d ? d.fields : [];
            this.formDef = this.getFormDef(d);
            if (selector != null) {
                this.setElement($(selector));
            }
            // 初始化表单属性
            this.initFormProperty();
            // 初始化字段集合
            this.initFormCollection();

            return this.bindSaveEvent();
        };

        BuilderView.prototype.initDynamicData = function (field_type) {


            // //自定义查询
            // if ($query && $query.length == 0) {
            //     $.get(RX.ctxPath + "/platform/form/customQuery/getAll.htm", function (data) {
            //         if ($.isNotEmpty(data))
            //             $query = data.rows;
            //     });
            // }
        };


        // 初始化字段集合
        BuilderView.prototype.initFormCollection = function () {
            this.collection = new FormbuilderCollection;
            this.collection.bind('add', this.addOne, this);
            this.collection.bind('reset', this.reset, this);
            this.collection.bind('change', this.handleFormUpdate, this);
            this.collection.bind('destroy add reset', this.hideShowNoResponseFields, this);
            this.collection.bind('destroy', this.ensureEditViewScrolled, this);
            this.render();
            this.collection.reset(this.fields);
        };

        BuilderView.prototype.initFormProperty = function () {
            var view, $responseFormHeaderWrapper;
            this.formProperty = new Backbone.DeepModel(this.formDef);
            // 初始化属性编辑页面
            view = new FormHeaderView({
                model: this.formProperty,
                parentView: this
            });
            $responseFormHeaderWrapper = this.$el.find('.form-header-wrapper');
            $responseFormHeaderWrapper.append(view.render().el);

            this.$responseFormHeader = $responseFormHeaderWrapper.find('.form-header');
            // 初始化属性编辑页面
            this.editFormView = new FormPropertyView({
                model: this.formProperty,
                parentView: this
            });
            var $newEditEl = this.editFormView.render().$el;
            this.$el.find(".edit-form-property").html($newEditEl);
        };


        /**
         * 绑定保存事件
         *
         * @returns
         */
        BuilderView.prototype.bindSaveEvent = function () {
            var _this = this;
            this.formSaved = true;
            this.formPreview = false;
            // return $(window).bind('beforeunload', function (event) {
            //     debugger
            //     if (!_this.formSaved && !_this.formPreview) {
            //         event = event || window.event;
            //         var returnValue = Formbuilder.lang.dict.UNSAVED_CHANGES;
            //         if (event)
            //             event.returnValue = returnValue;
            //         return returnValue;
            //     }
            // });
        };

        BuilderView.prototype.reset = function () {
            this.$responseFields.html('');
            return this.addAll();
        };

        BuilderView.prototype.render = function () {
            var subview, _i, _len, _ref5;
            // 添加字段html模版

            this.addFieldHtml();
            this.$responseFields = this.$el.find('.fb-response-fields');

            // 是否显示还是隐藏 字段
            this.hideShowNoResponseFields();
            _ref5 = this.SUBVIEWS;
            for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
                subview = _ref5[_i];
                new subview({
                    parentView: this
                }).render();
            }
            return this;
        };

        /**
         * 添加字段html
         */
        BuilderView.prototype.addFieldHtml = function () {
            this.$el.find(".add-field-wrapper").html(Formbuilder.templates['partials/add_field']());
            QtipUtils.qtip(this.$el);
        };

        /**
         * 激活tab
         *
         * @param id
         */
        BuilderView.prototype.activeTab = function (id) {
            this.$el.find(".fb-tabs a[href=\"#" + id + "\"]").click();
        };

        /**
         * 显示Tab
         */
        BuilderView.prototype.showTab = function (e) {
            var $el, first_model, target;
            $el = $(e.currentTarget);
            target = $el.attr('href');
            if (target === '#edit_field' && !this.editView) {
                if (first_model = getFirstModel(this.collection.models)) {
                    return this.createAndShowEditView(first_model, true);
                }
            }
        };

        /**
         * 获取第一个model
         * @param models
         * @returns {*}
         */
        function getFirstModel(models) {
            var firstModel;
            if (models.length > 0) {
                $.each(models, function (index, model) {
                    if (model.get("sfyxSt") !== "UNVALID") {
                        firstModel = model;
                        return true;
                    }
                });
            }
            return firstModel;
        }

        BuilderView.prototype.addOne = function (rf, _, options) {
            //有效数据，或者不是数据库字段，数据库字段在右侧展示
            if (rf.get("sfyxSt") === "UNVALID")
                return;
            if (rf.get("fieldType") === "database") {
                //添加至右侧的数据库字段树中
                this.formDefDesign.addTreeData(rf.attributes, rf.cid);
                return;
            }
            var $replacePosition, view, $elView, fieldType;
            fieldType = rf.get(FormOptions.t.mappings.FIELD_TYPE);

            this.initDynamicData(fieldType);

            view = new ViewFieldView({
                model: rf,
                parentView: this
            });

            if (options.$replaceEl != null) {// 替换
                $elView = options.$replaceEl.replaceWith(view.render().el);
            } else if ((options.position == null) || options.position === -1) {// 添加之后
                $elView = this.$responseFields.append(view.render().el);
            } else if (options.position === 0) {// 添加之前
                $elView = this.$responseFields.prepend(view.render().el);
            } else if (($replacePosition = this.$responseFields.find(".fb-field-wrapper").eq(options.position))[0]) {
                $elView = $replacePosition.before(view.render().el);
            } else {
                $elView = this.$responseFields.append(view.render().el);
            }
            return $elView;
        };

        /**
         * 设置字段排序
         *
         * @returns
         */
        BuilderView.prototype.setSortable = function () {
            var _this = this;
            if (this.$responseFields.hasClass('ui-sortable')) {
                this.$responseFields.sortable('destroy');
            }
            this.$responseFields.sortable({
                items: '>.fb-field-wrapper',
                forcePlaceholderSize: true,
                cancel: ">.actions-wrapper",
                placeholder: "field-sorting-placeholder",
                distance: 5,
                tolerance: "pointer",
                beforeStart: function (e, ui) {
                    //排序
                    if (ui.helper.hasClass("fb-field-wrapper")) {
                        var width = ui.helper[0].style.width;
                        var occupy = width.substring(0, width.length - 1) / 25;
                        _this.$responseFields.sortable("option", "placeholder", "field-sorting-placeholder" + occupy);
                    }
                },
                //	当排序开始时触发该事件。
                start: function (e, ui) {
                    ui.placeholder.height(ui.item.is(".field-dragging") ? 88 : ui.helper.outerHeight() - 2);
                    return true;
                },
                //	当排序停止时触发该事件。
                stop: function (e, ui) {
                    var el = ui.item;
                    if (el.data('field-type')) {
                        _this.createField(el.data('field-type'), {
                            $replaceEl: el
                        }, true);
                    }
                    return true;
                },
                //当用户停止排序且 DOM 位置改变时触发该事件。
                update: function (e, ui) {
                    if (!ui.item.data('field-type')) {
                        return _this.ensureEditViewScrolled();
                    }
                },
                //	当一个 sortable 项目移动到一个 sortable 列表时触发该事件。
                over: function (e) {
                    return _this.$responseFields.removeClass("fb-no-response-fields");
                },
                //当一个 sortable 项目从一个 sortable 列表移除时触发该事件。
                //注释：当一个 sortable 项目被撤销时也会触发该事件。
                out: function (e) {
                    return _this.hideShowNoResponseFields();
                }
            }).disableSelection();
            return this.setDraggable();
        };

        BuilderView.prototype.setDraggable = function () {
            var $addFieldButtons,
                _this = this;
            $addFieldButtons = this.$el.find("[data-field-type]");
            return $addFieldButtons.draggable({
                connectToSortable: this.$responseFields,
                appendTo: ".fb-response-fields",
                zIndex: 100,
                helper: function (e) {
                    var $helper = $(e.target);
                    var type;
                    if ($helper.is("[data-field-type]") || ($helper = $helper.closest("[data-field-type]"))) {
                        type = $helper.attr("data-field-type");
                        $helper = $("<div class='field-dragging'>").html($helper.clone());
                        $helper.css({
                            width: _this.$responseFields.width(),
                            height: '80px'
                        });
                    }
                    //获取占比
                    var attr = {};
                    Formbuilder.fields[type].defaultAttributes(attr);
                    //先获取表单的配置
                    var occupy = attr[FormOptions.t.mappings.GRIDS_TO_OCCUPY];
                    if (typeof occupy === "undefined") {
                        occupy = _this.formProperty.get(FormOptions.t.propertys.GRIDS_TO_OCCUPY) || "";
                    }
                    _this.$responseFields.sortable("option", "placeholder", "field-sorting-placeholder" + occupy);
                    return $helper;
                }
            });
        };

        BuilderView.prototype.addAll = function () {
            this.collection.each(this.addOne, this);
            return this.setSortable();
        };

        BuilderView.prototype.hideShowNoResponseFields = function () {
            //有效数据的数量
            var fieldsFlag = !!this.collection.length;
            if (fieldsFlag) {
                var models = this.collection.models;
                for (var i = 0, maxLength = models.length; i < maxLength; i++) {
                    if (models[i].get("sfyxSt") !== "UNVALID") {
                        fieldsFlag = true;
                        break;
                    } else {
                        fieldsFlag = false;
                    }
                }
            }
            if (fieldsFlag)
                return this.$responseFields.removeClass("fb-no-response-fields");
            else
                return this.$responseFields.addClass("fb-no-response-fields");
        };

        /**
         * 添加字段
         *
         * @param e
         * @returns
         */
        BuilderView.prototype.addField = function (e) {
            var field_type = $(e.currentTarget).data('field-type'),
                position = this.editView ? this.editView.model.indexInDOM() + 1 : null;

            return this.createField(field_type, {
                position: position
            }, true);
        };

        /**
         * 创建字段
         */
        BuilderView.prototype.createField = function (fieldType, options, isActiveTab) {
            var attrs = {}, rf;
            if (_.isString(fieldType)) {
                this.initDynamicData(fieldType);
                attrs = Formbuilder.helpers.defaultFieldAttrs(fieldType, this, true);
            } else {
                attrs = fieldType;
            }
            rf = this.collection.create(attrs, options);
            this.createAndShowEditView(rf, isActiveTab);

            return this.handleFormUpdate();
        };

        /**
         * 创建并显示编辑字段
         *
         * @param model
         * @param isActiveTab
         *            是否激活tab
         * @param changeType
         *            改变控件
         * @returns {BuilderView}
         */
        BuilderView.prototype.createAndShowEditView = function (model, isActiveTab, changeType) {
            var $newEditEl, $responseFieldEl;
            $responseFieldEl = this.$el.find(".fb-field-wrapper").filter(function () {
                return $(this).data('cid') === model.cid;
            });

            $responseFieldEl.addClass('editing').siblings('.fb-field-wrapper').removeClass('editing');
            this.$responseFormHeader.removeClass('editing');


            if (this.editView) {
                if (this.editView.model.cid === model.cid && !changeType) {
                    this.$el.find(".fb-tabs a[href=\"#edit_field\"]").click();
                    return;
                }
                this.editView.remove();
            }
            this.editView = new EditFieldView({
                model: model,
                parentView: this
            });
            $newEditEl = this.editView.render().$el;
            this.$el.find(".fb-edit-field-wrapper").html($newEditEl);
            if (isActiveTab)
                this.$el.find(".fb-tabs a[href=\"#edit_field\"]").click();
            return this;
        };

        BuilderView.prototype.ensureEditViewScrolled = function () {
            if (!this.editView) {
                return;
            }
            return this.scrollLeftWrapper($(".fb-field-wrapper.editing"));
        };


        /**
         * 滚动至当前
         */
        BuilderView.prototype.scrollLeftWrapper = function ($responseFieldEl) {
// var _this = this;
// this.unlockLeftWrapper();
// if (!$responseFieldEl[0]) {
// return;
// }
// return $.scrollWindowTo((this.$el.offset().top +
// $responseFieldEl.offset().top) - this.$responseFields.offset().top, 200,
// function() {
// return _this.lockLeftWrapper();
// });
        };

        BuilderView.prototype.lockLeftWrapper = function () {
// return this.$fbLeft.data('locked', true);
        };

        BuilderView.prototype.unlockLeftWrapper = function () {
            // return this.$fbLeft.data('locked', false);
        };

        BuilderView.prototype.handleFormUpdate = function () {
            if (this.updatingBatch) {
                return;
            }
            this.formSaved = false;
        };

        /**
         * 保存 表单
         */
        BuilderView.prototype.saveForm = function (e) {
            var payload;
            payload = this.getData(true);
            this.doAjaxSave(e, payload);
            return this.formBuilder.trigger('save', payload);
        };

        BuilderView.prototype.getData = function (isString) {
            this.collection.sort();
            var formProperty = this.formProperty.toJSON();
            this.collection.models = this.collection.models.filter(function (model, index) {
                return model.get("id") || model.get("sfyxSt") !== "UNVALID"
            });
            this.collection.length = this.collection.models.length;
            var data = $.extend(formProperty, {
                fields: this.collection.toJSON()
            });
            if (isString) {
                //转化字符串
                data["extendAttr"] = JSON.stringify(data["extendAttr"]);
                var fields = data["fields"];
                for (var i = 0, maxLength = fields.length; i < maxLength; i++) {
                    var field = fields[i];
                    if (field["fieldOptions"]["options"]) {
                        //设置默认值
                        var defaultValue = [];
                        $.each(field["fieldOptions"]["options"], function (index, option) {
                            option.checked == true && defaultValue.push(option.val);
                        });
                        field["fieldOptions"]["default_value"] = defaultValue.join(",");
                    }
                    field["fieldOptions"] = JSON.stringify(fields[i]["fieldOptions"]);
                    field["sort"] = (i + 1);
                }
                return JSON.stringify(data);
            }
            else
                return data;
        };

        //展示选中的数据库字段
        BuilderView.prototype.showDatabaseView = function (cid) {
            var mode = this.collection.get(cid);
            if (mode) {
                this.createAndShowEditView(mode, true);
                mode.bind('change', this.setTreedataName, this.formDefDesign);
            }
        };
        //设置树节点的名称
        BuilderView.prototype.setTreedataName = function (mode) {
            this.setTreeData(mode.cid, mode.attributes);
        };

        BuilderView.prototype.setBoField = function (bo) {
            // 当前选中的bo
            if (!this.editView)
                return;
            var model = this.editView.model;
            if (!model)
                return;
            // TODO 为进行字段类型的验证，比如日期类型的字段不能放在数字类型
            var isAllowBind = false;
            if (bo.attrType == "field" && !model.get("is_sub")) {// 主表字段
                isAllowBind = true;
            }
            if (isAllowBind) {
                this.bindField(model, bo);
            }
        };


        BuilderView.prototype.bindField = function (model, bo) {
            model.set("name", bo.key);
            model.set("showName", bo.name);
            model.set("label", bo.name);
        };
        /**
         * 检查字段是否有效
         */
        BuilderView.prototype.checkField = function () {
            var k, v, _ref, _ref1, validator, _i, _j, _len, _len1;
            _ref = this.collection;
            if (_ref.length <= 0) {
                layer.msg("请从左侧拖拽或点击添加字段");
                return true;
            }
            var formProperty = this.formProperty.toJSON();
            if (_.isEmpty(formProperty)) {
                layer.msg("请设置表单相关属性");
                this.activeTab("form_property");

            }
            if (_.isEmpty(formProperty.name)) {
                layer.msg("请设置表单标题");
                this.activeTab("form_property");
                return true;
            }
            if (_.isEmpty(formProperty.key)) {
                layer.msg("请设置表单Key");
                this.activeTab("form_property");
                return true;
            }

            for (_i = 0, _len = _ref.models.length; _i < _len; _i++) {
                var model = _ref.models[_i],
                    field = Formbuilder.fields[model.get(FormOptions.t.mappings.FIELD_TYPE)];
                if (model.get("sfyxSt") === "UNVALID" || !model.is_input())
                    continue;
                // 采用默认检查,检查必填验证, 检查重复绑定字段问题
                var validators = [Formbuilder.Validators.RequiredValidator, Formbuilder.Validators.DuplicateValidator];
                if (field.validators)
                    validators = _.union(validators, field.validators);

                for (_j = 0, _len1 = validators.length; _j < _len1; _j++) {
                    validator = validators[_j];
                    if (validator) {
                        var errorKey = validator.validate(model, field[validator.validKey]), msg;
                        if (errorKey) {
                            if ($.type(errorKey) === "string") {
                                msg = Formbuilder.lang.errors[errorKey];
                            } else if ($.isPlainObject(errorKey)) { // 如果是对象
                                msg = Formbuilder.lang.errors[errorKey.key],
                                    args = errorKey.args;
                                if (!$.isArray(args)) // 不是数组类型的
                                    args = [args];
                                $.each(args, function (d, e) {
                                    msg = msg.replace(RegExp("\\{" + d + "\\}", "g"), e);
                                });
                            }
                            if ($.isNotEmpty(msg)) {
                                layer.msg(msg);
                                if ("database" === model.get("fieldType")) {
                                    //数据库字段
                                    $("#boTab").click();
                                    this.formDefDesign.clickTreeNode(model.cid);
                                } else {
                                    this.$el.find("[cid='" + model.cid + "']").addClass("has-error");
                                }
                                return true;
                            }

                        }
                    }
                }
            }
            //code做个性验证，以code做column，可能将以前的删除，现在添加一个相同的column，需要提醒，防止后台生成错误
            if (this.formProperty.get("tableName")) {
                //生成了table表示已经发布，验证新增的数据是否和以前的重复
                for (_i = 0, _len = _ref.models.length; _i < _len; _i++) {
                    var model = _ref.models[_i], code = model.get("code");
                    //新增的有效数据
                    if (!model.get("id") && model.get("sfyxSt") !== "UNVALID") {
                        for (var j = 0; j < _len; j++) {
                            //值可能不对等，大小写
                            if (_i !== j && _ref.models[j].get("columnName") && _ref.models[j].get("columnName").toUpperCase() === code.toUpperCase()) {
                                layer.msg("code不允许重复");
                                this.$el.find("[cid='" + model.cid + "']").addClass("has-error");
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };

        /**
         * 保存数据
         *
         * @param payload
         * @returns
         */
        BuilderView.prototype.doAjaxSave = function (e, payload) {
            var b = this.checkField();
            if (b) return;
            var _this = this;
            //判断数据是否有变化
            var formProperty = this.formProperty.toJSON();
            //是否存在版本号
            var hasFbVersion = false;
            // if (formProperty.version) {
            // //判断数据是否进过比较大的变化，变化之后需要调整使用的表单等等
            // var models = this.collection.models;
            // for (var i = 0, maxLength = models.length; i < maxLength; i++) {
            //     var model = models[i];
            //     if ((model.get("id") && model.get("changeFlg")) || (!model.get("id") && model.get("sfyxSt") === "VALID")) {
            //         hasFbVersion = true;
            //         break;
            //     }
            // }
            // }
            // if (formProperty.version) {
            //     layer.confirm("已经发布，是否确认修改？", function () {
            //         saveForm(true);
            //     })
            // } else {
            saveForm(false);

            // }

            function saveForm(flg) {
                $.ajax({
                    url: "/form/saveFormDef",
                    type: "post",
                    data: {
                        formDef: payload,
                        fbFlg: flg
                    },
                    success: function (ar) {
                        if (ar.success) {
                            _this.formPreview = true;
                            if (RX.page.param.rwdid) {
                                saveRwdFormid(RX.page.param.rwdid, ar.data);
                            }
                            RX.page.back();
                            RX.msg("保存成功");
                        } else {
                            RX.alert(ar.msg);
                        }
                    },
                    error: function () {

                    }
                });
            }
        };

        /**
         * 采集任务配置动态表单 保存方法
         */
        function saveRwdFormid(rwdid, formid) {
            $.ajax({
                url: "/rwd/saveRwdFormid",
                type: "post",
                data: {
                    rwdid: rwdid,
                    formid: formid
                },
                success: function (ar) {
                    if (ar.success) {
                    } else {
                        RX.alert("保存表单定义数据失败");
                    }
                }
            });
        }

        /**
         * 预览表单
         */
        BuilderView

            .prototype.previewForm = function (e) {
            var data = this.getData(false),
                _this = this;
            this.formPreview = true;
            RX.page.open({
                url: "/form/previewDef",
                param: {
                    data: data
                },
                callBacks: {
                    success: function () {
                        _this.formPreview = false;
                    }
                },
                title: false
            });
        };
        BuilderView.prototype.closeDialog = function (e) {
            if (!this.formSaved) {
                var _this = this;
                layer.confirm(Formbuilder.lang.dict.UNSAVED_CHANGES, function (index) {
                    _this.formSaved = true;
                    RX.page.back();
                    layer.close(index);
                });
            } else {
                RX.page.back();
            }

        };

        return BuilderView;

    })(Backbone.View);

    Formbuilder = (function () {
        Formbuilder.helpers = {
            //字段默认值
            defaultFieldAttrs: function (field_type, $this, createFlag) {
                var attrs, _base;
                attrs = {};
                attrs[FormOptions.t.mappings.LABEL] = Formbuilder.lang.field_type[field_type];
                attrs[FormOptions.t.mappings.FIELD_TYPE] = field_type;
                attrs["sfyxSt"] = "VALID";
                if (!Formbuilder.nonInputFields[field_type]) {
                    attrs[FormOptions.t.mappings.FIELD_OPTIONS] = {};
                    attrs[FormOptions.t.mappings.REQUIRED] = false;
                    attrs[FormOptions.t.mappings.SHOWTABLE] = false;
                    attrs[FormOptions.t.mappings.SHOWSEARCH] = false;
                    attrs[FormOptions.t.mappings.DEFAULT_VALUE_TYPE] = 'fixed';
                    attrs[FormOptions.t.mappings.PLACEHOLDER] = '请输入';
                    if ($this && $this.formProperty) {
                        //获取form配置的GRIDS_TO_OCCUPY
                        if ($this.formProperty.get(FormOptions.t.propertys.GRIDS_TO_OCCUPY)) {
                            attrs[FormOptions.t.mappings.GRIDS_TO_OCCUPY] = $this.formProperty.get(FormOptions.t.propertys.GRIDS_TO_OCCUPY);
                        }
                    }
                }
                //默认最大长度为100
                attrs[FormOptions.t.mappings.MAXLENGTH] = 100;
                //新建
                if (createFlag) {
                    var models = $this.collection.models, label = attrs[FormOptions.t.mappings.LABEL];
                    //判断名称存不存在重复，重复自动添加数字尾缀
                    attrs[FormOptions.t.mappings.LABEL] = this.getDifferValue(models, label, "label");
                    //转化code
                    attrs[FormOptions.t.mappings.CODE] = this.getDifferValue(models, getEnglish(label), "code");
                }
                return (typeof (_base = Formbuilder.fields[field_type]).defaultAttributes === "function" ? _base.defaultAttributes(attrs) : void 0) || attrs;
            },
            /**
             *
             * 可能原本就是以数字结尾的
             * @param models
             * @param val
             * @param type
             */
            getDifferValue: function (models, val, type) {
                //需要去除val的数字后缀
                var rexArr = val.split(/(\d*$)/), res, maxNum = 0, numFlg = false;
                if (rexArr.length === 3) {
                    //后缀有数字
                    maxNum = parseInt(rexArr[1]);
                    numFlg = true;
                }
                res = rexArr[0];
                var model;
                for (var i = 0, maxLength = models.length; i < maxLength; i++) {
                    model = models[i];
                    if (model.get("id") || (model.get("sfyxSt") !== "UNVALID")) {
                        var arr = model.get(type).split(/(\d*$)/);
                        if (arr[0] === res) {
                            numFlg = true;
                            if (parseInt(arr[1]) > maxNum) {
                                maxNum = parseInt(arr[1]);
                            }
                        }
                    }
                }
                if (numFlg) {
                    maxNum++;
                }
                return maxNum ? res + maxNum : res;
            },
            simple_format: function (x) {
                // 把\n 替换成br
                return x != null ? x.replace(/\n/g, '<br />') : void 0;
            }
        };

        Formbuilder.fields = {};

        // 字段分组
        Formbuilder.groupFields = {};

        Formbuilder.inputFields = {};

        Formbuilder.nonInputFields = {};

        Formbuilder.isTemplate = false;

        Formbuilder.Validators = {};
        //bo的值
        Formbuilder.boDef = {};

        Formbuilder.registerField = function (name, opts) {
            var x, _i, _len, _ref5;
            _ref5 = ['view', 'edit'];
            for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
                x = _ref5[_i];
                opts[x] = _.template(opts[x]);
            }
            opts.field_type = name;
            Formbuilder.fields[name] = opts;
            if (!opts.group || opts.group === Formbuilder.options.group.DEFAULT_KEY)// 默认分组
                opts.group = Formbuilder.options.group.DEFAULT_KEY;

            if (!Formbuilder.groupFields[opts.group])
                Formbuilder.groupFields[opts.group] = [];
            Formbuilder.groupFields[opts.group].push(opts);

            return Formbuilder.inputFields[name] = opts;
        };

        function Formbuilder(opts) {
            var args;
            if (opts == null) {
                opts = {};
            }
            Formbuilder.isTemplate = opts.isTemplate ? true : false;

            _.extend(this, Backbone.Events);
            args = _.extend(opts, {
                formBuilder: this
            });

            this.mainView = new BuilderView(args);
        }

        return Formbuilder;

    })();

    window.Formbuilder = Formbuilder;
}).call(this);


(function () {
    Formbuilder.options = {
        BUTTON_CLASS: 'fb-button',
        HTTP_METHOD: 'POST',
        AUTOSAVE: true,
        CLEAR_FIELD_CONFIRM: false,
        group: {
            DEFAULT_KEY: "common"
        }
    };
}).call(this);


/** *******************************国际化*********************************************** */
(function () {
    Formbuilder.lang = {
        group: {
            common: '通用字段',
            advanced: '增强字段'
        },
        field_type: {
            text: "单行文本",
            textarea: '多行文本',
            number: '数字',
            radio: '单项选择',
            checkbox: '多项选择',
            select: '下拉框',
            datePicker: '日期控件',
            attachment: '上传附件',
            selector: '选择器',
            database: '数据库字段'
        },
        groupTip: {
            common: '基础字段提供最基本的表单功能。',
            advanced: '增强字段可以扩展增强表单字段。'
        },
        selector_type: {
            user: '用户',
            org: '组织'
        },
        dict: {
            untitled: '未命名',
            ALL_CHANGES_SAVED: '已经保存',
            SAVE_FORM: '保存表单',
            UNSAVED_CHANGES: '您的表单有些修改尚未保存,是否确定离开？'
        },
        buttons: {
            "add": "添加",
            "remove": "删除",
            "edit": "编辑",
            "import": "导入",
            "export": "导出",
            "custom": "自定义"
        },
        file_types: {
            "images": "图片类",
            "docs": "文档类",
            "videos": "视频类",
            "audios": "音频类",
            "compress": "压缩包"
        },
        date_formats: {
            "date": "日期",
            "datetime": "日期时间",
            "time": "时间",
            'custom': '自定义'
        },
        default_value_type: {
            fixed: '固定值'
            // ,
            // dynamic: '动态脚本',
            // linkage: '数据联动',
            // formula: '公式编辑'
        },
        data_format: {
            'phone': '手机号',
            'telephone': '电话号码',
            'isTel': '联系电话',
            'zip': '邮件编码',
            'idcard': '身份证',
            'email': '邮箱',
            'isUrl': 'URL链接'
        },
        errors: {
            label: '字段标题必填',
            name: '字段未绑定对象',
            code: 'code必填',
            duplicate_code: 'code不能重复',
            duplicate_name: '字段【{0},{1}】重复绑定对象',
            duplicate_label: '字段标题不能重复',
            'fieldOptions.options': '请选择选项模板',
            'fieldOptions.identity': '请选择流水号',
            'fieldOptions.dialog': '请选择自定义对话框',
            'fieldOptions.bind': '请设置绑定url'

        }
    };
}).call(this);


// ==================表单验证==============
(function () {
    // 必填验证
    Formbuilder.Validators.RequiredValidator = {
        validate: function (model, validKey) {
            var defValidKey = Formbuilder.isTemplate ? ["label"] : ["label", "code"];
            if (!validKey) {
                validKey = defValidKey;
            } else {
                validKey = _.union(defValidKey, validKey);
            }

            for (var _i = 0, _len = validKey.length; _i < _len; _i++) {
                var val = model.get(validKey[_i]);
                if ($.isEmpty(val)) {
                    return validKey[_i];
                }
            }
            return;
        },
        validKey: 'required'
    };
    //条件必填验证
    Formbuilder.Validators.requiredConditionsValidator = {
        validate: function (model, validKey) {
            if (!validKey)
                return;
            for (var _i = 0, _len = validKey.length; _i < _len; _i++) {
                var valid = validKey[_i],
                    fieldVal = model.get(valid["field"]);
                conditions = valid["condition"](fieldVal);//需要必填的字段
                if ($.isEmpty(conditions))
                    return;
                for (var _j = 0, _len1 = conditions.length; _j < _len1; _j++) {
                    var val = model.get(conditions[_j]);
                    if ($.isEmpty(val)) {
                        return conditions[_j];
                    }
                }
            }
        },
        validKey: 'conditionsRequired'
    };

    // 重复字段验证
    Formbuilder.Validators.DuplicateValidator = {
        validate: function (model, validKey) {
            if (Formbuilder.isTemplate)
                return;
            if (!validKey)
                validKey = ["code", "label"];
            var models = model.collection.models;
            if (models.length == 0)
                return;
            for (var _i = 0, _len = validKey.length; _i < _len; _i++) {
                var key = validKey[_i], val = model.get(key);
                var f = _.find(models, function (m) {
                    return m.is_input() && m.cid != model.cid && m.get(key) == val;
                })
                if (f) {
                    return {
                        key: "duplicate_" + key,
                        args: [model.get('label'), f.get('label')]
                    };
                }
            }
            return;
        },
        validKey: 'duplicateValid'
    };


}).call(this);

/** *****************************TODO 注册字段************************************* */
/**
 * 注册字段 说明：
 * <p>
 * alias【必需】： 注册字段别名，唯一的区别字段类型。
 * </p>
 * <p>
 * order 【必需】：组内序号，根据分组进行排序。
 * </p>
 * <p>
 * group【可选】 : 分组 ，如果不填默认是common
 * </p>
 * <p>
 * view 【必需】： 预览字段 html，就是【表单编辑区域】的展示的模版。
 * </p>
 * <p>
 * edit【必需】： 编辑字段 html ，就是表单【编辑字段】配置的模版
 * </p>
 * <p>
 * addButton【必需】：添加字段按钮，就是【添加字段配】置的模版
 * </p>
 * <p>
 * defaultAttributes 【必需】： 默认值 null，返回是function， 是初始的默认值
 * </p>
 *
 */

/**
 * 单行文本
 */
(function () {
    var alias = 'text';
    Formbuilder.registerField(alias, {
        order: 1,// 组内序号
        view: "<input type='text'  name='<%= rf.get(FormOptions.t.mappings.NAME) %>' readonly='readonly'/>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,desc:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_validations']({rf:rf,required:true,maxlength:true,dataformat:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
        " <%= Formbuilder.templates['edit/layout_settings']({rf:rf,occupy:true}) %>\n" +
        " <%= Formbuilder.templates['edit/other_settings']({rf:rf,hide:true,showTable:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-font'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            return attrs;
        }
    });

}).call(this);

/**
 * 多行文本
 */
(function () {
    var alias = 'textarea';
    Formbuilder.registerField(alias, {
        order: 2,// 组内序号
        view: "<textarea  readonly='readonly' ></textarea>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,desc:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_validations']({rf:rf,required:true,maxlength:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
        "<%= Formbuilder.templates['edit/layout_settings']({rf:rf,height:true}) %>\n" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,hide:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-list'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            //默认是占一行
            attrs[FormOptions.t.mappings.GRIDS_TO_OCCUPY] = "";
            attrs[FormOptions.t.mappings.MAXLENGTH] = 500;
            return attrs;
        }
    });
}).call(this);

/**
 * 数字
 */
(function () {
    var alias = 'number';
    Formbuilder.registerField(alias, {
        order: 3,// 组内序号
        view: " <div class='input-icon'>" +
        "<i class='fa fa-number'></i>" +
        "<input type='text' class='form-control'   name='<%= rf.get(FormOptions.t.mappings.NAME) %>' readonly='readonly'>" +
        " </div>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,units:true,desc:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_validations']({required:true,min:true,max:true,decimal:true,integer:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
        "<%= Formbuilder.templates['edit/layout_settings']({rf:rf,occupy:true,width:true}) %>\n" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,hide:true,showTable:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-number'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            return attrs;
        }
    });
}).call(this);


/**
 * 单项选择
 */
(function () {
    var alias = 'radio';
    Formbuilder.registerField(alias, {
        order: 4,
        view: "<% var options1 =  rf.get(FormOptions.t.mappings.OPTIONS) || [] %>" +
        "<div class='choices'><% for (i=0,maxLength=options1.length;i<maxLength;i++) { %>\n " +
        "	<label class='<% if ( rf.get(FormOptions.t.mappings.ARRANGEMENT) ==\"vertical\") {%> <% } else { %> radio-inline<% } %>'>\n  " +
        "	<input type='radio'  <%= rf.get(FormOptions.t.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n    " +
        "  		<%= rf.get(FormOptions.t.mappings.OPTIONS)[i].label %>\n " +
        "   </label>\n" +
        "	<% if ( rf.get(FormOptions.t.mappings.OPTIONS)[i].include_other_option) { %>\n  " +
        "   <input class=\"other-choice-input\" type='text'  readonly />\n " +
        " 		<% } %>\n" +
        "<% } %>\n\n" +
        "</div>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,desc:true}) %>\n" +
        "<%= Formbuilder.templates['edit/options']({rf:rf, includeOther: true}) %>\n" +
        "<%= Formbuilder.templates['edit/field_validations']({required:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
        "<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,arrangement:true,occupy:true,width:true,align:'left',mobile:true}) %>\n" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true,showTable:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-circle-o'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            attrs[FormOptions.t.mappings.DATASOURCE] = 'fixed';
            attrs[FormOptions.t.mappings.OPTIONS] = [];
            return attrs;
        },
        required: [FormOptions.t.mappings.OPTIONS],
        validators: [Formbuilder.Validators.RequiredValidator]
    });

}).call(this);

/**
 * 多项选择
 */
(function () {
    var alias = 'checkbox';
    Formbuilder.registerField(alias, {
        order: 5,
        view: "<% var options1 =  rf.get(FormOptions.t.mappings.OPTIONS) || [] %>" +
        "<div class='choices'>" +
        "<% for(var i=0,maxLength=options1.length;i<maxLength;i++){ %>" +
        "	<label i='<%=(rf.get(FormOptions.t.mappings.OPTIONS) || []).hasOwnProperty(i)%>' class='<% if ( rf.get(FormOptions.t.mappings.ARRANGEMENT) ==\"vertical\") {%> <% } else { %> checkbox-inline<% } %>'>\n  " +
        "		<input type='checkbox'  <%= rf.get(FormOptions.t.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n    " +
        "  		<%= rf.get(FormOptions.t.mappings.OPTIONS)[i].label %>\n " +
        "   </label>\n" +
        "	<% if ( rf.get(FormOptions.t.mappings.OPTIONS)[i].include_other_option) { %>\n  " +
        "   <input class=\"other-choice-input\" type='text'  readonly />\n " +
        " 		<% } %>\n" +
        "<% } %>\n\n" +
        "</div>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,desc:true}) %>\n" +
        "<%= Formbuilder.templates['edit/options']({rf:rf, includeOther: true}) %>\n" +
        "<%= Formbuilder.templates['edit/field_validations']({required:true,minmum:true,maxmum:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
        "<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,arrangement:true,occupy:true,width:true,align:'left',mobile:true}) %>\n" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true,showTable:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-check-square'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            attrs[FormOptions.t.mappings.DATASOURCE] = 'fixed';
            attrs[FormOptions.t.mappings.OPTIONS] = [];
            return attrs;
        },
        required: [FormOptions.t.mappings.OPTIONS],
        validators: [Formbuilder.Validators.RequiredValidator]
    });

}).call(this);

/**
 * 下拉框
 */
(function () {
    var alias = 'select';
    Formbuilder.registerField(alias, {
        order: 6,
        view: "<select  readonly='readonly' >\n  <% if (rf.get(FormOptions.t.mappings.INCLUDE_BLANK)) { %>\n " +
        "   <option value=''>" +
        "<% if ( rf.get(FormOptions.t.mappings.INCLUDE_BLANK_VALUE) ) {%> <%= rf.get(FormOptions.t.mappings.INCLUDE_BLANK_VALUE) %><% } else { %> 请选择<% } %>" +
        "</option>\n  <% } %>\n\n " +
        "<% var options1 =  rf.get(FormOptions.t.mappings.OPTIONS) || [] %>" +
        " <% for (i=0,maxLength=options1.length;i<maxLength;i++) { %>\n" +
        "    <option <% if ( options1[i].checked) { %>selected<% } %>>\n  " +
        "    <%= options1[i].label %>\n    </option>\n  <% } %>\n" +
        "</select>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,desc:true}) %>\n" +
        "<%= Formbuilder.templates['edit/options']({ rf:rf,includeBlank:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_validations']({required:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
        "<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>\n" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true,showTable:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-caret-square-o-down'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            attrs[FormOptions.t.mappings.DATASOURCE] = 'fixed';
            attrs[FormOptions.t.mappings.OPTIONS] = [];
            attrs[FormOptions.t.mappings.INCLUDE_BLANK] = true;
            return attrs;
        },
        required: [FormOptions.t.mappings.OPTIONS],
        validators: [Formbuilder.Validators.RequiredValidator]
    });

}).call(this);

/**
 * 日期控件
 */
(function () {
    var alias = 'datePicker';
    Formbuilder.registerField(alias, {
        order: 7,// 组内序号
        view: " <div class='input-icon'>" +
        "<i class='fa fa-calendar'></i>" +
        "<input type='text' class='form-control' name='<%= rf.get(FormOptions.t.mappings.NAME) %>'   readonly='readonly'>" +
        " </div>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,datefmt:true,placeholder:true,desc:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_validations']({rf:rf,required:true,startdate:true,enddate:true}) %>\n" +
        " <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
        "<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true,showTable:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-calendar'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            attrs[FormOptions.t.mappings.PLACEHOLDER] = '请选择';
            attrs[FormOptions.t.mappings.DATEFMT_TYPE] = 'date';
            attrs[FormOptions.t.mappings.DATEFMT] = 'yyyy-MM-dd';
            //目前只可以选择天数
            attrs[FormOptions.t.mappings.START_DATE_INTERVAL] = 'd';
            attrs[FormOptions.t.mappings.END_DATE_INTERVAL] = 'd';
            return attrs;
        }
    });
}).call(this);

/**
 * 上传附件
 */
(function () {
    var alias = 'attachment';
    Formbuilder.registerField(alias, {
        order: 8,// 组内序号
        group: 'advanced',
        view: "<div class='attachment-field'><div>" +
        "<div class='attachment-select-trigger'> " +
        " <label> " +
        " <div class='plus'>+</div> " +
        "<div class='select-text'> " +
        "<% if ( rf.get(FormOptions.t.mappings.PLACEHOLDER) ) {%> <%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %><% } else { %> 请选择上传文件<% } %>" +
        "</div> " +
        "</label> " +
        " </div> " +
        "</div></div>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,placeholder:true,desc:true}) %>\n" +
        " <%= Formbuilder.templates['edit/attachment']({rf:rf}) %>" +
        "<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left'}) %>" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-paperclip'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            attrs[FormOptions.t.mappings.PLACEHOLDER] = '添加附件';
            attrs[FormOptions.t.mappings.MAX_FILE_QUANTITY] = '-1';
            attrs[FormOptions.t.mappings.MIN_FILE_QUANTITY] = '-1';
            return attrs;
        }
    });
}).call(this);

/**
 * 选择器
 */
(function () {
    var alias = 'selector';
    Formbuilder.registerField(alias, {
        order: 9,// 组内序号
        group: 'advanced',
        view: "<div class='selector-list'>" +
        "<label><div class='plus'>+</div><div class='selector-empty'> " +
        "<% if ( rf.get(FormOptions.t.mappings.PLACEHOLDER) ) {%> <%= rf.get(FormOptions.t.mappings.PLACEHOLDER) %><% } else { %> 请选择<%=(Formbuilder.lang.selector_type[rf.get(FormOptions.t.mappings.SELECTOR_TYPE)])%><% } %>" +
        "</div></label></div>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,placeholder:true,desc:true}) %>\n" +
        " <%= Formbuilder.templates['edit/selector']({rf:rf}) %>\n" +
        " <%= Formbuilder.templates['edit/field_validations']({required:true}) %>" +
        " <%= Formbuilder.templates['edit/field_rights']({rf:rf,hide:true,read:true}) %>\n" +
        "<%= Formbuilder.templates['edit/layout_settings']({rf:rf,table:table,occupy:true,width:true,align:'left',mobile:true}) %>" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true,showTable:true}) %>",
        addButton: "<span class='symbol'><span class='fa fa-search'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            attrs[FormOptions.t.mappings.PLACEHOLDER] = null;
            attrs[FormOptions.t.mappings.SELECTOR_TYPE] = 'user';
            attrs[FormOptions.t.mappings.STORE] = 'json';
            attrs[FormOptions.t.mappings.IS_SINGLE] = true;
            attrs[FormOptions.t.mappings.IS_SINGLE] = true;
            return attrs;
        }
    });
}).call(this);

/**
 * 数据库字段
 */
(function () {
    var alias = 'database';
    Formbuilder.registerField(alias, {
        order: 10,// 组内序号
        group: 'advanced',
        view: "<input type='text'  name='<%= rf.get(FormOptions.t.mappings.NAME) %>' readonly='readonly'/>",
        edit: " <%= Formbuilder.templates['edit/common']({rf:rf,defval:true,desc:true}) %>\n" +
        "<%= Formbuilder.templates['edit/database']({rf:rf}) %>" +
        "<%= Formbuilder.templates['edit/other_settings']({rf:rf,table:table,hide:true,showTable:true}) %>",
        // addButton: "<span class='symbol'><span class='fa fa-eye-slash'></span> " + Formbuilder.lang.field_type[alias] + "</span>",
        defaultAttributes: function (attrs) {// 默认值
            attrs[FormOptions.t.mappings.HIDE_RIGHTS] = true;
            //字段类型
            attrs["fieldOptions.database_type"] = "VARCHAR2(50)";
            return attrs;
        }
    });
}).call(this);

/** ***************************TODO 模版***************************** */
this["Formbuilder"] = this["Formbuilder"] || {};
this["Formbuilder"]["templates"] = this["Formbuilder"]["templates"] || {};

// ----------------------------------------------编辑模版---------------------------------------------------------
/**
 * 编辑-基础模版
 */
this["Formbuilder"]["templates"]["edit/base"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        // 个性化设置
        __p += ((__t = (Formbuilder.fields[rf.get(FormOptions.t.mappings.FIELD_TYPE)].edit({
                rf: rf,
                table: table
            }))) == null ? '' : __t) +
            '\n';
    }
    return __p
};

/**
 * 编辑-不用编辑属性的模版
 */
this["Formbuilder"]["templates"]["edit/base_non_input"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        if (rf.get(FormOptions.t.mappings.FIELD_TYPE)) {
            __p += ((__t = (Formbuilder.fields[rf.get(FormOptions.t.mappings.FIELD_TYPE)].edit({rf: rf}))) == null ? '' : __t);
        }

        __p += '\n';
    }
    return __p
};


/**
 * 通用模版
 */
this["Formbuilder"]["templates"]["edit/common"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __type = 'text', ishide = true, defValueLabel = '';
    with (obj) {
        __type = rf.get(FormOptions.t.mappings.FIELD_TYPE);
        __p += '<div class="setting-panel panel">' +
            '<div class="panel-heading" ><span  data-toggle="collapse" data-target="#editCommon">' + Formbuilder.lang.field_type[__type] + '</span>';

        //更换控件，已经保存的不允许修改
        if (!rf.get("id") && rf.get("fieldType") !== "database" && rf.get("fieldOptions.canchange") !== false) {
            __p += '<div class="dropdown pull-right">';
            __p += '<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" data-target="#" aria-expanded="false" title="更换控件" >' +
                '<i class=" fa fa-sliders"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
                '</a>';
            __p += '<ul class="dropdown-menu">';
            _.each(_.sortBy(Formbuilder.inputFields, 'order'), function (g, i) {
                if (g.field_type == __type || g.field_type === 'database')
                    return true;
                __p += '<li>' +
                    '<a  data-role="change_field_type" data-fieldtype="' + g.field_type + '" href="javascript:void(0)" >' +
                    g.addButton +
                    '</a></li>';
            });

            __p += '</ul></div>';
        }
        __p += '</div>' +
            '</div>\n';
        __p += '<div class="panel-body collapse in" id="editCommon">' +
            '<div class="panel-body-content">';

        __p += '<div class="form-group">' +
            '<label>标题<i class="fa fa-help" data-tip data-title="关于字段标题" data-text="此属性用于告诉填写者应该在该字段中输入什么样的内容。通常是一两个简短的词语，也可以是一个问题。" ></i></label>' +
            '<input type="text"  maxlength="32" id="label" ' + ((rf.get("fieldOptions.canchange") === false) ? 'disabled="disabled"' : '') + ' data-rv-input="model.' +
            ((__t = (FormOptions.t.mappings.LABEL)) == null ? '' : __t) + '"/>' +
            '</div>\n';
        __p += '<div class="form-group">' +
            '<label>code<i class="fa fa-help" data-tip data-title="关于字段code" data-text="此字段的唯一标识。" ></i></label>' +
            '<input type="text" id="code" maxlength="27"  ' + (($.isNotEmpty(rf.get("columnName")) || rf.get("fieldOptions.canchange") === false) ? 'disabled="disabled"' : '') + 'data-rv-input="model.' +
            ((__t = (FormOptions.t.mappings.CODE)) == null ? '' : __t) + '"/>' +
            '</div>\n';
        //日期格式
        if (typeof datefmt !== 'undefined') {
            ;
            __p += '<div class="form-group">' +
                '<label for="field_datefmt">日期格式<i class="fa fa-help" data-tip data-title="关于日期格式"' +
                'data-text="此属性用于指定该字段填写的日期格式，有默认格式，也可以自定义格式，格式参考：' +
                '</br> 格式代码     |     说明					|	返回值例子</br>' +
                '   yyyy	四位数字的年份	如：2014 或 2000</br>' +
                '	yy	    两位数字的年份	如：14 或 98</br>' +
                '	MM	月份，有前导零			01到12</br>' +
                '	M		月份，没有前导零			1到12</br>' +
                '	dd	天数，有前导零	01到31</br>' +
                '	d	    天数,没有前导零	1到31</br>' +
                '	HH	小时,24小时制，有前导零	00到23</br>' +
                '	H	    小时,24小时制，无前导零	0到23</br>' +
                '	mm	分钟,有前导零	00到59</br>' +
                '	m 	分钟,没有前导零	0到59</br>' +
                '	ss	   秒,有前导零	01到59</br>' +
                '	s	   秒,没有前导零	1到59"></i></label>' +
                '<select class="js-datefmt-type" data-rv-value="model.' +
                ((__t = (FormOptions.t.mappings.DATEFMT_TYPE)) == null ? '' : __t) + '" >';

            _.each(Formbuilder.lang.date_formats, function (g, i) {
                __p += '<option value="' + i + '">' + Formbuilder.lang.date_formats[i] + '</option>';
            });

            __p += '</select>';
            __p += '<input type="text"   class="js-datefmt  mt-5 ';

            if (rf.get(FormOptions.t.mappings.DATEFMT_TYPE) != 'custom')
                __p += 'hidden';

            __p += '" placeholder="自定义日期格式"  data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.DATEFMT)) == null ? '' : __t) + '" />' +

                '</div>\n';
        }
        //默认值
        if (typeof defval !== 'undefined') {
            var bothHide = false;
            __p += '<div class="form-group">' +
                '<label>默认值<i class="fa fa-help" data-tip data-title="关于默认值" data-text="设置后，此值将作为默认值显示在该字段的初始化值。如果不需要设置默认值，请将此处留空。<br/>默认值类型支持固定值等。" ></i></label>' +
                '<select class="js-default-value-type" data-rv-value="model.' +
                ((__t = (FormOptions.t.mappings.DEFAULT_VALUE_TYPE)) == null ? '' : __t) + '" >';
            if (__type == 'datePicker') {
                __p += '<option value="today">填写当天</option>';
            }
            _.each(FormOptions.t.DEFAULT_VALUE_TYPE, function (g, i) {
                __p += '<option value="' + g + '">' + Formbuilder.lang.default_value_type[g] + '</option>';
            });
            __p += '</select>';

            if ((_.isEmpty(rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE)) || (rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) == 'fixed') && __type != 'selector'))
                ishide = false;

            if ((_.isEmpty(rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE))) ||
                ((rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) == 'today') && __type == 'datePicker') ||
                ((rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) == 'fixed') && (__type == 'radio' || __type == 'checkbox' || __type == 'select' || __type == 'attachment')))
                bothHide = true;

            __p += '<textarea class="js-default-value mt-5" type="text" style="' + (bothHide ? ('display:none;') : (ishide ? 'display:none;' : '')) + '"    data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.DEFAULT_VALUE)) == null ? '' : __t) + '" ></textarea>';
            __p += '<a class="btn btn-sm btn-block btn-info js-default-value-btn mt-5"  style="' + (bothHide ? ('display:none;') : (ishide ? '' : 'display:none;')) + '" >' +
                Formbuilder.lang.default_value_type[rf.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE)] + '</a>';

            __p += '</div>\n';
        }
        //单位
        if (typeof units !== 'undefined') {
            __p += '<div class="form-group">' +
                '<label>单位<i class="fa fa-help" data-tip data-title="关于单位" data-text="此属性用于指定对该字段单位描述，比如货币：元，百分比：%等。" ></i></label>' +
                '<input type="text" id="label" data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.UNITS)) == null ? '' : __t) + '"/>' +
                '</div>\n';
        }
        __p += '</div>' +
            '</div>';
    }
    return __p
};

/**
 * 附件设置
 */
this["Formbuilder"]["templates"]["edit/attachment"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join, _i, _len;

    function print() {
        __p += __j.call(arguments, '')
    }

    with (obj) {
        __p += '<div class="setting-panel panel">' +
            '<div class="panel-heading">附件设置</div>\n' +
            '<div class="panel-body collapse in"><div class="panel-body-content">';
        __p += '<div class="form-group">' +
            '<label>最小上传文件数量<i class="fa fa-help" data-tip data-title="关于最大上传文件数量" data-text="此属性用于限制填写者最小上传文件数量。" ></i></label>' +
            '<select data-rv-value="model.' +
            ((__t = (FormOptions.t.mappings.MIN_FILE_QUANTITY)) == null ? '' : __t) + '" >' +
            '<option value="-1">不限制</option>';
        for (_i = 1, _len = 10; _i < _len; _i++) {
            __p += '<option value="' + _i + '">' + _i + '</option>';
        }
        __p += '</select>' +
            '</div>\n';

        __p += '<div class="form-group">' +
            '<label>最大上传文件数量<i class="fa fa-help" data-tip data-title="关于最大上传文件数量" data-text="此属性用于限制填写者最大上传文件数量。" ></i></label>' +
            '<select data-rv-value="model.' +
            ((__t = (FormOptions.t.mappings.MAX_FILE_QUANTITY)) == null ? '' : __t) + '" >' +
            '<option value="-1">不限制</option>';
        for (_i = 1, _len = 10; _i < _len; _i++) {
            __p += '<option value="' + _i + '">' + _i + '</option>';
        }
        __p += '</select>' +
            '</div>\n';

        __p += '<div class="form-group">' +
            '<label>单个文件大小(M)<i class="fa fa-help" data-tip data-title="关于单个文件大小" data-text="此属性用于限制填写者单个文件大小，单位为M。可根据需要收集的文件类型做选择，例如1张照片大约3MB，1首3分钟mp3音频大约5MB。" ></i></label>' +
            '<input type="text" data-rv-input="model.' +
            ((__t = (FormOptions.t.mappings.MAX_FILE_SIZE)) == null ? '' : __t) + '" />' +
            '</div>\n';


        __p += '<div class="form-group">' +
            '<label>文件上传类型<i class="fa fa-help" data-tip data-title="关于文件类型" data-text="此属性用于限制填写者文件上传类型.' +
            '<br/>文档类：txt、pdf、doc、docx、xls、xlsx、ppt、pptx、wps、htm、html、rtf、hlp。' +
            '<br/>图片类：jpg、jpeg、png、gif、bmp、psd、tif。' +
            '<br/>视频类：mkv、mp4、avi、swf、wmv、rmvb、mov、mpg。' +
            '<br/>音频类：mp3、flac、ape、wma、wav、aac、m4a、au、ram、mmf、aif。' +
            '<br/>压缩包：rar、zip、7z、gz、arj、z。' +
            '<br/>如以上格式限制不满足需求，建议选择[自定义]文件上传类型。<br/>[自定义]的文件扩展名，多个请用逗号隔开，如: txt, pdf, mp3等。' +
            '" ></i></label>' +
            '<select  class="js-media-type" data-rv-value="model.' +
            ((__t = (FormOptions.t.mappings.MEDIA_TYPE)) == null ? '' : __t) + '" >' +
            '<option value="">不限制</option>';
        _.each(FormOptions.t.FILE_TYPES, function (g, i) {
            __p += '<option value="' + i + '">' + Formbuilder.lang.file_types[i] + '</option>';
        });
        __p += '<option value="custom">自定义</option>' +
            '</select>';

        __p += '<textarea  type="text"  class="js-media mt-5 ';
        if (rf.get(FormOptions.t.mappings.MEDIA_TYPE) != 'custom')
            __p += 'hidden';

        __p += '"  data-rv-input="model.' +
            ((__t = (FormOptions.t.mappings.MEDIA)) == null ? '' : __t) + '" ></textarea>' +

            '</div>\n';
        __p += '</div>' +
            '</div> ' +
            '</div> ';
    }
    return __p
};

/**
 * 选择器选项
 */
this["Formbuilder"]["templates"]["edit/selector"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

    function print() {
        __p += __j.call(arguments, '')
    }

    with (obj) {
        __p += '<div class="setting-panel panel">' +
            '<div class="panel-heading">选择器选项</div>\n' +
            '<div class="panel-body collapse in"><div class="panel-body-content">';
        __p += '<div class="form-group">' +
            '<label >选择器类型<i class="fa fa-help" data-tip data-title="关于选择器类型" data-text="此属性用于选择器类型。目前支持用户、组织、岗位、角色选择器。" ></i></label>' +
            '<select data-rv-value="model.' +
            ((__t = (FormOptions.t.mappings.SELECTOR_TYPE)) == null ? '' : __t) + '" >';

        _.each(Formbuilder.lang.selector_type, function (g, i) {
            __p += '<option value="' + i + '">' + g + '</option>';
        });
        __p += '</select>' + '</div>\n';

        __p += '<div class="form-group">' +
            '<label>是否单选<i class="fa fa-help" data-tip data-title="关于是否单选" data-text="此属性用于选择器只能选择一个还是多个值。" ></i></label>' +
            '<select data-rv-value="model.' +
            ((__t = (FormOptions.t.mappings.IS_SINGLE)) == null ? '' : __t) + '" >' +
            '<option value="true">是</option>' +
            '<option value="false">否</option>' +
            '</select>' +
            '</div>\n';
        __p += '</div>' +
            '</div> ' +

            '</div> ';
    }
    return __p
};

/**
 * 数据库字段
 */
this["Formbuilder"]["templates"]["edit/database"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

    function print() {
        __p += __j.call(arguments, '')
    }

    with (obj) {
        __p += '<div class="setting-panel panel">' +
            '<div class="panel-body collapse in"><div class="panel-body-content">';
        __p += '<div class="form-group">' +
            '<label >字段类型<i class="fa fa-help" data-tip data-title="关于字段类型" data-text="字段在数据库中的类型" ></i></label>' +
            '<input type="text" id="databaseType" ' + (($.isNotEmpty(rf.get("columnName")) || rf.get("fieldOptions.canchange") === false) ? 'disabled="disabled"' : '') + 'data-rv-input="model.fieldOptions.database_type"/>' +
            '</div>\n';
        __p += '</div>' +
            '</div> ' +

            '</div> ';
    }
    return __p
};

/**
 * 选项（单选、多选、下拉）
 */
this["Formbuilder"]["templates"]["edit/options"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

    function print() {
        __p += __j.call(arguments, '')
    }

    with (obj) {
        __p += '<div class="setting-panel panel">' +
            '<div class="panel-heading">选项</div>\n' +
            '<div class="panel-body collapse in"><div class="panel-body-content">';

        if (typeof includeBlank !== 'undefined') {
            __p += '<div><label class="actions-left">' +
                '<input type="checkbox" data-rv-checked="model.fieldOptions.include_blank_option"> &nbsp;&nbsp;<span>包含空白（自定义选择）</span>' +
                '<br/>&nbsp;&nbsp;&nbsp;&nbsp;空白默认文案<input type="text" data-rv-input="model.fieldOptions.include_blank_value"  style="width: 150px;"  />' +
                '</label></div>';
        }

        __p += '<div class="fixed_field_choices"  >' +
            '<div class="choices">\n';
        __p += '<div class="option"  data-rv-each-option=\'model.' +
            ((__t = (FormOptions.t.mappings.OPTIONS)) == null ? '' : __t) + '\'>\n' +
            ' <div class="actions-left"><input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked"  data-tip  data-text="设为默认"/></div>\n ' +
            '  <div class="input-wrap">' +
            '<input type="text" data-rv-disabled="model.' + FormOptions.t.mappings.DICT_CODE + '" data-rv-input="option:val" class=\'option-label-input\'  placeholder="选项key" />' +
            '<input type="text" data-rv-disabled="model.' + FormOptions.t.mappings.DICT_CODE + '" data-rv-input="option:label" class=\'option-label-input\' placeholder="展示值" />' +
            '</div>\n  ' +
            '<div class="actions">';
        __p += '<i data-rv-unless="model.' + FormOptions.t.mappings.DICT_CODE + '" data-role="add_choice" class=" js-add-option fa fa-plus-circle" data-tip ></i>' +
            '<i data-rv-unless="model.' + FormOptions.t.mappings.DICT_CODE + '" data-role="remove_choice" class="js-remove-option fa fa-minus-circle" ></i>';
        __p += '<i data-rv-unless="model.' + FormOptions.t.mappings.DICT_CODE + '" data-role="sort_choice" class=" js-sort-option fa fa-bars ui-sortable-handle " ></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="more-actions">';
        __p += '<a data-role="load_predefined_choices" class="js-clear-choices" tabindex="-1" href="javascript:void(0)">清空</a>';
        __p += '<a data-role="load_predefined_choices" class="js-predefined-choices" tabindex="-1" href="javascript:void(0)">选择模板</a>' +
            ' </div>' +
            '</div>';
        __p += '</div>' +
            '</div> ' +
            '</div> ';
    }
    return __p
};

/**
 * 校验 <br>
 * required 必填 min 最小值 max 最多值 minlength 最少x个字符 maxlength 最多x个字符 minmum 最少选项
 * maxmum 最多选项
 *
 */
this["Formbuilder"]["templates"]["edit/field_validations"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="setting-panel panel">' +
            '<div class="panel-heading">校验</div>\n';
        __p += '<div class="panel-body collapse in" id="field_validations"><div class="panel-body-content">';
        if (typeof required !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox" multiple="true" data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.REQUIRED)) == null ? '' : __t) +
                '" />必须填<i class="fa fa-help" data-tip data-title="关于必填校验" data-text="勾选后，该字段将将不允许为空，在字段名称后会有红色的星号标出。<br/>如果填写者在提交表单时必填字段没有输入，系统将会给出相关错误提示，表单将无法提交。该属性常用于需要强制填写者必须输入的字段。" ></i></label>' +
                '</div>' +
                '</div>';
        }
        if (typeof integer !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox" multiple="true" data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.INTEGER)) == null ? '' : __t) +
                '" />只能输入整数<i class="fa fa-help" data-tip data-title="关于整数校验" data-text="勾选后，系统会限制填写者填写此字段为整数值。<br/>注意:这个小数位是冲突的，如果俩个都勾选，以整数为准。" ></i></label>' +
                '</div>' +
                '</div>';
        }
        if (typeof decimal !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox" multiple="true" data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.IS_DECIMAL)) == null ? '' : __t) +
                '" />小数&nbsp;&nbsp;</label>' +
                '<input type="number" data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.DECIMAL)) == null ? '' : __t) +
                '" style="width: 50px" />位<i class="fa fa-help" data-tip data-title="关于小数位" data-text="输入小数位，系统会限制填写者填写此字段的小数位数。eg：2位小数，则只能输入2位小数。" ></i>' +
                '</div>' +
                '</div>';
        }

        if (typeof min !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox"  data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.IS_MIN)) == null ? '' : __t) + '" />最小值<i class="fa fa-help" data-tip data-title="关于最小值" data-text="系统会限制填写者填写此字段的最小值。" ></i></label>' +
                '<input type="number" data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.MIN)) == null ? '' : __t) +
                '" style="width: 50px" />' +
                '</div>' +
                '</div>';
        }
        if (typeof max !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox"  data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.IS_MAX)) == null ? '' : __t) + '" />最大值<i class="fa fa-help" data-tip data-title="关于最大值" data-text="系统会限制填写者填写此字段的最大值。" ></i></label>' +
                '<input type="number" data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.MAX)) == null ? '' : __t) +
                '" style="width: 50px" />' +
                '</div>' +
                '</div>';
        }

        if (typeof maxlength !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div>' +
                '<label>最多填<i class="fa fa-help" data-tip data-title="关于最多填写字符" data-text="系统会限制填写者填写此字段的最多字符。" ></i></label>' +
                '<input type="number" data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.MAXLENGTH)) == null ? '' : __t) +
                '" style="width: 50px" ' + ($.isNotEmpty(rf.get("columnName")) ? 'disabled="disabled"' : '') + '/>个字符' +
                '</div>' +
                '</div>';
        }

        // start_date
        if (typeof startdate !== 'undefined') {
            var ishide1 = $.isEmpty(rf.get(FormOptions.t.mappings.START_DATE_TYPE)) || rf.get(FormOptions.t.mappings.START_DATE_TYPE) == "specific" || rf.get(FormOptions.t.mappings.START_DATE_TYPE) == "today";
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox"  data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.IS_START_DATE)) == null ? '' : __t) + '" />起始日期<i class="fa fa-help" data-tip data-title="关于起始日期"' +
                'data-text="系统会限制填写者填写此字段的当天起始日期范围（包含该日期）。<br/>该功能不做有效性验证，请自行保证：特定日期，填写跟日期格式一致的日期；其他类型填写数字" ></i></label>' +
                '<select data-rv-value="model.' +
                ((__t = (FormOptions.t.mappings.START_DATE_TYPE)) == null ? '' : __t) +
                '" style="width: 100px;" class="js-change-date-type" data-name="start-date">' +
                '<option value=""></option>' +
                '<option value="specific">特定日期</option>' +
                '<option value="today">填写当天</option>' +
                '<option value="before">当天日期前</option>' +
                '<option value="after">当天日期后</option>' +
                '</select>' +
                '<input type="text"   class="js-start-date " data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.START_DATE)) == null ? '' : __t) +
                '" style="width: 80px" />' +
                '<select data-rv-value="model.' +
                ((__t = (FormOptions.t.mappings.START_DATE_INTERVAL)) == null ? '' : __t) +
                '" style="width: 50px;' + (ishide1 ? 'display:none;' : '') + '" class="js-start-date-interval" >' +
                // '<option value=""></option>' +
                // '<option value="y">年</option>' +
                // '<option value="m">月</option>' +
                '<option value="d">日</option>' +
                // '<option value="h">时</option>' +
                // '<option value="mi">分</option>' +
                // '<option value="s">秒</option>' +
                '</select>' +
                '</div>' +
                '</div>';
        }

        // end_date
        if (typeof enddate !== 'undefined') {
            var ishide1 = $.isEmpty(rf.get(FormOptions.t.mappings.END_DATE_TYPE)) || rf.get(FormOptions.t.mappings.END_DATE_TYPE) == "specific" || rf.get(FormOptions.t.mappings.END_DATE_TYPE) == "today";

            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox"  data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.IS_END_DATE)) == null ? '' : __t) + '" />结束日期<i class="fa fa-help" data-tip data-title="关于结束日期" data-text="系统会限制填写者填写此字段的截至日期范围（包含该日期）。<br/>该功能不做有效性验证，请自行保证：特定日期，填写跟日期格式一致的日期，其他类型填写数字" ></i></label>' +
                '<select data-rv-value="model.' +
                ((__t = (FormOptions.t.mappings.END_DATE_TYPE)) == null ? '' : __t) +
                '" style="width: 100px;" class="js-change-date-type"  data-name="end-date">' +
                '<option value=""></option>' +
                '<option value="specific">特定日期</option>' +
                '<option value="today">填写当天</option>' +
                '<option value="before">当天日期前</option>' +
                '<option value="after">当天日期后</option>' +
                '</select>' +
                '<input type="text" class="js-end-date" data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.END_DATE)) == null ? '' : __t) +
                '" style="width: 80px" />' +
                '<select data-rv-value="model.' +
                ((__t = (FormOptions.t.mappings.END_DATE_INTERVAL)) == null ? '' : __t) +
                '" style="width: 50px;' + (ishide1 ? 'display:none;' : '') + '" class="js-end-date-interval" >' +
                // '<option value=""></option>' +
                // '<option value="y">年</option>' +
                // '<option value="m">月</option>' +
                '<option value="d">日</option>' +
                // '<option value="h">时</option>' +
                // '<option value="mi">分</option>' +
                // '<option value="s">秒</option>' +
                '</select>' +
                '</div>' +
                '</div>';
        }


        // 自定义 格式
        if (typeof dataformat !== 'undefined') {
            ;
            __p += '<div class="form-group">' +
                '<label>格&nbsp;&nbsp;式<i class="fa fa-help" data-tip data-title="关于格式" data-text="系统会限制填写者填写此字段的指定的格式，也可以自定义正则表达式。" ></i>：</label>' +
                '<select  class="js-data-format"  style="width:150px;" data-rv-value="model.' +
                ((__t = (FormOptions.t.mappings.DATA_FORMAT)) == null ? '' : __t) + '" >';
            __p += '<option value="">--请选择--</option>';

            _.each(FormOptions.t.DATA_FORMAT, function (g, i) {
                __p += '<option value="' + i + '">' + Formbuilder.lang.data_format[i] + '</option>';
            });
            __p += '<option value="custom">自定义</option>';
            __p += '</select>\n';
            var isHide = '';
            if (rf.get(FormOptions.t.mappings.DATA_FORMAT) != 'custom')
                isHide = 'hidden';
            __p += '<textarea placeholder="正则表达式"  class="js-data-format-value mt-5 ' + isHide;
            __p += '"  data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.DATA_FORMAT_VALUE)) == null ? '' : __t) + '" ></textarea>';
            __p += '<input  type="text"  placeholder="提示消息"   class="js-data-format-value mt-5 ' + isHide;
            __p += '"  data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.DATA_FORMAT_MSG)) == null ? '' : __t) + '" />' +
                '</div>';

        }

        __p += '</div>' +
            '</div> ' +
            '</div> ';
    }
    return __p
};
/**
 * 状态
 *
 */
this["Formbuilder"]["templates"]["edit/field_rights"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="setting-panel panel">' +
            '<div class="panel-heading">字段状态</div>\n';
        __p += '<div class="panel-body collapse in" id="field_rights"><div class="panel-body-content">';
        if (typeof hide !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox" data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.HIDE_RIGHTS)) == null ? '' : __t) +
                '" />隐藏<i class="fa fa-help" data-tip data-title="关于隐藏" data-text="勾选后，该字段将隐藏，但如果动态赋值，可以对该字段进行赋值。" ></i></label>' +
                '</div>' +
                '</div>';
        }
        if (typeof read !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox" data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.READ_RIGHTS)) == null ? '' : __t) +
                '" />只读<i class="fa fa-help" data-tip data-title="关于只读" data-text="勾选后该字段将只读，如果不勾选则该字段默认是可写的。" ></i></label>' +
                '</div>' +
                '</div>';
        }

        if (typeof read !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="checkbox">' +
                '<label><input type="checkbox" ' + (rf.get("fieldOptions.canchangeStatus") === false ? 'disabled="disabled"' : "") + 'data-rv-checked="model.' +
                ((__t = (FormOptions.t.mappings.ADD_HIDE_RIGHTS)) == null ? '' : __t) +
                '" />新增/修改时隐藏<i class="fa fa-help" data-tip data-title="关于新增/修改时隐藏" data-text="勾选后该字段将在新增和修改数据的时候隐藏，查看时显示。" ></i></label>' +
                '</div>' +
                '</div>';
        }

        __p += '</div>' +
            '</div> ' +
            '</div> ';
    }
    return __p
};

/**
 * 单位设置
 */
this["Formbuilder"]["templates"]["edit/units"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="setting-panel panel">\n' +
            '<div class="panel-heading">单位设置</div>\n' +
            '<div class="panel-body collapse in" >\n' +
            '<div class="panel-body-content">';

        __p += '<div class="form-group">' +
            '<label>单位值</label>' +
            '<input type="text" id="label" data-rv-input="model.' +
            ((__t = (FormOptions.t.mappings.UNITS)) == null ? '' : __t) + '"/>' +
            '</div>\n';

        __p += ' </div>' +
            ' </div>' +
            ' </div>';

    }
    return __p
};

/**
 * 布局设置 arrangement：排列方式 occupy 宽度占比
 */
this["Formbuilder"]["templates"]["edit/layout_settings"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class="setting-panel panel">\n' +
            '<div class="panel-heading">布局设置</div>\n' +
            '<div class="panel-body collapse in" >\n' +
            '<div class="panel-body-content">';

        // 宽度占比
        if (typeof occupy !== 'undefined') {
            __p += '<div class="form-group">' +
                '<div class="">' +
                '<label>宽度占用整行的<i class="fa fa-help" data-tip data-title="关于占用整行的宽度" data-text="你可以定义该字段在填写页面占用的页面宽度为多少。" ></i>：</label>' +
                '<select data-rv-value="model.' +
                ((__t = (FormOptions.t.mappings.GRIDS_TO_OCCUPY)) == null ? '' : __t) +
                '" style="width: 73px">' +
                '<option value=""></option>' +
                ' <option value="1">1/4</option>' +
                '<option value="2">2/4</option>' +
                '<option value="3">3/4</option>' +
                '</select>' +
                '</div>' +
                '</div>';
        }

        if (typeof height !== 'undefined') {
            var _type = rf.get(FormOptions.t.mappings.FIELD_TYPE);
            var defHeight = 150;
            __p += '<div class="form-group">' +
                '<label>高度<i class="fa fa-help" data-tip data-title="关于高度" data-text="系统会根据设置的高度,进行设置，默认高度是' + defHeight + 'px。" ></i>：</label>' +
                '<input type="number" data-rv-input="model.' +
                ((__t = (FormOptions.t.mappings.HEIGHT)) == null ? '' : __t) +
                '" style="width: 150px" />' +
                '</div>';
        }
        __p += ' </div>' +
            ' </div>' +
            ' </div>';

    }
    return __p
};

/**
 * 其他设置 hide：字段隐藏
 */
this["Formbuilder"]["templates"]["edit/other_settings"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        // if (!rf.get(FormOptions.t.mappings.IS_SUB) || (rf.get(FormOptions.t.mappings.IS_SUB) && $.isNotEmpty(table) && table.get(FormOptions.t.mappings.MODE) != 'dialog')) {
        //     return;
        // }
        __p += '<div class="setting-panel panel">\n' +
            '<div class="panel-heading">展示区域</div>\n' +
            '<div class="panel-body collapse in" >\n' +
            '<div class="panel-body-content">';
        // // 排列方式
        // if (typeof hide !== 'undefined' && rf.get(FormOptions.t.mappings.IS_SUB) && $.isNotEmpty(table) && table.get(FormOptions.t.mappings.MODE) == 'dialog') {
        //     __p += '<div class="form-group">' +
        //         '<div class="checkbox">' +
        //         '<label><input type="checkbox" data-rv-checked="model.' +
        //         ((__t = ( FormOptions.t.mappings.HIDE )) == null ? '' : __t) +
        //         '" />字段隐藏</label>' +
        //         '</div>' +
        //         '</div>';
        // }
        // 是否列表显示

        if (typeof showTable !== 'undefined') {
            //获取字典值显示
            var showTypes = RX.getDictByCode("DTLBXSQY");
            for (var i = 0, maxLength = showTypes.length; i < maxLength; i++) {
                __p += '<div class="form-group">' +
                    '<div class="checkbox">' +
                    '<label><input type="checkbox"  multiple="true"   ' + (($.isNotEmpty(rf.get(FormOptions.t.mappings.SHOWAREA_NOT_EDIT))) ? 'disabled="disabled"' : "") + '  data-rv-checked="model.fieldOptions.' + showTypes[i].code +
                    '" />' + showTypes[i].value + '</label>' +
                    '</div>' +
                    '</div>';
            }
        }
        __p += ' </div>' +
            ' </div>' +
            ' </div>';

    }
    return __p
};

/**
 * 添加字段模版
 */
this["Formbuilder"]["templates"]["partials/add_field"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join, allKeys = _.allKeys(Formbuilder.groupFields);

    function print() {
        __p += __j.call(arguments, '')
    }

    with (obj) {
        _.each(_.sortBy(Formbuilder.groupFields, 'order'), function (g, i) {
            __p += '  <div class="panel"><div class="panel-heading grey-cararra">' + Formbuilder.lang.group[allKeys[i]] + '<i class="fa fa-help" data-tip data-title="关于' + Formbuilder.lang.group[allKeys[i]] + '" data-text="' + Formbuilder.lang.groupTip[allKeys[i]] + '" ></i>' + '</h4>\n </div> ';
            __p += ' 	<div class="panel-body">\n      ';

            _.each(_.sortBy(g, 'order'), function (f) {
                //存在addButton的才显示
                if (f.addButton) {
                    __p += '\n        <a data-field-type="' +
                        ((__t = (f.field_type)) == null ? '' : __t) +
                        '" class="btn  btn-field btn-narrow ' +
                        ((__t = (Formbuilder.options.BUTTON_CLASS)) == null ? '' : __t) +
                        '">\n          ' +
                        ((__t = (f.addButton)) == null ? '' : __t) +
                        '\n        </a>\n      ';
                }
            });
            __p += '\n    </div>\n  </div>\n';
        });

    }
    return __p;
};

/**
 * 编辑字段
 */
this["Formbuilder"]["templates"]["partials/edit_field"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class=\'fb-tab-pane\' id=\'editField\'>\n  <div class=\'fb-edit-field-wrapper\'></div>\n</div>\n';
    }
    return __p
};

// TODO=================================预览视图====================


/**
 * 所有控件基础
 */
this["Formbuilder"]["templates"]["view/base"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '</div>\n  ';
        // 字段 文本
        __p += ((__t = (Formbuilder.templates['view/label']({rf: rf}))) == null ? '' : __t) + '\n\n  ';
        // 字段内容
        __p += '<div class="field-content">' +
            ((__t = (Formbuilder.fields[rf.get(FormOptions.t.mappings.FIELD_TYPE)].view({rf: rf}))) == null ? '' : __t) +
            '</div>\n\n';
        // 复制和删除
        __p += ((__t = (Formbuilder.templates['view/duplicate_remove']({rf: rf}))) == null ? '' : __t);

    }
    return __p
};

this["Formbuilder"]["templates"]["edit/base_header"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class=\'fb-field-label\'>\n  <span data-rv-text="model.' +
            ((__t = (FormOptions.t.mappings.LABEL)) == null ? '' : __t) +
            '"></span>\n  <code class=\'field-type\' data-rv-text=\'model.' +
            ((__t = (FormOptions.t.mappings.FIELD_TYPE)) == null ? '' : __t) +
            '\'></code>\n  <span class=\'fa fa-arrow-right pull-right\'></span>\n</div>';

    }
    return __p
};

/**
 * 不需要输入的控件
 */
this["Formbuilder"]["templates"]["view/base_non_input"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += ((__t = (Formbuilder.fields[rf.get(FormOptions.t.mappings.FIELD_TYPE)].view({rf: rf}))) == null ? '' : __t);
        // 复制和删除
        __p += ((__t = (Formbuilder.templates['view/duplicate_remove']({rf: rf}))) == null ? '' : __t) +
            '\n';

    }
    return __p
};

/**
 * 描述提示页面
 */
this["Formbuilder"]["templates"]["view/base_non_input_label"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '  <div class=\'icons\' style="top: 8px;">';
        if (rf.get(FormOptions.t.mappings.HIDE)) {
            __p += ' <i class="fa fa-lock" data-role="hide_indicator" title="隐藏"></i>';
        }
        if (rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY) && !_.isEmpty(rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY))) {
            __p += ' <i class="icon-grid-' + rf.get(FormOptions.t.mappings.GRIDS_TO_OCCUPY) + '" title="占比"></i>';
        }
        __p += '</div>\n  ';

        if (typeof lable !== 'undefined') {
            ;
            __p += '<label class="field-label">\n  <span>' +
                ((__t = (Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.LABEL)))) == null ? '' : __t) +
                ' </span>\n  ';
            __p += '\n</label>\n';
        }
    }
    return __p
};

/**
 * 复制和删除
 */
this["Formbuilder"]["templates"]["view/duplicate_remove"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape;
    with (obj) {
        __p += '<div class=\'actions-wrapper\'>\n  <a class="js-duplicate ' +
            ((__t = (Formbuilder.options.BUTTON_CLASS)) == null ? '' : __t) +
            '"  data-role="duplicate_field"   data-toggle="tooltip" data-placement="bottom" title="复制"><i class=\'fa fa-clone\'></i></a>\n  ';
        if (rf.get("fieldOptions.candelete") !== false) {
            __p += '<a class="js-clear ' +
                ((__t = (Formbuilder.options.BUTTON_CLASS)) == null ? '' : __t) +
                '" data-role="delete_field"  data-toggle="tooltip" data-placement="bottom"  title="删除"><i class=\'fa fa-delete\'></i></a>\n';
        }
        __p += '</div>';

    }
    return __p
};

/**
 * 预览界面- label
 */
this["Formbuilder"]["templates"]["view/label"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

    function print() {
        __p += __j.call(arguments, '')
    }

    with (obj) {

        __p += '<label class="field-label">\n  <span>' +
            ((__t = (Formbuilder.helpers.simple_format(rf.get(FormOptions.t.mappings.LABEL)))) == null ? '' : __t) +

            ' </span>\n  ';

        if (rf.get(FormOptions.t.mappings.UNITS)) {
            ;
            __p += '\n  (' + rf.get(FormOptions.t.mappings.UNITS) + ')\n  ';
        }
        ;
        if (rf.get(FormOptions.t.mappings.REQUIRED)) {
            ;
            __p += '\n    <abbr class=\'required\'>*</abbr>\n  ';
        }
        ;
        __p += '\n</label>\n';

    }
    return __p
};

// 表单头部页面
this["Formbuilder"]["templates"]["view/form-header"] = function (obj) {

    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join;

    function print() {
        __p += __j.call(arguments, '')
    }

    with (obj) {
        if (rf.get(FormOptions.t.propertys.NAME)) {
            ;
            __p += '<div class="form-title">' + rf.get(FormOptions.t.propertys.NAME) + '</div>';
        } else {
            ;
            __p += '<div class="form-title">未命名表单</div>';
        }
    }
    return __p
};

// 表单属性区域
this["Formbuilder"]["templates"]["edit/form-property"] = function (obj) {
    obj || (obj = {});
    var __t, __p = '', __e = _.escape, __j = Array.prototype.join, id;

    function print() {
        __p += __j.call(arguments, '')
    }

    with (obj) {
        id = rf.get("id");

        __p += '<div class="setting-panel panel">\n' +
            '<div class="panel-heading">表单属性</div>\n' +
            '<div class="panel-body collapse in" >\n' +
            '<div class="panel-body-content">';
        __p += '<div class="form-group">' +
            '<label >表单标题<span class="required">*</span></label>' +
            '<input type="text" id="formName" maxlength="32" data-rv-input="model.' +
            ((__t = (FormOptions.t.propertys.NAME)) == null ? '' : __t) +
            '"  />' +
            '</div>';
        __p += '<div class="form-group">' +
            '<label >表单key<span class="required">*</span></label>' +
            '<input type="text"  id="formKey" maxlength="26" data-rv-input="model.' +
            ((__t = (FormOptions.t.propertys.KEY)) == null ? '' : __t) +
            '"  ' + ($.isEmpty(rf.get("tableName")) ? '' : 'disabled="disabled"') + ' />' +
            '</div>';
        if (rf.get("tableName")) {
            __p += '<div class="form-group">' +
                '<label >数据库表名</label>' +
                '<input type="text"  data-rv-input="model.tableName" disabled="disabled"/>' +
                '</div>';
        }
        /*__p += '<div class="form-group">' +
            '<label >表单分类</label>' +

            '<div style="position: relative;">' +
            '<input type="hidden" id="typeId" data-rv-value="model.' +
            ((__t = (FormOptions.t.propertys.TYPE_ID)) == null ? '' : __t) +
            '"  />' +
            '<input type="text" class="form-control dropdownTree" data-rv-value="model.' +
            ((__t = (FormOptions.t.propertys.TYPE_NAME)) == null ? '' : __t) +
            '"  readonly  id="typeName" name="typeName" data-toggle="dropdownTree"  data-type="FORM_TYPE" data-id="#typeId"' +
            '"  />' +
            '</div></div>';*/

        __p += '<div class="form-group"><label >表单描述</label>' +
            '<textarea maxlength="64"   data-rv-input="model.' +
            ((__t = (FormOptions.t.propertys.DESC)) == null ? '' : __t) +
            '"></textarea>' +
            '</div>';

        __p += ' </div>' +
            ' </div>' +
            ' </div>';

        // // // ==============表单提交校验=====
        // __p += '<div class="setting-panel panel">\n' +
        //     '<div class="panel-heading">表单提交校验<i class="fa fa-help" data-tip data-title="关于表单提交校验" data-text="表单提交时候对一系列条件进行有效性校验。" ></i></div>\n' +
        //     '<div class="panel-body collapse in" >\n' +
        //     '<div class="panel-body-content">';
        // __p += '<div class="verifys"><div class="verify"  data-rv-each-verify=\'model.' +
        //     ((__t = ( FormOptions.t.propertys.VERIFYS )) == null ? '' : __t) + '\'>\n' +
        //     '  <div class="label-wrap" data-rv-text="verify:show" ></div>\n  ' +
        //     '<div class="actions">' +
        //     '<i data-role="remove_choice" class="js-remove-verify fa fa-minus-circle"></i>' +
        //     '<i data-role="edit_choice" class="js-form-verify js-edit-verify fa fa-edit"></i>' +
        //     '</div>' +
        //     '</div>';
        // __p += '<a class="btn btn-sm  btn-block  btn-info js-form-verify mt-5"  >添加校验条件</a>';
        //
        // __p += '</div>' +
        //     ' </div>' +
        //     ' </div>';
        //
        // // ==============表单提交校验=====
        // __p += '<div class="setting-panel panel">\n' +
        //     '<div class="panel-heading">表单规则<i class="fa fa-help" data-tip data-title="关于表单规则" data-text="您可以为某个字段(文本框、单项选择、下拉框等)设定一些规则：在填写者填写或选择某选项后，触发显示（隐藏、必填、非必填、置空等）位于该字段之后的其他字段。" ></i></div>\n' +
        //     '<div class="panel-body collapse in" >\n' +
        //     '<div class="panel-body-content">';
        // __p += '<a class="btn btn-sm  btn-block  btn-info js-form-rules mt-5"  >设置表单规则</a>';
        //
        // __p += '</div>' +
        //     ' </div>' +
        //     ' </div>';
        //
        //
        // // ==============表单脚本=====
        // __p += '<div class="setting-panel panel">\n' +
        //     '<div class="panel-heading">表单脚本</div>\n' +
        //     '<div class="panel-body collapse in" >\n' +
        //     '<div class="panel-body-content">';
        // __p += '<a class="btn btn-sm  btn-block  btn-info js-form-script mt-5"  >设置表单脚本</a>';
        //
        // __p += '</div>' +
        //     ' </div>' +
        //     ' </div>';

        __p += '<div class="setting-panel panel">\n' +
            '<div class="panel-heading">其他设置</div>\n' +
            '<div class="panel-body collapse in" >\n' +
            '<div class="panel-body-content">';
        __p += '<div class="form-group">' +
            '<div class="checkbox">' +
            '<label><input type="checkbox"  data-rv-checked="model.' +
            ((__t = (FormOptions.t.propertys.HIDE_NAME)) == null ? '' : __t) +
            '" /> 隐藏标题</label>' +
            '</div>' +
            '</div>';

        // __p += '<div class="form-group">' +
        //     '<div class="checkbox">' +
        //     '<label><input type="checkbox" data-rv-checked="model.' +
        //     ((__t = ( FormOptions.t.propertys.HIDE_DESC )) == null ? '' : __t) +
        //     '" />隐藏描述</label>' +
        //     '</div>' +
        //     '</div>';
        // __p += '<div class="form-group">' +
        //     '<div class="checkbox">' +
        //     '<label><input type="checkbox" data-rv-checkednull="model.' +
        //     ((__t = ( FormOptions.t.propertys.COLON )) == null ? '' : __t) +
        //     '" />文本字段间有冒号</label>' +
        //     '</div>' +
        //     '</div>';

        __p += '<div class="form-group">' +
            '<div class="checkbox">' +
            '<label>文本只读显示样式</label>' +
            '<select data-rv-value="model.' + ((__t = (FormOptions.t.propertys.READ_STYLE)) == null ? '' : __t) +
            '" style="width: 100px">' +
            '<option value="text">文本展示</option>' +
            '<option value="original">原样展示</option>' +
            '</select>' +
            '</div>' +
            '</div>';

        __p += ' </div> </div>' +
            ' </div>' +
            ' </div>';

        __p += '<div class="setting-panel panel">\n' +
            '<div class="panel-heading">默认设置【不影响表单展示】</div>\n' +
            '<div class="panel-body collapse in" >\n' +
            '<div class="panel-body-content">';

        __p += '<div class="form-group">' +
            '<div class="checkbox">' +
            '<label>默认宽度占用整行的<i class="fa fa-help" data-tip data-title="关于默认宽度占用整行" data-text="如果选择默认宽度占用整行,新增的字段则会按照这个设置该字段宽度占用整行。" ></i>：</label>' +
            '<select data-rv-value="model.' + ((__t = (FormOptions.t.propertys.GRIDS_TO_OCCUPY)) == null ? '' : __t) +
            '" style="width: 73px">' +
            '<option value=""></option>' +
            '<option value="1">1/4</option>' +
            '<option value="2">2/4</option>' +
            '<option value="3">3/4</option>' +
            '</select>' +
            '</div>' +
            '</div>';

        __p += ' </div>' +
            ' </div>' +
            ' </div>';
    }
    return __p
};

function getEnglish(str) {
    var result = "";
    if (str) {
        $.ajax({
            type: "post",
            url: "/form/getPingyin",
            data: {
                str: str
            },
            async: false,
            success: function (ar) {
                if (ar.success) {
                    result = ar.data;
                }
            }
        });
    }
    return result;
}