/*
	放置公共函数
 */

// 明确目的

/**
 * [生成任意范围内的随机整数]
 * @param  {Number} min [最小值]
 * @param  {Number]} max [最大]
 * @return {Number}     [返回min到max间的随机整数]
 */
function randomNumber(min,max){
	// 假设
	// Math.random()最小时 -> min
	// ....
	// Math.random()最大时 -> max
	var res = parseInt(Math.random()*(max-min+1))+min;//0.999


	return res;
}

// randomNumber(1,100);
// randomNumber(100,999);
// randomNumber(10,20);

/**
 * [随机颜色]
 * @return {String} [返回rgb格式随机颜色]
 */
function randomColor(num){
	if(num === 16){
		var str = '0123456789abcdef';
		var res = '#';

		for(var i=0;i<6;i++){
			// 获取随机索引值
			var idx = parseInt(Math.random()*str.length);
			res += str.charAt(idx);
		}

		return res;
	}

	var r = parseInt(Math.random()*256);
	var g = parseInt(Math.random()*256);
	var b = parseInt(Math.random()*256);

	return 'rgb('+r+','+g+','+b+')';//rgb(244,12,23)
}


// function randomCode(num){

// }

// randomCode(4);

/**
 * [关于元素节点的操作]
 * 	1.过滤非元素节点
 * 	2.获取子元素
 * 	3.获取兄弟元素
 */
var Element = {
	/**
	 * [过滤非元素节点，得到元素节点]
	 * @param  {Array} nodes [节点列表]
	 * @return {Array}       [元素列表]
	 */
	filter:function(nodes){
		// 声明res变量，用于存放结果
		var res = [];
		for(var i=0;i<nodes.length;i++){
			// 判断是否为元素节点
			// 是：则写入res数组
			if(nodes[i].nodeType === 1){
				res.push(nodes[i]);
			}
		}

		return res;
	},
	children:function(ele){
		// var res = [];
		// for(var i=0;i<ele.childNodes.length;i++){
		// 	if(ele.childNodes[i].nodeType === 1){
		// 		res.push(ele.childNodes[i])
		// 	}
		// }

		// return res;
		return this.filter(ele.childNodes);
	},
	prev:function(ele){

	},
	next:function(ele){}
}

// Element.children(box);//得到box下面的所有子元素
// Element.prev(box);//得到box的前一个元素
// Element.next(box);//得到box后面的兄弟元素


// 封装一个函数，用于获取元素的css样式，兼容所有浏览器
function getCss(ele,attr){
	if(window.getComputedStyle){
		// 标准浏览器
		return getComputedStyle(ele)[attr]
	}else if(ele.currentStyle){
		// IE6,7,8
		return ele.currentStyle[attr]
	}else{
		// 内联样式
		return ele.style[attr];
	}
}

// 先用
// getCss(box,'font-size');

/**
 * [给元素绑定事件的效果,同名事件不覆盖]
 * @param  {Node}  ele       [绑定事件的节点]
 * @param  {String}  type      [事件类型]
 * @param  {Function}  handler   [事件处理函数]
 * @param  {Boolean} isCapture [是否捕获]
 */
function bind(ele,type,handler,isCapture){
	// 判断当前是否支持addEventListener
	if(ele.addEventListener){
		// 标准浏览器
		ele.addEventListener(type,handler,isCapture);
	}else if(ele.attachEvent){
		// IE8-
		ele.attachEvent('on'+type,handler)
	}else{
		// 其他浏览器
		ele['on' + type] = handler;
	}
}

// 给元素绑定事件的效果
// 同名事件不覆盖
// bind(box,'click',function(){},true)

// 只生效一次的事件
function one(ele,type,handler,isCapture){

}

// Cooie的操作
var Cookie = {
	/**
	 * [获取cookie]
	 * @param  {String} name [cookie名]
	 * @return {String}      [返回name对应的cookie值]
	 */
	get:function(name){
		// 获取所有cookie
		var cookies = document.cookie;//

		// 声明变量，用于保存结果
		var res = '';

		// 转成数组
		cookies = cookies.split('; ');

		// 遍历cookie找出name对应的值
		for(var i=0;i<cookies.length;i++){
			// 获取当前cookie
			var arr = cookies[i].split('=');

			// 找出name对应的cookie
			if(arr[0] === name){
				res = arr[1];
			}
		}

		// 返回name对应的值
		// 无则返回cookie
		return res;
	},
	/**
	 * [删除cookie]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	remove:function(name){
		var now = new Date();
		now.setDate(now.getDate()-1);

		// document.cookie = name + '=x;expires='+now.toUTCString()
		this.set(name,'x',{expires:now});
	},
	/**
	 * [设置Cookie]
	 * @param {String} name  [cookie名]
	 * @param {String} value [cookie值]
	 * @param {[Object]} prop  [参数]
	 	* expires
	 	* path
	 	* domain
	 	* secure
	 */
	set:function(name,value,prop){
		// cookie必写部分
		var str = name + '=' + value;

		// 不传参数时避免报错
		if(prop === undefined){
			prop = {};
		}

		// 有效期
		if(prop.expires){
			str += ';expires=' + prop.expires.toUTCString();
		}

		// 保存路径
		if(prop.path){
			str +=';path=' + prop.path
		}

		// 域名
		if(prop.domain){
			str +=';domain=' + prop.domain
		}

		// 安全性
		if(prop.secure){
			str += ';secure';
		}

		// 写入cookie
		document.cookie = str;
	},

}

// Cookie.get('username');//laoxie
// Cookie.set('passowrd','123456',{path:'/'});//laoxie
// Cookie.set('passowrd','abcd',{expires:now,path:'/',secure:true});//laoxie
// Cookie.remove()


// 
// 



// animate(item[i],'top',160)
// animate(item[i],'top',5)


function animate(ele,opt,callback){
	// 记录属性数量
	var timerLen = 0;

	for(var attr in opt){
		// 每循环一个属性+1
		timerLen++;

		(function(attr){
			// 获取目标值
			var target = opt[attr];

			var timerName = attr + 'timer';

			// 避免抖动
			clearInterval(ele[timerName]);

			ele[timerName] = setInterval(function(){
				// 获取当前值
				// var current = getComputedStyle(ele)[attr];
				var current = getCss(ele,attr);//可能达到的值：-165px,200px,0.5,1,45deg,#1258bc
				// console.log(current)
				// 提取单位
				var unit = current.match(/^([\-\d\.]+)([a-z]*)$/);//null

				if(!unit){
					// 如果得到null,意味动画无法进行，直接退出
					clearInterval(ele.timer);
					return;
				}

				// 提取值和单位
				current = unit[1]*1;
				unit = unit[2];

				// 计算缓冲速度
				var speed = (target-current)/10;//0.6->1，-0.6->-1

				// speed不能为0
				speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

				// 针对opacity处理speed
				if(attr === 'opacity'){
					speed = speed<0 ? -0.05 : 0.05;
				}

				current += speed;

				// 判断结束条件
				if(current === target){
					clearInterval(ele[timerName]);

					// 重置目标值
					current = target;

					// 每结束一个定时器，数量-1
					timerLen--;

					// 执行背景颜色改变
					if(typeof callback === 'function' && timerLen===0){
						callback();
					}
				}

				// 设置样式
				ele.style[attr] = current + unit;
			},30);

		})(attr);

	}
}

/**
 * 数据类型判断终极版
 * @param  {Every} data [任意数据类型]
 * @return {String}      [数据类型字符串]
 */
function type(data){
	return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}

//require配置

require.config({

    //配置短路径
    paths: {
        'jquery': '../lib/jquery-3.2.1',
        'jxcarousel': '../lib/jx-Carousel/jquery.carousel',//自己封装轮播图插件
        'common': 'common',//commonjs
        'bootstrapjs':'../lib/bootstrap-3.3.7-dist/js/bootstrap.min',
        // 'index':'index',
        // 'listPage':'listPage',
        'custom':'custom',//首页公共的js
        'pagination':'../lib/jqueryPagination/jquery.pagination.min',//分页插件
        'ellipsis':'../lib/ellipsis/dist/jquery.ellipsis.min'//文本溢出插件

    },

    //配置模块间依赖关系
    //讲明依赖关系（加载过程中自动处理先后顺序）

    shim: {
        // 配置模块间依赖关系
        // 讲明：lxzoom依赖jquery（加载过程中自动处理先后顺序）
        'jxcarousel': ['common'],
        'jxcarousel': ['jquery'],
        'bootstrapjs':['jquery'],
        'listPage' : ['jquery'],
        // 'custom':['bootstrapjs'],
        // 'listPage':['custom'],
        'custom':['jquery'],
        'pagination':['jquery'],
        'ellipsis':['jquery']

    },
});

(function($){
    $.prototype.indexs = function () {
        //头部二级导航
        $('.mykdl').hover(() => {
            $('.mykdl ul').removeClass('hide').addClass('shows')
            $('.jiantou1').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
        }, () => {
            $('.mykdl ul').removeClass('shows').addClass('hide')
            $('.jiantou1').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
        })

        $('.wzdh').hover(() => {
            $('.wzdh div').removeClass('hide').addClass('shows')
            $('.jiantou2').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
        }, () => {
            $('.wzdh div').removeClass('shows').addClass('hide')
            $('.jiantou2').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
        })

        // nav导航点击获取更多
        // 创建对象
        var downList = {
            //属性啊 
            ele: '.downList',
            //方法
            //初始化
            init() {
                this.ele = $(this.ele);
                let $h3 = this.ele.find('h3');

                $h3.on('click', function () {
                    if ($('.more').is(':visible')) {
                        $('.up').hide();
                        $('.more').slideUp(500, function () {
                            $('.down').show();
                        })
                    } else {
                        $('.down').hide();
                        $('.more').slideDown(500, function () {
                            $('.up').show();
                        });
                    }
                })

                $('.up').on('click', () => {
                    console.log(666)
                    let timer = setInterval(() => {
                        //计算缓冲速度
                        let speed = Math.ceil(window.scrollY / 10);

                        scrollBy(0, -speed);

                        if (window.scrollY === 0) {
                            clearInterval(timer);
                        }
                    }, 30)
                })
            }
        }
        downList.init();

        // //点击回到顶部
        $('.toTop').on('click', (e) => {
            console.log(666)
            e.preventDefault();
            let timer = setInterval(() => {
                //计算缓冲速度
                let speed = Math.ceil(window.scrollY / 10);

                scrollBy(0, -speed);

                if (window.scrollY === 0) {
                    clearInterval(timer);
                }
            }, 30)
        })
    }
})(jQuery)


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
            //吸顶
            topAnchor: '.topAnchor',

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

                // 先获取cookie 浏览记录
                var cookie = document.cookie.split('; ');
                console.log(cookie);//["currentGoods={"id":"1","imgurl":"../images/goodsli…"12.00","sale":"12","time":"2019-02-01 14:48:44"}"]

                this.getCookie(cookie);

                //点击清空浏览记录
                $('.empty span').on('click', function () {
                    console.log($('.recBro'))
                    $('.recBro').html('您已清空最近浏览过的商品');

                    var now = new Date();
                    now.setDate(now.getDate() - 1);

                    //清空cookie
                    document.cookie = 'historyList=' + JSON.stringify('x') + ';expires=' + now;
                    document.cookie = 'currentGoods=' + JSON.stringify('x') + ';expires=' + now;
                })

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

                //吸顶
                window.onscroll = () => {
                    if (scrollY > 900) {
                        $(this.topAnchor).css('display', 'block');
                        $('.rigAnchor').css({
                            'position': 'fixed',
                            'top': 68,
                            'right': '10%'
                        })
                    } else {
                        $(this.topAnchor).css('display', 'none');
                        $('.rigAnchor').css({
                            'position': 'absolute',
                            'top': 40,
                            'right': 0
                        })
                    }
                }

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
            getCookie(cookie) {

                // 用于保存当前商品信息
                var currentGoods;

                // 用于保存浏览记录
                var historyList = [];

                cookie.forEach(function (item) {
                    var arr = item.split('=');
                    if (arr[0] === 'currentGoods') {
                        currentGoods = JSON.parse(arr[1]);
                    } else if (arr[0] === 'historyList') {
                        historyList = JSON.parse(arr[1]);
                    }
                });

                // 如果当前商品已经存在historyList，则删除（放置重复）
                for (var i = 0; i < historyList.length; i++) {
                    if (historyList[i].id === currentGoods.id) {
                        historyList.splice(i, 1);
                        break;
                    }
                }

                //清空所有以后，currentGoods就没了，所以需要判断，不然会出错，虽然不会影响实际，但看到红色的我就是不舒服哈哈哈
                if (currentGoods != null) {
                    historyList.unshift(currentGoods);
                }
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

//引入模块化文件
require(['config'], function () {
    // console.log(66)
    require(['jquery', 'common', 'jxcarousel', 'bootstrapjs'], function ($) {
        //头部二级导航
        $('.mykdl').hover(() => {
            $('.mykdl ul').removeClass('hide').addClass('shows')
            $('.jiantou1').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
        }, () => {
            $('.mykdl ul').removeClass('shows').addClass('hide')
            $('.jiantou1').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
        })

        $('.wzdh').hover(() => {
            $('.wzdh div').removeClass('hide').addClass('shows')
            $('.jiantou2').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
        }, () => {
            $('.wzdh div').removeClass('shows').addClass('hide')
            $('.jiantou2').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
        })

        //nav导航点击获取更多
        //创建对象
        var downList = {
            //属性啊 
            ele: '.downList',
            //方法
            //初始化
            init() {
                this.ele = $(this.ele);
                let $h3 = this.ele.find('h3');

                $h3.on('click', function () {
                    if ($('.more').is(':visible')) {
                        $('.up').hide();
                        $('.more').slideUp(500, function () {
                            $('.down').show();
                        })
                    } else {
                        $('.down').hide();
                        $('.more').slideDown(500, function () {
                            $('.up').show();
                        });
                    }
                })

                $('.up').on('click', () => {
                    console.log(666)
                    let timer = setInterval(() => {
                        //计算缓冲速度
                        let speed = Math.ceil(window.scrollY / 10);

                        scrollBy(0, -speed);

                        if (window.scrollY === 0) {
                            clearInterval(timer);
                        }
                    }, 30)
                })
            }
        }
        downList.init();

        //轮播图使用
        $('.carousel').jxcarousel({
            ele: '.banner_l',
            width: 670,
            height: 450,
            num: false,
            index: 0,
            page: true,
            imgs: ["../images/indexImg/banner/banner(1).jpg", "../images/indexImg/banner/banner(2).jpg", "../images/indexImg/banner/banner(3).jpg", "../images/indexImg/banner/banner(4).jpg", "../images/indexImg/banner/banner(5).jpg", "../images/indexImg/banner/banner(6).jpg"],
            duration: 4000
        })

        //请求数据生成列表
        function limitbuy() {
            $.ajax({
                type: 'get',
                url: '../api/limitBuy.php',
                data: {
                    param: 'tejia',
                },
                success: function (data) {
                    var res = JSON.parse(data);
                    // console.log(res)
                    $('.imgbox').html(
                        res.map(function (item) {
                            return `<li>
                                <a href="#"><img src="${item.imgurl}" width="140" ,height="140"></a>
                                <p>${item.name}</p>
                                <p>￥${item.price}</p>
                            </li>`
                        }).join('')
                    )

                }
            })
        }

        //限时轮播图
        function banner() {
            $.get("../api/limitBuy.php", { 'del': 1 },
                function (data) {
                    var res = JSON.parse(data);
                    // console.log(res)

                    //限时轮播
                    $('.limitBox').jxcarousel({
                        ele: '.limitBox',
                        width: 308,
                        height: 251,
                        num: false,
                        index: 0,
                        page: true,
                        duration: 3000,
                        button: false,
                        imgbox: res
                    })
                }
            )
        }

        banner();

        limitbuy();

        //一级tab切换
        $('.activeTab').on('mouseover', 'li', function () {

            //当前高亮
            $(this).css({ 'background': '#f54343', 'color': '#fff' }).siblings().css({ 'background': '#f9f9f9', 'color': '#000' });

            //改变li时,secTab也要跟着改变
            //先隐藏所有的div
            $(this).closest('.activeTab').next().find('.secTab2').css('display', 'none');

            //当前li的父母的下一个兄弟的后代.通过鼠标移动时获取当前li的索引值来找出是哪个后代,在获取后代的div
            $(this).closest('.activeTab').next().find('.secTab').eq($(this).index()).children().eq(0).css('display', 'block');


            //声明一个变量用于传参
            let content = 'tejia';

            if ($(this).hasClass('tjTab')) {
                content = 'tejia'
            }
            else if ($(this).hasClass('rmTab')) {
                content = 'hotSale';
            }
            else if ($(this).hasClass('rpTab')) {
                content = 'evaluate';
            }
            else if ($(this).hasClass('xpTab')) {
                content = 'newGoods';
            }

            $.ajax({
                type: 'get',
                url: '../api/limitBuy.php',
                data: {
                    param: content,
                },
                success: function (data) {
                    var res = JSON.parse(data);

                    $('.imgbox').html(
                        res.map(function (item) {
                            return `<li>
                                <a href="#"><img src="${item.imgurl}" width="140" ,height="140"></a>
                                <p>${item.name}</p>
                                <p>￥${item.price}</p>
                            </li>`
                        }).join('')
                    )
                }
            })
        })

        //二级tab切换
        $('.secTab').on('mouseover', 'li', function (e) {
            //当前高亮
            $(this).css({ 'background': '#f54343', 'color': '#fff' }).siblings().css({ 'background': '#f9f9f9', 'color': '#000' });

            let content = 'secTab';

            $.ajax({
                type: 'get',
                url: '../api/limitBuy.php',
                data: {
                    param: content,
                },
                success: function (data) {
                    var res = JSON.parse(data);

                    $('.imgbox').html(
                        res.map(function (item) {
                            return `<li>
                                <a href="#"><img src="${item.imgurl}" width="140" ,height="140"></a>
                                <p>${item.name}</p>
                                <p>￥${item.price}</p>
                            </li>`
                        }).join('')
                    )
                }
            })
        })

        //link Tab切换(bootstrap)
        $('#myTab a').mouseover(function (e) {
            e.preventDefault()
            $(this).tab('show')

            $(this).css('color', 'red').parent().siblings().children().css('color', '#666');
        })

        //点击回到顶部
        $('.toTop').on('click', (e) => {
            console.log(666)
            e.preventDefault();
            let timer = setInterval(() => {
                //计算缓冲速度
                let speed = Math.ceil(window.scrollY / 10);

                scrollBy(0, -speed);

                if (window.scrollY === 0) {
                    clearInterval(timer);
                }
            }, 30)
        })

        //获取用户名
        var cookie = document.cookie.split('; ');
        console.log(cookie);

        //用来存用户名信息
        var user;

        cookie.forEach(function (item) {
            // 拆分name/value
            var arr = item.split('=');
            console.log(arr)
            // 找到top,left，应用样式
            if (arr[0] === 'username') {
                user = JSON.parse(arr[1])
                $('.cookieUser').html(user);
                $('.reg_z').hide();
                $('.login_z').hide();
                $('.tuichu').show();
            }
        })

        $('.tuichu').on('click', function () {
            var now = new Date();
            now.setDate(now.getDate() - 1);
            document.cookie = 'username=' + JSON.stringify('') + ';expires=' + now + ';path=/';
            $('.tuichu').hide();
            $('.reg_z').show();
            $('.login_z').show();
            $('.cookieUser').html('');
        })

    })
});


require(['config'], function () {

    require(['jquery', 'custom', 'bootstrapjs', 'pagination'], function ($) {
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

        //手风琴
        $('.item').on("click", function () {
            $(this).next().slideToggle(100);
            $('.inneritem').not($(this).next()).slideUp('fast');
        });

        let page = {
            //属性
            list: '.cont_r',
            otherType: '.otherType',//其它科目
            sum: '.cont_rList_sum',//共计多少个商品
            disease: '.disease',//病种
            sort: '.filter_l',//按什么筛选 销量或者最新
            total: '.filter_ra',//总计多少个商品
            page: '.filter_rb',//显示当前页码
            pageNum: '.pageNum',//分页盒子
            btnSure: '.filter_rd',//跳转页按钮
            type: 'default',//默认显示的方式


            //初始化
            //获取/生成元素/绑定事件
            init() {
                let pageNo = 1;
                let qty = 28;

                this.pageNo = pageNo;
                this.qty = qty;
                this.list = $(this.list);

                this.getData(pageNo, qty);

                //点击跳转页面
                $('.filter_rd').on('click', 'span', e => {

                    pageNo = $(e.target).prev().val() * 1;//获取输入框内容

                    console.log(pageNo);
                    this.pageNo = pageNo;

                    $('.productList').html('');//清空页面内容

                    $(e.target).prev().val('');//清空输入框

                    // window.scrollTo(0, 200);
                    $('html,body').animate({scrollTop:200},2000);

                    this.getData(pageNo, qty);


                })

                //上一下 下一页
                $('.filter_rc').on('click', 'a', e => {
                    // console.log(this.pageNow)
                    if ($(e.target).hasClass('filter_rcNext')) {
                        console.log(666)
                        this.pageNow++;
                        if (this.pageNow > 1) {
                            $('.filter_rcPrev').css('display', 'block');
                        }
                        if (this.pageNow >= this.pageLen) {
                            $('.filter_rcNext').css('display', 'none');
                        }

                    }
                    else if ($(e.target).hasClass('filter_rcPrev')) {
                        this.pageNow--;
                        if (this.pageNow <= 1) {
                            $('.filter_rcPrev').css('display', 'none');
                        }
                        if (this.pageNow < this.pageLen) {
                            $('.filter_rcNext').css('display', 'block');
                        }
                    }

                    $('.productList').html('');//清空页面内容

                    this.getData(this.pageNow, qty);

                    e.preventDefault();

                })

                //点击销量排序
                $('.filter_l').on('click', 'li', e => {
                    e = e || window.event;

                    if ($(e.target).hasClass('xiaoliang')) {
                        console.log(666)
                        if (this.type == 'default' || this.type == 'time') {
                            $('.filter_l li:nth-child(2)').css({
                                'background': 'url(../images/goodslist/up.gif)',
                                'background-position': 'right 13px',
                                'background-repeat': 'no-repeat',
                                'color': '#f03b43'
                            }).next().css({
                                'color': '#666',
                                'background': 'url(../images/goodslist/Down2.gif)',
                                'background-position': 'right 14px',
                                'background-repeat': 'no-repeat',
                            })
                            this.type = 'sale';
                        } else if (this.type == 'sale') {
                            $('.filter_l li:nth-child(2)').css({
                                'background': 'url(../images/goodslist/Down.gif)',
                                'background-position': 'right 14px',
                                'background-repeat': 'no-repeat',
                                'color': '#f03b43'
                            }).next().css({
                                'color': '#666',
                                'background': 'url(../images/goodslist/Down2.gif)',
                                'background-position': 'right 14px',
                                'background-repeat': 'no-repeat',
                            })
                            this.type = 'default';
                        }

                        $('.productList').html('');//清空页面内容

                        this.getData(1, this.qty);
                    }
                    else if ($(e.target).hasClass('zuixin')) {
                        if (this.type == 'default' || this.type == 'sale') {
                            $('.filter_l li:nth-child(3)').css({
                                'background': 'url(../images/goodslist/up.gif)',
                                'background-position': 'right 13px',
                                'background-repeat': 'no-repeat',
                                'color': '#f03b43'
                            }).prev().css({
                                'color': '#666',
                                'background': 'url(../images/goodslist/Down2.gif)',
                                'background-position': 'right 14px',
                                'background-repeat': 'no-repeat',
                            })
                            this.type = 'time';
                        } else if (this.type == 'time') {
                            $('.filter_l li:nth-child(3)').css({
                                'background': 'url(../images/goodslist/Down.gif)',
                                'background-position': 'right 13px',
                                'background-repeat': 'no-repeat',
                                'color': '#f03b43'
                            }).prev().css({
                                'color': '#666',
                                'background': 'url(../images/goodslist/Down2.gif)',
                                'background-position': 'right 14px',
                                'background-repeat': 'no-repeat',
                            })
                            this.type = 'default';
                        }
                        $('.productList').html('');//清空页面内容

                        this.getData(1, this.qty);
                    }
                })

                //鼠标移入移出
                $('.productList').on('mouseover','li',function(){
                    $(this).addClass('cool');
                }).on('mouseout','li',function(){
                    $(this).removeClass('cool');
                })

                $('.productList').on('click','img,.proName',e=>{

                    location.href = 'goods.html?' + $(e.target).closest('li').attr('data-idx');
                        
                })
                

                //懒加载
                $(window).on('scroll', () => {//监听滚动事件
                    this.checkShow();
                })
            },
            //获取数据库数据
            getData(pageNo, qty) {
                $.get('../api/goodslist.php', `page=${pageNo}&qty=${qty}&type=${this.type}`, (data) => {
                    let res = JSON.parse(data);
                    // console.log(res);

                    this.pageNow = res.page;//当前分页

                    new GoodsList(res);
                    this.renderNum(res);
                    this.renderPage(res);

                    
                })
            },

            //生成数量总价等等
            renderNum(res) {

                $(this.sum).html(`共计<span style="color:#e4393c">${res.total}</span>件 <span style="color:#e4393c">肿瘤</span> 商品，您可以根据以下条件进行筛选。`);

                $(this.total).html(`<span style="color:#e4393c">总计 ${res.total} 个记录</span>`);

            },

            //渲染页码
            renderPage(res) {

                //计算分页总数
                var pageLen = Math.ceil(res.total / res.qty);

                this.pageLen = pageLen;

                $(this.page).html(`<span style="color:#e4393c">${this.pageNow}</span>/${pageLen}`);

                $("#pagination1").pagination({
                    currentPage: this.pageNo,
                    totalPage: pageLen,
                    callback: function (current) {
                        //这个逻辑我有点头大,首先,初始化的时候,先设定一个初始的页数,
                        //然后通过this去传递,传过来这个插件里面用,currentPage就是页码高亮时显示的数字,然后再通过回调函数去更新,这样,每点击一次,就能得到一个最新的currentPage值,
                        this.pageNo = current;

                        $('.productList').html('');//清空页面内容

                        window.scrollTo(0, 200);

                        this.getData(current, this.qty);

                    }.bind(this)
                });

                if(this.pageNow>1){
                    $('.filter_rcPrev').css('display', 'block');
                }else if(this.pageNow<=1){
                    $('.filter_rcPrev').css('display', 'none');
                }

            },

            checkShow() {//检查元素是否在可视范围内
                $('img').each((idx, item) => {//遍历每一个元素
                    var $cur = $(item);
                    // console.log(this.isShow($cur))
                    if($cur.data('isloaded')){return;}
                    if (this.isShow($cur)) {
                        setTimeout(() => {
                            this.showImg($cur);
                        }, 300)//设置时间是为了更好的看出效果
                    };
                });
            },
            //显示图片
            showImg($el) {
                $el.attr('src', $el.attr('data-src'));
                $el.data('isloaded', true);
            },
            //判断是否显示
            isShow($el) {
                // console.log($el)
                var winH = $(window).height(),//获取窗口高度
                    scrollH = $(window).scrollTop(),//获取窗口滚动高度
                    top = $el.offset().top;//获取元素距离窗口顶部偏移高度
                if (top < scrollH + winH) {
                    return true;//在可视范围
                } else {
                    return false;//不在可视范围
                }
            }


        }

        function GoodsList(obj) {
            //属性
            this.ele = '.productList';//装ul的盒子

            this.init(obj);

            // console.log(obj)
        }
        //初始化w
        GoodsList.prototype.init = function (obj) {
            let $ul = $('<ul class="clearfix"/>');

            $ul.html(
                obj.data.map(item => {
                    return `<li data-idx="${item.id}">
                   <a href="#" class="picbox"><img data-src="${item.imgurl}"></a>
                   <div class="w">
                       <p class="proName">${item.name}</p>
                       <p class="proPrice">${item.price}</p>
                   </div>
                   <div class="proDetail">
                       <span>在售</span>
                       <a href="#">查看详情</a>
                       <a href="#">在线咨询</a>
                   </li>`
                }).join('')
            )


            $(this.ele).append($ul);

            //重新渲染后懒加载一次
            page.checkShow();

            $(this.ele).on('click','li',e=>{
                e.preventDefault();

                var currentId = $(e.target).closest('li').data('idx');
                
                console.log(obj.data)

                // 根据id获取整个商品的信息
				var currentGoods = obj.data.filter(function(item){
                  
                    return item.id == currentId;
                    
                })[0];
                
                this.cookies(currentGoods);
            })
            
        }
        //把当前点击输入cookie
        GoodsList.prototype.cookies = function(obj){
            // 把当前商品写入cookie
            var now = new Date();
            now.setDate(now.getDate()+3);
            document.cookie = 'currentGoods=' + JSON.stringify(obj) + ';expires=' + now;
            
        } 


        page.init();
    })
})

require(['config'], function () {

    require(['jquery', 'custom'], function ($) {

        $('aside').load('../html/commonHtml.html aside .asideFix', function () {
            $('aside').indexs();
        });
        $('footer').load('../html/commonHtml.html #pageFooter .footer_t,#pageFooter .footer_b');


        var $username = $('.username');
        var $password = $('.password');
        var one = false;
        var two = false;


        $username.on('focus', function () {
            if ($username.val() == '邮箱/用户名/手机号') {
                $username.val('')
            }
        }).on('blur', function () {
            if ($username.val() == '') {
                //如果内容为空的话
                $username.val('邮箱/用户名/手机号');
                $('#username_ok').css('display', 'none');
            } else if ($username.val() != '') {
                one = true;
            }
        })


        $password.on('focus', function () {
            if ($password.val() == '请输入密码') {
                $password.val('')
            }
            if ($password.attr('type') == 'text') {
                $password.attr('type', 'password')
            }
        }).on('blur', function () {

            if ($password.val() == '') {
                if ($password.attr('type') == 'password') {
                    $password.attr('type', 'text')
                }
                //如果内容为空的话
                $password.val('请输入密码');
            } else if ($password.val() != '') {
                two = true;
            }
        })

        $('#ptLogin').on('click', function (e) {
            e.preventDefault();

            var username = $username.val();
            var password = $password.val();
            console.log(username, password)

            if (one && two) {
                $.ajax({
                    type: 'post',
                    url: '../api/login.php',
                    data: "username=" + username + '&password=' + password,
                    success: function (msg) {
                        if (msg == 'yes') {
                            setCookies();
                            location.href = '../index.html';
                        } else {
                            $('#errMsgPwd').css({ 'display': 'block', 'color': '#c40000', 'font-size': '12px' });
                        }
                    }
                })
            }
        })

        function setCookies() {
            //如果点击自动登陆则写进cookie
            if ($('#rememberPwd2').prop('checked')) {

                var _username = $username.val();

                var now = new Date();
                now.setDate(now.getDate() + 7);
                document.cookie = 'username=' + JSON.stringify(_username) + ';expires=' + now + ';path=/';


            }

        }






    })
})

require(['config'], function () {

    require(['jquery', 'custom', 'common'], function ($) {

        $('aside').load('../html/commonHtml.html aside .asideFix', function () {
            $('aside').indexs();
        });
        $('footer').load('../html/commonHtml.html #pageFooter .footer_t,#pageFooter .footer_b');


        var $username = $('.username');
        var $prompt = $('#prompt')
        var $password1 = $('.password1');
        var $password2 = $('.password2');
        var one = false;
        var two = false;    
        var three = false;

        $username.on('focus', function () {
            if ($username.val() == '邮箱 / 用户名 / 手机号') {
                $username.val('')
            }
        })
        $password1.on('focus', function () {
            if ($password1.val() == '6-20个大小写英文字母，符号或数字混合') {
                $password1.val('')
            }
            if ($password1.attr('type') == 'text') {
                $password1.attr('type', 'password')
            }
        })
        $password2.on('focus', function () {
            if ($password2.val() == '再次输入密码') {
                $password2.val('')
            }
            if ($password2.attr('type') == 'text') {
                $password2.attr('type', 'password')
            }

        })


        function sendAjax() {
            var _username = $username.val();
            let username = new Promise((resolve, reject) => {
                $.ajax({
                    type: 'post',
                    url: '../api/reg.php',
                    data: { username: _username },
                    success: function (xhr) {
                        // console.log(xhr);
                        if (xhr === '用户已存在') {
                            $prompt.css({ 'display': 'block', 'color': 'red' });
                            $prompt.html('该用户名已被使用。您可以重新输入或选择推荐用户名。');

                            $('#auto1').css('display', 'block');
                            //tip1提示
                            let str1 = '';
                            for (let i = 0; i < 3; i++) {
                                str1 += randomNumber(0, 9);
                                $('.tip1').html(_username + str1);
                            }

                            //tip2提示
                            let str2 = '';
                            for (let i = 0; i < 4; i++) {
                                str2 += randomNumber(0, 9);
                                $('.tip2').html(_username + str2);
                            }

                            //tip3提示
                            let str3 = '';
                            for (let i = 0; i < 4; i++) {
                                str3 += randomNumber(0, 9);
                                $('.tip3').html(_username + str3);
                            }

                            //点击提示的名字并写进input
                            $('.rad input').on('click', function () {
                                $username.val($(this).parent().next().html())
                                sendAjax();
                            })

                            return false;
                        } else if (xhr === '注册成功' && _username != "") {
                            resolve(_username);

                        }
                    }
                })
            })
            username.then(function (_username) {
                //这里只是想要试一下promise而已。可以不这么做
                checkUsername(_username);
            })
        }


        //用户名正则
        function checkUsername(_username) {
            console.log(_username)
            //用户名
            if (!/^[\w\.\@\-\u2E80-\u9FFF]{3,20}$/.test(_username)) {
                $('.beizhu').html('用户名长度不能少于 3 个字符');
                $('#username_notice').css('display', 'block');
                $('#username_ok').css('display', 'none');
                return false;

            } else if (!/^1[3-9]\d{9}$/.test(_username) && !/^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(_username) && !/^[\w\.\@\-\u2E80-\u9FFF]{3,20}$/.test(_username)) {
                $('#username_notice').html('手机号码或邮箱地址有误');
                $('#username_notice').css('display', 'block');
                $('#username_ok').css('display', 'none');
                return false;

            } else if (/^1[3-9]\d{9}$/.test(_username) || /^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(_username) || /^[\w\.\@\-\u2E80-\u9FFF]{3,20}$/.test(_username)) {
                //打勾出来
                $('#username_ok').css('display', 'block');
                //隐藏提示
                $('#auto1').css('display', 'none');

                $('#username_notice').css('display', 'none');

                $prompt.html('');

                one = true;

            } else if (/^\d{10}$/.test(_username)) {
                $('#username_notice').html('手机格式不对');
                $('#username_notice').css('display', 'block');
                $('#username_ok').css('display', 'none');
                return false;
            }
        }
        //密码正则
        function checkPassword(_password1) {
            var $psd_n = $('#password_notice');

            if (/^\d+$/.test(_password1)) {
                $psd_n.html('密码不能纯数字');

                $psd_n.css('display', 'block');

                return false;

            } else if (_password1.length < 6) {

                $('#username_notice').html('密码的长度应该为6～20个字符之间');

                $psd_n.css('display', 'block');

                return false;
            }
            //这个正则的意思就是任意的字母或数字或下划线（捕获为组1）0次到多次跟着一个任意的字母或数字或下划线（捕获为组2）紧跟着“\2{3}”是指反向捕获 组2（就是这里的内容要和组2一样的并且出现3次，所以就等于四个重复的）后面跟着一个任意的字母或数字或下划线0次到多次
            else if (/^(\w)*(\w)\2{3}(\w)*$/g.test(_password1)) {
                $('.beizhu').html('密码过于简单，为保证您的帐户安全请重设密码!');

                $psd_n.css('display', 'block');

                return false;
            } else {
                //打勾出来
                $('#password_ok').css('display', 'block');

                $('#password_notice').css('display', 'none');

                two = true;

            }
        }

        //失去焦点时验证用户名是否被注册
        $username.on('blur', function () {
            sendAjax();
            if ($username.val() == '') {
                //如果内容为空的话
                $username.val('邮箱 / 用户名 / 手机号');
                $('#username_ok').css('display', 'none');
            }
        }).on('change', function () {
            var _username = $username.val();
            checkUsername(_username);
        })

        //失去焦点时验证密码
        $password1.on('blur', function () {

            var _password1 = $password1.val();

            checkPassword(_password1);

            if ($password1.val() == '') {
                if ($password1.attr('type') == 'password') {
                    $password1.attr('type', 'text')
                }
                //如果内容为空的话
                $password1.val('6-20个大小写英文字母，符号或数字混合');
                $('#password_ok').css('display', 'none');
            }

        })

        $password2.on('blur', () => {
            var _password1 = $password1.val();
            var _password2 = $password2.val();
            if (_password1 != _password2) {
                alert('两次输入密码不一致');
                return false;
            } else if ($password2.val() == '') {
                if ($password2.attr('type') == 'password') {
                    $password2.attr('type', 'text')
                }
                //如果内容为空的话
                $password2.val('再次输入密码');
                $('#confirm_password_ok').css('display', 'none');
            } else {
                $('#confirm_password_ok').css('display', 'block');
                three = true;
            }

        })

        //同意按钮
        $('#btnAgree').on('click', () => {
            $('.btn-ljzc').attr('disabled', !$('#btnAgree').prop('checked'));
        })

        $('.btn-ljzc').on('click', (e) => {
            e.preventDefault();

            var _username = $username.val();
            var _password = $password1.val();

            if (one && two && three) {
                $.ajax({
                    type: 'post',
                    url: '../api/reg.php',
                    data: { username: _username,password:_password },
                    success: function (xhr) {
                        console.log(xhr)
                        if(xhr == 'success'){
                            
                            var now = new Date();
                            now.setDate(now.getDate()+1);
                            document.cookie = 'username=' + JSON.stringify(_username) + ';expires=' + now +';path=/';

                            location.href="../index.html";
                        }
                    }
                })
            }
        })
    })
})
