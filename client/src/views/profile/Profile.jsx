import React, { useContext } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";

export default function UserPanel({}) {
  const { userData } = useContext(UserContext);
  const placeholderAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <Container style={{ marginTop: "100px" }} className="d-flex justify-content-center">
      <Card className="border-blueviolet" style={{maxWidth : "30rem"}}>
        <Card.Header className="bg-blueviolet f-silkscreen text-white text-center fw-bold">
          User Profile
        </Card.Header>
        <Card.Body>
        <Container>
          <Row className="justify-content-center mb-3">
            <Col xs="auto">
              <img
                src={userData.avatar || placeholderAvatar}
                alt={`${userData.name}-${userData.surname}-Avatar`}
                style={{
                  width: '100%',
                  objectFit: 'cover'
                }}
                className='rounded shadow'
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6}><strong className='f-silkscreen'>Email:</strong></Col>
            <Col xs={6}>{userData.email}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6}><strong className='f-silkscreen'>Nome:</strong></Col>
            <Col xs={6}>{userData.name}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6}><strong className='f-silkscreen'>Cognome:</strong></Col>
            <Col xs={6}>{userData.surname}</Col>
          </Row>
        </Container>
      </Card.Body>


        {/* <Card.Img
          fluid
          variant="bottom"
          src={userData.avatar || placeholderAvatar}
          alt={`${userData.name}-${userData.surname}-Avatar`}
          className="avatar-img mt-1 rounded shadow m-4"
        />
        <Card.Body>
          <Row>
            <Col xs={6} className="f-silkscreen">
              Email
            </Col>
            <Col xs={6}>{userData.email}</Col>
          </Row>
          <Row>
            <Col xs={6} className="f-silkscreen">
              Nome
            </Col>
            <Col xs={6}>{userData.name}</Col>
          </Row>
          <Row>
            <Col xs={6} className="f-silkscreen">
              Cognome
            </Col>
            <Col xs={6}>{userData.name}</Col>
          </Row>
        </Card.Body> */}

      </Card>
    </Container>
  );
}
