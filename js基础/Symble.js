let emoeror = {
    prince:['prince1','prince2'],
    princess:['princess1','princess2']
}
const prince = Symbol('baster') // baster相当于对这个symbol的一段描述，方便代码阅读和调试   
emoeror[prince] = '敢当当'

console.log(emoeror)
// {
//     prince: [ 'prince1', 'prince2' ],
//     princess: [ 'princess1', 'princess2' ],
//     [Symbol(baster)]: '敢当当'
//   }


// 只有使用下面的方法才能遍历到Symbol
console.log(Object.getOwnPropertySymbols(emoeror))
// [ Symbol(baster) ]

// Symbol不能使用new来创建，Symbol是原始值，不是引用类型

// 共享Symbol:Symbol.for 如果描述一致，后者会被前者覆盖掉
const bastard1 = Symbol.for('如花')
emoeror[bastard1] = '如花的大儿子'

const bastard2 = Symbol.for('如花')
emoeror[bastard2] = '如花的小儿子'

const bastard3 = Symbol.for('似水')
emoeror[bastard3] = '似水的儿子'

console.log(emoeror)
console.log(bastard2 === bastard1) // true

// {
//     prince: [ 'prince1', 'prince2' ],
//     princess: [ 'princess1', 'princess2' ],
//     [Symbol(baster)]: '敢当当',
//     [Symbol(如花)]: '如花的小儿子',
//     [Symbol(似水)]: '似水的儿子'
//   }

// 返回与Symbol有关的键
console.log(bastard1,Symbol.keyFor(bastard1)) // Symbol(如花) 如花

console.log(Object.getOwnPropertySymbols(emoeror)) // [ Symbol(baster), Symbol(如花), Symbol(似水) ]