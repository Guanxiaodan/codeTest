// 实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject。
// 缩进比如有如下请求fetchData
function fetchData() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('response')
    }, 1000)
  })
}
// 实现的retry函数调用方式如下：
retry(fetchData, 3)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

// 解答：
function retry(promiseFunc, num = 2) {
  return promiseFunc().then(null, (e) => {
    if (num > 0) {
      num -= 1
      console.log('重试')
      return retry(promiseFunc, num)
    }
    console.log(111)
    return Promise.reject(e)
  })
}
// resolve的值会被透传出去
