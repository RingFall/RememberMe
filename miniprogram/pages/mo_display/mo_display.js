import regeneratorRuntime from '../mo_re/regenerator-runtime/runtime.js'
var app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    load_hide: false,
    _id: null,
    mo_id: null,
    mo_name: '',
    mo_abs: '',
    poster_url: '',
    image_height: null,
    image_width: null
  },

  image_load: function(e){
    console.log(e)
    var or_width = e.detail.width, or_height = e.detail.height
    var ratio = or_height / or_width
    console.log(ratio)
    this.setData({
      load_hide: true,
      image_height: 718 * ratio,
      image_width: 718
    })
  },

  onLoad: async function (options) {
    var cur_mo_name = app.globalData.cur_mo_name
    var p_url = 'cloud://jadb-ceb8b2.6a61-jadb-ceb8b2/movie_posters/' + cur_mo_name + '.jpg'
    var one = await this.get_one(cur_mo_name)
    //console.log(one)
    this.setData({
      _id: one._id,
      mo_id: one.movie_id,
      mo_name: cur_mo_name,
      mo_abs: one.abstract,
      poster_url: p_url
    })
    console.log(this.data._id)
  },

  get_one(m_name) {
    return new Promise(function (resolve, reject) {
      var one_mo
      const db = wx.cloud.database()
      db.collection('movie_data').where({
        name: m_name
      }).get({
        success(res) {
          one_mo = res.data[0]
          //console.log(one_mo)
          resolve(one_mo)
        }
      })
    })
  },

  like_mo: async function(){
    console.log(app.globalData.openid)
    var mid = this.data.mo_id
    console.log(mid)
    
    db.collection('user_data').where({
      user_id: app.globalData.user_id
    }).get({
      success(res) {
        var u_id = res.data[0]._id
        var temp_mll = res.data[0].movie_like_list, flag = 0
        for(var  i = 0; i < temp_mll.length; i++){
          if(temp_mll[i] == mid){
            flag = 1
            break
          }
        }
        if(flag == 0){
          db.collection('user_data').doc(u_id).update({
            data: {
              movie_like_list: _.push(mid)
            }
          })
          console.log(this.data._id)
          db.collection('movie_data').doc(this.data._id).update({
            data:{
              like: _.push(res.data[0].user_id)
            },
            success: console.log,
            fail: console.error
          })
        }
      }
    })
    
  },

  unlike_mo: function(){
    var mid = this.data.mo_id

    db.collection('user_data').where({
      user_id: app.globalData.user_id
    }).get({
      success(res) {
        console.log(res)
        var temp_mll = res.data[0].movie_like_list
        for(var i = 0; i < temp_mll.length; i++){
          if(temp_mll[i] == mid){
            temp_mll.splice(i, 1)
          }
        }
        console.log(temp_mll)
        console.log(res.data[0]._id)
        db.collection('user_data').doc(res.data[0]._id).update({
          data: {
            movie_like_list: temp_mll
          },
          success: console.log,
          fail: console.error
        })
      },
      fail(err){
        console.log('fail get person')
      }
    })
    
  }


})