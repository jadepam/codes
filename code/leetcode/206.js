var reverseList = function(head) {
    let cur = head
    let next = head
    let prev = null
    while(cur){
        next =next.next  
        cur.next = prev 
        prev = cur      
        cur= next  
    }
    return prev
}