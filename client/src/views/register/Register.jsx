import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  CardHeader,
  Image,
} from "react-bootstrap";
import "./Register.css";

export default function Register() {

  const [formData, setFormData] = useState(
    {
      name: "",
      surname: "",
      email: "",
      password: ""
    }
  )

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const [userAvatar, setUserAvatar] = useState(null);

  // gestione preview dell'avatar
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setUserAvatar(file);
    setPreviewAvatar(URL.createObjectURL(file));
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
        ...formData,
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

      const response = await fetch(
        `${process.env.REACT_APP_API}user/${authorId}/avatar`,
        {
          method: "PATCH",
          body: avatarData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add avatar image");
      }

      const { avatar } = await response.json();
      console.log("Avatar image added successfully:", avatar);
    } catch (error) {
      console.error("Error adding avatar image:", error);
    }
  };

  return (
    <Container style={{marginTop: "100px"}} className="mb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="border-blueviolet">
            <CardHeader className="f-silkscreen text-center bg-blueviolet text-white">
              Registrati
            </CardHeader>
            <Form onSubmit={handleRegister} className="m-2">
              <Form.Group controlId="formUserEmail" className="m-1">
                <Form.Label className="f-silkscreen">Email</Form.Label>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUserName" className="m-1">
                <Form.Label className="f-silkscreen">Nome</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUserSurname" className="m-1">
                <Form.Label className="f-silkscreen">Cognome</Form.Label>
                <Form.Control
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUserPassword" className="m-1">
                <Form.Label className="f-silkscreen">Password</Form.Label>
                <Form.Control
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                <Image
                  src={previewAvatar || staticAvatar}
                  alt="Avatar"
                  className="avatar-img mt-1 rounded"
                />
              </div>

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
        {/*         <Col xs={6}>
          <Card>
            <img src={previewAvatar || staticAvatar} alt="Avatar" className="avatar-img" />
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
}
