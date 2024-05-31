import React, { useState, useContext } from "react";
import { Dropdown, Stack } from "react-bootstrap";
import "./AvatarDropdown.css";
import { Link } from "react-router-dom";
import LoginModal from "../login-modal/LoginModal";
import { UserContext } from "../../context/UserContextProvider";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { RiUser3Line } from "react-icons/ri";
import { GiDiceFire } from "react-icons/gi";
import { LuDices } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";



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
    localStorage.removeItem("token");
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        className="avatar-dropdown"
      >
        <span>
          {userData ? `${userData.name} ${userData.surname}` : `GUEST`}
        </span>
        <img
          src={userData ? userData.avatar : staticAvatar}
          alt="Avatar"
          className="rounded-circle ms-2 user-avatar-image"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        {userToken && (
          <div>
            <Dropdown.Item as={Link} to="/profile">
            <Stack
              direction="horizontal"
              gap={2}
              className="align-items-center"
            >
            <RiUser3Line />
            Profilo
          </Stack>
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/session">
            <Stack
              direction="horizontal"
              gap={2}
              className="align-items-center"
            >
            <GiDiceFire />
            Crea Sessione
          </Stack>           
           </Dropdown.Item>
            <Dropdown.Item as={Link} to="/sessions">
            <Stack
              direction="horizontal"
              gap={2}
              className="align-items-center"
            >
            <LuDices />
           Gestisci Sessioni
          </Stack>                
           </Dropdown.Item>
            <Dropdown.Item as={Link} to="/games">
            <Stack
              direction="horizontal"
              gap={2}
              className="align-items-center"
            >
            <MdOutlineLibraryBooks />
           Gestisci Giochi
          </Stack>      
            </Dropdown.Item>
            <hr />
          </div>
        )}
        {!userToken && (
          <Dropdown.Item as={Link} to="/register">
            Registrati
          </Dropdown.Item>
        )}
        <Dropdown.Item onClick={userToken ? handleLogout : toggleLoginModal}>
          {userToken ? (
            <Stack
              direction="horizontal"
              gap={2}
              className="align-items-center"
            >
              <IoMdLogOut />
              LogOut
            </Stack>
          ) : (
            <Stack
              direction="horizontal"
              gap={2}
              className="align-items-center"
            >
              <IoMdLogIn />
              LogIn
            </Stack>
          )}
        </Dropdown.Item>
      </Dropdown.Menu>
      <LoginModal show={show} setShow={setShow} />
    </Dropdown>
  );
}
