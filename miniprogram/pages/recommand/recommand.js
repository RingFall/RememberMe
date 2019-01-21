import regeneratorRuntime from '../mo_re/regenerator-runtime/runtime.js'
var app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  data: {
    s1: '../../images/向右指示器.png',
    
  },

  onLoad: async function (options) {
    var rand_mol = [], mo_size = await this.get_size('movie_data')
    //console.log(mo_size)
    for (var i = 1; i <= 10; i++) {
      var rand_id = Math.ceil(Math.random() * (mo_size - 1))
      if (rand_mol.length == 0) {
        rand_mol.push(rand_id)
      } else if (typeof (rand_mol.find(function (num) { return num == rand_id })) == "undefined") {
        rand_mol.push(rand_id)
      }else {
        i -= 1
      }
    }
    console.log(rand_mol)
    app.globalData.mo_reno_list = rand_mol

    var arl = [], csize = await this.get_size('articles')
    for (var i = 1; i <= 10; i++) {
      var temp_id = Math.ceil(Math.random() * csize)
      //console.log(temp_id)
      if (arl.length == 0) {
        arl.push(temp_id)
      } else if (typeof (arl.find(function (num) { return num == temp_id })) == "undefined") {
        arl.push(temp_id)
      } else {
        i -= 1
      }
    }
    app.globalData.ar_reno_list = arl
    console.log(app.globalData.ar_reno_list)
  },

  async get_size(collection) {
    return new Promise(function (resolve, reject) {
      db.collection(collection).where({
      }).count({
        success(res) {
          resolve(res.total)
        }
      })
    })
  },

  mo_button: function(){
    wx.navigateTo({
      url: '../mo_re/mo_re'
    })
  },

  ar_button: function(){
    wx.navigateTo({
      url: '../ar_re/ar_re',
    })
  }

})