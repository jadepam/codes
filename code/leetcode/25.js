/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
let reverseKGroup = function(head, k) {    
    if (k === 1 || head === null) {
        return head;
    }
    
    return reverse(head, k);
}

/**
 * Recursively reverse linked list.
 */
let reverse = function(head, k, firstNode = null) {    
    if (head.next === null) {
        return firstNode || head;
    }
    
    let start = head;
    head = firstNode === null ? head : head.next;
    let end = head;

    let previous = null;
    for (let i = 0; i < k; i++) {
        if (head === null) {
            // nothing left.
            if (i === 0) {
                break;
            }
            
            // k is larger than nodes, reverse everything.
            if (firstNode === null) {
                return reverse(previous, i); 
            }
            
            // reverse remaining
            start.next = previous;
            return reverse(start, i, firstNode);
        }
        
        let temp = head.next;
        head.next = previous;
        previous = head;
        head = temp;
    }

    start.next = firstNode === null ? head : previous;
    end.next = head;

    return reverse(end, k, firstNode || previous);
}