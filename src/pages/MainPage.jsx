import Column from "../components/Column/Column";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import { useTasks } from "../hooks/useTasks";
import {
  Wrapper,
  MainContainer,
  MainBlock,
  MainContent,
  LoadingContainer,
  EmptyState,
  RetryButton,
} from "./MainPage.styled";

const COLUMN_ORDER = [
  "БЕЗ СТАТУСА",
  "НУЖНО СДЕЛАТЬ",
  "В РАБОТЕ",
  "ТЕСТИРОВАНИЕ",
  "ГОТОВО",
];

function MainPage() {
  const { tasks, isLoading, error, loadTasks } = useTasks();

  const columns = COLUMN_ORDER.map((title) => ({
    title,
    cards: tasks.filter((card) => card.status === title),
  }));

  if (isLoading) {
    return (
      <Wrapper>
        <Header />
        <MainContainer>
          <div className="container">
            <MainBlock>
              <LoadingContainer>
                <Loader label="Загружаем задачи" />
              </LoadingContainer>
            </MainBlock>
          </div>
        </MainContainer>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Header />
        <MainContainer>
          <div className="container">
            <MainBlock>
              <LoadingContainer>
                <p role="alert">{error}</p>
                <RetryButton type="button" onClick={loadTasks}>
                  Попробовать снова
                </RetryButton>
              </LoadingContainer>
            </MainBlock>
          </div>
        </MainContainer>
      </Wrapper>
    );
  }

  const isEmpty = tasks.length === 0;

  return (
    <Wrapper>
      <Header />
      <MainContainer>
        <div className="container">
          <MainBlock>
            {isEmpty ? (
              <EmptyState>
                <p>Новых задач нет</p>
                <span>Нажмите «Создать новую задачу», чтобы начать работу.</span>
              </EmptyState>
            ) : null}
            <MainContent $isEmpty={isEmpty}>
              {columns.map((column) => (
                <Column key={column.title} title={column.title} cards={column.cards} />
              ))}
            </MainContent>
          </MainBlock>
        </div>
      </MainContainer>
    </Wrapper>
  );
}

export default MainPage;
