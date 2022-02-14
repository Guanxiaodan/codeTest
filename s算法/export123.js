const arr = [1,2,3]
arr.reduce((accumulator,item)=>{
    // return new Promise(()=>{
        setTimeout(()=>{
            console.log(item)
        },1000)
    // })
})