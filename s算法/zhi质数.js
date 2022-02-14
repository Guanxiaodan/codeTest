var countPrimes = function(n) {
    function isZhishu(m){
        if(m==0||m==1){
            return false
        }
        for(let i=2;i*i<=m;i++){
            if(m%i===0){
                return false
            }
        }
        return true
    }
    let sum=0
    for(let i=0;i<n;i++){
        if(isZhishu(i)){
            sum+=1
        }
    }
    return sum
};




console.log(countPrimes(10))
