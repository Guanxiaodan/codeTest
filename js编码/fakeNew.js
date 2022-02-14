// 第一版代码
function objectFactory() {
  // 创建空对象
  var obj = new Object();

  // 从arguments中提取构造函数并将构造函数赋值给Constructor
  Constructor = [].shift.call(arguments);

  // 给新建的空对象设置原型链
  obj.__proto__ = Constructor.prototype;

  // 执行构造函数，并将新建对象和参数给到构造函数的this和所需参数
  const ret = Constructor.apply(obj, arguments);

  // 返回新建的对香
  return typeof ret === "object" ? ret : obj;
}

// 调用
function Test(name, age) {
  console.log("hhhhh");
  this.name = name;
  this.age = age;
  return {};
}
const ii = objectFactory(Test, "33", 11);

console.log(ii);

// 正常的new使用
console.log(new Test("33", 11));

// function creatNewObj(){
//     let obj = Object.create(null)
//     let Ctor = [].shift.call(arguments)
//     obj.__proto__ = Ctor.prototype
//     const ret = Ctor.apply(obj, arguments)
//     return typeof ret === "object" ? ret : obj
// }
