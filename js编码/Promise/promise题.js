// resolve下面的代码依然会执行 （1）
// 值穿透 （2）
// 异常穿透（3,4）
// then不能返回本身的promise(5)
// promise 对象赋值给了变量 pro，每个 .then() 都是独立的。（6）
// async/await 中，await后面的代码会当做在.then中执行（7）
// 多条promise.then链是交替执行的，这是由于异步处理导致的（8）
// 因为return任意一个非 promise 的值都会被包裹成 promise 对象，所以：.then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获(9)
// promise.resolve()（10）
// 题目1：
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(6);
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
// 1 2 4 3

// 题目2：
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// 1

// 题目3：
Promise.resolve()
  .then(() => {
    return new Error("error!!!");
  })
  .then((res) => {
    console.log("then: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
//   then:  Error: error!!!

// 题目4：
Promise.resolve()
  .then(() => {
    throw new Error("error!!!");
  })
  .then((res) => {
    console.log("then: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
//   catch:  Error: error!!!

// 题目5：
const promise2 = Promise.resolve().then(() => {
  return promise2;
});
promise2.catch(console.error);
// TypeError: Chaining cycle detected for promise #<Promise>

// 题目6：
var pro = new Promise((res, rej) => {
  res(1);
});
pro.then((res) => {
  console.log(res);
});
setTimeout(() => {
  console.log(2);
});
pro.then((res) => {
  console.log(res);
});
//  1  1  2

// 题目7：
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// 题目8：
var p1 = new Promise(function (resolve, reject) {
  foo.bar();
  resolve(1);
});

p1.then(
  function (value) {
    console.log("p1 then value: " + value);
  },
  function (err) {
    console.log("p1 then err: " + err);
  }
).then(
  function (value) {
    console.log("p1 then then value: " + value);
  },
  function (err) {
    console.log("p1 then then err: " + err);
  }
);

var p2 = new Promise(function (resolve, reject) {
  resolve(2);
});

p2.then(
  function (value) {
    console.log("p2 then value: " + value);
    foo.bar();
  },
  function (err) {
    console.log("p2 then err: " + err);
  }
)
  .then(
    function (value) {
      console.log("p2 then then value: " + value);
    },
    function (err) {
      console.log("p2 then then err: " + err);
      return 1;
    }
  )
  .then(
    function (value) {
      console.log("p2 then then then value: " + value);
    },
    function (err) {
      console.log("p2 then then then err: " + err);
    }
  );

//   p1 then err: ReferenceError: foo is not defined
// p2 then value: 2
// p1 then then value: undefined
// p2 then then err: ReferenceError: foo is not defined
// p2 then then then value: 1

// 题目9：
Promise.resolve()
  .then(() => {
    return new Error("error!!!");
  })
  .then((res) => {
    console.log("then: ", res);
  })
  .catch((err) => {
    console.log("catch: ", err);
  });
// then: Error: error!!!
//   at Promise.resolve.then (...)
//   at ...

// 即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。

//   需要改成以下其中一种，会被catch捕获（同步情况下）
//   return Promise.reject(new Error('error!!!'))
//  throw new Error('error!!!')
//  代码运行出错

// 题目10：
var p1 = Promise.resolve(1);
var p2 = Promise.resolve(p1);
var p3 = new Promise(function (resolve, reject) {
  resolve(1);
});
var p4 = new Promise(function (resolve, reject) {
  resolve(p1);
});

console.log(p1 === p2);
console.log(p1 === p3);
console.log(p1 === p4);
console.log(p3 === p4);
// Promise.resolve(...)可以接收一个值或者是一个Promise对象作为参数。
// 当参数是普通值时，它返回一个resolved状态的Promise对象，对象的值就是这个参数；当参数是一个Promise对象时，它直接返回这个Promise参数。
// 因此，p1 === p2。但通过new的方式创建的Promise对象都是一个新的对象，因此后面的三个比较结果都是false。

// 题目11：
var p1 = new Promise(function (resolve, reject) {
  resolve(Promise.resolve("P1"));
});

var p2 = new Promise(function (resolve, reject) {
  resolve(Promise.reject("P2"));
});

var p3 = new Promise(function (resolve, reject) {
  reject(Promise.resolve("P3"));
});

p1.then(
  function fulfilled(value) {
    console.log("p1fulfilled: " + value);
  },
  function rejected(err) {
    console.log("p1rejected: " + err);
  }
);

p2.then(
  function fulfilled(value) {
    console.log("p2fulfilled: " + value);
  },
  function rejected(err) {
    console.log("p2rejected: " + err);
  }
);

p3.then(
  function fulfilled(value) {
    console.log("p3fulfilled: " + value);
  },
  function rejected(err) {
    console.log("p3rejected: " + err);
  }
);

// p3rejected: [object Promise]
// p1fulfilled: P1
// p2rejected: P2

// Promise回调函数中的参数resolve，会对Promise执行"拆箱"动作。但reject不会进行拆箱操作
// 即当resolve的参数是一个Promise对象时，resolve会"拆箱"获取这个Promise对象的状态和值，但这个过程是异步的。
// reject的参数会直接传递给then方法中的rejected回调。
// p1"拆箱"后，获取到Promise对象的状态是resolved，因此fulfilled回调被执行；p2"拆箱"后，获取到Promise对象的状态是rejected，因此rejected回调被执行。

// 题目12：

// 题目13：

// 题目14：

// 题目15：

// 题目16：

// 题目17：

// 题目18：

// 题目19：

// 题目20：
