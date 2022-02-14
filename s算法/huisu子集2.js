let path = []
let res = []
var subsets = function(nums) {
    res = []
    backTracking(nums,0)
    return res
};
function backTracking(nums,startIndex){
    res.push([...path])
    for(var i=startIndex;i<nums.length;i++){
        path.push(nums[i])
        backTracking(nums,i+1)
        path.pop()
    }
}

console.log(subsets([1,2,3]))