import { useState } from "react";
import type { Project } from "../types/project";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NewProject = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const user_id = (jwtDecode(token!) as { id: number }).id;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSubmit = () => {
    const p: Project = {
      name,
      description,
    };

    apiClient
      .post("/projects", p, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert(response.status);
        setName("");
        setDescription("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1>Új projekt létrehozása</h1>
      <div>
        <label htmlFor="name">Név:</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="description">Leírás:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />

        <button onClick={onSubmit}>Projekt létrehozása</button>
        <button onClick={() => navigate(`/home/${Number(user_id)}`)}>
          Vissza a főoldalra
        </button>
      </div>
    </>
  );
};
export default NewProject;
