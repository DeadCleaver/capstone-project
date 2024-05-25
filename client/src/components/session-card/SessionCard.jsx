import React from "react";
import { Card } from "react-bootstrap";
import Author from "../author/Author";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./SessionCard.css";

export default function SessionCard(session) {
  const { title, description, creator, cover, date, _id, players, maxplayers } = session;

  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  return (
    <Link to={`/gamesession/${_id}`} className="session-card-link">
      <Card className="session-card">
        <Card.Img variant="top" src={cover} className="session-card-cover" />
        <Card.ImgOverlay>
        <Card.Title className="fs-5 m-0 mb-1 session-card-title">{title}</Card.Title>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Subtitle className="fs-6 m-0">
            {`Data: ${formattedDate} Giocatori: ${players ? players.length : 0} / ${maxplayers}`}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Author {...creator} />
        </Card.Footer>
      </Card>
    </Link>
  );
}
