// 实现一个diff函数，入参A B 为JSONObject,key值绝对一致，value可能不同，
// 要求把更新变动的key Value放到新对象中返回

var a = { x: 2, y: [2, 3], z: { m: 1 } };
var b = { x: 2, y: [2, 4, 3], z: { m: 3, d: { e: 1 } } };

// diff(a, b); // {x:2,y: [undefined, 4,3],z:{m:3,d:{e:1} }}

function diff(first, second) {
  let newObj = {};
  if (Array.isArray(first)) {
    newObj = [];
  }
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);
  const allKeys = new Set(firstKeys.concat(secondKeys));
  allKeys.forEach((key) => {
    const firstVal = first[key];
    const secondVal = second[key];
    const isNotObjectVal =
      typeof firstVal !== "object" || typeof firstVal === null;
    if (isNotObjectVal) {
      // 基本类型
      // newObj[key] = firstVal === secondVal ? undefined : secondVal;
      // console.log(Array.isArray(newObj), newObj);
      if (firstVal !== secondVal || Array.isArray(newObj)) {
        newObj[key] = secondVal;
      }
    } else {
      // 引用类型
      if (
        // 类型不同
        Object.prototype.toString.call(firstVal) !==
        Object.prototype.toString.call(secondVal)
      ) {
        newObj[key] = secondVal;
      } else {
        // 类型相同
        newObj[key] = diff(firstVal, secondVal);
      }
    }
  });

  return newObj;
}

console.log(diff(a, b));
