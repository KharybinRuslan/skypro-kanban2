import { Link } from "react-router-dom";
import {
  Wrapper,
  Container,
  Title,
  Message,
  Button,
} from "./NotFoundPage.styled";

function NotFoundPage() {
  return (
    <Wrapper>
      <Container>
        <Title>
          <h1>404</h1>
        </Title>
        <Message>
          <p>Страница не найдена</p>
        </Message>
        <Link to="/">
          <Button>Вернуться на главную</Button>
        </Link>
      </Container>
    </Wrapper>
  );
}

export default NotFoundPage;
