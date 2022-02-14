/* 给定一个头结点为 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

https://leetcode-cn.com/problems/middle-of-the-linked-list/ */

// 链表可以这样转换成数组
function middleNode(head) {
  let arr = [head];
  while (arr[arr.length - 1].next !== null) {
    arr.push(arr[arr.length - 1].next);
  }
  return arr[Math.trunc(arr.length / 2)];
}
