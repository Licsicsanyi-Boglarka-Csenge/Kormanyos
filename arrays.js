//1. feladat:
function getOtosLotteryNumbers(){
    let szamok = []
    
    for(let i = 0; i<5; i++){
        let randomszam = Math.floor(Math.random() * 90) + 1;
        szamok.push(randomszam)
    }

    return szamok
}

//2. feladat:
function getSortedtLotteryNumbers(tomb){
    return tomb.sort((b, a)=> b - a)
}

//3. feladat:
function getNumberOfHits(lottoszamok, tippek){
    let egyezett = 0
    const lottoszamok_hossza = lottoszamok.length

    for(let i=0; i<lottoszamok_hossza; i++){
            if(lottoszamok.includes(tippek[i])){
                egyezett++
            }
        }
        return egyezett
    }

//4. feladat:
function getMonthlyLotteryArrayNumbers(){
    const haviszamok = []
    for(let i=0; i<4; i++){
        const hetiszamok = getOtosLotteryNumbers()        
        haviszamok.push(hetiszamok)
    }
    return haviszamok
}

//5. feladat:
function getMonthlyLotteryArrayUniqueNumbers(haviszamok){
    let osszeshet = []
    for(let i = 0; i<haviszamok.length; i++){
       osszeshet = osszeshet.concat(haviszamok[i])
    }

    const osszeshet_set = new Set(osszeshet)
    return [...osszeshet_set].sort((b, a)=> b - a)
}

//6. feladat:
function monthlyStatistics(haviszamok){
    
    
    return [szamok,dbszamok]
}

const haviLottoSzamok = getMonthlyLotteryArrayNumbers()
const lottoszamok = getOtosLotteryNumbers()
const tippek = [5,10,36,8,78,]

console.log("1. feladat: " + getOtosLotteryNumbers())
console.log("2. feladat: " + getSortedtLotteryNumbers(tippek))
console.log("3. feladat: " + getNumberOfHits([1,2, 3, 4, 5], tippek))
console.log("4. feladat: " + JSON.stringify(haviLottoSzamok))
console.log("5. feladat: " + getMonthlyLotteryArrayUniqueNumbers(haviLottoSzamok))
console.log("6. feladat: " + monthlyStatistics(haviLottoSzamok))
