import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../assets/d20-logo.png";
import "./style.css";
import AvatarDropdown from "../avatar-dropdown/AvatarDropdown";

export default function GameNav() {
  return (
    <Navbar data-bs-theme="dark" className="bg-blueviolet shadow f-silkscreen">
      <Container>
        <Navbar.Brand>
          <img
            className="blog-navbar-brand"
            alt="logo"
            src={logo}
            style={{ width: "30px" }}
          />
          <span className="ms-2 site-name">GAMING NIGHT</span>
        </Navbar.Brand>

       <div>
          <AvatarDropdown />
       </div>
      </Container>
    </Navbar>
  );
}
