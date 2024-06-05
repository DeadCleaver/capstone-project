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

  const { userData, userToken, fetchUserData } = useContext(UserContext);
  const placeholderAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmpassword: "",
  });

  const [profileData, setProfileData] = useState({
    name: userData?.name || "",
    surname: userData?.surname || "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    console.log(passwordData);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEditProfile = () => {
    setProfileData({
      name: userData?.name || "",
      surname: userData?.surname || "",
    });
    setShowProfileForm(true);
  };
  

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Sei sicuro di voler modificare la password?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}auth/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Cambio password non riuscito");
      }

      setPasswordData({ password: "", confirmpassword: "" });
      alert("Password modificata correttamente");
      setShowPasswordForm(false);
    } catch (error) {
      console.error("Cambio password non riuscito:", error);
    }
  };

  // aggiornamento nome e cognome
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Sei sicuro di voler modificare i tuoi dati?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}user/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            ...profileData,
            email: userData.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Modifica dei dati non riuscita");
      }

      alert("Dati modificati correttamente");
      fetchUserData();
      setShowProfileForm(false);
    } catch (error) {
      console.error("Modifica dei dati non riuscita:", error);
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
              <Col xs={5}>
                <strong className="f-silkscreen">Email:</strong>
              </Col>
              <Col xs={7}>{userData.email}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={5}>
                <strong className="f-silkscreen">Nome:</strong>
              </Col>
              <Col xs={7}>
                {showProfileForm ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    required
                  />
                ) : (
                  userData.name
                )}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={5}>
                <strong className="f-silkscreen">Cognome:</strong>
              </Col>
              <Col xs={7}>
                {showProfileForm ? (
                  <Form.Control
                    type="text"
                    name="surname"
                    value={profileData.surname}
                    onChange={handleProfileChange}
                    required
                  />
                ) : (
                  userData.surname
                )}
              </Col>
            </Row>
          </Container>
          <Container>
            {(!userData.googleid || userData.googleid.length === 0) && (
              <Stack
                direction="horizontal"
                gap={2}
                className="d-flex justify-content-center"
              >
                {showProfileForm && !showPasswordForm && (
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="mt-3 d-flex justify-content-center"
                  >
                    <Button
                      onClick={() => setShowProfileForm(false)}
                      className="f-silkscreen f-s-8"
                      variant="secondary"
                    >
                      Annulla
                    </Button>
                    <Button
                      onClick={handleProfileSubmit}
                      className="f-silkscreen f-s-8"
                      variant="success"
                    >
                      Conferma
                    </Button>
                  </Stack>
                )}
                {!showProfileForm && !showPasswordForm && (
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="mt-3 d-flex justify-content-center"
                  >
                    <Button
                      onClick={handleEditProfile}
                      className="f-silkscreen f-s-8 bg-blueviolet border-blueviolet"
                      variant="primary"
                    >
                      Modifica Dati
                    </Button>
                  </Stack>
                )}
                {showPasswordForm && !showProfileForm && (
                  <Form onSubmit={handlePasswordSubmit} className="mt-3 w-100">
                    <Form.Group controlId="formPassword">
                      <Form.Label className="f-silkscreen f-s-8">Nuova Password</Form.Label>
                      <Form.Control
                        type="text"
                        name="password"
                        value={passwordData.password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="formConfirmPassword"
                      className="mt-3"
                    >
                      <Form.Label className="f-silkscreen f-s-8">Conferma Nuova Password</Form.Label>
                      <Form.Control
                        type="text"
                        name="confirmpassword"
                        value={passwordData.confirmpassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="mt-3 d-flex justify-content-center"
                    >
                      <Button
                        onClick={() => setShowPasswordForm(false)}
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
                {!showProfileForm && !showPasswordForm && (
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="mt-3 d-flex justify-content-center"
                  >
                    <Button
                      onClick={() => setShowPasswordForm(true)}
                      className="f-silkscreen f-s-8 text-white"
                      variant="warning"
                    >
                      Cambia Password
                    </Button>
                  </Stack>
                )}
              </Stack>
            )}
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
