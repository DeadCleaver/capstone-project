import React, { useState, useEffect } from "react";
import { Container, Stack, Form, Row, Col, Accordion } from "react-bootstrap";
import SessionList from "../../components/session-list/SessionList";
import SessionCarousel from "../../components/session-carousel/SessionCarousel";
import Loader from "../../components/loader/Loader";
import "./Home.css";

const Home = () => {
  const [sessions, setSessions] = useState([]);

  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [passedSessions, setPassedSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  // selettori/filtro
  const [games, setGames] = useState([]);
  const [creators, setCreators] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCreator, setSelectedCreator] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

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

  useEffect(() => {
    const availableGames = [
      ...new Set(sessions.map((session) => session.game.gametitle)),
    ];

    const availableCreators = [
      ...new Set(
        sessions.map(
          (session) => `${session.creator.name} ${session.creator.surname}`
        )
      ),
    ];

    const availableCities = [
      ...new Set(sessions.map((session) => session.city.city)),
    ];

    setGames(availableGames);
    setCreators(availableCreators);
    setCities(availableCities);

    filterSessions();
  }, [sessions, selectedGame, selectedCreator, selectedCity]);

  // vecchio filtro per data
  /* useEffect(() => {
    const upcoming = sessions.filter(
      (session) => new Date(session.date) >= new Date()
    );

    setUpcomingSessions(upcoming);

    const passed = sessions.filter(
      (session) => new Date(session.date) < new Date()
    );

    setPassedSessions(passed);
  }, [sessions]); */

  const filterSessions = () => {
    let filteredSessions = sessions;

    if (selectedGame) {
      filteredSessions = filteredSessions.filter(
        (session) => session.game.gametitle === selectedGame
      );
    }

    if (selectedCreator) {
      filteredSessions = filteredSessions.filter(
        (session) =>
          `${session.creator.name} ${session.creator.surname}` ===
          selectedCreator
      );
    }

    if (selectedCity) {
      filteredSessions = filteredSessions.filter(
        (session) => session.city.city === selectedCity
      );
    }

    const upcoming = filteredSessions.filter(
      (session) => new Date(session.date) >= new Date()
    );
    const passed = filteredSessions.filter(
      (session) => new Date(session.date) < new Date()
    );

    setUpcomingSessions(upcoming);
    setPassedSessions(passed);
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
    <Container fluid="sm" style={{ marginTop: "90px" }}>
      <Accordion className="mb-3">
        <Accordion.Item eventKey="0" className="border-blueviolet">
          <Accordion.Header>
            <Stack className="text-center text-white f-silkscreen">
              Filtri
            </Stack>
          </Accordion.Header>
          <Accordion.Body className="border-blueviolet-dark shadow">
            <Form className="text-white">
              <Row>
                <Col xs={12} lg={4}>
                  <Form.Group controlId="formGame">
                    <Form.Label className="f-silkscreen f-s-8 text-black">
                      Gioco
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      value={selectedGame}
                      onChange={(e) => setSelectedGame(e.target.value)}
                    >
                      <option value="">Tutti i Giochi</option>
                      {games.map((game, index) => (
                        <option key={index} value={game}>
                          {game}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={12} lg={4}>
                  <Form.Group controlId="formCreator">
                    <Form.Label className="f-silkscreen f-s-8 text-black">
                      Organizzatore
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      value={selectedCreator}
                      onChange={(e) => setSelectedCreator(e.target.value)}
                    >
                      <option value="">Tutti gli Organizzatori</option>
                      {creators.map((creator, index) => (
                        <option key={index} value={creator}>
                          {creator}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={12} lg={4}>
                  <Form.Group controlId="formCity">
                    <Form.Label className="f-silkscreen f-s-8 text-black">
                      Luogo
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">Tutti i Luoghi</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {upcomingSessions.length > 0 && (
        <div>
          <Stack className="mb-2">
            <h2 className="text-center">Sessioni Disponibli</h2>
          </Stack>
          <SessionList sessions={upcomingSessions} />
        </div>
      )}

      {passedSessions.length > 0 && (
        <div>
          <Stack className="mb-2">
            <h2 className="text-center">Sessioni Passate</h2>
          </Stack>
          <SessionList sessions={passedSessions} />
        </div>
      )}
    </Container>
  );
};

export default Home;
