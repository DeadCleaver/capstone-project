import React, { useState, useEffect } from "react";
import { Container, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import SessionList from "../../components/session-list/SessionList";
import SessionCarousel from "../../components/session-carousel/SessionCarousel";

const Home = () => {
  const [sessions, setSessions] = useState([]);

  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [passedSessions, setPassedSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {

    const upcoming = sessions.filter(
      (session) =>
        new Date(session.date) >= new Date() 
    );

    setUpcomingSessions(upcoming);

    const passed = sessions.filter(
      (session) => new Date(session.date) < new Date()
    );

    setPassedSessions(passed);

  }, [sessions]);

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
    <Container fluid="sm" style={{ marginTop: "100px" }}>
      {/* <SessionCarousel sessions={sessions}/> */}
      <Stack className="mb-2">
        <h2 className="text-center">Sessioni Disponibli</h2>
      </Stack>
      <SessionList sessions={upcomingSessions} />
      <Stack className="mb-2">
        <h2 className="text-center">Sessioni Passate</h2>
      </Stack>
      <SessionList sessions={passedSessions} />
    </Container>
  );
};

export default Home;
