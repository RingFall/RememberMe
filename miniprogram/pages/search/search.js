Page({
  data: {
    inputShowed: false,
    inputVal: "",
    title: '加载中...', // 状态
    list: [], // 数据列表
    type: '', // 数据类型
    loading: true // 显示等待框
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
        
  },
  // pages/list/list.js

    /**
     * 页面的初始数据
     */

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { // options 为 board页传来的参数
    const _this = this;
    // 拼接请求url
    const url = 'https://api.douban.com/v2/movie/' + options.type;
      // 请求数据
      wx.request({
        url: url,
        data: {},
        header: {
          'content-type': 'json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          // 赋值
          _this.setData({
            title: res.data.title,
            list: res.data.subjects,
            type: options.type,
            loading: false // 关闭等待框
          })
        }
      })
  }
});