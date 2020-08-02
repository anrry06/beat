import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">BEAT</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/a">a</Nav.Link>
      <Nav.Link href="/b">b</Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;
