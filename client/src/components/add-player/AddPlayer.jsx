import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Form, InputGroup, Stack } from "react-bootstrap";
import { HiUserAdd } from "react-icons/hi";
import Author from "../author/Author";
import { UserContext } from "../../context/UserContextProvider";

export default function AddPlayer({ sessionId, refresh, players }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const { userData } = useContext(UserContext);

  const [userRegistered, setUserRegistered] = useState(false);


  useEffect(() => {
    if (userData) {
      const userIsRegistered = players.some(player => player.email === userData.email);
      setUserRegistered(userIsRegistered);
    }
  }, [userData, players]); 

  const handleAddPlayer = async () => {

    const playerAlreadyAdded = players.some(player => player.email === email);

    if (playerAlreadyAdded) {
      alert("Giocatore già presente!");
     return;
    }


    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/${sessionId}/players`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, surname, email }),
        }
      );

      if (response.ok) {

        const newPlayer = await response.json();

        alert("Giocatore aggiunto con successo!");
        console.log(newPlayer);

        setName("");
        setSurname("");
        setEmail("")


       refresh();

      } else {
        const errorMsg = await response.text();
        alert(`Errore: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Errore nell'aggiunta del giocatore:", error);
    }
  };

  const handleAddUserAsPlayer = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/${sessionId}/players`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: userData.name,
            surname: userData.surname,
            email: userData.email }),
        }
      );

      if (response.ok) {

        const newPlayer = await response.json();

        alert("Giocatore aggiunto con successo!");
        console.log(newPlayer);

       refresh();

      } else {
        const errorMsg = await response.text();
        alert(`Errore: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Errore nell'aggiunta del giocatore:", error);
    }
  };

  return (

        <Container className="mb-2">
        <hr style={{ color: "blueviolet" }} />
        {userData && !userRegistered && <Stack direction="horizontal" gap={2} className="d-flex justify-content-between mb-3">
          <Author {...userData}/>
          <Button variant="success" size="sm" className="f-silkscreen f-s-8" onClick={handleAddUserAsPlayer}>
          <HiUserAdd /><span> Aggiungimi</span>
          </Button>
        </Stack>}

        <Form>
          <Form.Group controlId="form-user-email">
            <InputGroup className="mb-2">
              <InputGroup.Text className="f-silkscreen text-black bg-white f-s-10" style={{width: "120px"}}>
                Email
              </InputGroup.Text>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="form-user-name">
            <InputGroup className="mb-2">
              <InputGroup.Text className="f-silkscreen text-black bg-white f-s-10" style={{width: "120px"}}>
                Nome
              </InputGroup.Text>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="form-user-surname">
            <InputGroup className="mb-2">
              <InputGroup.Text className="f-silkscreen text-black bg-white f-s-10" style={{width: "120px"}}>
                Cognome
              </InputGroup.Text>
              <Form.Control
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-center">
          <Button variant="secondary" className="border-white f-s-8 f-silkscreen" onClick={handleAddPlayer}>
            <HiUserAdd /><span> Aggiungi Giocatore</span>
          </Button>
          </div>

        </Form>
        </Container>

  );
}
