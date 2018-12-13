var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open1: false,
    open2: false,
    open3: false,
    open4: false,
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
    this.setData({
      open1: !this.data.open1
    })
  },
  showitem2: function (options) {
    this.setData({
      open2: !this.data.open2
    })
  },
  showitem3: function (options) {
    this.setData({
      open3: !this.data.open3
    })
  },
  showitem4: function (options) {
    this.setData({
      open4: !this.data.open4
    })
  },
  showWord: function (event) {
    wx.navigateTo({
      url: './word/word?book=' + event.currentTarget.dataset.book + '&&part=' + event.currentTarget.dataset.part,
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
  },
 
  
  word: function (e) {
    this.setData({
      searchWord: e.detail.value
    }

    )
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