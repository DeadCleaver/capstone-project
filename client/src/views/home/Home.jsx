import React, { useState, useEffect } from "react";
import { Container, Stack } from "react-bootstrap";
import SessionList from "../../components/session-list/SessionList";
import SessionCarousel from "../../components/session-carousel/SessionCarousel";
import Loader from "../../components/loader/Loader";

const Home = () => {
  const [sessions, setSessions] = useState([]);

  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [passedSessions, setPassedSessions] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}gamesession/`);

      if (!response.ok) {
        throw new Error("Errore nel recupero delle informazioni");
      }

      const sessionsdata = await response.json();
      setSessions(sessionsdata);
      setLoading(false);

    } catch (error) {
      console.error("Errore nella chiamata al server: ", error);
    }
  };

  if (loading) {
    return (
      <Container
        style={{ marginTop: "250px" }}
        className="d-flex justify-content-center"
      >
        <Loader />
      </Container>
    );
  }

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
