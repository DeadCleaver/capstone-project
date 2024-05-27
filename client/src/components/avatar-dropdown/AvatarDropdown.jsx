import React, { useState, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import "./AvatarDropdown.css";
import { Link } from "react-router-dom";
import LoginModal from "../login-modal/LoginModal";
import { UserContext } from "../../context/UserContextProvider";

export default function AvatarDropdown() {

  const staticAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [show, setShow] = useState(false); 
  const { userToken, userData, setUserToken } = useContext(UserContext);

  const toggleLoginModal = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    setUserToken("");
    localStorage.removeItem('token');  
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        className="avatar-dropdown"
      >
        <span>{userData ? `${userData.name} ${userData.surname}` : `GUEST`}</span>
        <img
          src={userData ? userData.avatar : staticAvatar}
          alt="Avatar"
          className="rounded-circle ms-2 user-avatar-image"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        {userToken &&  
                <div>
                <Dropdown.Item as={Link} to="/profile">Profilo</Dropdown.Item>
                <Dropdown.Item>Sessioni</Dropdown.Item>
                <Dropdown.Item>Giochi</Dropdown.Item>
                <hr />
                </div>
        }
        {!userToken && <Dropdown.Item as={Link} to="/register">
          Registrati
        </Dropdown.Item>}
        <Dropdown.Item onClick={userToken ? handleLogout : toggleLoginModal}>{userToken ? `LogOut` : `Log-In`}</Dropdown.Item>
      </Dropdown.Menu>
      <LoginModal show={show} setShow={setShow}/>
    </Dropdown>
  );
}
