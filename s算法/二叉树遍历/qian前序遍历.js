// 前序遍历  中-前-后
    //         1
    //     2       3
    // 4       5
    //     6       7
// 遍历结果：1245673

// 递归方式
function preorderTraversal(root,res=[]){
    if(!root){return res}
    res.push(root.val)
    preorderTraversal(root.left,res)
    preorderTraversal(root.right,res)
    return res
}



// 栈迭代方式
function preorderTraversal2(root,res=[]){
    if(!root){return res}
    let stack = []
    let current = root
    stack.push(current)
    while(stack.length>0){
        current = stack.pop()
        res.push(current.val)
        if(current.right){
            stack.push(current.right)
        }
        if(current.left){
            stack.push(current.left)
        }
    }
    return res
}

