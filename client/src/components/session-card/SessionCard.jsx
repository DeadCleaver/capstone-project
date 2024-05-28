import React from "react";
import { Card, Row, Col, CardHeader, CardSubtitle } from "react-bootstrap";
import Author from "../author/Author";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./SessionCard.css";

export default function SessionCard(session) {
  const { title, description, creator, cover, date, _id, players, maxplayers } =
    session;

  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  return (

    <Link to={`/gamesession/${_id}`} className="session-card-link">
      <Card className="session-card border-blueviolet shadow">
        <Card.Img variant="top" src={cover} className="session-card-cover" />
        <Card.ImgOverlay className="d-flex flex-column justify-content-between">
            <Card.Title className="fs-5 m-0 mb-1" style={{ color: "white" }}>
              {title}
            </Card.Title>
            <div className="author-box text-white">
            <Author {...creator}/>
            </div>
        </Card.ImgOverlay>
        <Card.Footer className="f-silkscreen bg-blueviolet f-s-10 text-white">
          <Row className="mb-2">
            <Col xs={6}>
              <strong >Data:</strong>
            </Col>
            <Col xs={6}>{formattedDate}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6}>
              <strong >Giocatori:</strong>
            </Col>
            <Col xs={6}>{`${players ? players.length : 0}/${maxplayers}`}</Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
}
