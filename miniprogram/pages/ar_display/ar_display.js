import regeneratorRuntime from '../mo_re/regenerator-runtime/runtime.js'
var app = getApp()
const db =wx.cloud.database()
const _ = db.command
Page({

  data: {
    url: ""
  },

  onLoad: async function (options) {
    var temp_url = await this.load_url()
    console.log(temp_url)
    this.setData({
      url: temp_url
    })
  },

  load_url: function(){
    return new Promise(function(resolve, reject){
      db.collection('articles').where({
        ar_id: app.globalData.ar_id
      }).get({
        success(res) {
          console.log(res.data[0].link)
          resolve(res.data[0].link)
        }
      })
    })
  }

})