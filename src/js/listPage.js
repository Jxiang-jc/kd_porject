require(['config'],function(){

    require(['jquery','custom','bootstrapjs','pagination'],function($){
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
        
        let page = {
            //属性
            list : '.cont_r',
            otherType:'.otherType',//其它科目
            sum:'.cont_rList_sum',//共计多少个商品
            disease:'.disease',//病种
            sort:'.filter_l',//按什么筛选 销量或者最新
            total:'.filter_ra',//总计多少个商品
            page:'.filter_rb',//显示当前页码
            pageNum:'.pageNum',//分页盒子
            btnSure:'.filter_rd',//跳转页按钮
            type:'default',//默认显示的方式
            
            
            //初始化
            //获取/生成元素/绑定事件
            init(){
                let pageNo = 1;
                let qty = 28;
                
                this.pageNo = pageNo;
                this.qty = qty;
                this.list = $(this.list);

                this.getData(pageNo,qty);

                //点击跳转页面
                $('.filter_r').on('click','span',e=>{

                    pageNo = $(e.target).prev().val()*1;//获取输入框内容

                    console.log(pageNo);
                    this.pageNo = pageNo;

                    $('.productList').html('');//清空页面内容
                    $('#pagination1').html('');//清空页码数


                    $(e.target).prev().val('');//清空输入框

                    this.getData(pageNo,qty);


                })
                

            },
            //获取数据库数据
            getData(pageNo,qty){
                $.get('../api/goodslist.php',`page=${pageNo}&qty=${qty}&type=${this.type}`,(data)=>{
                    let res = JSON.parse(data);
                    // console.log(res);

                    this.pageNow = res.page;//当前分页

                    new GoodsList(res);
                    this.renderNum(res);
                    this.renderPage(res);
                    
                })
            },
            //生成数量总价等等
            renderNum(res){

                $(this.sum).html(`共计<span style="color:#e4393c">${res.total}</span>件 <span style="color:#e4393c">肿瘤</span> 商品，您可以根据以下条件进行筛选。`);

                $(this.total).html(`<span style="color:#e4393c">总计 ${res.total} 个记录</span>`);
                
            },

            //渲染页码
            renderPage(res){

                //计算分页总数
                var pageLen =  Math.ceil(res.total/res.qty);

                this.pageLen = pageLen;
                
                $(this.page).html(`<span style="color:#e4393c">${this.pageNow}</span>/${pageLen}`);

                $("#pagination1").pagination({
					currentPage: this.pageNo,
                    totalPage: pageLen,
                    callback:function(current){
                        //这个逻辑我有点头大,首先,初始化的时候,先设定一个初始的页数,
                        //然后通过this去传递,传过来这个插件里面用,currentPage就是页码高亮时显示的数字,然后再通过回调函数去更新,这样,每点击一次,就能得到一个最新的currentPage值,
                        this.pageNo = current;

                        $('.productList').html('');//清空页面内容

                        // window.scrollTo(0,200);

                        this.getData(current,this.qty);

                    }.bind(this)
				});

            },
            
            //渲染页码2
            // renderBtn(res){
            //     for(var i=0;i<this.pageLen;i++){
            //         var $page_a = $('<a/>');

            //         $page_a.html(i+1);
            //         //高亮当前页
            //         if(i == this.pageNow-1){
            //             $page_a.addClass('z_active');
            //         }

            //         $(this.pageNum).append($page_a);

            //         //如果页码数量大于5的时候只显示5个
            //         if($(this.pageNum).children().length>5){
                        
            //             $(this.pageNum).children('a:last').remove();
            //         };
            //     }
            // }


        }

        function GoodsList(obj){
            //属性
            this.ele = '.productList';//装ul的盒子

            this.init(obj); 

            // console.log(obj)
        }
        //初始化w
        GoodsList.prototype.init = function(obj){
           let $ul = $('<ul class="clearfix"/>');
           
           $ul.html(
               obj.data.map(item=>{
                   return `<li data-idx="${item.id}">
                   <a href="#" class="picbox"><img src="${item.imgurl}"></a>
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

        }


        page.init();
    })
})
