// 不使用数组上的原型方法，比如findindx,在数组中找到指定值的index
// arr 是非空数组，long是数组的长度，val是要寻找的值
function findIndex(arr, long, val) {}
let arr = [5, 2, 9, 10, 3, 4];
findIndex(arr, 6, 3);
findIndex(arr, 6, 7);

// 方式一：
function findIndex1(arr, long, val) {
  let i = 0;
  while (i < long) {
    if (arr[i] === val) {
      return i;
    }
    i++;
  }
  return -1;
}

// 方式2：哨兵
function findIndex2(arr, long, val) {
  const lastVal = arr[long - 1];
  if (lastVal === val) {
    return long - 1;
  }
  arr[long - 1] = val;
  let i = 0;
  while (arr[i] !== val) {
    i++;
  }
  if (i === long - 1) {
    return -1;
  } else {
    return i;
  }
}

// 两种方式比较：
/* 如果long等于10万，
按照最坏情况，
方式一的时间复杂度为：O(3*100000+1)
方式2的时间复杂度为：O(2*100000+5)
明显方式2的时间复杂度更低，减少时间复杂度的关键点是：不用进行“i < long”的比较了。
用哨兵将数据缓存起来，虽然代码看起来复杂了些，但是相比方式一，收到规模增大的影响小 */
