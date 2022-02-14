class Commitent {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";
  constructor(func) {
    this.status = Commitent.PENDING;
    this.result = null;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(result) {
    if (this.status === Commitent.PENDING) {
      this.status = Commitent.FULFILLED;
      this.result = result;
      setTimeout(() => {
        this.resolveCallbacks.forEach((callback) => {
          callback(result);
        });
      });
    }
  }

  reject(result) {
    if (this.status === Commitent.PENDING) {
      this.status = Commitent.REJECTED;
      this.result = result;
      setTimeout(() => {
        this.rejectCallbacks.forEach((callback) => {
          callback(result);
        });
      });
    }
  }
  then(onFULFILLED, onREJECTED) {
    return new Commitent((resolve, reject) => {
      onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : () => {};
      onREJECTED = typeof onREJECTED === "function" ? onREJECTED : () => {};
      if (this.status === Commitent.PENDING) {
        this.resolveCallbacks.push(onFULFILLED);
        this.rejectCallbacks.push(onREJECTED);
      }
      if (this.status === Commitent.FULFILLED) {
        setTimeout(() => {
          onFULFILLED(this.result);
        });
      }
      if (this.status === Commitent.REJECTED) {
        setTimeout(() => {
          onREJECTED(this.result);
        });
      }
    });
  }
}

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// 试一下
console.log("第一步");
let cc = new Commitent((resolve, reject) => {
  console.log("第二步");
  resolve("gxd");
  // setTimeout(()=>{
  //     // console.log('a',cc.status)
  //     resolve('gxd')
  //     // console.log('ab',cc.status)
  //     // console.log('第四步')
  // })
});
cc.then(
  (result) => {
    // console.log('abc',cc.status)
    console.log(result);
  },
  (err) => {
    console.log(err.message);
  }
);
// console.log('第三步')
