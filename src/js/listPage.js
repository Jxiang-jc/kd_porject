require(['config'],function(){

    require(['jquery','custom','bootstrapjs'],function($){
        $('#pageHeader').load('../html/commonHtml.html #pageHeader .container',function(){
            $('#pageHeader').indexs();
        });
        $('#header_b').load('../html/commonHtml.html #header_b .container');
        $('nav').load('../html/commonHtml.html nav .tab1 ',function(){
            $('nav').indexs();
        });
        $('aside').load('../html/commonHtml.html aside .asideFix',function(){
            $('aside').indexs();
        });
        $('footer').load('../html/commonHtml.html #pageFooter .footer_t,#pageFooter .footer_b');

        //手风琴
        $('.item').on("click", function () {
			$(this).next().slideToggle(100);
			$('.inneritem').not($(this).next()).slideUp('fast');
		});
    })
})