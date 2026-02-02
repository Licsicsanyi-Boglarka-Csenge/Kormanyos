import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GetPage from "./pages/GetPage";
import { BrowserRouter, Route, Routes } from "react-router";
import AddPage from "./pages/AddPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetPage />}></Route>
        <Route path="/post" element={<AddPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
