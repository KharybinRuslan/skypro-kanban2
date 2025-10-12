import Column from "../Column/Column";
import { useState, useEffect } from "react";
import { cardList } from "../../data";
import {
  MainContainer,
  MainBlock,
  MainContent,
  LoadingContainer,
} from "./Main.styled";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setCards(cardList);
      setIsLoading(false);
    }, 2000);
  }, []);

  // Группируем карточки по статусам
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
      <MainContainer>
        <div className="container">
          <MainBlock>
            <LoadingContainer>
              <p>Данные загружаются</p>
            </LoadingContainer>
          </MainBlock>
        </div>
      </MainContainer>
    );
  }

  return (
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
  );
}

export default Main;
