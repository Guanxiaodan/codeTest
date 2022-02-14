// 插入排序
function insertSort(arr) {
  var temp;
  for (var i = 1; i < arr.length; i++) {
    temp = arr[i];
    for (var j = i; j > 0; j--) {
      if (temp >= arr[j - 1]) {
        break;
      }
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
    }
  }
  return arr;
}
// let arr = [3, 1, 5, 4, 7, 6, 0, 2];
let arr = [7, 6, 3, 2];
console.log(insertSort(arr));

// 自己写的，不规范，不应该使用额外数组空间
function insertSort2(arr) {
  // const arr2 = JSON.parse(JSON.stringify(arr))
  const arr2 = [arr[0]];
  arr.forEach((ele) => {
    if (ele > arr2[arr2.length - 1]) {
      arr2.push(ele);
    } else if (ele < arr2[0]) {
      arr2.unshift(ele);
    } else {
      for (var i = 0; i < arr2.length; i++) {
        if (ele > arr2[i] && ele < arr2[i + 1]) {
          arr2.splice(i + 1, 0, ele);
        }
      }
    }
  });
  return arr2;
}
