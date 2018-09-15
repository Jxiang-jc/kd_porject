//引入模块化文件
require(['config'],function(){
    console.log(66)
    require(['jquery'],function($){
        $('.mykdl').hover(()=>{
            $('.mykdl ul').removeClass('hide').addClass('shows')
            $('.jiantou1').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
        },()=>{
            $('.mykdl ul').removeClass('shows').addClass('hide')
            $('.jiantou1').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
        })

        $('.wzdh').hover(()=>{
            $('.wzdh div').removeClass('hide').addClass('shows')
            $('.jiantou2').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
        },()=>{
            $('.wzdh div').removeClass('shows').addClass('hide')
            $('.jiantou2').removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
        })

    })
}); 