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
  ListGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./SessionDetails.css";
import { format } from "date-fns";
import PlayersList from "../../components/players-list/PlayersList";
import { UserContext } from "../../context/UserContextProvider";
import Loader from "../../components/loader/Loader";

export default function SessionDetails() {
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(UserContext);


  const params = useParams();

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    setLoading(true);
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
    <Container className="session-details-container mb-5">
      <Stack direction="vertical" className="align-items-center" gap={1}>
        <h1 className="mb-3 fw-bold fs-1">{session.title}</h1>
      </Stack>
      <Row className="g-2">
        <Col xs={12} xl={7}>
          {/*  <Image
            src={session.cover}
            fluid
            className="session-details-cover m-0"
          /> */}
          <Card className="border-blueviolet">
            <CardHeader className="text-white f-silkscreen bg-blueviolet">
              <Stack
                direction="horizontal"
                gap={2}
                className="justify-content-between"
              >
                <h6 className="m-0 f-s-10">{`Il ${formatDate(
                  session.date)} a ${session.city.city}`}</h6>
                <h6 className="m-0 f-s-10">{`Giocatori: ${
                  session.players ? session.players.length : 0
                }/${session.maxplayers} (minimo ${session.minplayers})`}</h6>
              </Stack>
            </CardHeader>
            <Card.Img
              variant="top"
              src={session.cover}
              className="session-details-cover"
              alt={`${session.title}`}
            />
            <CardBody>
              {session.description}
              <ListGroup className="list-group-flush mt-2">
                <ListGroup.Item>
                  <strong>Gioco: </strong>
                  {session.game && session.game.gametitle}
                </ListGroup.Item>
                <ListGroup.Item>
                  {session.game && session.game.gamedescription}
                </ListGroup.Item>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} xl={5}>
          <Stack direction="vertical" gap={2}>
            {session.players && (
              <PlayersList
                players={session.players}
                isCreator={
                  userData && session.creator._id === userData._id
                    ? true
                    : false
                }
                sessionId={session._id}
                refresh={fetchSession}
                open={session.players.length < session.maxplayers}
              />
            )}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
