
//require配置

require.config({

    //配置短路径
    paths: {
        'jquery': '../lib/jquery-3.2.1',
        'lxzoom': '../lib/jquery-lxzoom/jquery.lxzoom',
        'jxcarousel': '../lib/jx-Carousel/jquery.carousel',
        'common': 'common',
        'bootstrapjs':'../lib/bootstrap-3.3.7-dist/js/bootstrap.min'

    },

    //配置模块间依赖关系
    //讲明依赖关系（加载过程中自动处理先后顺序）

    shim: {
        // 配置模块间依赖关系
        // 讲明：lxzoom依赖jquery（加载过程中自动处理先后顺序）
        'lxzoom': ['jquery'],
        'jxcarousel': ['common'],
        'jxcarousel': ['jquery'],
        'bootstrapjs':['jquery'],



    },
});