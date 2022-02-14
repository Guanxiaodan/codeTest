// 遍历可迭代对象
// 可以简单，正确的遍历数组
// 不遍历原型
// 取的是value

let arr = ['g','x','d',1,2]
arr.name = 'guandangdang'
arr.getName = function(){return this.name}
for(let value of arr){
    console.log(value,typeof value)
}

// g string
// x string
// d string
// 1 number
// 2 number


