import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import "./UserCard.css"

const UserCard = ( {user} ) => {

  if (!user) {
    return <div>Loading...</div>; 
  }

  const { name, surname, email, avatar, password } = user;

  return (
    <Card className='user-profile-card shadow'>
      <Card.Header className='bg-blueviolet-light f-silkscreen text-center'>User Profile</Card.Header>
      <Card.Body>
        <Container>
          <Row className="justify-content-center mb-3">
            <Col xs="auto">
              <img
                src={avatar}
                alt={`${name}-${surname}-avatar`}
                style={{
                  width: '100%',
                  objectFit: 'cover'
                }}
                className='rounded shadow'
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong className='f-silkscreen'>Email:</strong></Col>
            <Col xs={8}>{email}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong className='f-silkscreen'>Nome:</strong></Col>
            <Col xs={8}>{name}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong className='f-silkscreen'>Cognome:</strong></Col>
            <Col xs={8}>{surname}</Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default UserCard;