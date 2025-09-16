import input from "./input.js"

let tomb=[2,2,3,3,5,8,12,4,4]
let set = [...new Set(tomb)]
console.log(set)

const myname = await input("Adj meg egy nevet: ")
console.log(myname)