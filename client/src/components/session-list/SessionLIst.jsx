import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SessionCard from "../session-card/SessionCard"

const SessionList = ({sessions}) => {

  return (
    <Container>
    <Row>
      {sessions.map((session, i) => (
        <Col
          key={`item-${i}`}
          xs={12}
          md={6}
          lg={4}
          xl={3}
          style={{
            marginBottom: 50,
          }}
        >
          <SessionCard key={session._id} {...session} /> 
        </Col>
      ))}
    </Row>
    </Container>
  );
};

export default SessionList;