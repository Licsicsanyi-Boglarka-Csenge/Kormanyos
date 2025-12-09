import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import type { Project } from "../types/project";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { jwtDecode } from "jwt-decode";
import "./navbar.css";
import { toast } from "react-toastify";

export const Navb = () => {
  const location = useLocation();
  if (
    location.pathname.startsWith("/register") ||
    location.pathname.endsWith("/")
  )
    return <></>;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const token = sessionStorage.getItem("token") || "a.b.c";
  const user_id = (jwtDecode(token) as { id: number }).id;

  useEffect(() => {
    apiClient
      .get("/projects/owner")
      .then((response) => setProjects(response.data))
      .catch(() => toast.error("Nem sikerült a projektek betöltése!"));
  }, []);

  return (
    <>
      <Navbar expand="sm, lg" className=" navbar-dark navbar">
        <Container className="px-3 d-flex align-items-center">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setShow(true)}
            className="me-3"
          />
          <Navbar.Brand className="ms-auto d-flex align-items-center">
            <Button className="button" onClick={() => navigate("/")}>
              Kijelentkezés
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TeamTask</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p
            onClick={() => {
              navigate(`/home/${user_id}`);
              setShow(false);
            }}
            className="ms-3 "
          >
            Feladatok
          </p>
          <Accordion className="accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Projectek</Accordion.Header>
              <Accordion.Body>
                {projects && projects.length > 0 ? (
                  projects.map((project) => (
                    <p
                      key={project.id}
                      onClick={() => {
                        navigate(`/project/${project.id}`);
                        setShow(false);
                      }}
                      style={{ cursor: "" }}
                    >
                      {project.name}
                    </p>
                  ))
                ) : (
                  <p>Még nincsenek projectek!</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button className="button" onClick={() => navigate("/add-project")}>
            Projekt létrehozása
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
