import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SessionCard from "../session-card/SessionCard";

const SessionList = ({ sessions }) => {
  return (
    <Container>
      <Row>
        {sessions.map((session, i) => (
          <Col
            key={`item-${i}`}
            sm={12}
            md={6}
            xl={4}
            xxl={3}
            style={{
              marginBottom: 50,
            }}
          >
            <div>
              <SessionCard key={session._id} {...session} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SessionList;
