function debounce(fn, delay) {
  let timer
  return function () {
    const context = this
    const arg = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, arg)
    }, delay)
  }
}

function throttle(fn, delay) {
  let timer
  return function () {
    const context = this
    const arg = arguments
    if (timer) {
      return
    } else {
      timer = setTimeout(() => {
        fn.apply(context, arg)
      }, delay)
    }
  }
}

class FakePromise {
  static PEEDING = '待定'
  static RESOLVE = '成功'
  static REJECT = '失败'
  constructor(fun) {
    this.status = FakePromise.PEEDING
    this.result = null
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    try {
      fun(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  resolve(res) {
    setTimeout(() => {
      if (this.status === FakePromise.PEEDING) {
        this.status = FakePromise.RESOLVE
        this.result = res
        this.resolveCallbacks.forEach((callback) => {
          callback(res)
        })
      }
    })
  }
  reject(res) {
    setTimeout(() => {
      if (this.status === FakePromise.PEEDING) {
        this.status = FakePromise.REJECT
        this.result = res
        this.rejectCallbacks.forEach((callback) => {
          callback(res)
        })
      }
    })
  }
  then(onResolve, onReject) {
    return new FakePromise((resolve, reject) => {
      onResolve = typeof onResolve === 'function' ? onResolve : () => {}
      onReject = typeof onReject === 'function' ? onReject : () => {}
      if (this.status === FakePromise.PEEDING) {
        this.resolveCallbacks.push(onResolve)
        this.rejectCallbacks.push(onReject)
      }
      if (this.status === FakePromise.RESOLVE) {
        setTimeout(() => {
          onResolve(this.res)
        })
      }
      if (this.status === FakePromise.REJECT) {
        setTimeout(() => {
          onReject(this.res)
        })
      }
    })
  }
}
Promise.all2 = function (proseList) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(proseList)) {
      reject('参数错误')
    }
    const result = []
    let count = 0
    proseList.forEach(
      (item, index) => {
        Promise.resolve(item).then((res) => {
          result[index] = res
          count++
          if (count === proseList.length) {
            resolve(result)
          }
        })
      },
      (err) => {
        reject(err)
      }
    )
  })
}

Promise.retry = function (func, num = 2) {
  return func().then(null, () => {
    if (num > 0) {
      num--
      return Promise.retry(func, num)
    }
    return Promise.reject('cow')
  })
}

function deepCopy(val) {
  if (typeof val !== 'object') {
    return val
  }
  let copy
  if (Array.isArray(val)) {
    copy = []
  } else {
    copy = {}
  }
  for (let key in val) {
    if (val.hasOwnProperty(key)) {
      copy[key] = deepCopy(val[key])
    }
  }
  return copy
}
// 测试一下
var foo = {
  value: 1,
}

function bar(name, age) {
  console.log(this.value, 'name:', name, 'age:', age)
}

bar.apply2(foo, [11, 22]) // 1
function FakeApply(a, arg) {
  const context = a
  context.fn = this
  context.fn(...arg)
  delete context.fn
}
