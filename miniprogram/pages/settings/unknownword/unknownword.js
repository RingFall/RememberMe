// pages/settings/unknownword/unknownword.js

var word=[]
var meaning=[]

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.cloud.init()
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('user_data').where({
      _openid: getApp().globalData.openid
    })
    .get({
      success: function (res) {
        db.collection('English-wordlist').where({
          id: _.in(res.data[0].unknown_E)
        }).get({
          success: function (res) {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
              word.push(res.data[i].word)
              meaning.push(res.data[i].meaning.replace(/&lt;br&gt;/g, '\n'))
            }
            that.setData({
              word: word,
              meaning: meaning,
            })
      }
    }) 
        db.collection('Japanese-wordlist').where({
          id: _.in(res.data[0].unknown_J)
        }).get({
          success: function (res) {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
              word.push(res.data[i].word)
              meaning.push(res.data[i].meaning)
            }
            that.setData({
              word: word,
              meaning: meaning,
            })
          }
        })
        db.collection('korean-wordlist').where({
          id: _.in(res.data[0].unknown_K)
        }).get({
          success: function (res) {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
              word.push(res.data[i].word)
              meaning.push(res.data[i].meaning)
            }
            that.setData({
              word: word,
              meaning: meaning,
            })
          }
        })
        }
      })
        
  },
  show:function(){
    if (!this.data.showNot == true)
    this.setData({
      showNot: true
    })
    else
      this.setData({
        showNot: false
      })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    word=[]
    meaning=[]
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})