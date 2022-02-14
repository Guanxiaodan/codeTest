const timeout = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const ajax1 = () => {
  return timeout(2000).then(() => {
    console.log("1");
    return 1;
  });
};

const ajax2 = () => {
  return timeout(1000).then(() => {
    console.log("2");
    return 2;
  });
};

const ajax3 = () => {
  return timeout(2000).then(() => {
    console.log("3");
    return 3;
  });
};

const mergePromise = (ajaxArray) => {
  let P = Promise.resolve();
  const result = [];
  ajaxArray.forEach((item) => {
    P = P.then(item).then(function (res) {
      result.push(res);
      return result;
    });
  });
  return P.then(() => {
    return result;
  });
};

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});
