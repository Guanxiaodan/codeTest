const button = document.getElementById('btn')
console.log(button)
function payMoney(){
    console.log('已付款')
}


function debuunce(func,delay){
    let timer
    return function(){
        const context = this
        let arg = arguments
        clearTimeout(timer)
        timer = setTimeout(function(){
            func.apply(context,arg)
        },delay)
    }
}

button.addEventListener('click',debuunce(payMoney,100))
