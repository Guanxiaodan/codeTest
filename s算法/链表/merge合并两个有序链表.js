/* 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
https://leetcode-cn.com/problems/merge-two-sorted-lists/ */
function mergeTowList(head1,head2){
    if(!head1){
        return head2
    }else if(!head2){
        return head1
    }else{
        if(head1.val<=head2.val){
            head1.next = mergeTowList(head1.next,head2)
            return head1
        }else{
            head2.next = mergeTowList(head1,head2.next)
            return head2
        }
    }
}