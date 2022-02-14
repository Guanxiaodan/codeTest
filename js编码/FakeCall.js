Function.prototype.call2 = function(){
    const currentThisObj = arguments[0]||window
    delete arguments[0]
    currentThisObj.fn = this
    currentThisObj.fn(...Object.values(arguments))
    delete  currentThisObj.fn
}


// 测试一下
var foo = {
    value: 1
};

function bar(name,age) {
    console.log(this.value,'name:',name,'age:',age);
}

bar.call2(foo,11,22); // 1









