import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";
import Register from "./pages/Register.tsx";
import HomePage from "./pages/HomePage.tsx";
import AddProject from "./pages/AddProject.tsx";
import ProjectPage from "./pages/ProjectPage.tsx";
import { Navb } from "./components/navbar.tsx";
import { ToastContainer } from "react-toastify";
import AddTask from "./pages/AddTask.tsx";
import TaskPage from "./pages/TaskPage.tsx";
import EditTask from "./pages/EditTask.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navb />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home/:id" element={<HomePage />}></Route>
        <Route path="/project/:id" element={<ProjectPage />}></Route>
        <Route path="/project/:id/add-task" element={<AddTask />}></Route>
        <Route path="/project/task/:id" element={<TaskPage />}></Route>
        <Route path="/project/task/id/edit-task" element={<EditTask />}></Route>
        <Route path="/add-project" element={<AddProject />}></Route>
      </Routes>
    </BrowserRouter>
      <ToastContainer theme="colored" />
  </StrictMode>
);
