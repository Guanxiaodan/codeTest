Function.prototype.apply2 = function (context, arg) {
  const currentThisObj = context || window;
  currentThisObj.fn = this;
  currentThisObj.fn(...arg);
  delete currentThisObj.fn;
};

// 测试一下
var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value, "name:", name, "age:", age);
}

bar.apply2(foo, [11, 22]); // 1
