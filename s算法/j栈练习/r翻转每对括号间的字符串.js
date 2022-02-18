// 给出一个字符串 s（仅含有小写英文字母和括号）。
// 请你按照从括号内到外的顺序，逐层反转每对匹配括号中的字符串，并返回最终的结果。
// 注意，您的结果中 不应 包含任何括号。

// 示例 1：
// 输入：s = "(abcd)"
// 输出："dcba"

// 示例 2：
// 输入：s = "(u(love)i)"
// 输出："iloveu"
// 解释：先反转子字符串 "love" ，然后反转整个字符串。

// 示例 3：
// 输入：s = "(ed(et(oc))el)"
// 输出："leetcode"
// 解释：先反转子字符串 "oc" ，接着反转 "etco" ，然后反转整个字符串。

// 示例 4：
// 输入：s = "a(bcdefghijkl(mno)p)q"
// 输出："apmnolkjihgfedcbq"

// 链接：https://leetcode-cn.com/problems/reverse-substrings-between-each-pair-of-parentheses
var reverseParentheses = function (s) {
  let stack = []
  let res = ''
  for (let ch of s) {
    if (ch === '(') {
      stack.push(res)
      res = ''
    } else if (ch === ')') {
      res = res.split('').reverse().join('')
      res = stack[stack.length - 1] + res
      stack.pop()
    } else {
      res += ch
    }
  }
  return res
}
