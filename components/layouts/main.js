import Header from "../header";
import Container from "react-bootstrap/Container";

const MainLayout = ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);

export default MainLayout;
