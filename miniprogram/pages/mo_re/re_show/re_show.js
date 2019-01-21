import regeneratorRuntime from '../regenerator-runtime/runtime.js'
var app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  data: {
    first: [],
    second: [],
    id1: null,
    id2: null,
    point1: null,
    point2: null,
    mo_name: [],
    load_hide: false
  },

  onLoad: async function (options) {
    this.setData({
      first: app.globalData.re_data.first,
      id1: app.globalData.re_data.first.user_id,
      point1: app.globalData.re_data.first.point.toFixed(5),
      second: app.globalData.re_data.second,
      id2: app.globalData.re_data.second.user_id,
      point2: app.globalData.re_data.second.point.toFixed(5),
    })
    var show_list1 = await this.get_or_list(this.data.id1)
    show_list1 = this.select_from_list(show_list1)
    //console.log(show_list1)
    var show_list2 = await this.get_or_list(this.data.id2)
    show_list2 = this.select_from_list(show_list2)
    //console.log(show_list2)
    var show_list = []
    for(var i = 0; i < show_list1.length; i++)show_list.push(show_list1[i])
    for (var i = 0; i < show_list2.length; i++)show_list.push(show_list2[i])
    console.log(show_list)

    var temp_ml = [], temp_name = []
    const infos = await this.get_mo_list(show_list)
    console.log(infos)
    for (var i = 0; i < infos.length; i++) {
      temp_name.push(infos[i].name)
    }

    this.setData({
      mo_name: temp_name,
      load_hide: true
    })
  },
  
  async get_mo_list(mnol) {
    var infos = []
    if (app.globalData.temp_mo.length != 0) return app.globalData.temp_mo
    for (var i = 0; i < mnol.length; i++) {
      const temp_one = await this.get_one(mnol[i])
      infos.push(temp_one)
    }
    app.globalData.temp_mo = infos
    return infos
  },

  get_one(mno) {
    return new Promise(function (resolve, reject) {
      var one_mo
      const db = wx.cloud.database()
      db.collection('movie_data').where({
        movie_id: mno
      }).get({
        success(res) {
          one_mo = res.data[0]
          console.log(one_mo)
          resolve(one_mo)
        }
      })
    })
  },

  select_from_list: function(list){
    var result_list = []
    if(list.length > 5){
      for(var i = 0; i < 5; i++){
        result_list.push(list[i])
      }
    }else {
      result_list = list
    }
    return result_list
  },

  get_or_list: function(id){
    return new Promise(function(resolve, reject){
      db.collection('user_data').where({
        user_id: id
      }).get({
        success(res){
          console.log(res.data[0])
          resolve(res.data[0].movie_like_list)
        }
      })
    })
  },

  mo_del_bu: function (e) {
    app.globalData.cur_mo_name = e.target.dataset.text
    console.log(app.globalData.cur_mo_name)
    wx.navigateTo({
      url: '../../mo_display/mo_display',
    })
  },

})