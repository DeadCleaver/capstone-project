import React from "react";
import { Card } from "react-bootstrap";
import "./style.css";
import Author from "../author/Author";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function SessionCard(session) {
  const { title, description, creator, cover, date, _id } = session;

  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  return (
    <Link to={`/gamesession/${_id}`} className="session-link">
      <Card className="session-card">
        <Card.Img variant="top" src={cover} className="session-cover" />
        <Card.Body>
          <Card.Title className="fs-5 m-0 mb-1 f-zilla">{title}</Card.Title>
          <Card.Subtitle className="fs-6 m-0 f-zilla">
            {formattedDate}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Author {...creator} />
        </Card.Footer>
      </Card>
    </Link>
  );
}
