Page({
  data: {
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
  onQuery: function (e) {
    inputVal: e.detail.value
    wx.cloud.init()
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('en_article').where({
      title: _.gte(inputVal)

    }).limit(100)
    .get({
      success: res => {
        console.log(res);
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
          console.error('[数据库] [查询记录] 失败：', err)
        }
        })
        
  }
});