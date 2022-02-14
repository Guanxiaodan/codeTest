function seeCatch() {
  return new Promise((resolve, reject) => {
    reject("泡个错");
    // throw new Error("又跑错");
  })
    .then((res) => {
      console.log("then里面：", res);
    })
    .catch((err) => {
      console.log("catch住了", err);
      //   throw new Error("又跑错");
      //   return Promise.reject("又跑错");
    })
    .then((res) => {
      console.log("then里面222：", res);
    })
    .catch((err) => {
      console.log("catch住了222", err);
    });
}
seeCatch()
  .then((res) => {
    console.log("then里面333：", res);
  })
  .catch((err) => {
    console.log("catch住了333", err);
  });

//   catch住了 泡个错
// VM1489:15 then里面222： undefined
// VM1489:23 then里面333： undefined
