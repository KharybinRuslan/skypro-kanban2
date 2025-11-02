import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Wrapper,
  Container,
  Modal,
  ModalBlock,
  ModalTitle,
  Form,
  Input,
  Button,
  FormGroup,
  LinkText,
} from "./LoginPage.styled";

function LoginPage({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsAuth(true);
      navigate("/");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Modal>
          <ModalBlock>
            <ModalTitle>
              <h2>Вход</h2>
            </ModalTitle>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="login"
                placeholder="Эл. почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">Войти</Button>
              <FormGroup>
                <p>Нужно зарегистрироваться?</p>
                <Link to="/register">
                  <LinkText>Регистрируйтесь здесь</LinkText>
                </Link>
              </FormGroup>
            </Form>
          </ModalBlock>
        </Modal>
      </Container>
    </Wrapper>
  );
}

export default LoginPage;
