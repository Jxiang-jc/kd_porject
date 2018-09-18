//引入模块化文件
require(['config'], function () {
    // console.log(66)
    require(['jquery','common','jxcarousel','bootstrapjs'], function ($) {
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
                    if($('.more').is(':visible')){
                        $('.up').hide();
                        $('.more').slideUp(500,function(){
                            $('.down').show();
                        })
                    }else{
                        $('.down').hide();
                        $('.more').slideDown(500,function(){  
                            $('.up').show();
                        }); 
                    }
                })

                $('.up').on('click',()=>{
                    console.log(666)
                    let timer = setInterval(()=>{
                        //计算缓冲速度
                        let speed = Math.ceil(window.scrollY/10);

                        scrollBy(0,-speed);

                        if(window.scrollY === 0){
                            clearInterval(timer);
                        }
                    },30)
                })
            }
        }
        downList.init();

        //轮播图使用
        $('.carousel').jxcarousel({
            ele:'.banner_l',
            width:670,
            height:450,
            num:false,
            index:0,
            page:true,
            imgs:["../images/indexImg/banner/banner(1).jpg","../images/indexImg/banner/banner(2).jpg","../images/indexImg/banner/banner(3).jpg","../images/indexImg/banner/banner(4).jpg","../images/indexImg/banner/banner(5).jpg","../images/indexImg/banner/banner(6).jpg"],
            duration:4000
        })

        //请求数据生成列表
        function limitbuy(){
            $.ajax({
                type:'get',
                url:'../api/limitBuy.php',
                data:{
                    param:'tejia',
                },
                success:function(data){
                    var res = JSON.parse(data);
                    // console.log(res)
                    $('.imgbox').html(
                        res.map(function(item){
                            return  `<li>
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
        function banner(){
            $.get("../api/limitBuy.php", {'del':1},
                function(data){
                    var res = JSON.parse(data);
                    // console.log(res)

                    //限时轮播
                    $('.limitBox').jxcarousel({
                        ele:'.limitBox',
                        width:308,
                        height:251,
                        num:false,
                        index:0,
                        page:true,
                        duration:3000,
                        button:false,
                        imgbox:res
                    })
                }
            )
        }

        banner();

        limitbuy();

        //一级tab切换
        $('.activeTab').on('mouseover','li',function(){

            //当前高亮
            $(this).css({'background':'#f54343','color':'#fff'}).siblings().css({'background':'#f9f9f9','color':'#000'});

            //改变li时,secTab也要跟着改变
            //先隐藏所有的div
            $(this).closest('.activeTab').next().find('.secTab2').css('display','none');

            //当前li的父母的下一个兄弟的后代.通过鼠标移动时获取当前li的索引值来找出是哪个后代,在获取后代的div
            $(this).closest('.activeTab').next().find('.secTab').eq($(this).index()).children().eq(0).css('display','block');
                    

            //声明一个变量用于传参
            let content = 'tejia';

            if($(this).hasClass('tjTab')){
                content = 'tejia'
            }
            else if($(this).hasClass('rmTab')){
                content = 'hotSale';
            }
            else if($(this).hasClass('rpTab')){
                content = 'evaluate';
            }
            else if($(this).hasClass('xpTab')){
                content = 'newGoods';
            }

            $.ajax({
                type:'get',
                url:'../api/limitBuy.php',
                data:{
                    param:content,
                },
                success:function(data){
                    var res = JSON.parse(data);
                    
                    $('.imgbox').html(
                        res.map(function(item){
                            return  `<li>
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
        $('.secTab').on('mouseover','li',function(e){
            //当前高亮
            $(this).css({'background':'#f54343','color':'#fff'}).siblings().css({'background':'#f9f9f9','color':'#000'});

            let content = 'secTab';

            $.ajax({
                type:'get',
                url:'../api/limitBuy.php',
                data:{
                    param:content,
                },
                success:function(data){
                    var res = JSON.parse(data);
                    
                    $('.imgbox').html(
                        res.map(function(item){
                            return  `<li>
                                <a href="#"><img src="${item.imgurl}" width="140" ,height="140"></a>
                                <p>${item.name}</p>
                                <p>￥${item.price}</p>
                            </li>`
                        }).join('')
                    )
                }
            })
        })

        //link Tab切换
        $('#myTab a').mouseover(function (e) {
            e.preventDefault()
            $(this).tab('show')
            
            $(this).css('color','red').parent().siblings().children().css('color','#666');
          })
        
        

    })
}); 

