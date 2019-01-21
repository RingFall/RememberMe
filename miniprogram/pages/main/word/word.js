// pages/main/word/word.js
var percent = 0
var list
var id
var unknown_E
var unknown_K
var unknown_J
var app =getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClick: false,
    percent: "0",
    sw: 6,
    pc: '#63B8FF',
    pbc: '#ffffff',
    isActive: true,
    isSi: true,

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    list = options.name  //-------------jc
    var idx
    if (list == 'Japanese-wordlist') {
      idx = Math.floor(Math.random() * 259)
    }
    else if (list == 'English-wordlist') {
      idx = Math.floor(Math.random() * 15325)
    }
    else if (list == 'korean-wordlist') {
      idx = Math.floor(Math.random() * 13278)
    }
    console.log(idx)
    console.log(options.name)
    //list = options.name //-------------jc
    id = idx
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection(options.name).where({
      id: id
    }).get({
      success: function (res) {
        console.log(res.data)
        if (list == 'English-wordlist') {
          var mea = res.data[0].meaning.replace(/&lt;br&gt;/g, '\n')
          var ll = res.data[0].lj.replace(/\/r\/n/g, '\n')
        }
        else {
          var mea = res.data[0].meaning
          var ll = res.data[0].lj
        }
        me.setData({
          word: res.data[0].word,
          meaning: mea,
          lj: ll
        })
        if (list == 'English-wordlist') {
          if (unknown_E.indexOf(id) != -1)
            me.setData({
              isClick: true
            })
          else me.setData({
            isClick: false
          })
        }
        else if (list == 'korean-wordlist') {
          if (unknown_K.indexOf(id) != -1)
            me.setData({
              isClick: true
            })
          else me.setData({
            isClick: false
          })
        }
        else if (list == 'Japanese-wordlist') {
          if (unknown_J.indexOf(id) != -1)
            me.setData({
              isClick: true
            })
          else me.setData({
            isClick: false
          })
        }
      }
    })
     
    db.collection('user_data').where({
      _openid: getApp().globalData.openid
    }).get({
      success: function (res) {
        unknown_E = res.data[0].unknown_E
        console.log(unknown_E)
        unknown_K = res.data[0].unknown_K
        console.log(unknown_K)
        unknown_J = res.data[0].unknown_J
        console.log(unknown_J)
        if (list == 'English-wordlist') {
          if (res.data[0].unknown_E.indexOf(id) != -1)
            me.setData({
              isClick: true
            })
        }
        else if (list == 'korean-wordlist') {
          if (res.data[0].unknown_K.indexOf(id) != -1)
            me.setData({
              isClick: true
            })
        }
        else if (list == 'Japanese-wordlist') {
          if (res.data[0].unknown_J.indexOf(id) != -1)
            me.setData({
              isClick: true
            })
        }
      }
    })



  },

  havesave: function () {

    if (!this.data.isClick == true) {
      wx.showToast({
        title: '已收藏',
      });
      if (list == 'English-wordlist') {
        unknown_E.push(id)
        console.log(unknown_E)
      }
      else if (list == 'korean-wordlist') {
        unknown_K.push(id)
        console.log(unknown_K)
      }
      else if (list == 'Japanese-wordlist') {
        unknown_J.push(id)
        console.log(unknown_J)
      }
    } else {
      wx.showToast({
        title: '已取消收藏',
      });
      if (list == 'English-wordlist') {
        unknown_E.splice(unknown_E.findIndex(item => item.id === id), 1)
        console.log(unknown_E)
      }
      else if (list == 'korean-wordlist') {
        unknown_K.splice(unknown_K.findIndex(item => item.id === id), 1)
        console.log(unknown_K)
      }
      else if (list == 'Japanese-wordlist') {
        unknown_J.splice(unknown_J.findIndex(item => item.id === id), 1)
        console.log(unknown_J)
      }
    }
    this.setData({
      isClick: !this.data.isClick
    })

  },
  show: function () {
    this.setData({
      showNot: true
    })
  },
  next: function (e) {
    if (percent < 100) {
      percent = percent + 2
      this.setData({
        showNot: false,
        percent: percent
      })
      var me = this;
      if (list == 'Japanese-wordlist') {
        var idx = Math.floor(Math.random() * 259)
      }
      else if (list == 'English-wordlist') {
        var idx = Math.floor(Math.random() * 15325)
      }
      else if (list == 'korean-wordlist') {
        var idx = Math.floor(Math.random() * 13278)
      }
      console.log(idx)
      id = idx
      wx.cloud.init()
      const db = wx.cloud.database()
      db.collection(list).where({
        id: idx
      }).get({
        success: function (res) {
          console.log(res.data)
          if (list == 'English-wordlist') {
            var mea = res.data[0].meaning.replace(/&lt;br&gt;/g, '\n')
            var ll = res.data[0].lj.replace(/\/r\/n/g, '\n')
          }
          else {
            var mea = res.data[0].meaning
            var ll = res.data[0].lj
          }
          me.setData({
            word: res.data[0].word,
            meaning: mea,
            lj: ll
          })
          if (list == 'English-wordlist') {
            if (unknown_E.indexOf(id) != -1)
              me.setData({
                isClick: true
              })
            else me.setData({
              isClick: false
            })
          }
          else if (list == 'korean-wordlist') {
            if (unknown_K.indexOf(id) != -1)
              me.setData({
                isClick: true
              })
            else me.setData({
              isClick: false
            })
          }
          else if (list == 'Japanese-wordlist') {
            if (unknown_J.indexOf(id) != -1)
              me.setData({
                isClick: true
              })
            else me.setData({
              isClick: false
            })
          }
        }
      })
    }
    else if (percent >= 100) {
      percent = 0
      wx.navigateTo({
        url: './done/done',
      })
      wx.cloud.init()
      console.log(unknown_E)
      console.log(unknown_J)
      console.log(unknown_K)
      //-------------jc  原：getApp().globalData.openid
      db.collection('user_data').doc(getApp().globalData._id).update({
        data: {
          unknown_E: unknown_E,
          unknown_J: unknown_J,
          unknown_K: unknown_K
        },
        success: console.log,
        fail: console.error
      })
    }
  },//页面卸载时把数据写入
onUnload: function () {
  db.collection('user_data').doc(getApp().globalData._id).update({
    data: {
      unknown_E: unknown_E,
      unknown_J: unknown_J,
      unknown_K: unknown_K
    },
    success: console.log,
    fail: console.error
  })
  },



})