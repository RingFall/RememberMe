//传入两个数组
//返回相似度，采用Jaccard公式
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  console.log(event.a1)
  console.log(event.a2)
  
  //获得交集
  const First = await cloud.callFunction({
    name:'intersection',
    data: {
      a1: event.a1,
      a2: event.a2 
    }
  })
  var first = First.result.inter_set
  
  //获得并集
  const Second = await cloud.callFunction({
    name: 'union',
    data: {
      a1: event.a1,
      a2: event.a2
    }
  })
  var second = Second.result.union_set
  
  //计算分子
  const Up = await cloud.callFunction({
    name: 'set_abs',
    data: {
      array: First.result['inter_set'] //函数结果返回一个json
    }
  })
  //var up = Up.result

  //计算分母
  const Down = await cloud.callFunction({
    name: 'set_abs',
    data: {
      array: Second.result['union_set']
    }
  })
  //var down = down.result

  //相似度计算
  var Wuv = Up.result['sum'] / Down.result['sum']

  //传入分子和分母

  return{
    Wuv,
    first,
    second,
  }
}