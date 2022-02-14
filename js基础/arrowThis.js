// 箭头函数的this指向最近一层包裹它的普通函数的this。这个this有需要的属性值就用，没有拉倒，也不往上继续找。
// 如果没有被普通函数包裹，那就指向全局this(在浏览器中全局this是window，在node中全局this是个空对象{})。
var name ='xjie'
var obj = {
    name:'guanguan',
    fnn:()=>{console.log(this.name)},
    pp:{
        age:18,
        name:'xiao',
        fnn:function(){setTimeout(()=>{console.log(this.name)},0)},
    }
}

obj.fnn()  // 在node中打印undefined，在浏览器中打印xjie 
obj.pp.fnn() // xiao
// var name = 'ggg'
// console.log('2222',this)


// var name = 'xjie'
// var obj = {
//     name: 'guanguan',
//     fnn: () => {
//         console.log(this.name)
//     }
//     ,
//     fnn2() {
//         console.log(this.name)
//     },
//     pp: {
//         age: 18,
//         name: 'xiao',
//         fnn: function() {
//             setTimeout(()=>{
//                 console.log(this.name)
//             }
//             , 0)
//         },
//     }
// }

// obj.fnn()
// obj.fnn2()
// obj.pp.fnn()