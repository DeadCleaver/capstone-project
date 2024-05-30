import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Stack,
  Card,
  CardHeader,
  CardBody,
  ListGroup
} from "react-bootstrap";
import Author from "../../components/author/Author";
import { useParams, useNavigate } from "react-router-dom";
import "./SessionDetails.css";
import { format, formatDate } from "date-fns";
import PlayersList from "../../components/players-list/PlayersList";
import { UserContext } from "../../context/UserContextProvider";

export default function SessionDetails() {
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true); // mettere lo spinner
  const [isCreator, setIsCreator] = useState(false);
  const { userData } = useContext(UserContext);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSession();

  }, []);

  const fetchSession = async () => {
    const { id } = params;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}gamesession/${id}`
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero delle informazioni");
      }

      const sessiondata = await response.json();
      setSession(sessiondata);

   


      setLoading(false);
    } catch (error) {
      console.error("Errore nella chiamata al server: ", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <Container className="session-details-container">
      <Stack direction="vertical" className="align-items-center" gap={1}>
        <h1 className="mb-3 fw-bold fs-1">{session.title}</h1>
      </Stack>
      <Row className="g-2">
        <Col xs={12} xl={7}>
          <Image
            src={session.cover}
            fluid
            className="session-details-cover m-0"
          />
        </Col>

        <Col xs={12} xl={5}>
          <Stack direction="vertical" gap={2}>
            <Card className="border-blueviolet">
              <CardHeader className="text-white f-silkscreen bg-blueviolet">
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="justify-content-between"
                >
                  <h6 className="m-0 f-s-10">{`Data: ${formatDate(
                    session.date
                  )}`}</h6>
                  <h6 className="m-0 f-s-10">{`Giocatori: ${
                    session.players ? session.players.length : 0
                  }/${session.maxplayers} (minimo ${session.minplayers})`}</h6>
                </Stack>
              </CardHeader>
              <CardBody>
                {session.description}
                <ListGroup className="list-group-flush mt-2">
                  <ListGroup.Item><strong>Gioco: </strong>{session.game && session.game.gametitle}</ListGroup.Item>
                  <ListGroup.Item>{session.game && session.game.gamedescription}</ListGroup.Item>
                </ListGroup>
              </CardBody>
            </Card>
            {session.players && <PlayersList players={session.players} isCreator={(userData && (session.creator._id === userData._id)) ? true : false} sessionId={session._id} refresh={fetchSession}/>}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
