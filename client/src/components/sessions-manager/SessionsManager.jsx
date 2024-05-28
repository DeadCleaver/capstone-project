import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import SessionCard from "../session-card/SessionCard";
import { UserContext } from "../../context/UserContextProvider";
import PlayersList from "../players-list/PlayersList";
import { IoIosCloseCircle } from "react-icons/io";

export default function SessionsManager({ sessions, fetchUserSessions }) {
  const { userToken, userData } = useContext(UserContext);

  useEffect(() => {
    fetchUserSessions();
  }, []);

  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Sessione non trovata");
        } else if (response.status === 403) {
          throw new Error("Non sei autorizzato a eliminare questa sessione");
        } else {
          throw new Error("Errore durante l'eliminazione della sessione");
        }
      }

    } catch (error) {
      console.error("Errore nella chiamata al server: ", error);
    }
  };

  return (
    <Container>
      {sessions.map((session, index) => (
        <Row key={session._id} className="my-2">
          <Col xs={12} md={6}>
            <SessionCard {...session} />
          </Col>
          <Col xs={12} md={6}>
            <Stack direction="horizontal" gap={2} className="mb-2">
              <Button
                className="f-silkscreen f-s-8"
                variant="danger"
                size="sm"
                onClick={() => handleDeleteSession(session._id)} // Attach the delete function here
              >
                <span className="me-2">
                  <IoIosCloseCircle />
                </span>
                Elimina Sessione
              </Button>
            </Stack>
            {session.players && (
              <PlayersList players={session.players} isCreator={true} />
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
}
