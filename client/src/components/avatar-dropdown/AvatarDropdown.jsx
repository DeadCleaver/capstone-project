import React from "react";
import { Dropdown } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";

export default function AvatarDropdown() {
  const staticAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <Dropdown >
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        className="avatar-dropdown"
      >
        <span>GUEST</span>
        <img
          src={staticAvatar}
          alt="Avatar"
          className="rounded-circle ms-2"
          style={{ width: "40px", height: "40px" }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" >
        <Dropdown.Item>Profilo</Dropdown.Item>
        <Dropdown.Item>Sessioni</Dropdown.Item>
        <Dropdown.Item>Giochi</Dropdown.Item>
        <hr />
        <Dropdown.Item as={Link} to="/register">Registrati</Dropdown.Item>
        <Dropdown.Item>Log-in</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
