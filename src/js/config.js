
//require配置

require.config({

    //配置短路径
    paths: {
        'jquery': '../lib/jquery-3.2.1',
        'jxcarousel': '../lib/jx-Carousel/jquery.carousel',//自己封装轮播图插件
        'common': 'common',//commonjs
        'bootstrapjs':'../lib/bootstrap-3.3.7-dist/js/bootstrap.min',
        // 'index':'index',
        'listPage':'listPage',
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
        'custom':['jquery'],
        'listPage':['custom'],
        'pagination':['jquery'],
        'ellipsis':['jquery']

    },
});