import "./PopNewCard.css";
import Calendar from "../../Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTasks } from "../../../hooks/useTasks";

function PopNewCard() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Research");
  const [status, setStatus] = useState("Без статуса");
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
    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    }
    setIsSubmitting(true);
    const result = await addTask({ title, topic, status, description });
    setIsSubmitting(false);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Не удалось создать задачу");
    }
  };

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a href="#" className="pop-new-card__close" onClick={handleClose}>
              &#10006;
            </a>
            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                action="#"
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
              </form>
              <Calendar />
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div
                  className={`categories__theme _orange ${
                    topic === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() => setTopic("Web Design")}
                >
                  <p className="_orange">Web Design</p>
                </div>
                <div
                  className={`categories__theme _green ${
                    topic === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => setTopic("Research")}
                >
                  <p className="_green">Research</p>
                </div>
                <div
                  className={`categories__theme _purple ${
                    topic === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() => setTopic("Copywriting")}
                >
                  <p className="_purple">Copywriting</p>
                </div>
              </div>
            </div>
            {error ? (
              <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
            ) : null}
            <button
              className="form-new__create _hover01"
              id="btnCreate"
              onClick={handleCreate}
              disabled={isSubmitting}
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
