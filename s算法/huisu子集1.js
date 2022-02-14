let path = []
let res = []
var combine = function(n, k) {
    res = []
    backTacking(n, k,1)
    return res
};
function backTacking(n, k,startIndex){
    if(path.length === k){
        res.push([...path])
        return
    }
    for(var i=startIndex;i<=n;i++){
        path.push(i)
        backTacking(n,k,i+1)
        path.pop()
    }
}

console.log('结果：',combine(4,2))