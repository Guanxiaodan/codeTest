// 假如这里有 n 个台阶，每次你可以跨 1 个台阶或者 2 个台阶，请问走这 n 个台阶有多少种走法？如果有 7 个台阶，你可以 2，2，2，1 这样子上去，也可以 1，2，1，1，2 这样子上去，总之走法有很多，那如何用编程求得总共有多少种走法呢？
function step(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return step(n - 1) + step(n - 2);
}
// 为了避免重复计算，我们可以通过一个数据结构（比如散列表）来保存已经求解过的 f(k)。当递归调用到 f(k) 时，先看下是否已经求解过了。如果是，则直接从散列表中取值返回，不需要重复计算，这样就能避免刚讲的问题了。
let map = new Map();
function step2(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (map.has(n)) {
    return map.get(n);
  }
  let pp = step2(n - 1) + step2(n - 2);
  map.set(n, pp);
  return pp;
}
