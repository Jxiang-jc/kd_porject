require(['config'],function(){

    require(['jquery','custom','bootstrapjs'],function($){
        $('#pageHeader').load('../html/commonHtml.html #pageHeader .container',function(){
            $('#pageHeader').indexs();
        });
        $('#header_b').load('../html/commonHtml.html #header_b .container');
        $('nav').load('../html/commonHtml.html nav .tab1 ',function(){
            $('nav').indexs();
        });
        $('aside').load('../html/commonHtml.html aside .asideFix');
        $('footer').load('../html/commonHtml.html #pageFooter .footer_t,#pageFooter .footer_b');

    
    })
})