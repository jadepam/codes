const mongoose = require('mongoose')
const {name, user, password} = require('../../config').db

var db = mongoose.connection;

module.exports = {
  open () {
    return mongoose.connect(name, {
      user: user,
      pass: password,
      poolSize: 10,
      useNewUrlParser: true,
      useCreateIndex: true
    })
  },
  close () {
    return mongoose.connection.close()
  }
  
}
