import React from "react";
import { Dropdown } from "react-bootstrap";
import "./style.css";

export default function AvatarDropdown() {
  const staticAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        className="blog-navbar-avatar-button"
      >
        <img
          src={staticAvatar}
          alt="Avatar"
          className="blog-navbar-avatar rounded-circle"
          style={{ width: "40px", height: "40px" }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" >
        <Dropdown.Item>Profilo Utente</Dropdown.Item>
        <Dropdown.Item>Pannello Sessioni</Dropdown.Item>
        <Dropdown.Item>Aggiungi Gioco</Dropdown.Item>
        <hr />
        <Dropdown.Item>Login In</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
