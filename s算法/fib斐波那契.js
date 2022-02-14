var fib = function(n) {
    const MOD = 1000000007
    let n1 = 0;n2=1;sum=0
    if(n===0){return 0}
    if(n===1){return 1}
    for(let i=2;i<=n;i++){
        sum=(n1+n2)%MOD
        n1=n2;
        n2=sum
    }
    return sum
};