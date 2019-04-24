//搜索部分配置
//model渲染方案配置
var searchConfig = {
    "query.RULE_NAME": {
        tagName: "规则名称",
        maxLength: 50
    }
};
//规定表头
var columns = [
    {title: '规则名称', id: 'RULE_NAME', width: '200', align: 'left', renderer: "String"},
    {title: '规则实现方式', id: 'SXFS', width: '200', align: 'left', renderer: "String"},
    {
        title: '最后修改时间',
        id: 'XGSJ',
        width: '',
        align: 'left',
        renderer: "Date",
        format: "yyyy-MM-dd"
    }
];
//列表视图设置
var tableSettings = {
    url: "/rule/getAuthRuleList",
    autoQueryBox: {
        enable: true
    },
    autoListBox: {
        enable: true,
        columns: columns
    }
};