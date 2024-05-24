import React, {useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SessionList from "../../components/session-list/SessionLIst"

const Home = () => {
    
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetchSessions();
      }, []);

    const fetchSessions = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API}gamesession/`); 

          if (!response.ok) {
            throw new Error("Errore nel recupero delle informazioni");
          }

          const sessionsdata = await response.json();
          setSessions(sessionsdata);

        } catch (error) {
          console.error("Errore nella chiamata al server: ", error);
        }
      };


  return (
    <Container fluid="sm">
      <SessionList sessions={sessions} />
    </Container>
  );
};

export default Home;
