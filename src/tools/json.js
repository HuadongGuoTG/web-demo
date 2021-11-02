export function getClass(o) {
  //判断数据类型
  return Object.prototype.toString.call(o).slice(8, -1)
}

export function deepCopy(obj) {
  var result,
    oClass = getClass(obj)

  if (oClass == 'Object') result = {}
  //判断传入的如果是对象，继续遍历
  else if (oClass == 'Array') result = []
  //判断传入的如果是数组，继续遍历
  else return obj //如果是基本数据类型就直接返回

  for (var i in obj) {
    var copy = obj[i]

    if (getClass(copy) == 'Object') result[i] = deepCopy(copy)
    //递归方法 ，如果对象继续变量obj[i],下一级还是对象，就obj[i][i]
    else if (getClass(copy) == 'Array') result[i] = deepCopy(copy)
    //递归方法 ，如果对象继续数组obj[i],下一级还是数组，就obj[i][i]
    else result[i] = copy //基本数据类型则赋值给属性
  }

  return result
}
