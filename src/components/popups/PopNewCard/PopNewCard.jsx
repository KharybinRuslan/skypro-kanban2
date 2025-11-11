import "./PopNewCard.css";
import Calendar from "../../Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTasks } from "../../../hooks/useTasks";

const STATUS_OPTIONS = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

const TOPIC_OPTIONS = [
  { value: "Web Design", colorClass: "_orange" },
  { value: "Research", colorClass: "_green" },
  { value: "Copywriting", colorClass: "_purple" },
];

function PopNewCard() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Research");
  const [status, setStatus] = useState("Без статуса");
  const [date, setDate] = useState(new Date().toISOString());
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    navigate("/");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setError("Введите название задачи");
      return;
    }

    if (!trimmedDescription) {
      setError("Введите описание задачи");
      return;
    }
    setIsSubmitting(true);
    const result = await addTask({
      title: trimmedTitle,
      topic,
      status,
      description: trimmedDescription,
      date,
    });
    setIsSubmitting(false);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Не удалось создать задачу");
    }
  };

  const canSubmit = title.trim() && description.trim() && !isSubmitting;

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <button
              type="button"
              className="pop-new-card__close"
              onClick={handleClose}
              aria-label="Закрыть окно"
            >
              &#10006;
            </button>
            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                onSubmit={handleCreate}
              >
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="name"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-new__area"
                    name="text"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="status">
                  <p className="status__p subttl">Статус</p>
                  <div className="status__themes">
                    {STATUS_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`status__theme ${
                          status === option ? "_gray" : ""
                        }`}
                        onClick={() => setStatus(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
              <Calendar onDateChange={setDate} selectedDate={date} />
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                {TOPIC_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`categories__theme ${option.colorClass} ${
                      topic === option.value ? "_active-category" : ""
                    }`}
                    onClick={() => setTopic(option.value)}
                  >
                    <span className={option.colorClass}>{option.value}</span>
                  </button>
                ))}
              </div>
            </div>
            {error ? (
              <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
            ) : null}
            <button
              className="form-new__create _hover01"
              id="btnCreate"
              type="submit"
              form="formNewCard"
              disabled={!canSubmit}
            >
              {isSubmitting ? "Создание..." : "Создать задачу"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopNewCard;
