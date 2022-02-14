// 可以遍历对象，数组。但更适合遍历对象
// for..in..中的index是string类型，不是num类型
// for..in..会把原型连上加的方法打印出来
// 遍历顺序可能是乱序的
// for..in..取得是key/index


// 遍历数组
var arr = ['g','x','d']
Array.prototype.myFn = function(){
    console.log('我是加在原型上的方法')
}
for(let index in arr){
    console.log('key:',index,'，value:',arr[index],'，key的类型：',typeof index)
}

// 0 g string
// 1 x string
// 2 d string
// myFn [Function (anonymous)] string


// 遍历对象
var obj = {
    a:'g',
    b:'x',
    c:'d',
}
Object.prototype.myFn = function(){
    console.log('我是加在原型上的方法')
}
for(let key in obj){
    console.log('key:',key,'value:',obj[key],'key的类型',typeof key)
}

// key: a value: g key的类型 string
// key: b value: x key的类型 string
// key: c value: d key的类型 string
// key: myFn value: [Function (anonymous)] key的类型 string

