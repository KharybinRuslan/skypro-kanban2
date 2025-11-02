import Column from "../components/Column/Column";
import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import { getTasks } from "../services/kanbanApi";
import {
  Wrapper,
  MainContainer,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "./MainPage.styled";

function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const tasks = await getTasks();
      
      // Проверяем, что tasks существует и является массивом
      if (!tasks || !Array.isArray(tasks)) {
        setCards([]);
        return;
      }
      
      // Преобразуем формат задач из API в формат для компонентов
      const formattedCards = tasks.map((task) => {
        const date = new Date(task.date);
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getFullYear()).slice(-2)}`;
        
        // Нормализуем статус для совместимости
        let normalizedStatus = task.status || "БЕЗ СТАТУСА";
        const statusMap = {
          "Без статуса": "БЕЗ СТАТУСА",
          "Нужно сделать": "НУЖНО СДЕЛАТЬ",
          "В работе": "В РАБОТЕ",
          "Тестирование": "ТЕСТИРОВАНИЕ",
          "Готово": "ГОТОВО",
        };
        normalizedStatus = statusMap[normalizedStatus] || normalizedStatus;

        return {
          id: task._id,
          title: task.title,
          topic: task.topic,
          date: formattedDate,
          status: normalizedStatus,
          description: task.description || "",
        };
      });
      setCards(formattedCards);
      console.log("Загружено задач:", formattedCards.length);
    } catch (err) {
      console.error("Ошибка загрузки задач:", err);
      setError(err.message || "Ошибка загрузки задач");
    } finally {
      setIsLoading(false);
    }
  };

  const groupedCards = {
    "БЕЗ СТАТУСА": cards.filter((card) => card.status === "БЕЗ СТАТУСА"),
    "НУЖНО СДЕЛАТЬ": cards.filter((card) => card.status === "НУЖНО СДЕЛАТЬ"),
    "В РАБОТЕ": cards.filter((card) => card.status === "В РАБОТЕ"),
    ТЕСТИРОВАНИЕ: cards.filter((card) => card.status === "ТЕСТИРОВАНИЕ"),
    ГОТОВО: cards.filter((card) => card.status === "ГОТОВО"),
  };

  const columns = [
    { title: "БЕЗ СТАТУСА", cards: groupedCards["БЕЗ СТАТУСА"] },
    { title: "НУЖНО СДЕЛАТЬ", cards: groupedCards["НУЖНО СДЕЛАТЬ"] },
    { title: "В РАБОТЕ", cards: groupedCards["В РАБОТЕ"] },
    { title: "ТЕСТИРОВАНИЕ", cards: groupedCards["ТЕСТИРОВАНИЕ"] },
    { title: "ГОТОВО", cards: groupedCards["ГОТОВО"] },
  ];

  if (isLoading) {
    return (
      <Wrapper>
        <Header />
        <MainContainer>
          <div className="container">
            <MainBlock>
              <LoadingContainer>
                <p>Данные загружаются</p>
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
                <p style={{ color: "red" }}>{error}</p>
              </LoadingContainer>
            </MainBlock>
          </div>
        </MainContainer>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header />
      <MainContainer>
        <div className="container">
          <MainBlock>
            <MainContent>
              {columns.map((column, index) => (
                <Column key={index} title={column.title} cards={column.cards} />
              ))}
            </MainContent>
          </MainBlock>
        </div>
      </MainContainer>
    </Wrapper>
  );
}

export default MainPage;
