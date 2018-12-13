Page({
  data:{

  },
  onLoad:function(option){
    var word = option.content

    var that = this;
        wx.request({
            url: 'https://api.shanbay.com/bdc/search/?word=' + word,
            data: {},
            method: 'GET',
            success: function (res) {
                console.log(res)
                that.setData({
                    content: res.data.data.content,
                    audio: res.data.data.audio_addresses.us[0],
                    pron: res.data.data.pron,
                    definition: res.data.data.definition
                  
                })
            },
            fail: function () {
            },
            complete: function () {
            }
        })
},
onReady(e){
  this.audioCtx = wx.createAudioContext('myaudio')
  this.audioCtx.setSrc({audio})
 
},
play(){
  this.audioCtx.play()
}


  


})