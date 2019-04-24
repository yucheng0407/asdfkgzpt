var checkObj = {
    "YDKHAP": function (param) {
        var showPageCode = "YDKHAP";
        if (param.listInTag) {
            showPageCode = param.showPageCode;
        }
        return showPageCode;
    },
    // "KHTB": function (param) {
    //     var showPageCode = "KHTB";
    //     if (param.listInTag) {
    //         showPageCode = "YDKHAP,JCZGLB," + showPageCode;
    //     }
    //     if (param.dataId && param.sort != 1 && param.sort != 2 && param.sort != 3) {
    //         showPageCode += ",JJCF";
    //     }
    //     return showPageCode;
    // },
    // "GKZB": function (param) {//招标采购-公开招标
    //     var showPageCode = 'GKZBCGXQ,GKZBCGWT,GKZBWJHQ,GKZBGWXX,GKZBPBRYBA,GKZBDG,GKZBZB,GKZBXZZBDLJG';
    //     $.ajax({
    //         type: "post",
    //         url: "/zbcg/getZbcgPage",
    //         data: {zbcg_id: param.dataId},
    //         async: false,
    //         success: function (ar) {
    //             if (ar.success && ar.data) {
    //                 if (ar.data.ZY > 0) {
    //                     showPageCode += ",ZYLB";
    //                 }
    //                 if (ar.data.CQ > 0) {
    //                     showPageCode += ",CQLB";
    //                 }
    //                 if (ar.data.BQLZ > 0) {
    //                     showPageCode += ",BQLZLB";
    //                 }
    //                 if (ar.data.DWTH > 0) {
    //                     showPageCode += ",SXZBDWTH";
    //                 }
    //             }
    //         }
    //     });
    //     return showPageCode;
    // }
};