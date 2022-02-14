// Promise.then的返回值情况

// 返回普通数据
var example = new Promise((resolve, reject) => {
  let i = 1;
  resolve(i);
});
example
  .then((value) => {
    console.log(value); // 1
    value++;
    return value; // 返回普通数据
  })
  .then((value) => {
    console.log(value); // 2
  });
// 状态：fulfilled。值：普通数据

// ----------------------------------------------------------------------------------------

// 没有返回值
var example = new Promise((fulfill, reject) => {
  let i = 1;
  fulfill(i);
});
example
  .then((value) => {
    console.log(value); // 1
    value++; // 没有进行return
  }) // 返回的promise状态：fulfilled。值：undefined
  .then((value) => {
    console.log(value); // undefined
  });

// ----------------------------------------------------------------------------------------

// 抛错
var example = new Promise((fulfill, reject) => {
  let i = 1;
  fulfill(i);
});
example
  .then(
    (value) => {
      console.log(value); // 1
      value++;
      throw new Error("then1的抛错"); // 抛错 但如果使用return new Error('then1的抛错')，状态会变成fulfilled
    },
    (err) => {
      console.log("catch1", err);
    }
  ) //   返回的promise状态：reject,值：错误信息
  .then(
    (value) => {
      console.log(value);
    },
    (err) => {
      console.log("catch2", err); //catch2  Error: then1的抛错
    }
  );

// catch为then的语法糖，它是then(null, rejection)的别名。只不过上面有错误的时候才会走进来
var example = new Promise((fulfill, reject) => {
  let i = 1;
  reject(i);
});
example
  .catch((err) => {
    console.log("我是第一个catch的回调函数", err); //   我是第一个catch的回调函数 1
    return 2;
  }) // 返回的promise状态：fulfill，值：2
  .then((res) => {
    console.log("我是第一个then的回调函数", res); //   我是第一个then的回调函数 2
    throw Error;
  }) // 返回的promise状态：reject，值：Error函数
  .catch((err) => {
    console.log("我是第二个catch的回调函数", err); //   我是第二个catch的回调函数 ƒ Error() { [native code] }
  }) // 返回的promise状态：fulfill，值：undefined
  .then((res) => {
    console.log("我是第二个then的回调函数", res); //   我是第二个then的回调函数 undefined
  }); // 返回的promise状态：fulfill，值：undefined

// ----------------------------------------------------------------------------------------

// 对比下1,2，3，体会是否返回promise的差异
/**
 * 返回 new Promise1
 * */
var example = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
example
  .then((res) => {
    console.log(res); // 两秒后打印 1
    const p2 = new Promise(function (resolve, rejected) {
      resolve(2);
    });
    return p2;
  }) // 返回的是p2这个promise本身
  .then((res) => {
    console.log(res); // 几乎和1同时打印出来2
  });

//   返回 new Promise2
var example = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
example
  .then((res) => {
    console.log(res); // 两秒后打印 1
    const p2 = new Promise(function (resolve, rejected) {
      setTimeout(() => {
        resolve(2);
      }, 3000);
    });
    return p2;
  }) // 返回的是p2这个promise本身
  .then((res) => {
    console.log(res); // 5秒后打印出来2
  });

//   返回 new Promise3
var example = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
example
  .then((res) => {
    console.log(res); // 两秒后打印 1
    const p2 = new Promise(function (resolve, rejected) {
      // P2只是在then中执行的一段代码,p2是有自己的then的（不过没写），所以P2的状态和then的状态无关。错误会在控制台报红： Uncaught (in promise) 2
      rejected(2);
    });
  }) // 返回的promise状态是fulfilled,值是undefined
  .then((res) => {
    console.log("最后一个then", res); // 2秒后打印出 最后一个then undefined
  })
  .catch(() => {
    console.log("最后一个err", err); // 不会执行
  });

//   返回 new Promise4
var example = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
example
  .then((res) => {
    console.log(res); // 两秒后打印 1
    const p2 = new Promise(function (resolve, rejected) {
      setTimeout(() => {
        resolve(2);
      }, 3000);
    });
    return p2.then(() => {
      // 5秒后p2状态有了，进入then
      // setTimeout相当于放在全局执行了，跟then没啥关系了
      // 异步，下面的例子是同步
      setTimeout(() => {
        return 3;
      }, 4000);
    });
  }) // 返回的promise状态是fulfilled,值是undefined
  .then((res) => {
    console.log("最后一个then", res); // 5秒后打印出 最后一个then undefined
  });

//   返回 new Promise5
// 前一个then有状态了之后才能进入后一个then
var example = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
example
  .then((res) => {
    console.log(res); // 两秒后打印 1
    const p2 = new Promise(function (resolve, rejected) {
      resolve(2);
    });
    return p2.then((res2) => {
      for (var i = 0; i < 100000; i++) {
        if (i === 9999) {
          return 3;
        }
      }
    });
  }) // 返回的promise状态是fulfilled,值是3
  .then((res) => {
    console.log("最后一个then", res); // 等待for循环结束后，打印 最后一个then 3
  });
