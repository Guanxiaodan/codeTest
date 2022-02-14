var isIsomorphic = function(s, t) {
    const long = s.length
    let sMap={};let tMap={};let sChr='';let tChr=''
    for(i=0;i<long;i++){
        sChr=s[i];
        tChr=t[i]
        if(sMap[sChr]&&sMap[sChr]!==tChr||tMap[tChr]&&tMap[tChr]!==sChr){
            return false
        }
        sMap[sChr]=tChr;
        tMap[tChr]=sChr;
    }
    return true
};
var str1 = 'foot'
var str2 = 'badm'
console.log(isIsomorphic(str1,str2))