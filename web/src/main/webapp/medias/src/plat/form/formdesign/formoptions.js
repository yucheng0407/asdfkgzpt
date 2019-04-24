if (!window.FormOptions) {
    window.FormOptions = {
        t: {},
        options: {}
    };
}

FormOptions.t = {
    /**==========表单的属性======**/
    propertys: {
        // 名称
        NAME: 'name',
        // key
        KEY: 'key',
        TYPE_ID: 'typeId',
        // 分类
        TYPE_NAME: 'typeName',
        // 描述
        DESC: 'description',
        // 脚本
        SCRIPT: 'extendAttr.script',
        // 默认显示标题
        HIDE_NAME: 'extendAttr.hide_name',
        // 默认显示描述
        HIDE_DESC: 'extendAttr.hide_desc',
        //是否开启冒号：
        COLON: 'extendAttr.colon',
        //只读样式
        READ_STYLE: 'extendAttr.read_style',
        // 默认占比
        GRIDS_TO_OCCUPY: 'extendAttr.grids_to_occupy',
        // 字段绑定带出字段名
        OUT_OF_NAME: 'extendAttr.out_of_name',
        // 表单验证
        VERIFYS: 'extendAttr.verifys',
        // 表单验证
        RULES: 'extendAttr.rules',
        //工具类
        TOOLBAR: 'extendAttr.toolbar',
        //分页效果
        PAGE_STYLE: 'extendAttr.page_style',
        //分页按钮位置
        PAGE_BUTTON_POSITION: 'extendAttr.page_button_position',
        //后端验证
        VALIDATED: 'extendAttr.validated',
        //提交冲突
        CONFLICT: 'extendAttr.conflict'
    },
    /**==========字段的属性======**/
    mappings: {
        // =======基本属性========
        // 标题
        LABEL: 'label',
        // 名称
        NAME: 'name',
        //显示名称
        SHOW_NAME: 'showName',
        // 字段类型
        FIELD_TYPE: 'fieldType',
        CODE: 'code',
        //文字提示
        PLACEHOLDER: 'fieldOptions.placeholder',
        // 描述
        DESC: 'description',
        // 字段选项
        FIELD_OPTIONS: 'fieldOptions',
        //是否主键
        IS_PK: 'fieldOptions.is_pk',
        //内容
        CONTENT: 'fieldOptions.content',
        //树型字典-显示模式
        SELECT_MODE: 'fieldOptions.select_mode',
        //树型字典-显示模式
        DISPLAY_MODE: 'fieldOptions.display_mode',
        //树型字典-路径分隔符
        SPLIT: 'fieldOptions.split',
        // =======默认值========
        // 默认值类型
        DEFAULT_VALUE_TYPE: 'fieldOptions.default_value_type',
        // 默认值
        DEFAULT_VALUE: 'fieldOptions.default_value',
        //默认值名 冗余
        DEFAULT_VALUE_NAME: 'fieldOptions.default_value_name',
        // =======选项========
        // 选项的值来源
        DATASOURCE: 'fieldOptions.datasource',
        // 选项【例如：选项一,选项二】
        OPTIONS: 'fieldOptions.options',
        DICT_CODE: 'fieldOptions.dictCode',
        // 包含其他选项
        INCLUDE_OTHER: 'fieldOptions.include_other_option',
        // 包含空白选项（下拉使用）
        INCLUDE_BLANK: 'fieldOptions.include_blank_option',
        INCLUDE_BLANK_VALUE: 'fieldOptions.include_blank_value',
        //选项--其他绑定的ID
        OPTION_OTHER_ID: 'fieldOptions.option_other_id',
        //选项--其他绑定的名称
        OPTION_OTHER_NAME: 'fieldOptions.option_other_name',
        // IS_PK: 'field_options.is_pk',

        // =======验证========
        // 必填
        REQUIRED: 'fieldOptions.required',
        // 只能输入整数
        INTEGER: 'fieldOptions.integer',
        // 是否小数位
        IS_DECIMAL: 'fieldOptions.is_decimal',
        // 小数位
        DECIMAL: 'fieldOptions.decimal',
        // 只能是整数
        NUMBER: 'fieldOptions.number',
        // 是否最小值（一般数字）
        IS_MIN: 'fieldOptions.is_min',
        // 最小值（一般数字）
        MIN: 'fieldOptions.min',
        // 是否最大值（一般数字）
        IS_MAX: 'fieldOptions.is_max',
        // 最大值（一般数字）
        MAX: 'fieldOptions.max',
        // 是否最少字符（一般文本框、多行文本框）
        IS_MINLENGTH: 'fieldOptions.is_min_length',
        // 最少字符（一般文本框、多行文本框）
        MINLENGTH: 'fieldOptions.min_length',
        // 是否最多字符（一般文本框、多行文本框）
        IS_MAXLENGTH: 'fieldOptions.is_max_length',
        // 最多字符（一般文本框、多行文本框）
        MAXLENGTH: 'fieldOptions.max_length',
        // 是否最少选项（一般多选）
        IS_MINMUM: 'fieldOptions.is_min_mum',
        // 最少选项（一般多选）
        MINMUM: 'fieldOptions.min_mum',
        // 是否最多选项
        IS_MAXMUM: 'fieldOptions.is_max_mum',
        // 最多选项
        MAXMUM: 'fieldOptions.max_mum',
        // 开始日期类型
        START_DATE_TYPE: 'fieldOptions.start_date_type',
        // 是否开始日期
        IS_START_DATE: 'fieldOptions.is_start_date',
        // 开始日期
        START_DATE: 'fieldOptions.start_date',
        // 开始时间间隔(年月日时分秒)
        START_DATE_INTERVAL: 'fieldOptions.start_date_interval',
        // 结束日期类型
        END_DATE_TYPE: 'fieldOptions.end_date_type',
        // 是否结束日期
        IS_END_DATE: 'fieldOptions.is_end_date',
        // 结束日期
        END_DATE: 'fieldOptions.end_date',
        // 结束时间间隔(年月日时分秒)
        END_DATE_INTERVAL: 'fieldOptions.end_date_interval',

        // 结束字段
        FOLD_CARD_LABEL: 'fieldOptions.fold_card_label',
        // 结束字段
        FOLD_CARD_END_FIELD: 'fieldOptions.end_field',
        // 结束字段
        FOLD_CARD_OPEN: 'fieldOptions.open',

        // ======字段权限========
        HIDE_RIGHTS: 'fieldOptions.hide_rights',
        READ_RIGHTS: 'fieldOptions.read_rights',
        //新增时隐藏
        ADD_HIDE_RIGHTS: 'fieldOptions.add_hide_rights',

        // =======验证-数据格式（文本框）========
        // 数据格式
        DATA_FORMAT: 'fieldOptions.data_format',
        // 数据格式值
        DATA_FORMAT_VALUE: 'fieldOptions.data_format_value',
        // 数据格式提示信息
        DATA_FORMAT_MSG: 'fieldOptions.data_format_msg',

        // =======生成文件常量========
        // 最多文件数
        MAX_FILE_QUANTITY: 'fieldOptions.max_file_quantity',
        //最小文件数
        MIN_FILE_QUANTITY: 'fieldOptions.min_file_quantity',
        // 单个最大文件尺寸
        MAX_FILE_SIZE: 'fieldOptions.max_file_size',
        // 文件类型名（图片、文档类）
        MEDIA_TYPE: 'fieldOptions.media_type',
        // office文件类型名（文档类、表格类、文稿类）
        OFFICE_TYPE: 'fieldOptions.office_type',
        // 文件类型--逗号分割
        MEDIA: 'fieldOptions.media',
        // 文件类型--逗号分割
        OFFICE: 'fieldOptions.office',
        // =======日期格式========
        // 日期格式 eg：“yyyy-MM-dd”
        DATEFMT: 'fieldOptions.datefmt',
        // 日期格式类型（）
        DATEFMT_TYPE: 'fieldOptions.datefmt_type',

        // =======选择器参数========
        // 选择器类型
        SELECTOR_TYPE: 'fieldOptions.selector_type',
        // 是否单选
        IS_SINGLE: 'fieldOptions.is_single',
        // 选择器范围
        RANGE: 'fieldOptions.range',
        //存储格式
        STORE: 'fieldOptions.store',
        // 绑定ID
        BIND_ID: 'fieldOptions.bind_id',
        // 绑定名称 （冗余）
        BIND_NAME: 'fieldOptions.bind_name',

        // =======地址常量========
        // 最大区域
        TOP: 'fieldOptions.top',
        // 最小区域
        LEVEL: 'fieldOptions.level',
        // 最小区域的值
        TOPVAL: 'fieldOptions.topval',
        // 是否显示详细街道
        IS_STREET: 'fieldOptions.is_street',
        // 详细街道的
        STREET: 'fieldOptions.street',
        // =======布局========
        // 尺寸
        SIZE: 'fieldOptions.size',
        // 排列方式
        ARRANGEMENT: 'fieldOptions.arrangement',
        // 对齐方式
        ALIGN: 'fieldOptions.align',
        // 宽度占比
        GRIDS_TO_OCCUPY: 'fieldOptions.grids_to_occupy',
        //高度
        HEIGHT: 'fieldOptions.height',
        //宽度
        WIDTH: 'fieldOptions.width',
        // 子表模式（行内、弹窗、块模式）
        MODE: 'fieldOptions.mode',
        // 移动端显示
        MOBILE: 'fieldOptions.mobile',
        // =======其他=========
        // 隐藏
        HIDE: 'fieldOptions.hide',
        //表单展示
        SHOWTABLE: 'fieldOptions.show_table',
        //搜索区字段
        SHOWSEARCH: 'fieldOptions.show_search',

        // 流水号
        IDENTITY: 'fieldOptions.identity',
        // 流水号名称
        IDENTITY_NAME: 'fieldOptions.identity_name',
        // 初始化（是否初始）
        INIT: 'fieldOptions.init',
        // 数字字典
        DICTIONARY: 'fieldOptions.dictionary',
        // 数字字典名称
        DICTIONARY_NAME: 'fieldOptions.dictionary_name',
        // =======自定义对话框=========
        // 对话框类型
        DIALOG_TYPE: 'fieldOptions.dialog_type',
        // 对话框
        DIALOG: 'fieldOptions.dialog',
        // 对话框
        DIALOG_NAME: 'fieldOptions.dialog_name',
        //存储方式
        STORE_MODE: 'fieldOptions.store_mode',
        // 对话框绑定字段
        BIND: 'fieldOptions.bind',
        //参数
        PARAMS: 'fieldOptions.params',
        //标题
        TITLE: 'fieldOptions.title',
        //图标
        ICON: 'fieldOptions.icon',

        // =======关联数据=========
        //关联数据
        LINKDATA: 'fieldOptions.linkdata',
        LINKDATA_NAME: 'fieldOptions.linkdata_name',

        //关联配置
        LINK_CONFIG: 'fieldOptions.link_config',
        //是否多选
        MULTIPLE: 'fieldOptions.multiple',
        //关联条件
        LINK_CONDITION: 'fieldOptions.link_condition',
        //关联联动
        LINK_LINKAGE: 'fieldOptions.link_linkage',
        //关联属性
        LINK_ATTR: 'fieldOptions.link_attr',
        // =======其他=========
        // 是否是子表
        IS_SUB: 'is_sub',
        // 子表名称
        SUB_NAME: 'sub_name',
        // 子表字段
        COLUMNS: 'fieldOptions.columns',
        // 子表按钮
        BUTTONS: 'fieldOptions.buttons',

        COLUMN_TOTALS: 'fieldOptions.column_totals',
        //最小
        MINROWS: 'fieldOptions.minrows',
        //最大
        MAXROWS: 'fieldOptions.maxrows',
        //预设值
        PRESET_VALUES: 'fieldOptions.preset_values',

        // 富文本框工具栏
        TOOLBARS: 'fieldOptions.toolbars',
        // office菜单栏
        MENUBARS: 'fieldOptions.menubars',
        //显示模式
        SHOW_MODE: 'fieldOptions.show_mode',
        // 单位，eg：货币￥$,元等
        UNITS: 'fieldOptions.units',

        UNITS_POSITION: 'fieldOptions.units_position',
        // 分割线
        SPLIT_LINE: 'fieldOptions.split_line',
        //
        LINE_STYLE: 'fieldOptions.line_style',


        //=======翻页设置=========
        PREV_PAGE: 'fieldOptions.prev_page',
        NEXT_PAGE: 'fieldOptions.next_page',
        // =======规则条件条件=========

        RULES: 'rules',
        // 条件
        CONDITIONS: 'fieldOptions.conditions',
        // 方法
        CONDITION_METHOD: 'fieldOptions.condition_method',

        // 是否默认值
        IS_DEFAULT: 'isDefault',

        // 权限
        PERMISSION: 'permission',

        // 子表权限
        SUB_PERMISSION: 'permission.rights',

        // 子表表单按钮权限
        BUTTONS_PERMISSION: 'permission.buttons',
        COLUMNS_PERMISSION: 'permission.columns',


        APP_LAYOUT: 'appLayout',
        SHOWAREA_NOT_EDIT:'fieldOptions.showarea_not_edit'
    },
    table: {
        ROW: 'row',// 行---
        COLUMN: 'column'// 列 |||
    },
    // 文件默认类型
    FILE_TYPES: {
        "images": ["bmp", "gif", "jpg", "jpeg", "png", "psd", "tif", "tiff"],
        "videos": ["mkv", "mp4", "avi", "swf", "wmv", "rmvb", "mov", "mpg"],
        "audios": ["mp3", "flac", "ape", "wma", "wav", "aac", "m4a", "au",
            "ram", "mmf", "ai"],
        "docs": ["doc", "docx", "pdf", "rtf", "txt", "csv", "xls", "xlsx",
            "ppt", "pptx"],
        "compress": ["rar", "zip", "7z", "gz", "arj", "z"]
    },

    FILE_EXT: {
        images: ["bmp", "gif", "jpg", "jpeg", "png", "psd", "tif", "tiff"],
        not_images: ["accdb", "avi", "css", "doc", "docx", "eml", "eps", "fla", "html",
            "ind", "ini", "jsf", "midi", "mov", "mp3", "mpeg", "pdf", "ppt", "pptx", "proj",
            "psd", "pst", "pub", "rar", "readme", "settings", "text", "txt", "tiff", "url", "vsd", "wav", "wma",
            "wmv", "xls", "xlsx", "zip"]
    },
    // office文件类型
    OFFICE_TYPES: {
        "doc": ["doc", "docx"],
        "xls": ["xls", "xlsx"],
        "ppt": ["ppt", "pptx"]
    },
    // 默认日期格式
    DATE_FORMATS: {
        "date": "yyyy-MM-dd",
        "datetime": "yyyy-MM-dd HH:mm:ss",
        "time": "HH:mm:ss"
    },
    // 默认值类型
    DEFAULT_VALUE_TYPE: ['fixed'
        // , 'dynamic', 'linkage', 'formula'
    ],
    // 数据格式(正则表达式)
    DATA_FORMAT: {
        'phone': /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/,
        'telephone': /^((\(0[0-9]{2,3}\))|(0[0-9]{2,3})\-)?([2-9][0-9]{6,7})(\-[0-9]{1,4})?$/,
        //错误的格式
        'isTel': /^((\(\d{2,3}\))|(\d{3}\-))?((1\d{10}))$/,
        'zip': /^\d{6}$/,
        'idcard': /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        'email': /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        'isUrl': null
    },

    BUTTONS: {
        "add": {
            label: "添加",
            style: "btn-primary",
            icon: "fa fa-add",
            position: 'toolbar'
        },
        "remove": {
            label: "删除",
            style: "btn-danger",
            icon: "fa fa-remove",

            position: 'all'
        },
        "edit": {
            label: "编辑",
            style: "btn-primary",
            icon: "fa fa-edit",
            position: 'all'
        },

        /*	'import' : {
                label : "导入",
                style : "btn-primary",
                icon : "fa fa-import",
                position : 'toolbar'
            },
            'export' : {
                label : "导出",
                style : "btn-primary",
                icon : "fa fa-export",
                position : 'toolbar'
            }*/
        "custom": {
            label: "[自定义]",
            style: "btn-primary",
            icon: "fa fa-cogs",
            position: 'all'
        }
    },
    //选择器数据存储格式
    SELECTOR_STORE: {
        JSON: 'json',//JSON存储
        ID: 'id',//仅ID
        BIND: 'bind'//绑定ID
    },
    DATA_KEY: {
        ID: "#id#",
        TITLE: "#title#"
    },
    // 权限
    PERMISSIONS: {
        READ_POST: 'rp',// 只读提交
        READ: 'r',// 只读
        EDIT: 'e',// 编辑
        REQUIRED: 'b',// 必填
        SHOW: 's',// 显示，针对子表按钮
        HIDE: 'h'// 隐藏
    },
    // 表单控件
    FIELD_TYPE: {
        HIDDEN: 'hidden',
        TEXT: "text",
        TEXTAREA: 'textarea',
        EDITOR: 'editor',
        NUMBER: 'number',
        RADIO: 'radio',
        CHECKBOX: 'checkbox',
        SELECT: 'select',
        DICTIONARY: 'dictionary',
        DATE_PICKER: 'datePicker',
        AUTO_NUMBER: 'autoNumber',
        ATTACHMENT: 'attachment',
        SELECTOR: 'selector',
        CUSTOM_DIALOG: "customDialog",
        ADDRESS: 'address',
        OFFICE: 'office',
        TABLE: 'table',
        TAB_BREAK: 'tab_break',
        DESC: 'desc',
        LABEL: 'label',
        FOLD_CARD: 'fold_card'
    },
    // 字段类型
    INPUT_FIELD_TYPES: ['hidden', 'text', 'textarea', 'editor', 'number',
        'radio', 'checkbox', 'select', 'dictionary', 'datePicker',
        'dateRange', 'autoNumber', 'attachment', 'selector',
        'customDialog', 'linkdata', 'address', 'signature', 'office', 'table'],
    //子表支持的字段类型
    SUBTABLE_FIELD_TYPE: ["hidden", "text", "textarea", "radio", "checkbox", "select", "number", "datePicker", "dictionary", "attachment", "selector", "customDialog"],
    // 不用输入字段类型，
    NON_INPUT_FIELD_TYPES: ['flow_diagram',
        'approval_history',
        'tab_break',
        'page_break',
        'desc',
        'label',
        'fold_card',
        'section_break']
};