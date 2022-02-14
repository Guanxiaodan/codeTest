// 前序遍历  前-中-后
    //         1
    //     2       3
    // 4       5
    //     6       7
// 遍历结果：4265713

// 递归方式
function inorderTraversal(root,res=[]){
    if(!root){
        return res
    }
    if(root.left){
        inorderTraversal(root.left,res)
    }
    res.push(root.val)
    if(root.right){
        inorderTraversal(root.right,res)
    }
    return res
}


