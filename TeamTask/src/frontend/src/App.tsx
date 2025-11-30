import { useState } from "react";
import "./App.css";
import apiClient from "./api/apiClient";
import { useNavigate } from "react-router-dom";
import { emailValidation, passwordValidation } from "./components/validation";
import type { User } from "./types/user";

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const onSubmit = () => {
    setEmailError(emailValidation(email));
    setPasswordError(passwordValidation(password));
    if (emailError || passwordError) {
      return;
    }

    const u: User = {
      email,
      password,
    };

    apiClient
      .post("/users/login", u)
      .then((response) => {
        const token = response.data.token;
        const user_id = response.data.user_id;
        if (!token || !user_id) {
          alert("Hiba a bejelentkezés során!");
          return;
        }
        // alert(token);
        sessionStorage.setItem("token", token);
        navigate(`/home/${Number(user_id)}`);
      })
      .catch((result) => console.error(result));
  };

  return (
    <>
      <div>
        <button onClick={() => navigate("register")}>Regisztráció</button>
        <h1>Bejelentkezés</h1>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="exemple@exemple.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>{emailError}</p>
        <br />

        <label htmlFor="password">Jelszó</label>
        <input
          name="password"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>{passwordError}</p>
        <br />

        <button onClick={onSubmit}>Bejelentkezés</button>
      </div>
    </>
  );
}

export default App;
