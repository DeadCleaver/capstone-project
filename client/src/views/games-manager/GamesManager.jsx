import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Table,
  Button,
  Card,
  CardHeader,
  Form,
  InputGroup,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";

export default function GamesManager() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    gametitle: "",
    gamedescription: "",
  });
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    fetchGames();
  }, []);

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

  const handleAddGame = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(newGame),
      });
      if (response.ok) {
        const addedGame = await response.json();
        // setGames([...games, addedGame]);
        fetchGames();
        setNewGame({ gametitle: "", gamedescription: "" });
      } else {
        throw new Error("Failed to add game");
      }
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Card className="border-blueviolet">
        <CardHeader className="bg-blueviolet text-center text-white f-silkscreen">
          Aggiungi o Modifica Libreria Giochi
        </CardHeader>

        <Container className="my-3">
          <InputGroup>
            <Form.Control
              type="text"
              value={newGame.gametitle}
              onChange={(e) =>
                setNewGame({ ...newGame, gametitle: e.target.value })
              }
              placeholder="Titolo del gioco"
            />
            <Form.Control
              type="text"
              value={newGame.gamedescription}
              onChange={(e) =>
                setNewGame({ ...newGame, gamedescription: e.target.value })
              }
              placeholder="Descrizione del gioco"
            />
            <Button
              variant="success"
              onClick={handleAddGame}
              className="f-silkscreen text-white f-s-8 bg-success"
            >
              Aggiungi
            </Button>
          </InputGroup>
        </Container>

        <Container>
          <Table striped bordered hover>
            <thead>
              <tr className="f-silkscreen f-s-8">
                <th>Titolo</th>
                <th>Descrizione</th>
                <th className="text-center">Opzioni</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game._id}>
                  <td className="fw-bold">{game.gametitle}</td>
                  <td>{game.gamedescription}</td>
                  <td className="text-center">
                    <Button
                      variant="warning"
                      size="sm"
                      /* onClick={() => handleEdit(game._id)} */
                      className="me-2 text-white border-white f-silkscreen"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Card>
    </Container>
  );
}
