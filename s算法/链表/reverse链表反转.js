/* 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
https://leetcode-cn.com/problems/reverse-linked-list/ */

// 解法一：迭代
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
