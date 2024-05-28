import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./Author.css";

const Author = (props) => {
  const { name, surname, avatar } = props;

  const staticAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <Image className="author-avatar shadow" src={avatar || staticAvatar} roundedCircle />
      </Col>
      <Col>
        <div className="my-auto">
          <h6 className="f-silkscreen mt-2 fs-6">
            {name} {surname}
          </h6>
        </div>
      </Col>
    </Row>
  );
};

export default Author;
