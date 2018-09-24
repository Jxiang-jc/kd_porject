require(['config'], function () {

    require(['jquery', 'custom', 'common'], function ($) {

        $('aside').load('../html/commonHtml.html aside .asideFix', function () {
            $('aside').indexs();
        });
        $('footer').load('../html/commonHtml.html #pageFooter .footer_t,#pageFooter .footer_b');


        var $username = $('.username');
        var $prompt = $('#prompt')
        var $password1 = $('.password1');
        var $password2 = $('.password2');
        var one = false;
        var two = false;    
        var three = false;

        $username.on('focus', function () {
            if ($username.val() == '邮箱 / 用户名 / 手机号') {
                $username.val('')
            }
        })
        $password1.on('focus', function () {
            if ($password1.val() == '6-20个大小写英文字母，符号或数字混合') {
                $password1.val('')
            }
            if ($password1.attr('type') == 'text') {
                $password1.attr('type', 'password')
            }
        })
        $password2.on('focus', function () {
            if ($password2.val() == '再次输入密码') {
                $password2.val('')
            }
            if ($password2.attr('type') == 'text') {
                $password2.attr('type', 'password')
            }

        })


        function sendAjax() {
            var _username = $username.val();
            let username = new Promise((resolve, reject) => {
                $.ajax({
                    type: 'post',
                    url: '../api/reg.php',
                    data: { username: _username },
                    success: function (xhr) {
                        // console.log(xhr);
                        if (xhr === '用户已存在') {
                            $prompt.css({ 'display': 'block', 'color': 'red' });
                            $prompt.html('该用户名已被使用。您可以重新输入或选择推荐用户名。');

                            $('#auto1').css('display', 'block');
                            //tip1提示
                            let str1 = '';
                            for (let i = 0; i < 3; i++) {
                                str1 += randomNumber(0, 9);
                                $('.tip1').html(_username + str1);
                            }

                            //tip2提示
                            let str2 = '';
                            for (let i = 0; i < 4; i++) {
                                str2 += randomNumber(0, 9);
                                $('.tip2').html(_username + str2);
                            }

                            //tip3提示
                            let str3 = '';
                            for (let i = 0; i < 4; i++) {
                                str3 += randomNumber(0, 9);
                                $('.tip3').html(_username + str3);
                            }

                            //点击提示的名字并写进input
                            $('.rad input').on('click', function () {
                                $username.val($(this).parent().next().html())
                                sendAjax();
                            })

                            return false;
                        } else if (xhr === '注册成功' && _username != "") {
                            resolve(_username);

                        }
                    }
                })
            })
            username.then(function (_username) {
                //这里只是想要试一下promise而已。可以不这么做
                checkUsername(_username);
            })
        }


        //用户名正则
        function checkUsername(_username) {
            console.log(_username)
            //用户名
            if (!/^[\w\.\@\-\u2E80-\u9FFF]{3,20}$/.test(_username)) {
                $('.beizhu').html('用户名长度不能少于 3 个字符');
                $('#username_notice').css('display', 'block');
                $('#username_ok').css('display', 'none');
                return false;

            } else if (!/^1[3-9]\d{9}$/.test(_username) && !/^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(_username) && !/^[\w\.\@\-\u2E80-\u9FFF]{3,20}$/.test(_username)) {
                $('#username_notice').html('手机号码或邮箱地址有误');
                $('#username_notice').css('display', 'block');
                $('#username_ok').css('display', 'none');
                return false;

            } else if (/^1[3-9]\d{9}$/.test(_username) || /^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(_username) || /^[\w\.\@\-\u2E80-\u9FFF]{3,20}$/.test(_username)) {
                //打勾出来
                $('#username_ok').css('display', 'block');
                //隐藏提示
                $('#auto1').css('display', 'none');

                $('#username_notice').css('display', 'none');

                $prompt.html('');

                one = true;

            } else if (/^\d{10}$/.test(_username)) {
                $('#username_notice').html('手机格式不对');
                $('#username_notice').css('display', 'block');
                $('#username_ok').css('display', 'none');
                return false;
            }
        }
        //密码正则
        function checkPassword(_password1) {
            var $psd_n = $('#password_notice');

            if (/^\d+$/.test(_password1)) {
                $psd_n.html('密码不能纯数字');

                $psd_n.css('display', 'block');

                return false;

            } else if (_password1.length < 6) {

                $('#username_notice').html('密码的长度应该为6～20个字符之间');

                $psd_n.css('display', 'block');

                return false;
            }
            //这个正则的意思就是任意的字母或数字或下划线（捕获为组1）0次到多次跟着一个任意的字母或数字或下划线（捕获为组2）紧跟着“\2{3}”是指反向捕获 组2（就是这里的内容要和组2一样的并且出现3次，所以就等于四个重复的）后面跟着一个任意的字母或数字或下划线0次到多次
            else if (/^(\w)*(\w)\2{3}(\w)*$/g.test(_password1)) {
                $('.beizhu').html('密码过于简单，为保证您的帐户安全请重设密码!');

                $psd_n.css('display', 'block');

                return false;
            } else {
                //打勾出来
                $('#password_ok').css('display', 'block');

                $('#password_notice').css('display', 'none');

                two = true;

            }
        }

        //失去焦点时验证用户名是否被注册
        $username.on('blur', function () {
            sendAjax();
            if ($username.val() == '') {
                //如果内容为空的话
                $username.val('邮箱 / 用户名 / 手机号');
                $('#username_ok').css('display', 'none');
            }
        }).on('change', function () {
            var _username = $username.val();
            checkUsername(_username);
        })

        //失去焦点时验证密码
        $password1.on('blur', function () {

            var _password1 = $password1.val();

            checkPassword(_password1);

            if ($password1.val() == '') {
                if ($password1.attr('type') == 'password') {
                    $password1.attr('type', 'text')
                }
                //如果内容为空的话
                $password1.val('6-20个大小写英文字母，符号或数字混合');
                $('#password_ok').css('display', 'none');
            }

        })

        $password2.on('blur', () => {
            var _password1 = $password1.val();
            var _password2 = $password2.val();
            if (_password1 != _password2) {
                alert('两次输入密码不一致');
                return false;
            } else if ($password2.val() == '') {
                if ($password2.attr('type') == 'password') {
                    $password2.attr('type', 'text')
                }
                //如果内容为空的话
                $password2.val('再次输入密码');
                $('#confirm_password_ok').css('display', 'none');
            } else {
                $('#confirm_password_ok').css('display', 'block');
                three = true;
            }

        })

        //同意按钮
        $('#btnAgree').on('click', () => {
            $('.btn-ljzc').attr('disabled', !$('#btnAgree').prop('checked'));
        })

        $('.btn-ljzc').on('click', (e) => {
            e.preventDefault();

            var _username = $username.val();
            var _password = $password1.val();

            if (one && two && three) {
                $.ajax({
                    type: 'post',
                    url: '../api/reg.php',
                    data: { username: _username,password:_password },
                    success: function (xhr) {
                        console.log(xhr)
                        if(xhr == 'success'){
                            
                            var now = new Date();
                            now.setDate(now.getDate()+1);
                            document.cookie = 'username=' + JSON.stringify(_username) + ';expires=' + now +';path=/';

                            location.href="../index.html";
                        }
                    }
                })
            }
        })
    })
})
