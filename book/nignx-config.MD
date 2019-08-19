>nignx配置

* https配置

    工具openssl 生成key、crt
    ```
    #openssl req -x509 -nodes -days 36500 -newkey rsa:2048 -keyout nginx.key -out nginx.crt
    ```

* 多域名绑定

    域名：test.cn、www.test.cn
    接口：api.test.cn
    web管理后台：admin.test.cn
    静态资源：static.test.cn

    修改：nginx.conf文件，导入配置
    ```
    include ../conf.d/admin_test_cn.conf];
    include ../conf.d/api_test_cn.conf;
    include ../conf.d/test_cn.conf;
    include ../conf.d/static_test_cn.conf;
    ```

* [nignx更多配置详解](https://blog.csdn.net/pamki/article/details/95335573)