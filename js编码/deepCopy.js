var arr1 = ['g','x','d']
var arr2 = [...arr1]
arr2[2] = 'f'
console.log(arr1)
console.log(arr2)
console.log('↑↑↑单层的拷贝，没啥问题')

console.log('===========================')

console.log('↓↓↓多层的拷贝，就不对了，期望arr3的name依然是gxd')
var arr3 = ['g','x','d',{name:'gxd'}]
var arr4 = [...arr3]
arr3[2] = 'f'
arr3[3].name = 'gxf'
console.log('arr3:',arr3)
console.log('arr4:',arr4)

console.log('以上是浅拷贝，以及浅拷拷贝的问题')

console.log('===========================')

// 实现深拷贝
function deepClone(obj = {}){
    if(typeof obj!=="object"||obj == null){
        return obj
    }
    let result;
    if(obj instanceof Array){
        result = []
    } else{
        result = {}
    }
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            result[key] = deepClone(obj[key])
        }
    }
    return result      
}
console.log('↓↓↓使用深拷贝试试')
var arr5 = ['g','x','d',{name:'gxd'}]
var arr6 = deepClone(arr5)
arr6[2] = 'f'
arr6[3].name = 'gxf'
console.log('arr5:',arr5)
console.log('arr6:',arr6)
