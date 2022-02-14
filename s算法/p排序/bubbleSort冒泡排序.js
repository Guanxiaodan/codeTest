// 冒泡排序
function bubbleSort(arr) {
  const length = arr.length;
  var i = 0;
  for (; i < length - 1; i++) {
    for (var j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const small = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = small;
      }
    }
  }
  return arr;
}
// let arr = [3, 1, 5, 4, 7, 6, 0, 2];
let arr = [7, 6, 3, 2];
console.log(bubbleSort(arr));
