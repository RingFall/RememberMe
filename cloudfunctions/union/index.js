//传入两个数组
//返回两个数组并集
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  var union_set = []
  var big = event.a1, small = event.a2
  if (big.length < small.length) {
    var temp = big
    big = small
    small = temp
  }
  for(var i = 0; i < big.length; i++){
    union_set.push(big[i])
  } 
  for (var i = 0; i < small.length; i++) {
    var temp = small[i], flag = 0
    for (var j = 0; j < big.length; j++) {
      if (big[j] == temp) {
        flag = 1
        break
      }
    }
    if(flag == 0)union_set.push(small[i])
  }
  return{
    union_set
  }
}