const db = require("quick.db")

module.exports.run = (client) => {
  client.user.setActivity(db.get(`status`)); 
}