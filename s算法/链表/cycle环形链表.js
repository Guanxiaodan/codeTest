/* 判断单链表是不是环形链表
打开cycle.html看图解
https://leetcode-cn.com/problems/linked-list-cycle/ */
function hasCycle(head) {
  let map = new Map();
  while (head && head.next) {
    if (map.has(head)) {
      return true;
    }
    map.set(head, true);
    head = head.next;
  }
  return false;
}
