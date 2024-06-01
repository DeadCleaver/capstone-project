import React, { useContext, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Stack,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";
import Loader from "../../components/loader/Loader";

export default function UserPanel({}) {
  const { userData, userToken } = useContext(UserContext);
  const placeholderAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmpassword: "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    console.log(passwordData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Sei sicuro di voler modificare la password?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API}auth/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Cambio password non riuscito");
      }

      setPasswordData({ password: "", confirmpassword: "" });
      alert("Password modificata correttamente")
      setShowPasswordForm(false);
    } catch (error) {
      console.error("Cambio password non riuscito:", error);
    }
  };

  if (!userData) {
    return (
      <Container
        style={{ marginTop: "250px" }}
        className="d-flex justify-content-center"
      >
        <Loader />
      </Container>
    );
  }

  return (
    <Container
      style={{ marginTop: "100px" }}
      className="d-flex justify-content-center mb-5"
    >
      <Card className="border-blueviolet" style={{ width: "40rem" }}>
        <Card.Header className="bg-blueviolet f-silkscreen text-white text-center fw-bold">
          User Profile
        </Card.Header>
        <Card.Body>
          <Container>
            <Row className="justify-content-center mb-3">
              <Col xs="auto">
                <img
                  src={userData ? userData.avatar : placeholderAvatar}
                  alt={`${userData.name}-${userData.surname}-Avatar`}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className="rounded shadow"
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={6}>
                <strong className="f-silkscreen">Email:</strong>
              </Col>
              <Col xs={6}>{userData.email}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={6}>
                <strong className="f-silkscreen">Nome:</strong>
              </Col>
              <Col xs={6}>{userData.name}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={6}>
                <strong className="f-silkscreen">Cognome:</strong>
              </Col>
              <Col xs={6}>{userData.surname}</Col>
            </Row>
          </Container>
          <Container>
            {(!userData.googleid || userData.googleid.length === 0)  &&
            <div>
            {(!showPasswordForm !== "") && (
              <Stack
                direction="horizontal"
                gap={2}
                className="mt-3 d-flex justify-content-center"
              >
                <Button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="f-silkscreen f-s-8 text-white"
                  variant="warning"
                >
                  Cambia Password
                </Button>
              </Stack>
            )}

            {showPasswordForm && (
              <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group controlId="formPassword">
                  <Form.Label>Nuova Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    value={passwordData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mt-3">
                  <Form.Label>Conferma Nuova Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="confirmpassword"
                    value={passwordData.confirmpassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="mt-3 d-flex justify-content-center"
                >
                  <Button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="f-silkscreen f-s-8"
                    variant="secondary"
                  >
                    Annulla
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    className="f-silkscreen f-s-8"
                  >
                    Conferma
                  </Button>
                </Stack>
              </Form>
            )}
            </div>
          }
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
