import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";
import "./SessionAdd.css";
import Select from "react-select";

export default function SessionAdd({ editSessionId }) {
  const { userData, userToken } = useContext(UserContext);
  const [sessionCover, setSessionCover] = useState(null);
  const [games, setGames] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    game: "",
    city: "",
    maxplayers: 1,
    minplayers: 1,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  // caricamento della lista giochi
  useEffect(() => {
    fetchGames();
    fetchCities();
  }, []);

  useEffect(() => {
    if (editSessionId) {
      fetchSession(editSessionId);
    } else {
      setFormData({
        title: "",
        description: "",
        game: "",
        maxplayers: 1,
        minplayers: 1,
        date: "",
      });
    }
  }, [editSessionId]);

  const fetchSession = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/${editSessionId}`
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero delle informazioni");
      }

      const sessiondata = await response.json();
      setFormData(sessiondata);
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

  const fetchCities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}city`);
      if (response.ok) {
        const citiesData = await response.json();
        setCities(citiesData);
      } else {
        throw new Error("Errore nel recupero dell'elenco città");
      }
    } catch (error) {
      console.error("Errore nel recupero dell'elenco città:", error);
    }
  };

  // Aggiunta della sessione
  const handleAddSession = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API}gamesession/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          ...formData,
          creator: userData._id,
        }),
      });

      if (response.ok) {
        if (sessionCover) {
          const { _id } = await response.json();
          await uploadSessionCover(_id, sessionCover);
        }

        window.location.href = "/sessions";
      } else {
        console.error("Failed to add session");
      }
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const uploadSessionCover = async (sessionId, coverFile) => {
    try {
      const coverData = new FormData();
      coverData.append("cover", coverFile);

      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/${sessionId}/cover`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: coverData,
        }
      );

      if (!response.ok) {
        throw new Error("Caricamento immagine non riuscito");
      }

      alert("Immagine cover aggiunta correttamente");
    } catch (error) {
      console.error("Caricamento immagine non riuscito:", error);
    }
  };

  // modifica della sessione
  const handleModifySession = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Sei sicuro di voler modificare questa sessione?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/${editSessionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        if (sessionCover) {
          await uploadSessionCover(editSessionId, sessionCover);
        }

        window.location.href = "/sessions";
      } else {
        console.error("Failed to modify session");
      }
    } catch (error) {
      console.error("Error modifying session:", error);
    }
  };

  return (
    <Card className="border-blueviolet">
      <CardHeader className="bg-blueviolet f-silkscreen text-white">
        {editSessionId ? `Modifica Sessione ` : `Crea Nuova sessione`}
      </CardHeader>
      <CardBody>
        <Container className="m-1">
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="f-silkscreen f-s-10">
                Titolo della sessione
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="game">
                  <Form.Control
                    as="select"
                    name="game"
                    value={formData.game}
                    onChange={(e) => {
                      const gameId = e.target.value;
                      setFormData({ ...formData, game: gameId });
                    }}
                    required
                  >
                    <option value="">Seleziona un gioco</option>
                    {games.map((game) => (
                      <option key={game._id} value={game._id}>
                        {game.gametitle}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="game">
                  <Form.Control
                    as="select"
                    name="city"
                    value={formData.city}
                    onChange={(e) => {
                      const cityId = e.target.value;
                      setFormData({ ...formData, city: cityId });
                    }}
                    required
                  >
                    <option value="">Seleziona un luogo</option>
                    {cities.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.city}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="f-silkscreen f-s-10">
                Descrizione
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label className="f-silkscreen f-s-10">
                    Giorno
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="cover">
                  <Form.Label className="f-silkscreen f-s-10">
                    Immagine di Copertina
                  </Form.Label>
                  <Form.Control
                    size="md"
                    type="file"
                    onChange={(e) => setSessionCover(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="maxplayers">
                  <Form.Label className="f-silkscreen f-s-10">
                    Numero massimo Giocatori
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="maxplayers"
                    value={formData.maxplayers}
                    onChange={handleChange}
                    min={1}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="minplayers">
                  <Form.Label className="f-silkscreen f-s-10">
                    Numero Minimo Giocatori
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="minplayers"
                    value={formData.minplayers}
                    onChange={handleChange}
                    min={1}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center">
              {editSessionId ? (
                <Button
                  variant="warning"
                  type="submit"
                  className="text-white f-s-10 f-silkscreen"
                  onClick={handleModifySession}
                >
                  Modifica Sessione
                </Button>
              ) : (
                <Button
                  variant="success"
                  type="submit"
                  className="text-white f-s-10 f-silkscreen"
                  onClick={handleAddSession}
                >
                  Aggiungi Sessione
                </Button>
              )}
            </div>
          </Form>
        </Container>
      </CardBody>
    </Card>
  );
}
