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
} from "./RegisterPage.styled";

function RegisterPage({ setIsAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
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
              <h2>Регистрация</h2>
            </ModalTitle>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="first-name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <Button type="submit">Зарегистрироваться</Button>
              <FormGroup>
                <p>
                  Уже есть аккаунт?{" "}
                  <Link to="/login">
                    <LinkText>Войдите здесь</LinkText>
                  </Link>
                </p>
              </FormGroup>
            </Form>
          </ModalBlock>
        </Modal>
      </Container>
    </Wrapper>
  );
}

export default RegisterPage;
