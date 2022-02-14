var a = {
  x: 2,
  y: [2, 3],
  z: {
    m: 1,
    d: {
      e: 0,
    },
  },
  w: [1, 2, 3, 4, 5],
};
var b = {
  x: 2,
  y: [2, 4, { a: 22, c: 1 }],
  z: {
    m: 3,
    d: {
      e: 1,
    },
    n: [1, 2],
  },
  w: [1, 2, 8],
};

diff(a, b); // {x:2,y: [undefined, 4,3],z:{m:3,d:{e:1} }}

// 实现一个diff函数，入参A B 为JSONObject,key值绝对一致，value可能不同，
// 要求把更新变动的key Value放到新对象中返回

function diff(a, b) {
  let result = {};
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const allKeys = Array.from(new Set(aKeys.concat(bKeys)));

  allKeys.forEach((key) => {
    const res = diffAny(key, a, b);
    result = Object.assign(result, res);
  });
  console.log(result);
  return result;
}

function clone(arg) {
  return arg;
}

function toString(s) {
  return Object.prototype.toString.call(s);
}

function isSameType(arg1, arg2) {
  return toString(arg1) === toString(arg2);
}

function isNumber(arg) {
  return toString(arg) === "[object Number]";
}

function isObject(arg) {
  return toString(arg) === "[object Object]";
}

function diffAny(key, obj1, obj2) {
  const valA = obj1[key];
  const valB = obj2[key];
  const result = {};

  if (isSameType(valA, valB)) {
    const type = toString(valA);
    switch (type) {
      case "[object Number]":
        result[key] = diffNum(valA, valB);
        break;
      case "[object Array]":
        result[key] = diffArray(valA, valB);
        break;
      case "[object Object]":
        result[key] = diff(valA, valB);
        break;
    }
  } else {
    result[key] = clone(valB);
  }

  if (result[key] === undefined) {
    delete key;
  }

  return result;
}

function diffNum(arg1, arg2) {
  return arg1 === arg2 ? undefined : arg2;
}

function diffArray(arr1, arr2) {
  const res = [];
  arr2.forEach((it, index) => {
    res.push(arr1[index] === it ? undefined : it);
  });
  const isAllUndefined = res.every((it) => it === undefined);
  return isAllUndefined ? undefined : res;
}
