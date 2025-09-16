const numbers = [2, 13, 3, 7, 17, 5, 11, 19, 9];
const names = ["Eva", "Adel", "Cedric", "Dior", "Frank", "Bob"];
const fruits = ["pineapple", "kiwi", "banana", "pear", "cherry"];

//1. feladat: - String tömböt a szavak hossza szerint rendezi és a rendezett tömböz adja vissza
function sortByLength() {
  return fruits.sort((a, b) => a.length - b.length);
}

//2. feladat: - String tömböt a szavak hossza szerint rendezi ABC sorrendbe és a rendezett tömböz adja vissza
function sortByLengthAsc() {
  return names.sort().sort((a, b) => a.length - b.length);
}

//3. feladat: - számokat rendez a 15-től való távolság alapján és a rendezett tömböt adja vissza
function sortFrom15() {
  return numbers.sort((a, b) => Math.abs(15 - a) - Math.abs(15 - b));
}

//4. feladat: - String tömb mindegy elemének az elejére és végére egy csillagot tesz és visszaadja a módosított tömböt
function addAsterisk() {
  const asterisk = fruits.map((i) => "*" + i + "*");
  return asterisk;
}

//5. feladat: - számokat tartalmazó tömb 5 és 15 közötti elemeit adja vissza egy tömbben
function between5And15() {
  const between = numbers
    .filter((i) => i >= 5 && i <= 15)
    .sort((a, b) => a - b);
  return between;
}

//6. feladat: - számokat tartalmazó tömb minden eleme páratlan-e. Visszatérési érték true vagy false
function isAllOdd() {
  const paros = numbers.filter((i) => i % 2 == 0);
  return paros.length === 0;
}

//7. feladat: - számokat tartalmazó tömb tartalmaz-e páros elemet. Visszatérési érték true vagy false
function hasEven() {
  const paros = numbers.filter((i) => i % 2 == 0);
  return paros.length === 1;
}
//8. feladat. - számokat tartalmazó tömb elemeit összeszorozza és a szorzatot adja vissza
function sigma() {
  let szorzat = 1;
  numbers.forEach((i) => {
    szorzat = i * szorzat;
  });
  return szorzat;
}

console.log("1. feladat: " + sortByLength());
console.log("2. feladat: " + sortByLengthAsc());
console.log("3. feladat: " + sortFrom15());
console.log("4. feladat: " + addAsterisk());
console.log("5. feladat: " + between5And15());
console.log("6. feladat: " + isAllOdd());
console.log("7. feladat: " + hasEven());
console.log("8. feladat: " + sigma());
