// 无论前面的有没有执行完，我都给取消掉，并重新开始计时
const button = document.getElementById('btn')
console.log(button)
function payMoney() {
  console.log('已付款')
}

function debuunce(func, delay) {
  let timer
  return function () {
    const context = this
    let arg = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, arg)
    }, delay)
  }
}

button.addEventListener('click', debuunce(payMoney, 1000))
