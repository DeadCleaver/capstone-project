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
import Loader from "../../components/loader/Loader";

export default function GamesManager() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    gametitle: "",
    gamedescription: "",
  });
  const { userToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);


  // modifica giochi
  const [editGame, setEditGame] = useState({ gametitle: "", gamedescription: "" });
  const [editGameId, setEditGameId] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}game`);
      if (response.ok) {
        const gamesData = await response.json();
        setGames(gamesData);
        setLoading(false);
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

        fetchGames();
        setNewGame({ gametitle: "", gamedescription: "" });
        
      } else {
        throw new Error("Errore nell'aggiunta del gioco");
      }
    } catch (error) {
      console.error("Errore nell'aggiunta del gioco:", error);
    }
  };

  // Modifica giochi

  const handleEdit = (gameId) => {
    const gameToEdit = games.find((game) => game._id === gameId);
    setEditGame(gameToEdit);
    setEditGameId(gameId);
  };

  const handleUpdateGame = async (gameId) => {

    try {
      const response = await fetch(`${process.env.REACT_APP_API}game/${gameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(editGame),
      });
      if (response.ok) {


        fetchGames();
        setEditGameId(null);

      } else {
        throw new Error("Errore nella modifica del gioco");
      }
    } catch (error) {
      console.error("Errore nella modifica del gioco", error);
    }
  };

  const handleClearEdit = () => {
    setEditGameId(null);
    setEditGame({ gametitle: "", gamedescription: "" });
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
    <Container style={{ marginTop: "100px" }}>
      <Card className="border-blueviolet">
        <CardHeader className="bg-blueviolet text-center text-white f-silkscreen">
          Libreria Giochi
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
              className="w-25"
            />
            <Form.Control
              type="text"
              value={newGame.gamedescription}
              onChange={(e) =>
                setNewGame({ ...newGame, gamedescription: e.target.value })
              }
              placeholder="Descrizione del gioco"
              className="w-50"
            />
            <Button
              variant="success"
              onClick={handleAddGame}
              className="f-silkscreen text-white f-s-10 bg-success"
            >
              Aggiungi
            </Button>

          </InputGroup>
        </Container>

        <Container>

        <Table striped bordered hover>
        <thead>
          <tr className="f-silkscreen f-s-10">
            <th>Titolo</th>
            <th>Descrizione</th>
            <th className="text-center">Opzioni</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td className="fw-bold">
                {editGameId === game._id ? (
                  <Form.Control
                    type="text"
                    value={editGame.gametitle}
                    onChange={(e) => setEditGame({ ...editGame, gametitle: e.target.value })}
                  />
                ) : (
                  game.gametitle
                )}
              </td>
              <td>
                {editGameId === game._id ? (
                  <Form.Control
                    type="text"
                    value={editGame.gamedescription}
                    onChange={(e) => setEditGame({ ...editGame, gamedescription: e.target.value })}
                  />
                ) : (
                  game.gamedescription
                )}
              </td>
              <td className="text-center">
                {editGameId === game._id ? (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleClearEdit}
                      className="me-2 text-white border-white f-silkscreen f-s-10"
                    >
                      Annulla
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateGame(game._id)}
                      className="text-white border-white f-silkscreen"
                    >
                      Modifica
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(game._id)}
                    className="me-2 text-white border-white f-silkscreen"
                  >
                    Modifica
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


         {/*  <Table striped bordered hover>
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
                      className="me-2 text-white border-white f-silkscreen"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
          
        </Container>
      </Card>
    </Container>
  );
}
