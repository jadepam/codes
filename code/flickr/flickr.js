requirejs.config({
    paths: {
      ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min',
      jquery: 'https://code.jquery.com/jquery-3.4.1'
    }
  });
  
  require([
      'ramda',
      'jquery'
    ],
    function (_, $) {
      ////////////////////////////////////////////
      // Utils
  
      var Impure = {
        getJSON: _.curry(function(callback, url) {
          console.log(callback, url,"callback, url")
          $.getJSON(url, callback);
        }),
  
        setHtml: _.curry(function(sel, html) {
          $(sel).html(html);
        })
      };
  
      var img = function (url) {
        console.log(url,"url")
        return $('<img />', { src: url });
      };
  
      var trace = _.curry(function(tag, x) {
        console.log(tag, x);
        return x;
      });
      //  reduce :: (b -> a -> b) -> b -> [a] -> b
      var reduce = _.curry(function(f, x, xs){
        return xs.reduce(f, x);
      });


     /* array.reduce(function(total, currentValue, currentIndex, arr), initialValue) initialValue：传递给函数的初始值
     @ reduce :: (b -> a -> b) -> b -> [a] -> b
     @  第一个参数为function：f,函数为(b,a)=>b，其中传参数b类等于total，参数a类等于currentValue，返回的b为下一次循环的参数b
     @  第二个参数为b，作为b参数的初始值传入函数f
     @  第三参数为数组xs，参数a的集合[a]，其中每个a作为参数传入函数f
     @  最终返回b：第一个参数函数的输出就是 reduce 函数的输出
     */

      ////////////////////////////////////////////
  
      var url = function (t) {
        // return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + t + '&format=json&jsoncallback=?';
        return `http://exapi.mai.yiche.com/${t}/api/dynamic/yichehomepagehotcar`
      };//http://exapi.mai.yiche.com/cars/api/dynamic/yichehomepagehotcar
  
      // var mediaUrl = _.compose(_.prop('m'), _.prop('media'));
  
      // var srcs = _.compose(_.map(mediaUrl), _.prop('items'));
      var mediaUrl = _.prop('commontext1');
      var srcs = _.compose(_.map(mediaUrl), _.prop('data'));
      var images = _.compose(_.map(img), srcs);
  
      var renderImages = _.compose(Impure.setHtml("body"), images);
  
      var app = _.compose(Impure.getJSON(renderImages), url);

      app("cars");
    });