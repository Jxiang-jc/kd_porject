require(['config'], function () {

    require(['jquery', 'custom', 'ellipsis'], function ($) {
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
            title: 'h1',
            price: '.goods_price',
            name: '.goods_name',
            from: '.goods_from',
            guoyao: '.goods_num',
            guige: '.guige',
            //放大镜
            midimg: '#midimg',//中图
            imageMenu: '#imageMenu',//小图
            //分店
            store: '.store',

            init() {
                //放大镜及细节
                $.get('../api/details.php', `id=${location.search.slice(1)}`, (data) => {
                    // console.log(data)
                    this.res = JSON.parse(data)[0];

                    this.zoomImg = JSON.parse(this.res.zoomsmall);
                    // console.log(this.res,this.zoomImg);

                    //创建ul
                    this.ul = $('<ul/>');

                    this.render(this.res);//渲染页面

                    this.jxzoom(this.zoomImg);//放大镜渲染

                    //点击事件
                    $('.numBox').on('click', 'i', function () {
                        //点击获取输入框内容
                        let val = $('.addNum').val() * 1;

                        if ($(this).hasClass('add_icon')) {
                            val++;
                        } else if ($(this).hasClass('reduce_icon')) {
                            val--;
                            if (val <= 1) {
                                val = 1;
                            }
                        }
                        $('.addNum').val(val);
                    })

                });

                //分店
                $.get('../api/location.php', (data) => {
                    this.datas = JSON.parse(data);
                    // console.log(this.datas);
                    //创建ul
                    this.ul2 = $('<ul class="clearfix"/>');


                    this.div = $('<div class="changeModel"/>');



                    this.loca(this.datas, this.datas[0]);


                    $(this.store).on('mouseover', 'li', (e) => {
                        console.log(e.target)
                        $(e.target).addClass('cur').siblings().removeClass('cur');

                        //获取当前文本内容
                        var values = $(e.target).text();

                        $.get('../api/location.php', { 'name': values }, (res) => {
                            let details = JSON.parse(res);
                            details = details[0];
                            // console.log(details)

                            this.locaImg(details);

                        })

                    })
                })




                // 用于保存浏览记录
                var historyList = [];



                // 先获取cookie
                var cookie = document.cookie.split('; ');
                console.log(cookie);//["currentGoods={"id":"1","imgurl":"../images/goodsli…"12.00","sale":"12","time":"2019-02-01 14:48:44"}"]
                this.getCookie(cookie,historyList);

                //点击清空浏览记录
                $('.empty span').on('click', function () {
                    console.log($('.recBro'))
                    $('.recBro').html('您已清空最近浏览过的商品');

                    var now = new Date();
                    now.setDate(now.getDate() - 1);
                    document.cookie = 'historyList=' + JSON.stringify([]) + ';expires=' + now;
                    document.cookie = 'currentGoods=' + JSON.stringify([]) + ';expires=' + now;
                })

            },

            //渲染页面
            render(res) {
                $(this.title).html(`<i></i>${res.goodsname}`);
                $(this.price).html(`￥${res.vip}`);
                $(this.name).html(`${res.usuallyname}`);
                $(this.from).html(`${res.makefrom}`);
                $(this.guoyao).html(`${res.agreenum}`);
                $(this.guige).html(`${res.guige}<i></i>`);


            },
            //渲染放大镜
            jxzoom(zoomImg) {
                //放大镜
                $(this.midimg).attr('src', zoomImg[0]);
                $(this.midimg).css({
                    'width': 398,
                    'height': 398
                })

                this.ul.html(
                    zoomImg.map(item => {
                        return `<li><img src="${item}" width="68" height="68"></li>`

                    }).join("")
                )
                $(this.imageMenu).html(this.ul);

                //给第一个li添加id，因为别人的插件需要用到
                this.ul.children(':first-child').attr('id', 'onlickImg');

                zoom($(this.ul).children().length);

            },
            //渲染全国分店
            loca(datas) {
                //遍历获取城市名
                this.ul2.html(
                    datas.map(item => {
                        return `<li>${item.name}</li>`
                    }).join('')
                )

                $(this.store).append(this.ul2);

                //高亮当前
                this.ul2.children(':first-child').addClass('cur');

                //一进页面时先有一个
                this.div.html(
                    `<img src="../images/goods/position/position (2).jpg"width="209">
                    <div class="address">
                        <span><i></i> 020-87613558，020-87303808</span>
                        <span><i></i>广州市越秀区先烈南路9号101房</span>
                    </div> `
                )
                $('.address span:last').ellipsis({ row: 2, char: '...' })

                $(this.store).append(this.div);

            },
            locaImg(details) {
                //生成图片电话及地址
                this.div.html(
                    `<img src="${details.imgurl}"width="209">
                    <div class="address">
                        <span><i></i> ${details.phone}</span>
                        <span><i></i>${details.localtion}</span>
                    </div> `
                )
                $('.address span:last').ellipsis({ row: 2, char: '...' })

                $(this.store).append(this.div);
            },
            //获取浏览记录
            getCookie(cookie,historyList) {
                // 用于保存当前商品信息
                var currentGoods;


                cookie.forEach(function (item) {
                    var arr = item.split('=');
                    if (arr[0] === 'currentGoods') {
                        currentGoods = JSON.parse(arr[1]);
                    } else if (arr[0] === 'historyList') {
                        historyList = JSON.parse(arr[1]);
                    }
                });
                // 如果当前商品已经存在historyList，则删除（放置重复）
                if (historyList.length > 0) {
                    for (var i = 0; i < historyList.length; i++) {
                        if (historyList[i].id === currentGoods.id) {
                            historyList.splice(i, 1);
                            break;
                        }
                    }
                }

                historyList.unshift(currentGoods);
                // 重新把history写回cookie
                // 3天有效期
                var now = new Date();
                now.setDate(now.getDate() + 3);
                document.cookie = 'historyList=' + JSON.stringify(historyList) + ';expires=' + now;

                // 把历史记录写入页面.history
                var $recBroUl = $('<ul class="clearfix"/>')

                $recBroUl.append(historyList.map(function (item) {
                    return `<li>
                    <p class="recImg"><a href="goods.html?${item.id}"y><img src="${item.imgurl}" width="100" height="100"  alt=""></a></p>
                    <p class="recName"><a href="goods.html?${item.id}">${item.name}</a> </p>
                    <p class="recPri">￥${item.price}</p>
                    <li/>`
                }).join('')
                )
                console.log($recBroUl)
                this.$recBroUl = $recBroUl;
                $('.recBro').append($recBroUl);

            }

        }
        goods.init();

        //放大镜
        function zoom(lengths) {
            // 图片上下滚动
            var count = $("#imageMenu li").length - lengths; /* 显示 6 个 li标签内容 */
            // console.log(count)
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
                if ('undefined' == typeof (document.body.style.maxHeight)) {
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
                    $(this).css({ "border": "1px solid #f03b43" }).parent().siblings().children().css({ "border": "none" });
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
                $("#midimg").attr("src", src).on('load', function () {
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
