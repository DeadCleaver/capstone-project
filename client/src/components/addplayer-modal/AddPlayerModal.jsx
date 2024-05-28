import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  ModalHeader,
  ModalFooter,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContextProvider";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function AddPlayerModal({showAddPlayer, setShowAddPlayer}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const { userData } = useContext(UserContext);
  
    useEffect(() => {
      setShowAddPlayer(showAddPlayer);
    }, [showAddPlayer]);
  
    useEffect(() => {
      if (!showAddPlayer) {
        setEmail("");
        setName("");
        setSurname("");
      }
    }, [showAddPlayer]);
  
    const handleAddPlayer = async () => {
    
    };
  
    const toggleShowAddPlayer = () => {
      setShowAddPlayer(!showAddPlayer);
    };

  return (
    <Modal show={showAddPlayer} onHide={toggleShowAddPlayer}>
    <ModalHeader
      closeButton
      className="f-s-8 bg-darkslate f-silkscreen text-white fw-bold"
    >
      Log In
    </ModalHeader>
    <Modal.Body className="bg-darkslate">
      <Form>
        <Form.Group controlId="form-user-email">
          <InputGroup className="mb-2 border-blueviolet">
            <InputGroupText className="f-silkscreen text-black bg-white">
              Email
            </InputGroupText>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="form-user-name">
          <InputGroup>
            <InputGroupText className="f-silkscreen text-black bg-white">
              Nome
            </InputGroupText>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="form-user-surname">
          <InputGroup>
            <InputGroupText className="f-silkscreen text-black bg-white">
              Cognome
            </InputGroupText>
            <Form.Control
              value={name}
              onChange={(e) => setSurname(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

      </Form>
    </Modal.Body>

    <ModalFooter className="p-1 bg-darkslate">
      <Button
        size="sm"
        variant="danger"
        className="f-silkscreen border-white"
        onClick={toggleShowAddPlayer}
      >
        Chiudi
      </Button>
      <Button
        size="sm"
        variant="success"
        className="f-silkscreen border-white"
        onClick={() => handleAddPlayer(email, name, surname)}
      >
        Log in
      </Button>
    </ModalFooter>
  </Modal>
    )
}
