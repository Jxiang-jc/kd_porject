require(['config'], function () {

    require(['jquery', 'custom'], function ($) {

        $('aside').load('../html/commonHtml.html aside .asideFix', function () {
            $('aside').indexs();
        });
        $('footer').load('../html/commonHtml.html #pageFooter .footer_t,#pageFooter .footer_b');





    })
})
