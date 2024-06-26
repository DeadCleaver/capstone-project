import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  ModalHeader,
  ModalFooter
} from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import GoogleLogin from "../google-login/GoogleLogin";

const LoginModal = ({ show, setShow }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToken } = useContext(UserContext);

  useEffect(() => {
    setShow(show);
  }, [show]);

  useEffect(() => {
    if (!show) {
      setEmail("");
      setPassword("");
    }
  }, [show]);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;

        localStorage.setItem("token", token);
        setUserToken(token);

        toggleShowLogin();

        console.log("Login eseguito come: ", user);
        alert("Login eseguito correttamente");
      } else {
        console.error("Login fallito");
        alert("Login Fallito");
      }
    } catch (error) {
      console.error("Errore nel login:", error);
    }
  };

  const toggleShowLogin = () => {
    setShow(!show);
  };

  return (
    <Modal show={show} onHide={toggleShowLogin}>
      <ModalHeader
        closeButton
        className="f-s-8 bg-darkslate f-silkscreen text-white fw-bold"
      >
        Log In
      </ModalHeader>
      <Modal.Body className="bg-darkslate">
        <Form>
          <Form.Group controlId="login-user-email">
            <InputGroup className="mb-2 border-blueviolet">
              <InputGroupText className="f-silkscreen text-black bg-white " style={{width: "120px"}}>
                Email
              </InputGroupText>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="login-user-password">
            <InputGroup>
              <InputGroupText className="f-silkscreen text-black bg-white" style={{width: "120px"}}>
                Password
              </InputGroupText>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Form>
        <hr />
        <div className="d-flex flex-column align-items-center">
          <div className="text-white mb-2">oppure</div>
          <GoogleLogin />
        </div>
      </Modal.Body>
      <ModalFooter className="p-1 bg-darkslate">
        <Button
          size="sm"
          variant="danger"
          className="f-silkscreen border-white"
          onClick={toggleShowLogin}
        >
          Chiudi
        </Button>
        <Button
          size="sm"
          variant="success"
          className="f-silkscreen border-white"
          onClick={() => handleLogin(email, password)}
        >
          Log in
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LoginModal;
