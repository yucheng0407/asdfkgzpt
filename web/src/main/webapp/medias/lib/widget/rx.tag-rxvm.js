(function () {
    RX.Tag = {
        data: {
            list: []
        },
        partials: {
            tagsInput: '<input id="tags" type="text" class="tags"/>'
        },
        settings: {
            tagProperty: "",
            height: 'auto',
            width: 'auto',
            type: "xz"    //xz、ck
        },
        methods: {
            selectTag: function () {
            },
            addTag: function (item) {
                if (!item) {
                    return;
                }
                var tagProperty = this.$options.settings && this.$options.settings.tagProperty,
                    tag = "";
                if (tagProperty) {
                    tag = item[tagProperty];
                    if (!this.$tag.tagExist(tag)) {
                        this.$tag.addTag(tag);
                        this.append("list", item);
                    }
                }
            },
            removeTag: function (tag) {
                this.$tag.removeTag(tag);
            },
            removeAllTag: function () {
                this.$tag.removeAllTag();
            },
            /**
             * 是否满足条件，可个性增加
             */
            isRequire: function (t) {
                return typeof t.sfyxSt !== "undefined" ? t.sfyxSt !== "UNVALID" : true;
            }
        },
        _afterMount: function () {
            var that = this,
                settings = that.$options.settings,
                tagProperty = settings && settings.tagProperty;
            this.$tag = $(that._findNodes(".tags")[0].el);
            this.$tag.tagsInput({
                width: settings.width,
                height: settings.height,
                type: settings.type,
                onRemoveTag: function (tag) {
                    if (tagProperty) {
                        if (tag) {
                            $.each(that.get("list") || [], function (i, t) {
                                if (t[tagProperty] == tag) {
                                    if (typeof t.sfyxSt !== "undefined") {
                                        that.set("list."+i+".sfyxSt", "UNVALID");
                                    } else {
                                        that.removeAt("list", i);
                                        return false;
                                    }
                                }
                            });
                        } else {
                            //移除了所有，将没有保存过的数据清除，保存过的置为unvalid
                            var newArr = [];
                            $.each(that.get("list") || [], function (i, t) {
                                if (t.id && t.sfyxSt !== "undefined") {
                                    //移除
                                    t.sfyxSt = "UNVALID";
                                    newArr.push(t);
                                }
                            });
                            that.set("list", newArr);
                        }

                        return true;
                    }
                },
                interactive: false
            });

            this.$tag.next().click(function () {
                that.selectTag();
            })

            if (tagProperty) {
                $.each(that.get("list") || [], function (i, t) {
                    var tag = t[tagProperty];
                    if (tag && that.isRequire(t)) {
                        that.$tag.addTag(tag, {type: settings.type});
                    }
                })
            }
        }
    };

})();

