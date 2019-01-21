import regeneratorRuntime from '../mo_re/regenerator-runtime/runtime.js'
var app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: async function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: async function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: async function (res) {
              //从数据库获取用户信息
              app.globalData.openid = await that.get_openid()
              console.log(app.globalData.openid)
              var now_person = await that.get_user_info()
              app.globalData.user_id = now_person.user_id
              console.log(app.globalData.user_id)
              app.globalData._id = now_person._id
              console.log(app.globalData._id)
              //用户已经授权过
              wx.switchTab({
                url: '../main/main'
              })
            }
          });
        }
      }
    })
  },

  get_user_info: function(){
    return new Promise(function(resolve, reject){
      db.collection('user_data').where({
        openid: app.globalData.openid
      }).get({
        success(res){
          console.log(res.data[0])
          resolve(res.data[0])
        }
      })
    })
  },

  get_openid: function(){
    return new Promise(function(resolve, reject){
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success(res){
          console.log(res.result.openid)
          resolve(res.result.openid)
        }
      })
    })
  },

  get_user_data_size: function(){
    return new Promise(function(resolve, reject){
      db.collection('user_data').where({
      }).count({
        success(res){
          console.log(res.total)
          resolve(res.total)
        }
      })
    })
  },

  bindGetUserInfo: async function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.cloud.init()
      const db = wx.cloud.database()

      app.globalData.openid = await that.get_openid()
      console.log(app.globalData.openid)

      var user_data_size = await this.get_user_data_size()
      console.log(user_data_size)
      app.globalData.user_id = user_data_size + 1
      db.collection('user_data').add({
        data: {
          openid: getApp().globalData.openid,
          user_id: user_data_size + 1,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          unknown_E:[],
          unknown_J:[],
          unknown_K:[],
          movie_like_list:[],
          mo_reno_list:[]

        },
        success: function (res) {
          //从数据库获取用户信息
          that.queryUsreInfo();
          console.log("插入小程序登录用户信息成功！");
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../main/main'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口


})