// 先打印1，一秒钟之后在打印2
function singIn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(222);
    }, 1000);
  });
}
function getProcess() {}

async function login() {
  console.log(1);
  const user = await singIn();
  console.log(2);
  const process = await getProcess(user);
  console.log(process);
}
login();
