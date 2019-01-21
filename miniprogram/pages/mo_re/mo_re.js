import regeneratorRuntime from '../mo_re/regenerator-runtime/runtime.js'
var app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    next_hide: true,
    mo_no_list: [],
    mo_info_list: [],
    mo_name: [],
    load_hide: false
  },

  onLoad: async function() {
    this.data.mo_no_list = app.globalData.mo_reno_list
    console.log(this.data.mo_no_list)
    var temp_ml = [], temp_name = [], temp_mol = this.data.mo_no_list
    const infos = await this.get_mo_list(temp_mol)
    console.log(infos)
    for(var i = 0; i < infos.length; i++){
      temp_name.push(infos[i].name)
    }
    console.log(temp_name)
    this.setData({
      mo_name: temp_name,
      load_hide: true,
      next_hide: false,
    })
  },

  async get_mo_list(mnol){
    var infos = []
    if (app.globalData.temp_mo.length != 0) return app.globalData.temp_mo
    for(var i = 0; i < mnol.length; i++) {
      const temp_one = await this.get_one(mnol[i])
      infos.push(temp_one)
    }
    app.globalData.temp_mo = infos
    return infos
  },

  get_one(mno) {
    return new Promise(function(resolve, reject) {
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

  mo_del_bu: function(e){
    app.globalData.cur_mo_name = e.target.dataset.text
    console.log(app.globalData.cur_mo_name)
    wx.navigateTo({
      url: '../mo_display/mo_display',
    })
  },

  change: async function () {
    this.setData({
      load_hide: false
    })

    var rand_mol = [], mo_size = await this.get_size('movie_data')
    console.log(mo_size)
    for (var i = 1; i <= 10; i++) {
      var rand_id = Math.ceil(Math.random() * mo_size)
      if (rand_mol.length == 0) {
        rand_mol.push(rand_id)
      } else if (typeof (rand_mol.find(function (num) { return num == rand_id })) == "undefined") {
        rand_mol.push(rand_id)
      } else {
        i -= 1
      }
    } 
    console.log(rand_mol)
    app.globalData.mo_reno_list = rand_mol
    console.log(app.globalData.mo_reno_list)
    app.globalData.temp_mo = []

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

  find_similiar: async function(){
    this.setData({
      load_hide: false
    })
    var user_data_size = await this.get_user_data_size()
    var random_people_list = []
    //console.log(app.globalData.user_id)
    for (var i = 1; i <= 4; i++) {
      var rand_id = Math.ceil(Math.random() * user_data_size)
      if (random_people_list.length == 0 && rand_id != app.globalData.user_id) {
        random_people_list.push(rand_id)
      } else if (typeof (random_people_list.find(function (num) { return num == rand_id })) == "undefined" && rand_id != app.globalData.user_id) {
        random_people_list.push(rand_id)
      } else {
        i -= 1
      }
    }
    console.log(random_people_list)
    //console.log(app.globalData.user_id)
    var selected = [], first, second
    var cur_one = await this.get_one_mll(app.globalData.user_id)
    for(var i = 0; i < 4; i++){
      var temp_id = random_people_list[i]
      //console.log(temp_id)
      var new_one = await this.get_one_mll(temp_id)
      //console.log(new_one)
      var point = await this.get_similar_point(cur_one, new_one)
      //console.log(point)
      var one = {"user_id": temp_id, "point": point}
      selected.push(one)
    }
    console.log(selected)

    selected.sort(function(obj1, obj2){
      if(obj1.point < obj2.point) return 1
      else return 0
    })
    console.log(selected)

    first = selected[0]
    second = selected[1]
    var re_data = {first, second}
    console.log(re_data)
    app.globalData.re_data = re_data
    
    this.setData({
      load_hide: true
    })
    wx.navigateTo({
      url: "../mo_re/re_show/re_show",
    })
    
  },

  get_similar_point: function(la, lb){
    return new Promise(function(resolve, reject){
      wx.cloud.callFunction({
        name: 'Wuv_cal',
        data: {
          a1: la,
          a2: lb
        },
        success(res) {
          console.log(res.result.Wuv)
          resolve(res.result.Wuv)
        }
      })
    })
  },

  get_one_mll: function(one_id){
    return new Promise(function(resolve, reject){
      //console.log(one_id)
      db.collection('user_data').where({
        user_id: one_id
      }).get({
        success(res){
          //console.log(res.data[0].movie_like_list)
          resolve(res.data[0].movie_like_list)
        }
      })
    })
  },

  get_user_data_size: function () {
    return new Promise(function (resolve, reject) {
      db.collection('user_data').where({
      }).count({
        success(res) {
          console.log(res.total)
          resolve(res.total)
        }
      })
    })
  },


})