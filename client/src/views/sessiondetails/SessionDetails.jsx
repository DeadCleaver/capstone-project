import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Author from "../../components/author/Author";
import { useParams, useNavigate } from "react-router-dom";
import "./SessionDetails.css";
import { format, formatDate } from "date-fns";

export default function SessionDetails({ sessions }) {
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = params;
    const session = sessions.find((session) => session._id.toString() === id);

    if (session) {
      setSession(session);
      setLoading(false);
    } else {
      navigate("/");
      alert("Blog post Rimosso o non presente");
    }
  }, []);

  const formatDate = (date) => {
    if (!date) return ""; 
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <Container className="session-details-container">
      <Row>
        <Col xs={12} md={7}>
          <Image src={session.cover} fluid className="session-details-cover m-0" />
        </Col>

        <Col xs={12} md={5}>
          <Container className="mt-auto">
            <h1 className="session-details-title mb-5">{session.title}</h1>
            <div>
              <h6 className="mb-3">{`Giorno della sessione: ${formatDate(session.date)}`}</h6>
              <h6 className="mb-3">{`Giocatori:   ${session.players ? session.players.length : 0} / ${session.maxplayers}`}</h6>
              <hr style={{color: "#5b17c4"}}/>
              <p className="mb-3">{session.description}</p>
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
