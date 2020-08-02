import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const DefaultLayout = ({ children }) => (
  <Container className="text-center">
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
);

export default DefaultLayout;
