import Header from "../header";
import Container from "react-bootstrap/Container";

const MainLayout = ({ children }) => (
  <Container>
    <Header />

    <Container>{children}</Container>

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
    `}</style>
  </Container>
);

export default MainLayout;
