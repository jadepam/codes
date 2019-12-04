'use strict';

// Require '@metarhia/jstp' if you run this example outside this repository
const jstp = require('@metarhia/jstp');

const errors = {
  ERR_NOT_AUTHENTICATED: 1000,
  ERR_ALREADY_REGISTERED: 1001,
  ERR_INVALID_CREDENTIALS: 1002,
  ERR_ALREADY_AUTHENTICATED: 1003,
};

const users = new Map();

const auth = {
  register: (connection, username, password, callback) => {
    console.log(users,"users")
    if (users.has(username)) {
      // callback(errors.ERR_ALREADY_REGISTERED);
      console.log("已注册")
      return;
    }

    users.set(username, password);
    callback();
  },
  login: (connection, username, password, callback) => {
    if (connection.session.has('user')) {
      // callback(errors.ERR_ALREADY_AUTHENTICATED);
      console.log("已登录")
      return;
    }

    const pass = users.get(username);

    if (!pass || pass !== password) {
      // callback(errors.ERR_INVALID_CREDENTIALS);
      console.log("密码为空")
      return;
    }

    connection.session.set('user', username);
    callback();
  },
};

const chat = {
  sendMessage: (connection, message, callback) => {
    const username = connection.session.get('user');

    if (!username) {
      // callback(errors.ERR_NOT_AUTHENTICATED);
      console.log("发送消息,未登录")
      return;
    }

    const { server } = connection;

    for (const conn of server.getClients()) {
      if (conn !== connection) {
        conn.emitRemoteEvent('chat', 'message', [username, message]);
      }
    }

    callback();
  },
  closeSend:(connection, callback) => {
    const username = connection.session.get('user');
    
    // connection.session.set(username, null)
    if (!username) {
      // callback(errors.ERR_NOT_AUTHENTICATED);
      console.log("关闭无用户")
      return;
    }else{
      users.delete(username)
      connection.close()
    }
    console.log("closeSend 通话结束",new Date(),username)
    callback();
  }
};

const chatApp = new jstp.Application('chatApp', { auth, chat },);

module.exports = chatApp;