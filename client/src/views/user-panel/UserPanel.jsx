import React, {useState, useContext, useEffect} from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import "./UserPanel.css"

export default function UserPanel(userData) {




  return (
    <Container className='mt-5'>
        <Row>
            <Col xs={12} md={4}>
            <Card>
            <CardHeader className="f-silkscreen text-center bg-blueviolet-light">
              Pannello Utente
            </CardHeader>



            {/* <Form className="m-2">
              <Form.Group controlId="formUserEmail" className="m-1">
                <Form.Label className="f-silkscreen">Email</Form.Label>
                <Form.Control
                  value={email}
                  required
                  disabled
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
            </Form> */}
            
          </Card>

            </Col>
            <Col xs={12} md={8}>
            </Col>
        </Row>
    </Container>
  )
}
