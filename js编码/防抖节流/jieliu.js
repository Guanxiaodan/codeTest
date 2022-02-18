// 只要我还没执行完，你就等着，所有进来的都给拒掉，等我执行完了，再响应第一个进来的
function coloring(){
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)
    document.body.style.background = `rgb(${r},${g},${b})`
}


function throttle(func,delay){
    let timer;
    return function(){
        let context = this
        let arg = arguments
        if(timer){
            return
        }else{
            timer = setTimeout(function(){
                func.apply(context,arg)
                timer = null
            },delay)
        }
        
    }
}

window.addEventListener('resize', throttle(coloring,1000))
