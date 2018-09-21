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
