import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Stack, Spinner } from "react-bootstrap";
import SessionCard from "../../components/session-card/SessionCard";
import { UserContext } from "../../context/UserContextProvider";
import PlayersList from "../../components/players-list/PlayersList";
import { IoIosCloseCircle } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import AddPlayer from "../../components/add-player/AddPlayer";

export default function SessionsManager() {
  const { userToken, userData } = useContext(UserContext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (userData) {
      fetchUserSessions();
    }
  }, [userData]);

  const fetchUserSessions = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/creator/${userData._id}`
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero delle informazioni");
      }

      const sessionsdata = await response.json();
      setSessions(sessionsdata);
      console.log(sessions);
      setLoading(false);
    } catch (error) {
      console.error("Errore nella chiamata al server: ", error);
    }
  };

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

      fetchUserSessions();

    } catch (error) {
      console.error("Errore nella chiamata al server: ", error);
    }
  };

  if (loading) {
    return    <Spinner animation="border" variant="primary" />
  }

  return (
    <Container style={{ marginTop: "100px" }}>
      {sessions.map((session, index) => (
        <Row key={session._id} className="my-2 g-2">
          <Col sm={12} lg={7}>
            <Stack direction="vertical" gap={2} className="mb-2">
              <SessionCard {...session} />
              <Stack
                direction="horizontal"
                gap={2}
                className="justify-content-center"
              >
                <Button
                  className="f-silkscreen f-s-10 border-white"
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteSession(session._id)} 
                >
                  <span className="me-2">
                    <IoIosCloseCircle />
                  </span>
                  Elimina 
                </Button>
                <Button
                  className="f-silkscreen f-s-10 text-white border-white"
                  variant="warning"
                  size="sm"
                >
                  <span className="me-2">
                    <FaPen />
                  </span>
                  Modifica 
                </Button>
              </Stack>
            </Stack>
          </Col>
          <Col sm={12} lg={5}>
            {session.players && (
              <PlayersList players={session.players} isCreator={true} sessionId={session._id} refresh={fetchUserSessions} />
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
}
