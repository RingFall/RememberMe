import regeneratorRuntime from '../mo_re/regenerator-runtime/runtime.js'
var app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load_hide:false,
    next_hide: true,
    ar_name: [],
    allinfos: []
  },

  onLoad: async function () {
    var arl = app.globalData.ar_reno_list
    console.log(arl)
    const infos = await this.get_ar_list(arl)
    console.log(infos)
    var temp_name = []
    for (var i = 0; i < infos.length; i++) {
      temp_name.push(infos[i].title)
    }
    this.setData({
      load_hide: true,
      next_hide: false,
      ar_name: temp_name,
      allinfos: infos 
    })
  },

  async get_ar_list(ar_nol) {
    var infos = []
    if (app.globalData.temp_ar.length != 0) return app.globalData.temp_ar
    for (var i = 0; i < ar_nol.length; i++) {
      const temp_one = await this.get_one(ar_nol[i])
      infos.push(temp_one)
    }
    app.globalData.temp_ar = infos
    return infos
  },

  get_one(arno) {
    return new Promise(function (resolve, reject) {
      var one_mo
      db.collection('articles').where({
        ar_id: arno
      }).get({
        success(res) {
          one_mo = res.data[0]
          console.log(one_mo)
          resolve(one_mo)
        }
      })
    })
  },

  ar_del_bu: function (e) {
    var cur_ar_info = this.data.allinfos.find(function(cur_ar){return cur_ar.title == e.target.dataset.text})
    //console.log(cur_ar_info)
    app.globalData.cur_ar_no = cur_ar_info.ar_id
    console.log(app.globalData.cur_ar_no)
    wx.navigateTo({
      url: '../ar_display/ar_display',
    })
  },

  change: async function(){
    this.setData({
      load_hide: false
    })

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
    app.globalData.temp_ar = []
    
    this.onLoad()

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

})