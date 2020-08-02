import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const DefaultLayout = ({ children }) => (
  <Container>
    {children}
  </Container>
);

export default DefaultLayout;
