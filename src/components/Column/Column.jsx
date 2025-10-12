import "./Column.css";
import Card from "../Card/Card";

function Column({ title, cards }) {
  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            theme={
              card.topic === "Web Design"
                ? "_orange"
                : card.topic === "Research"
                ? "_green"
                : "_purple"
            }
            title={card.title}
            date={card.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
