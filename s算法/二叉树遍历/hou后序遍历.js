// 前序遍历  前-中-后
    //         1
    //     2       3
    // 4       5
    //     6       7
// 遍历结果：4675231

// 递归方式
var postorderTraversal = function(root,res=[]) {
    if(!root){
        return res
    }
    if(root.left){
        postorderTraversal(root.left,res)
    }
    if(root.right){
        postorderTraversal(root.right,res)
    }
    res.push(root.val)
    return res
};

