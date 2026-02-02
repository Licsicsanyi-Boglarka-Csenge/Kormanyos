import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router";
import type { Numbers } from "../types/numbers";

const GetPage = () => {
  const [id, setId] = useState<number>(1);
  const [allNumbers, setAllNumbers] = useState<Numbers[]>([]);
  const [numbers, setNumbers] = useState<Numbers>();
  const nav = useNavigate();

  const getAll = () => {
    apiClient
      .get("/fours")
      .then((res) => setAllNumbers(res.data))
      .catch((err) => console.error(err));
  };

  const getById = (id: number) => {
    apiClient
      .get(`/fours/${Number(id)}`)
      .then((res) => setNumbers(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <button onClick={() => nav("/post")}>Beküldés</button>
      <h1>Számnégyesek megtekintése</h1>
      <div>
        <h2>Az összes számnégyes</h2>
        <button onClick={getAll}>Lekérés</button>
        <ul>
          {allNumbers.map((n) => (
            <li>{n.numbers}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Számnégyes lekérése id alapján</h2>
        <input type="number" onChange={(e) => setId(Number(e.target.value))} />
        <button onClick={() => getById(id)}>Lekérés</button>
        <p>{numbers?.numbers}</p>
      </div>
    </>
  );
};
export default GetPage;
