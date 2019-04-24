$(function () {
    $(".ce > li > a").click(function () {
        var $this = $(this);
        if($this.next().length && $this.next().prop("tagName") === "UL"){
            $this.parents().siblings().find(".er").hide(300);
            $this.siblings(".er").toggle(300);
        }else{
            $this.addClass("xz").parents().siblings().find("a").removeClass("xz");
            $this.parents().siblings().find(".er").hide(300).find(".sen_x").removeClass("sen_x");
            $this.parents().siblings().find(".er > li > .thr").hide().parents().siblings().find(".thr_nr").hide();
        }
        setTimeout(function () {
            $('.item').perfectScrollbar("update");
        }, 300);
    });

    $(".er > li > a").click(function () {
        var $this = $(this);
        $this.addClass("sen_x").parents().siblings().find("a").removeClass("sen_x");
        $this.parents().siblings().find("a").removeClass("xz");
        $this.parents().siblings().find(".thr").hide(300);
        $this.siblings(".thr").toggle(300);
        setTimeout(function () {
            $('.item').perfectScrollbar("update");
        }, 300);
    });

    $(".thr > li > a").click(function () {
        var $this = $(this);
        $this.addClass("xuan").parents().siblings().find("a").removeClass("xuan");
        $this.parents().siblings().find(".thr_nr").hide();
        $this.siblings(".thr_nr").toggle();
        setTimeout(function () {
            $('.item').perfectScrollbar("update");
        }, 300);
    });
});

