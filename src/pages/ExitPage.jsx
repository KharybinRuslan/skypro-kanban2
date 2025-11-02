import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Container,
  Modal,
  ModalBlock,
  Title,
  Form,
  FormGroup,
  ButtonYes,
  ButtonNo,
} from "./ExitPage.styled";
import { useAuth } from "../hooks/useAuth";

function ExitPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleExit = () => {
    logout();
    navigate("/login");
  };

  const handleStay = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <Container>
        <Modal>
          <ModalBlock>
            <Title>
              <h2>Выйти из аккаунта?</h2>
            </Title>
            <Form>
              <FormGroup>
                <ButtonYes type="button" onClick={handleExit}>
                  Да, выйти
                </ButtonYes>
                <ButtonNo type="button" onClick={handleStay}>
                  Нет, остаться
                </ButtonNo>
              </FormGroup>
            </Form>
          </ModalBlock>
        </Modal>
      </Container>
    </Wrapper>
  );
}

export default ExitPage;
