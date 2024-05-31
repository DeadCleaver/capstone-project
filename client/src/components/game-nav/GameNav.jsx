import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../../assets/d20-logo.png";
import AvatarDropdown from "../avatar-dropdown/AvatarDropdown";
import { Link } from "react-router-dom";

export default function GameNav() {
  return (
    <Navbar data-bs-theme="dark" className="bg-blueviolet shadow f-silkscreen fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            className="blog-navbar-brand"
            alt="logo"
            src={logo}
            style={{ width: "40px" }}
          />
          <span className="ms-2 fw-bold fs-3">GAMING NIGHT</span>
        </Navbar.Brand>
       <div>
          <AvatarDropdown />
       </div>
      </Container>
    </Navbar>
  );
}
