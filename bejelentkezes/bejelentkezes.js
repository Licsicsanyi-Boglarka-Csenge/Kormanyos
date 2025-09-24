const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let h1 = document.querySelector("h1");

async function getAllUsers() {}

const ValasztReg = document
  .getElementById("ValasztReg")
  .addEventListener(`click`, function () {
    document.getElementById("DivReg").hidden = false;
    document.getElementById("DivBe").hidden = true;
    h1.innerHTML = "Regisztráció";

    const Reg = document
      .getElementById("Reg")
      .addEventListener(`click`, async function () {
        let hiba = "";
        const RegHiba = document.getElementById("RegHiba");
        const RegEmail = document.getElementById("RegEmail").value;
        const RegJelszo1 = document.getElementById("RegJelszo1").value;
        const RegJelszo2 = document.getElementById("RegJelszo2").value;

        if (RegEmail.length == 0) hiba += "Az email cím nem lehet üres!<br>";
        else if (RegJelszo2.length == 0) hiba += "A jelszó nem lehet üres!<br>";
        else if (!email_regex.test(RegEmail))
          hiba += "Az email cím nem megfelelő!<br>";

        if (RegJelszo1.length == 0) hiba += "A jelszó nem lehet üres!<br>";
        else if (RegJelszo1 !== RegJelszo2)
          hiba += "A két jelszó nem egyezik!<br>";

        RegHiba.innerHTML = hiba;

        let result = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            email: `${RegEmail}`,
            password: `${RegJelszo1}`,
          }),
        });
        if (!result.ok) throw console.error("Error");
      });
  });

const ValasztBe = document
  .getElementById("ValasztBe")
  .addEventListener(`click`, function () {
    document.getElementById("DivBe").hidden = false;
    document.getElementById("DivReg").hidden = true;
    h1.innerHTML = "Bejelentkezés";

    const Be = document
      .getElementById("Be")
      .addEventListener(`click`, async function () {
        let hiba = "";

        const BeHiba = document.getElementById("BeHiba");
        const BeEmail = document.getElementById("BeEmail").value;
        const BeJelszo = document.getElementById("BeJelszo").value;

        let result = await fetch("http://localhost:3000/users", {
          method: "GET",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        });
        if (!result.ok) throw console.error("Error");

        if (BeEmail.length == 0) hiba += "Az email cím nem lehet üres!<br>";
        else if (!email_regex.test(BeEmail))
          hiba += "Az email cím nem megfelelő!<br>";

        if (BeJelszo.length == 0) hiba += "A jelszó nem lehet üres!<br>";

        BeHiba.innerHTML = hiba;
        let users = await result.json();
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == BeEmail && users[i].password == BeJelszo) {
            alert("Bejelentkezve!");
            break;
          }
        }
      });
  });
