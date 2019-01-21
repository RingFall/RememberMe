var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'aspectFit',
    userInfo: {},
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  showitem: function (options) {
    wx.navigateTo({
      url: './word/word?name=Japanese-wordlist',
    })
  },
  showitem2: function (options) {
    wx.navigateTo({
      url: './word/word?name=korean-wordlist',
    })
  },
  showitem3: function (options) {
    wx.navigateTo({
      url: './word/word?name=English-wordlist',
    })
  },
  word: function (e) {
    this.setData({
      searchWord: e.detail.value
    })
  },
  search: function (e) {
    var that = this
    var content = this.data.searchWord
    wx.request({

      url: 'https://api.shanbay.com/bdc/search/?word=' + content,
      data: {},
      method: 'get',
      success: function (res) {
        console.log(res)

        var msg = res.data.msg
        if (msg == "SUCCESS") {
          wx.navigateTo({
            url: './sousuo/sousuo?content=' + content,
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '对不起，查询不到该词信息',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }

      },
      fail: function () {
      },
      complete: function () {
      }
    })
  }
  
})