import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router";

const AddPage = () => {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [num3, setNum3] = useState<string>("");
  const [num4, setNum4] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const nav = useNavigate();

  const onSave = () => {
    const numbers: string[] = [num1, num2, num3, num4];
    if (numbers.some((n) => n === "")) {
      setMessage("Töltse ki az összes mezőt!");
      return;
    }
    apiClient
      .post("/fours", { numbers })
      .then(() => setMessage(`A ${numbers} számnégyes mentésre került!`))
      .catch((e) => {
        if (e.response.status === 409) {
          setMessage(
            "Ez a szám négyes szerepel az adatbázisban! Kérlek adj meg másikat!",
          );
        }
        if (e.response.status === 400) {
          setMessage("A számnégyes formátuma nem megfelelő!");
        }
      });
  };

  return (
    <>
      <button onClick={() => nav("/")}>Lekérések</button>
      <h1>Számnégyesek beküldése!</h1>{" "}
      <label htmlFor="">Írd be az első számot:</label>
      <input type="number" onChange={(e) => setNum1(e.target.value)} />
      <br />
      <label htmlFor="">Írd be az második számot:</label>
      <input type="number" onChange={(e) => setNum2(e.target.value)} />
      <br />
      <label htmlFor="">Írd be az harmadik számot:</label>
      <input type="number" onChange={(e) => setNum3(e.target.value)} />
      <br />
      <label htmlFor="">Írd be az negyedik számot:</label>
      <input type="number" onChange={(e) => setNum4(e.target.value)} />
      <br />
      <br />
      <button onClick={onSave}>Beküldés!</button>
      <p>{message}</p>
    </>
  );
};
export default AddPage;
