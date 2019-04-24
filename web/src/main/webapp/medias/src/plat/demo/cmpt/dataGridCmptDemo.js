var gridVm;
$(function () {

    gridVm = new Rxvm({
        widget: RX.Grid,
        template: "loadTpl:noButtonGridTpl",
        el: '.base_box',
        data: {
            list: [
                {ID: 1, USER_NAME: "a1"},
                {ID: 2, USER_NAME: "a2"},
                {ID: 2, USER_NAME: "a3"},
                {ID: 2, USER_NAME: "a4"},
                {ID: 2, USER_NAME: "a5"},
                {ID: 2, USER_NAME: "a6"},
                {ID: 2, USER_NAME: "a7"},
                {ID: 2, USER_NAME: "a8"},
                {ID: 2, USER_NAME: "a9"},
                {ID: 2, USER_NAME: "a10"},
                {ID: 2, USER_NAME: "a11"},
                {ID: 2, USER_NAME: "a12"},
                {ID: 2, USER_NAME: "a13"},
                {ID: 2, USER_NAME: "a14"},
                {ID: 2, USER_NAME: "a15"},
                {ID: 2, USER_NAME: "a16"},
                {ID: 2, USER_NAME: "a17"},
                {ID: 2, USER_NAME: "a18"},
                {ID: 2, USER_NAME: "a19"},
                {ID: 2, USER_NAME: "a20"},
                {ID: 2, USER_NAME: "a21"}
            ]
        },
        settings: settings,
        config: config
    });

});



