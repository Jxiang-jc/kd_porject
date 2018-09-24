require(['config'], function () {

    require(['jquery', 'custom'], function ($) {

        $('aside').load('../html/commonHtml.html aside .asideFix', function () {
            $('aside').indexs();
        });
        $('footer').load('../html/commonHtml.html #pageFooter .footer_t,#pageFooter .footer_b');


        var $username = $('.username');
        var $password = $('.password');
        var one = false;
        var two = false;


        $username.on('focus', function () {
            if ($username.val() == '邮箱/用户名/手机号') {
                $username.val('')
            }
        }).on('blur', function () {
            if ($username.val() == '') {
                //如果内容为空的话
                $username.val('邮箱/用户名/手机号');
                $('#username_ok').css('display', 'none');
            } else if ($username.val() != '') {
                one = true;
            }
        })


        $password.on('focus', function () {
            if ($password.val() == '请输入密码') {
                $password.val('')
            }
            if ($password.attr('type') == 'text') {
                $password.attr('type', 'password')
            }
        }).on('blur', function () {

            if ($password.val() == '') {
                if ($password.attr('type') == 'password') {
                    $password.attr('type', 'text')
                }
                //如果内容为空的话
                $password.val('请输入密码');
            } else if ($password.val() != '') {
                two = true;
            }
        })

        $('#ptLogin').on('click', function (e) {
            e.preventDefault();

            var username = $username.val();
            var password = $password.val();
            console.log(username, password)

            if (one && two) {
                $.ajax({
                    type: 'post',
                    url: '../api/login.php',
                    data: "username=" + username + '&password=' + password,
                    success: function (msg) {
                        if (msg == 'yes') {
                            setCookies();
                            location.href = '../index.html';
                        } else {
                            $('#errMsgPwd').css({ 'display': 'block', 'color': '#c40000', 'font-size': '12px' });
                        }
                    }
                })
            }
        })

        function setCookies() {
            //如果点击自动登陆则写进cookie
            if ($('#rememberPwd2').prop('checked')) {

                var _username = $username.val();

                var now = new Date();
                now.setDate(now.getDate() + 7);
                document.cookie = 'username=' + JSON.stringify(_username) + ';expires=' + now + ';path=/';


            }

        }






    })
})
