import React from "react";
import { Card } from "react-bootstrap";
import "./style.css"
import Author from "../author/Author"

export default function SessionCard(props) {
  const { title, description, creator, cover, _id } = props;

  return (
    <Card className="session-card">
      <Card.Img variant="top" src={cover} className="session-cover" />
      <Card.Body>
        <Card.Title className="fs-6 m-0 f-zilla">{title}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Author {...creator} />
      </Card.Footer>
    </Card>
  );
}
