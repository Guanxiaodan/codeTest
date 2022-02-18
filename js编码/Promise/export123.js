let arr = [1, 2, 3]
arr.reduce((pre, cur) => {
  return pre.then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(console.log(cur))
      }, 1000)
    })
  })
}, Promise.resolve())
