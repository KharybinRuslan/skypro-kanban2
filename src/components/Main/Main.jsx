import "./Main.css";
import Column from "../Column/Column";
import { useState, useEffect } from "react";
import { cardList } from "../../data";

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
      <main className="main">
        <div className="container">
          <div className="main__block">
            <div className="loading">
              <p>Данные загружаются</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columns.map((column, index) => (
              <Column key={index} title={column.title} cards={column.cards} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
