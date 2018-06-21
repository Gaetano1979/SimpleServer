  var fs = require('fs')
  var path = require('path')
  var Storage =require('../Storage')

  function deleteUser(user, callback){
    Storage.getData('users')
           .then(function(users){
             var resultUser = users.current.filter(function(MapUsuer){
              return MapUsuer.nombre!=user.nombre
           })
            var userDataPath = path.join(__dirname, '../') + '/Storage/data/users.json'
            fs.writeFile(userDataPath, JSON.stringify({current: resultUser}), function(error){
              if (error) callback(error)
              callback(null, 'OK')
            })
          }).catch(function(err){
            callback(err)
          })

  }
  module.exports= deleteUser
