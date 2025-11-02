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
  ErrorMessage,
} from "./LoginPage.styled";
import { loginUser } from "../services/userApi";

function LoginPage({ setIsAuth }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    login: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {
      login: !login.trim(),
      password: !password.trim(),
    };
    setFieldErrors(errors);
    
    const hasErrors = errors.login || errors.password;
    if (hasErrors) {
      setError("Введенные вами данные не корректны. Чтобы завершить вход, заполните все поля в форме.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const user = await loginUser(login, password);
      localStorage.setItem("token", user.token);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      setError(err.message || "Неверный логин или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = login.trim() && password.trim();

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
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  if (fieldErrors.login && e.target.value.trim()) {
                    setFieldErrors({ ...fieldErrors, login: false });
                  }
                }}
                disabled={isLoading}
                $hasError={fieldErrors.login}
              />
              <Input
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password && e.target.value.trim()) {
                    setFieldErrors({ ...fieldErrors, password: false });
                  }
                }}
                disabled={isLoading}
                $hasError={fieldErrors.password}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Button type="submit" disabled={isLoading || !isFormValid} $disabled={isLoading || !isFormValid}>
                {isLoading ? "Вход..." : "Войти"}
              </Button>
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
