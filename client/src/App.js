import {Nav, Navbar, Container} from "react-bootstrap";


function App() {
  return (
    <div >
       <Navbar bg="light" data-bs-theme="light">
        <Container>
        <Navbar.Brand href="#home">
            <img
              src="/assets/logo-d20.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Gaming Night logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
