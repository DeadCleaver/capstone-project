import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";

export default function SessionCarousel({ sessions }) {
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    filterSessions(sessions);
  }, [sessions])
  

  const filterSessions = (sessions) => {
    const futureSessions = sessions.filter(
      (session) => new Date(session.date) > new Date()
    );
    const sortedFutureSessions = futureSessions.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const closestSessions = sortedFutureSessions.slice(0, 3);
    setFilteredSessions(closestSessions);
    console.log(filteredSessions);
  };

  return (
    <div>
      {filteredSessions.length > 0 && (
        <Carousel>
          <Carousel.Item>
          <div className="session-carousel-img-container">
            <Image src={filteredSessions[0].cover} className="session-carousel-img" />
            </div>
            <Carousel.Caption>
              <h3>{filteredSessions[0].title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="session-carousel-img-container">
            <Image src={filteredSessions[1].cover} className="session-carousel-img" />
            </div>
            <Carousel.Caption>
              <h3>{filteredSessions[1].title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="session-carousel-img-container">
            <Image src={filteredSessions[2].cover} className="session-carousel-img"/>
            </div>
            <Carousel.Caption>
              <h3>{filteredSessions[2].title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
}
