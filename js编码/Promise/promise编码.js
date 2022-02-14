// 题目1----------------------题目1----------------------题目1----------------------题目1----------------------题目1----------
// 页面上有一个输入框，两个按钮，A按钮和B按钮，点击A或者B分别会发送一个异步请求，请求完成后，结果会显示在输入框中。
// 题目要求，用户随机点击A和B多次，要求输入框显示结果时，按照用户点击的顺序显示，举例：
// 用户点击了一次A，然后点击一次B，又点击一次A，输入框显示结果的顺序为先显示A异步请求结果，再次显示B的请求结果，最后再次显示A的请求结果。
//dom元素
var a = document.querySelector("#a");
var b = document.querySelector("#b");
var i = document.querySelector("#ipt");
//全局变量p保存promie实例
var P = Promise.resolve();
a.onclick = function () {
  //将事件过程包装成一个promise并通过then链连接到
  //全局的Promise实例上，并更新全局变量，这样其他点击
  //就可以拿到最新的Promies执行链
  P = P.then(function () {
    //then链里面的函数返回一个新的promise实例
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
        console.log("a");
        i.value = "a";
      }, 1000);
    });
  });
};
b.onclick = function () {
  P = P.then(function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
        console.log("b");
        i.value = "b";
      }, 2000);
    });
  });
};
// 题目一说明：
// 我们用定时器来模拟异步请求，仔细于阅读代码我们发现，在全局我们定义了一个全局P，P保存了一个promise的实例。
// 然后再观察点击事件的代码，用户每次点击按钮时，我们在事件中访问全局Promise实例，将异步操作包装到成新的Promise实例，然后通过全局Promise实例的then方法来连接这些行为。
// 连接的时候需要注意，then链的函数中必须将新的promise实例进行返回，不然就会执行顺序就不正确了。
// 需要注意的是，then链连接完成后，我们需要更新全局的P变量，只有这样，其它点击事件才能得到最新的Promise的执行链。
// 这样每次用户点击按钮就不需要关心回调执行时机了，因为promise的then链会按照其连接顺序依次执行。
// 这样就能保证用户的点击顺序和promise的执行顺序一致了。

// 题目2----------------------题目2----------------------题目2----------------------题目2----------------------题目2----------
// 实现 mergePromise 函数，把传进去的函数数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。
const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });

const mergePromise = (ajaxArray) => {
  // 在这里实现你的代码
};

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// 答案
const mergePromise2 = (ajaxArray) => {
  let P = Promise.resolve();
  const result = [];
  ajaxArray.forEach((item) => {
    P = P.then(item).then(function (res) {
      result.push(res);
      return result;
    });
  });
  return P.then(() => {
    return result;
  });
};
// 要想异步按照顺序输出结果，唯一的办法就是等上一个异步执行结束之后，再执行下一个异步

// 题目3----------------------题目3----------------------题目3----------------------题目3----------------------题目3----------
// 实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject。
// 缩进比如有如下请求fetchData
function fetchData() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("response");
    }, 1000);
  });
}
// 实现的retry函数调用方式如下：
retry(fetchData, 3);

// 解答：
function retry(promiseFunc, num = 2) {
  return promiseFunc().then(null, (e) => {
    if (num > 0) {
      num -= 1;
      console.log("重试");
      return retry(promiseFunc, num);
    }
    return Promise.reject(e);
  });
}
// 题目4----------------------题目4----------------------题目4----------------------题目4----------------------题目4----------
// 题目5----------------------题目5----------------------题目5----------------------题目5----------------------题目5----------
// 题目6----------------------题目6----------------------题目6----------------------题目6----------------------题目6----------
// 题目7----------------------题目7----------------------题目7----------------------题目7----------------------题目7----------
