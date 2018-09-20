require(['config'], function () {

    require(['jquery', 'custom'], function ($) {
        $('#pageHeader').load('../html/commonHtml.html #pageHeader .container', function () {
            $('#pageHeader').indexs();
        });
        $('#header_b').load('../html/commonHtml.html #header_b .container');
        $('nav').load('../html/commonHtml.html nav .tab1 ', function () {
            $('nav').indexs();
        });
        $('aside').load('../html/commonHtml.html aside .asideFix', function () {
            $('aside').indexs();
        });
        $('footer').load('../html/commonHtml.html #pageFooter .footer_t,#pageFooter .footer_b');


        
        let goods = {
            title:'h1',
            price:'.goods_price',
            name:'.goods_name',
            from:'.goods_from',
            guoyao:'.goods_num',
            guige:'.guige',
            //放大镜

            midimg:'#midimg',//中图
            imageMenu:'#imageMenu',//小图

            init(){
                $.get('../api/details.php',`id=${location.search.slice(1)}`, (data)=>{
                    // console.log(data)
                    this.res = JSON.parse(data)[0];

                    this.zoomImg = JSON.parse(this.res.zoomsmall); 
                    // console.log(this.res,this.zoomImg);

                     //创建ul
                     this.ul = $('<ul/>');

                    this.render(this.res);//渲染页面

                    this.jxzoom(this.zoomImg);//放大镜渲染

                    //点击事件
                    $('.numBox').on('click','i',function(){
                        //点击获取输入框内容
                        let val = $('.addNum').val()*1;

                        if($(this).hasClass('add_icon')){
                            val++;
                        }else if($(this).hasClass('reduce_icon')){
                            val--;
                            if(val<=1){
                                val = 1;
                            }
                        }
                        $('.addNum').val(val);
                    })

                });
            },

            //渲染页面
            render(res){
                $(this.title).html(`<i></i>${res.goodsname}`);
                $(this.price).html(`￥${res.vip}`);
                $(this.name).html(`${res.usuallyname}`);
                $(this.from).html(`${res.makefrom}`);
                $(this.guoyao).html(`${res.agreenum}`);
                $(this.guige).html(`${res.guige}<i></i>`);


            },
            //渲染放大镜
            jxzoom(zoomImg){
                //放大镜
                $(this.midimg).attr('src',zoomImg[0]);
                $(this.midimg).css({
                    'width':398,
                    'height':398
                })

                this.ul.html(
                    zoomImg.map(item=>{
                        return `<li><img src="${item}" width="68" height="68"></li>`
                        
                    }).join("")
                )
                console.log(this.imageMenu)
                $(this.imageMenu).html(this.ul);
                
                //给第一个li添加id，因为别人的插件需要用到
                $(this.ul).children(':first-child').attr('id','onlickImg');
                
                zoom($(this.ul).children().length);
                
            }
        }
        goods.init();

        //放大镜
        function zoom(lengths){
            // 图片上下滚动
            var count = $("#imageMenu li").length - lengths; /* 显示 6 个 li标签内容 */
            console.log(count)
            var interval = $("#imageMenu li:first").width();
            var curIndex = 0;

            $('.scrollbutton').click(function () {
                if ($(this).hasClass('disabled')) return false;

                if ($(this).hasClass('smallImgUp'))--curIndex;
                else ++curIndex;

                $('.scrollbutton').removeClass('disabled');
                if (curIndex == 0) $('.smallImgUp').addClass('disabled');
                if (curIndex == count - 1) $('.smallImgDown').addClass('disabled');

                $("#imageMenu ul").stop(false, true).animate({ "marginLeft": -curIndex * interval + "px" }, 600);
            });
            // 解决 ie6 select框 问题
            $.fn.decorateIframe = function (options) {
                if ('undefined' == typeof(document.body.style.maxHeight)) {
                    var opts = $.extend({}, $.fn.decorateIframe.defaults, options);
                    $(this).each(function () {
                        var $myThis = $(this);
                        //创建一个IFRAME
                        var divIframe = $("<iframe />");
                        divIframe.attr("id", opts.iframeId);
                        divIframe.css("position", "absolute");
                        divIframe.css("display", "none");
                        divIframe.css("display", "block");
                        divIframe.css("z-index", opts.iframeZIndex);
                        divIframe.css("border");
                        divIframe.css("top", "0");
                        divIframe.css("left", "0");
                        if (opts.width == 0) {
                            divIframe.css("width", $myThis.width() + parseInt($myThis.css("padding")) * 2 + "px");
                        }
                        if (opts.height == 0) {
                            divIframe.css("height", $myThis.height() + parseInt($myThis.css("padding")) * 2 + "px");
                        }
                        divIframe.css("filter", "mask(color=#fff)");
                        $myThis.append(divIframe);
                    });
                }
            }
            $.fn.decorateIframe.defaults = {
                iframeId: "decorateIframe1",
                iframeZIndex: -1,
                width: 0,
                height: 0
            }
            //放大镜视窗
            $("#bigView").decorateIframe();
            //点击到中图
            var midChangeHandler = null;

            $("#imageMenu li img").bind("click", function () {
                if ($(this).attr("id") != "onlickImg") {
                    midChange($(this).attr("src").replace("small", "mid"));
                    $("#imageMenu li").removeAttr("id");
                    $(this).parent().attr("id", "onlickImg");
                }
            }).bind("mouseover", function () {
                if ($(this).attr("id") != "onlickImg") {
                    window.clearTimeout(midChangeHandler);
                    midChange($(this).attr("src").replace("small", "mid"));
                    $(this).css({ "border": "1px solid #f03b43" }).parent().siblings().children().css({"border":"none"});
                }
            }).bind("mouseout", function () {
                if ($(this).attr("id") != "onlickImg") {
                    $(this).removeAttr("style");
                    midChangeHandler = window.setTimeout(function () {
                        midChange($("#onlickImg img").attr("src").replace("small", "mid"));
                    }, 1000);
                }
            });
            function midChange(src) {
                $("#midimg").attr("src", src).on('load',function () {
                    changeViewImg();
                });
            }
            //大视窗看图
            function mouseover(e) {
                if ($("#winSelector").css("display") == "none") {
                    $("#winSelector,#bigView").show();
                }
                $("#winSelector").css(fixedPosition(e));
                e.stopPropagation();
            }
            function mouseOut(e) {
                if ($("#winSelector").css("display") != "none") {
                    $("#winSelector,#bigView").hide();
                }
                e.stopPropagation();
            }
            $("#midimg").mouseover(mouseover); //中图事件
            $("#midimg,#winSelector").mousemove(mouseover).mouseout(mouseOut); //选择器事件

            var $divWidth = $("#winSelector").width(); //选择器宽度
            var $divHeight = $("#winSelector").height(); //选择器高度
            var $imgWidth = $("#midimg").width(); //中图宽度
            var $imgHeight = $("#midimg").height(); //中图高度
            var $viewImgWidth = $viewImgHeight = $height = null; //IE加载后才能得到 大图宽度 大图高度 大图视窗高度

            function changeViewImg() {
                $("#bigView img").attr("src", $("#midimg").attr("src").replace("mid", "big"));
            }
            changeViewImg();
            $("#bigView").scrollLeft(0).scrollTop(0);
            function fixedPosition(e) {
                if (e == null) {
                    return;
                }
                var $imgLeft = $("#midimg").offset().left; //中图左边距
                var $imgTop = $("#midimg").offset().top; //中图上边距
                X = e.pageX - $imgLeft - $divWidth / 2; //selector顶点坐标 X
                Y = e.pageY - $imgTop - $divHeight / 2; //selector顶点坐标 Y
                X = X < 0 ? 0 : X;
                Y = Y < 0 ? 0 : Y;
                X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;
                Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;

                if ($viewImgWidth == null) {
                    $viewImgWidth = $("#bigView img").outerWidth();
                    $viewImgHeight = $("#bigView img").height();
                    if ($viewImgWidth < 200 || $viewImgHeight < 200) {
                        $viewImgWidth = $viewImgHeight = 800;
                    }
                    $height = $divHeight * $viewImgHeight / $imgHeight;
                    $("#bigView").width($divWidth * $viewImgWidth / $imgWidth);
                    $("#bigView").height($height);
                }
                var scrollX = X * $viewImgWidth / $imgWidth;
                var scrollY = Y * $viewImgHeight / $imgHeight;
                $("#bigView img").css({ "left": scrollX * -1, "top": scrollY * -1 });

                $("#bigView").css({ "top": 15, "left": $(".preview").position().left + $(".preview").width() + 15 });

                return { left: X, top: Y };
            }
        }
    })
})
