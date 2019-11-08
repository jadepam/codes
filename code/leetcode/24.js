/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */


const swapPairs = head => {
    let p = head;
      console.log(head,'head')
    let b = null;
    if (!head || !head.next) return head;
    head = head.next;
    while(p && p.next) {
      const n = p.next.next;
      p.next.next = p;
      if (b) b.next = p.next;
      p.next = n;
      b = p;
      p = p.next;
    }
      console.log(head,p,b)
    return head;//链表浅拷贝
  };

