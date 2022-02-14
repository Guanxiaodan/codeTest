/* 选择排序;
类似插入排序，也分已排序区间和未排序区间。但是选择排序每次会从未排序区间中找到最小的元素，将其放到已排序区间的末尾。 */
function selectSort(arr) {
  var smellestIndex;
  for (var i = 0; i < arr.length; i++) {
    smellestIndex = i;
    var j = i;
    for (; j < arr.length; j++) {
      if (arr[smellestIndex] > arr[j]) {
        smellestIndex = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[smellestIndex];
    arr[smellestIndex] = temp;
  }

  return arr;
}
// let arr = [3, 1, 5, 4, 7, 6, 0, 2];
let arr = [7, 6, 3, 2];
console.log(selectSort(arr));

// 自己写的，需要改进：吧最小值换成最小值的index
function selectSort2(arr) {
  var smellest;
  for (var i = 0; i < arr.length; i++) {
    smellest = arr[i];
    var j = i;
    for (; j < arr.length; j++) {
      if (smellest > arr[j]) {
        smellest = arr[j];
      }
    }
    var index = arr.indexOf(smellest);
    arr[index] = arr[i];
    // arr[j] = arr[i];
    arr[i] = smellest;
  }

  return arr;
}
