import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  CardHeader,
} from "react-bootstrap";
import "./style.css";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);

  // gestione preview dell'avatar
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; // Ottiene il file selezionato
    setUserAvatar(file); // Salva il file nello stato
    setPreviewAvatar(URL.createObjectURL(file)); // Crea un URL di anteprima e lo salva nello stato
  };


  const staticAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      }),
    });

    if (response.ok) {
      if (userAvatar) {
        const { _id } = await response.json();
        await uploadAvatar(_id, userAvatar);
      }

      window.location.href = "/";
    } else {
      // Gestisci il caso in cui la registrazione fallisce
      console.error("Registration failed");
    }
  };

  const uploadAvatar = async (authorId, avatarFile) => {
    try {
      const avatarData = new FormData();
      avatarData.append("avatar", avatarFile);

      const response = await fetch(`${process.env.REACT_APP_API}user/${authorId}/avatar`, {
        method: "PATCH",
        body: avatarData,
      });

      if (!response.ok) {
        throw new Error("Failed to add avatar image");
      }

      const { avatar } = await response.json();
      alert("Avatar image added successfully:", avatar);
    } catch (error) {
      console.error("Error adding avatar image:", error);
    }
  };

  return (
    <Container className="register-container">
      <Row>
        <Col xs={6}>
          <Card>
            <CardHeader className="f-silkscreen text-center bg-blueviolet-light">
              Registrati
            </CardHeader>
            <Form onSubmit={handleRegister} className="m-2">
              <Form.Group controlId="formUserEmail" className="m-1">
                <Form.Label className="f-silkscreen">Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUserName" className="m-1">
                <Form.Label className="f-silkscreen">Nome</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUserSurname" className="m-1">
                <Form.Label className="f-silkscreen">Cognome</Form.Label>
                <Form.Control
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUserPassword" className="m-1">
                <Form.Label className="f-silkscreen">Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUserAvatar" className="m-1">
                <Form.Label className="f-silkscreen">Avatar</Form.Label>
                <Form.Control
                  size="md"
                  type="file"
                  /* onChange={(e) => setUserAvatar(e.target.files[0])} */
                  onChange={handleAvatarChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-success"
                  type="submit"
                  className="my-3"
                >
                  <span className="f-silkscreen">Register</span>
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
        <Col xs={6}>
          <Card>
            <img src={previewAvatar || staticAvatar} alt="Avatar" />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
