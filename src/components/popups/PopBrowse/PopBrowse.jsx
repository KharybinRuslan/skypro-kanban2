import "./PopBrowse.css";
import Calendar from "../../Calendar/Calendar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTaskById } from "../../../services/kanbanApi";
import { useTasks } from "../../../hooks/useTasks";

function PopBrowse({ id }) {
  const navigate = useNavigate();
  const { updateTaskById, removeTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Research");
  const [status, setStatus] = useState("Без статуса");
  const [date, setDate] = useState(new Date().toISOString());
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const task = await getTaskById(id);
        if (!isMounted) return;
        setTitle(task.title || "");
        setDescription(task.description || "");
        setTopic(task.topic || "Research");
        setStatus(task.status || "Без статуса");
        setDate(task.date || new Date().toISOString());
      } catch (e) {
        if (!isMounted) return;
        setError(e.message || "Ошибка загрузки задачи");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    const result = await updateTaskById(id, { title, description, topic, status, date });
    if (result.success) {
      setIsEdit(false);
      navigate("/");
    } else {
      setError(result.error || "Не удалось сохранить изменения");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
    const result = await removeTask(id);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Не удалось удалить задачу");
    }
  };

  const handleClose = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    navigate("/");
  };

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              {isEdit ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    border: "1px solid #d4dbe5",
                    borderRadius: "8px",
                    padding: "8px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                  placeholder="Название задачи"
                />
              ) : (
                <h3 className="pop-browse__ttl">
                  {loading ? "Загрузка..." : title || "Без названия"}
                </h3>
              )}
              <div
                className={`categories__theme theme-top ${
                  topic === "Web Design"
                    ? "_orange _active-category"
                    : topic === "Research"
                    ? "_green _active-category"
                    : topic === "Copywriting"
                    ? "_purple _active-category"
                    : "_orange"
                }`}
                onClick={() => {
                  if (isEdit) {
                    if (topic === "Web Design") setTopic("Research");
                    else if (topic === "Research") setTopic("Copywriting");
                    else setTopic("Web Design");
                  }
                }}
                style={{ cursor: isEdit ? "pointer" : "default" }}
              >
                <p
                  className={
                    topic === "Web Design"
                      ? "_orange"
                      : topic === "Research"
                      ? "_green"
                      : "_purple"
                  }
                  style={{ cursor: "pointer" }}
                >
                  {topic}
                </p>
              </div>
            </div>
            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                <div
                  className={`status__theme ${
                    status === "Без статуса" ? "_gray" : ""
                  }`}
                  onClick={() => isEdit && setStatus("Без статуса")}
                  style={{ cursor: isEdit ? "pointer" : "default" }}
                >
                  <p>Без статуса</p>
                </div>
                <div
                  className={`status__theme ${
                    status === "Нужно сделать" ? "_gray" : ""
                  }`}
                  onClick={() => isEdit && setStatus("Нужно сделать")}
                  style={{ cursor: isEdit ? "pointer" : "default" }}
                >
                  <p className={status === "Нужно сделать" ? "_gray" : ""}>
                    Нужно сделать
                  </p>
                </div>
                <div
                  className={`status__theme ${
                    status === "В работе" ? "_gray" : ""
                  }`}
                  onClick={() => isEdit && setStatus("В работе")}
                  style={{ cursor: isEdit ? "pointer" : "default" }}
                >
                  <p>В работе</p>
                </div>
                <div
                  className={`status__theme ${
                    status === "Тестирование" ? "_gray" : ""
                  }`}
                  onClick={() => isEdit && setStatus("Тестирование")}
                  style={{ cursor: isEdit ? "pointer" : "default" }}
                >
                  <p>Тестирование</p>
                </div>
                <div
                  className={`status__theme ${
                    status === "Готово" ? "_gray" : ""
                  }`}
                  onClick={() => isEdit && setStatus("Готово")}
                  style={{ cursor: isEdit ? "pointer" : "default" }}
                >
                  <p>Готово</p>
                </div>
              </div>
            </div>
            <div className="pop-browse__wrap">
              <form
                className="pop-browse__form form-browse"
                id="formBrowseCard"
                action="#"
              >
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    name="text"
                    id="textArea01"
                    readOnly={!isEdit}
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </form>
              <Calendar onDateChange={setDate} selectedDate={date} />
            </div>
            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div
                  className={`categories__theme _orange ${
                    topic === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() => isEdit && setTopic("Web Design")}
                  style={{ cursor: isEdit ? "pointer" : "default" }}
                >
                  <p className="_orange" style={{ cursor: "pointer" }}>
                    Web Design
                  </p>
                </div>
                <div
                  className={`categories__theme _green ${
                    topic === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => isEdit && setTopic("Research")}
                  style={{ cursor: isEdit ? "pointer" : "default" }}
                >
                  <p className="_green" style={{ cursor: "pointer" }}>
                    Research
                  </p>
                </div>
                <div
                  className={`categories__theme _purple ${
                    topic === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() => isEdit && setTopic("Copywriting")}
                  style={{ cursor: isEdit ? "pointer" : "default" }}
                >
                  <p className="_purple" style={{ cursor: "pointer" }}>
                    Copywriting
                  </p>
                </div>
              </div>
            </div>
            {error ? (
              <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
            ) : null}
            <div
              className={`pop-browse__btn-browse ${isEdit ? "_hide" : ""}`}
            >
              <div className="btn-group">
                <button
                  className="btn-browse__edit _btn-bor _hover03"
                  onClick={() => setIsEdit(true)}
                >
                  <a href="#">Редактировать задачу</a>
                </button>
                <button
                  className="btn-browse__delete _btn-bor _hover03"
                  onClick={handleDelete}
                >
                  <a href="#">Удалить задачу</a>
                </button>
              </div>
              <button
                className="btn-browse__close _btn-bg _hover01"
                onClick={handleClose}
              >
                <a href="#">Закрыть</a>
              </button>
            </div>
            <div className={`pop-browse__btn-edit ${!isEdit ? "_hide" : ""}`}>
              <div className="btn-group">
                <button
                  className="btn-edit__edit _btn-bg _hover01"
                  onClick={handleSave}
                >
                  <a href="#">Сохранить</a>
                </button>
                <button
                  className="btn-edit__edit _btn-bor _hover03"
                  onClick={() => setIsEdit(false)}
                >
                  <a href="#">Отменить</a>
                </button>
                <button
                  className="btn-edit__delete _btn-bor _hover03"
                  id="btnDelete"
                  onClick={handleDelete}
                >
                  <a href="#">Удалить задачу</a>
                </button>
              </div>
              <button
                className="btn-edit__close _btn-bg _hover01"
                onClick={handleClose}
              >
                <a href="#">Закрыть</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopBrowse;
