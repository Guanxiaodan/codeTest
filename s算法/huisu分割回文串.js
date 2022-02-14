var path = []
var res = []
var temp = ''
var partition = function(s) {
    res = []
    backTacking(s,0)
    return res
};
function backTacking(str,startIndex){
    if(startIndex>=str.length){
        res.push([...path])
        return
    }
    for(var i=startIndex;i<str.length;i++){
        temp = str.slice(startIndex,i+1)
        if(isBackString(temp)){
            path.push(temp)
        }else{
            continue
        }
        backTacking(str,i+1)
        path.pop()
    }
}
// 判断字符串是不是回文字符串
function isBackString(str){
    var originArr = str.split('')
    var backStr = originArr.reverse().join('')
    return str == backStr
}

// const isPalindrome = (s, l, r) => {
//     for (let i = l, j = r; i < j; i++, j--) {
//         if(s[i] !== s[j]) return false;
//     }
//     return true;
// }

// var partition = function(s) {
//     const res = [], path = [], len = s.length;
//     backtracking(0);
//     return res;
//     function backtracking(i) {
//         if(i >= len) {
//             res.push(Array.from(path));
//             return;
//         }
//         for(let j = i; j < len; j++) {
//             if(!isPalindrome(s, i, j)) continue;
//             path.push(s.substr(i, j - i + 1));
//             backtracking(j + 1);
//             path.pop();
//         }
//     }
// };



console.log(partition('aab'))