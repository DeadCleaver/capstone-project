import React, { useContext, useState } from "react";
import { CardBody, Stack } from "react-bootstrap";
import { Card, CardHeader, Container, Button, Form, InputGroup } from "react-bootstrap";
import { HiUserAdd } from "react-icons/hi";
import Author from "../author/Author";
import { UserContext } from "../../context/UserContextProvider";

export default function AddPlayer({ sessionId, refresh, setSessionPlayers }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const { userData } = useContext(UserContext);

  const handleAddPlayer = async () => {
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

  return (
  /*   <Card className="border-blueviolet">
      <CardHeader className="bg-blueviolet text-white f-silkscreen f-s-10 text-center">
        Iscriviti alla Sessione
      </CardHeader>
      <CardBody>
        {userData && (
          <Stack direction="horizontal" className="p-2 justify-content-between">
            <Author {...userData} />
            <Button
              variant="success"
              className="border-white f-s-8 f-silkscreen"
            >
              <HiUserAdd />
              <span> Iscrivimi</span>
            </Button>
          </Stack>
        )} */

        <Container className="mb-2">
        <hr style={{ color: "blueviolet" }} />
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

 /*      </CardBody>
    </Card> */

  );
}
