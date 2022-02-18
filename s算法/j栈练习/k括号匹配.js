function isValid(s) {
  s = s.split('')
  if (s.length % 2 === 1) {
    return false
  }
  const maps = new Map([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ])
  const stack = []
  let n = 0
  for (; n < s.length; s++) {
    const isRightPart = maps.has(s[n])
    if (isRightPart) {
      if (stack[stack.length - 1] !== maps.get(s[n])) {
        return false
      } else {
        stack.pop()
      }
    } else {
      stack.push(s[n])
    }
  }
  return stack.length === 0
}
