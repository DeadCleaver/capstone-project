import React from "react";
import { Container } from "react-bootstrap";
import "./GameFooter.css"

const GameFooter = (props) => {
  return (
    <footer
      style={{
        paddingTop: 50,
        paddingBottom: 50,
      }}
      className="footer-style"
    >
      <Container className="d-flex justify-content-center text-white">{`${new Date().getFullYear()} - Gaming Night | Developed as Capstone Project for EPICODE web dev Course.`}</Container>
    </footer>
  );
};

export default GameFooter;
