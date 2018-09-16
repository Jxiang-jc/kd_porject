//引入模块化文件
require(['config'], function () {
    console.log(66)
    require(['jquery'], function ($) {
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

    })
}); 

