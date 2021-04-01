// 组件化
// 标准化
// 容器化
fetch('http://testevent.hengyirong.com/bff/health-checked', {
        method: 'GET',
        mode:'cors',//跨域
        headers: {
            "hc-utm-code":"102",
            "hc-app-code":"FintechH5",
            "hc-source-type":"1",
            "hc-app-version":"1.0.9",
            "Content-Type":"application/json"
        },
      //   body: 'foo=bar&lorem=ipsum',
      }).then(response => response.text())
      .then(json => console.log(json,"111"))
      .catch(err => console.log('Request Failed', err))