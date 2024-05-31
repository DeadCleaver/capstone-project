import React, { useState, useEffect } from "react";
import { Container, Stack, Form, Row, Col } from "react-bootstrap";
import SessionList from "../../components/session-list/SessionList";
import SessionCarousel from "../../components/session-carousel/SessionCarousel";
import Loader from "../../components/loader/Loader";

const Home = () => {
  const [sessions, setSessions] = useState([]);

  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [passedSessions, setPassedSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  // selettori/filtro
  const [games, setGames] = useState([]);
  const [creators, setCreators] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedCreator, setSelectedCreator] = useState("");

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
      ...new Set(sessions.map((session) => session.creator.name)),
    ];
    setGames(availableGames);
    setCreators(availableCreators);

    filterSessions();
  }, [sessions, selectedGame, selectedCreator]);

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
        (session) => session.creator.name === selectedCreator
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
      <Stack className="mb-3 bg-blueviolet-dark border border-white rounded p-2">
        <Form className="text-white">
          <Row>
            <Col xs={1}>
              <Form.Label className="f-silkscreen f-s-8">FILTRI</Form.Label>
            </Col>
            <Col>
              <Row>
                <Col xs={6}>
                  <Form.Group controlId="formGame">
                    <Row>
                      <Col xs={1}>
                        <Form.Label className="f-silkscreen f-s-8">
                          Gioco
                        </Form.Label>
                      </Col>
                      <Col>
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
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group controlId="formCreator">
                    <Row>
                      <Col xs={3}>
                        <Form.Label className="f-silkscreen f-s-8">
                          Organizzatore
                        </Form.Label>
                      </Col>
                      <Col>
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
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Stack>

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
