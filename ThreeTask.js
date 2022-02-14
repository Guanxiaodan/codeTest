function runTask(tasks, done) {
  let res = [];
  let conunt = 0;
  tasks.forEach((task, index) => {
    let result = task();
    res[index] = result;
    if (conunt === tasks.length) {
      done(res);
    }
  });
  return res;
}
