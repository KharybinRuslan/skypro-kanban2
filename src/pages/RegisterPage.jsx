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
} from "./RegisterPage.styled";
import { useAuth } from "../hooks/useAuth";

function RegisterPage() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    login: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateForm = () => {
    const errors = {
      name: !name.trim(),
      login: !login.trim(),
      password: !password.trim(),
    };
    setFieldErrors(errors);

    const hasErrors = errors.name || errors.login || errors.password;
    if (hasErrors) {
      setError(
        "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме."
      );
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

    const result = await register(login, name, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Ошибка при регистрации");
    }
    setIsLoading(false);
  };

  const isFormValid = name.trim() && login.trim() && password.trim();

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
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name && e.target.value.trim()) {
                    setFieldErrors({ ...fieldErrors, name: false });
                  }
                }}
                disabled={isLoading}
                $hasError={fieldErrors.name}
              />
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
              <Button
                type="submit"
                disabled={isLoading || !isFormValid}
                $disabled={isLoading || !isFormValid}
              >
                {isLoading ? "Регистрация..." : "Зарегистрироваться"}
              </Button>
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
