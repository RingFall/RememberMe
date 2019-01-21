//传入两个数组
//此函数返回两个数组交集
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  var inter_set = []
  var big = event.a1, small = event.a2
  if(big.length < small.length)
  {
    var temp = big
    big = small
    small = temp
  }
  for(var i = 0; i < small.length; i++)
  {
    var temp = small[i]
    for(var j = 0; j < big.length; j++)
    {
      if(big[j] == temp)
      {
        inter_set.push(big[j])
      }
    }
  }
  return{
    inter_set
  }
}