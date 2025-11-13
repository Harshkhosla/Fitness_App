function  isBinarySearch (root , left, right){
    if(!root) return true

    
    if(root.left && root.left.value < right){
        isBinarySearch(root.left , left, root.value )
    }else{
        return false
    }
     if(root.right && left <root.right.value ){
        isBinarySearch(root.right , root.value , right)
    }else{
        return false
    }
}