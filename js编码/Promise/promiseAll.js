// 手动实现Promise.all
Promise.all2 = function (promiseList) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseList)) {
      reject("参数错误");
    }
    let count = 0;
    let result = [];
    promiseList.forEach((promiseItem, index) => {
      Promise.resolve(promiseItem).then(
        (res) => {
          result[index] = res;
          count += 1;
          if (count === promiseList.length) {
            resolve(result);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

// 使用
var p1 = Promise.resolve(1),
  p2 = Promise.resolve(2),
  p3 = Promise.resolve(3);
Promise.all2([p1, p2, p3])
  .then(function (results) {
    //then方法不会被执行
    console.log(results);
  })
  .catch(function (e) {
    //catch方法将会被执行，输出结果为：2
    console.log(2);
  });
