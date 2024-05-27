import React, { useContext, useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";
import "./SessionAdd.css";

export default function SessionAdd({games, fetchUserSessions, fetchSessions}) {
  const { userData, userToken } = useContext(UserContext);
  const [sessionCover, setSessionCover] = useState(null);

  // gestione dei dati tutti insieme
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    game: '',
    maxplayers: 1,
    minplayers: 1,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // caricamento della lista giochi - DA SPOSTARE ALTROVE
  /* useEffect(() => {
    fetchGames();
  }, []); */

  /* const fetchGames = async () => {
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
  }; */

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
  
        fetchUserSessions();
        fetchSessions();
        window.location.href = "/profile";
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
        throw new Error("Failed to add session cover image");
      }
  
      alert("Session cover image added successfully");
    } catch (error) {
      console.error("Error adding session cover image:", error);
    }
  };


  return (
    <Container className="m-1">
      <Form>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titolo della sessione</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="game">
        <Form.Control
          as="select" // Utilizza un select per visualizzare i giochi
          name="game"
          value={formData.game}
          onChange={(e) => {
            const gameId = e.target.value; // Ottieni l'id del gioco selezionato
            setFormData({ ...formData, game: gameId }); // Memorizza l'id del gioco nello stato formData
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

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descrizione</Form.Label>
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
              <Form.Label>Giorno</Form.Label>
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
              <Form.Label>Immagine di Copertina</Form.Label>
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
              <Form.Label>Numero massimo Giocatori</Form.Label>
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
              <Form.Label>Numero Minimo Giocatori</Form.Label>
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
          <Button variant="primary" type="submit" className="btn-blueviolet" onClick={handleAddSession}>
            Aggiungi Sessione
          </Button>
        </div>
      </Form>
    </Container>
  );
}
