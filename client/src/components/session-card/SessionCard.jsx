import React from "react";
import {
  Card,
  Row,
  Col,
  CardHeader,
  CardSubtitle,
  Badge,
  Stack,
} from "react-bootstrap";
import Author from "../author/Author";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./SessionCard.css";
import { MdOutlineDateRange } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { FaDice } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export default function SessionCard(session) {
  const {
    title,
    description,
    game,
    city,
    creator,
    cover,
    date,
    _id,
    players,
    maxplayers,
    minplayers,
  } = session;

  const formattedDate = format(new Date(date), "dd/MM/yyyy");

  return (
    <Link to={`/gamesession/${_id}`} className="session-card-link">
      <Card className="session-card border-blueviolet shadow position-relative">
        {players.length >= maxplayers && (
          <Badge
            bg="danger"
            className="f-silkscreen f-s-8 border border-white fw-light ms-1 position-absolute top-0 translate-middle-y shadow"
          >
            Full
          </Badge>
        )}
        <Card.Img variant="top" src={cover} className="session-card-cover" />
        <Card.ImgOverlay className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="fs-5 m-0 mb-1" style={{ color: "white" }}>
              <div className="text-truncate bg-blueviolet border border-blueviolet rounded p-1 text-center fs-6">
                {title}
              </div>
            </Card.Title>
          </div>
          <div className="author-box text-white">
            <Author {...creator} />
          </div>
        </Card.ImgOverlay>
        <Card.Footer className="f-silkscreen bg-blueviolet">
          <Row className="mb-2">
            <Col xs={7}>
              <div className="text-truncate">
                <span className="me-2 text-white">
                  <MdOutlineDateRange />
                </span>
                <span className="f-s-8">{formattedDate}</span>
              </div>
            </Col>
            <Col xs={5} className="text-truncate">
              <div className="text-truncate">
                <span className="me-2 text-white">
                  <MdLocationPin />
                </span>
                <span className="f-s-8">{city.city}</span>
              </div>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={7}>
              <div className="text-truncate">
                <span className="me-2 text-white">
                  <FaDice />
                </span>
                <span className="f-s-8">{game.gametitle}</span>
              </div>
            </Col>
            <Col xs={5}>
              <span className="me-2 text-white">
                <FaUsers />
              </span>
              <span className="text-black f-s-10">
                {" "}
                <span
                  className={
                    players.length < minplayers ? `text-warning` : `text-black`
                  }
                >{`${players ? players.length : 0}`}</span>
                {`/${maxplayers}`}
              </span>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
}
