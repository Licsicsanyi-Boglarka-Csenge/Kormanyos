import { useState } from "react";
import type { User } from "../types/user";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import {
  emailValidation,
  passwordValidation,
} from "../components/validation.ts";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");

  const onSubmit = () => {
    setNameError(!name ? "A név nem lehet üres!" : "");
    setConfirmError(!confirm ? "A jelszót meg kell ismételni!" : "");
    setEmailError(emailValidation(email));
    setPasswordError(passwordValidation(password, confirm));

    if (nameError || emailError || passwordError) {
      return;
    }

    const u: User = {
      name,
      email,
      password,
    };

    apiClient
      .post("/users/register", u)
      .then((response) => alert(response.status))
      .catch((result) => console.error(result));

    apiClient
      .post("/users/search", { email })
      .then((response) => navigate(`/home/${response.data.id}`))
      .catch((result) => console.log(result));
  };

  return (
    <>
      <div>
        <button onClick={() => navigate("/")}>Login</button>
        <h1>Regisztáció</h1>
        <label htmlFor="name">Név:</label>
        <input
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <p>{nameError}</p>
        <br />

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>{emailError}</p>
        <br />

        <label htmlFor="password">Jelszó:</label>
        <input
          name="password"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{passwordError}</p>
        <br />

        <label htmlFor="passwordAgain">Jelszó ismétlése:</label>
        <input
          name="passwordAgain"
          type="text"
          onChange={(e) => setConfirm(e.target.value)}
        />
        <p>{confirmError}</p>
        <br />

        <button onClick={onSubmit}>Regisztráció</button>
      </div>
    </>
  );
};
export default Register;
