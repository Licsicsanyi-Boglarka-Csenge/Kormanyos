import input from "./input.js";

//1. feladat:
let adatok = [];

const adatdb = await input("Hány adatot szeretne megadni: ");

for (let i = 0; i < adatdb; i++) {
  const n = await input("Kérem a nevet: ");
  const e = await input("Kérem a email: ");
  adatok.push({nev: n, emial: e})
}

adatok.forEach(i => {
    console.log(`Név: ${i.nev} Email: ${i.emial}`)
});

//2. feladat:

