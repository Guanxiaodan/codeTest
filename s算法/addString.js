/* 大数加法
实现两个字符串型数字的加法运算，返回字符串型的数字的和
```
sum('1233', '233') // '1466'
```
无法直接对传入参数进行转换成数字
https://leetcode-cn.com/problems/add-strings/solution/
 */
// 自己写的
function sum(str1, str2) {
  const str1Nums = str1.split('').reverse()
  const str2Nums = str2.split('').reverse()
  if (str1Nums.length > str2Nums.length) {
    const originLength = str2Nums.length
    str2Nums.length = str1Nums.length
    str2Nums.fill(0, originLength, str1Nums.length)
  } else {
    const originLength = str1Nums.length
    str1Nums.length = str2Nums.length
    str1Nums.fill(0, originLength, str2Nums.length)
  }
  const resNums = []
  let two = null
  for (let i = 0; i < str2Nums.length; i++) {
    const partSum = +str1Nums[i] + +str2Nums[i]
    let one = partSum % 10
    if (two > 0) {
      one += 1
    }
    resNums[i] = one
    two = partSum >= 10 ? 1 : 0
  }
  return resNums.reverse().join('')
}

console.log(sum('1287', '233'))

// 参考答案写的
var addStrings = function (num1, num2) {
  let i = num1.length - 1
  let j = num2.length - 1
  let add = 0
  const res = []
  while (i >= 0 || j >= 0 || add > 0) {
    const x = i >= 0 ? parseInt(num1[i]) : 0
    const y = j >= 0 ? parseInt(num2[j]) : 0
    const sum = x + y + add
    res.push(sum % 10)
    add = parseInt(sum / 10)
    i--
    j--
  }
  return res.reverse().join('')
}
console.log(addStrings('1287', '233'))
