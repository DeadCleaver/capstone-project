import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Stack, Card } from "react-bootstrap";
import "./UserPanel.css";
import { UserContext } from "../../context/UserContextProvider";
import SessionAdd from "../../components/session-add/SessionAdd";
import SessionsManager from "../../components/sessions-manager/SessionsManager";
import GamesManager from "../../components/games-manager/GamesManager";

export default function UserPanel({}) {

  const { userData } = useContext(UserContext);
  const [selectedSection, setSelectedSection] = useState("managesessions");
  const [sessions, setSessions] = useState([]);
  const [games, setGames] = useState([])


  const renderSection = () => {
    switch (selectedSection) {
      case "createsession":
        return <SessionAdd games={games} fetchUserSessions={fetchUserSessions} />;
      case "managesessions":
        return <SessionsManager sessions={sessions} fetchUserSessions={fetchUserSessions} />;
      case "games":
        return <GamesManager games={games}/>;
      default:
        return <SessionsManager />;
    }
  };

  useEffect(() => {
    fetchUserSessions();
    fetchGames();

  }, []);

  const fetchUserSessions = async () => {
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
    } catch (error) {
      console.error("Errore nella chiamata al server: ", error);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}game`);
      if (response.ok) {
        const gamesData = await response.json();
        setGames(gamesData);
      } else {
        throw new Error("Failed to fetch games");
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      
          <Stack direction="horizontal" gap={2} className="mb-3">
          <Button
              className="btn-blueviolet f-silkscreen"
              variant="primary"
              onClick={() => setSelectedSection("managesessions")}
            >
              Sessioni
            </Button>
            <Button
              className="btn-blueviolet f-silkscreen"
              variant="primary"
              onClick={() => setSelectedSection("createsession")}
            >
              Nuova Sessione
            </Button>
            <Button
              className="btn-blueviolet f-silkscreen"
              variant="primary"
              onClick={() => setSelectedSection("games")}
            >
              Giochi
            </Button>
          </Stack>
          {renderSection()}
    </Container>
  );
}
