import React, { useState, useEffect, useContext } from "react";
import Author from "../author/Author";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import "./PlayersList.css";
import { IoIosCloseCircle } from "react-icons/io";
import { UserContext } from "../../context/UserContextProvider";

export default function PlayersList({ players }) {
  const {userData} = useContext(UserContext);


  return (
    <Container>
      {/* {players.map((player, index) => (
        <Row key={index}>
          <Col>{player.name}</Col>
          <Col>{player.surname}</Col>
          <Col>{player.email}</Col>
        </Row>
      ))} */}

      {players &&
        players.map((player, index) => (
          <Stack
            direction="horizontal"
            className="p-2 rounded border m-1 bg-blueviolet justify-content-between"
          >
            <Author {...player} />
            {userData && userData.email === player.email && (<Button>
              <IoIosCloseCircle />
            </Button>)}

          </Stack>
        ))}
    </Container>
  );
}
