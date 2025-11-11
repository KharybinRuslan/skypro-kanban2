import "./PopBrowse.css";
import Calendar from "../../Calendar/Calendar";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getTaskById } from "../../../services/kanbanApi";
import { useTasks } from "../../../hooks/useTasks";
import Loader from "../../Loader/Loader";

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

const getNormalizedStatus = (value) => {
  if (!value) {
    return STATUS_OPTIONS[0];
  }

  const match = STATUS_OPTIONS.find(
    (option) => option.toLowerCase() === value.toLowerCase(),
  );
  return match || STATUS_OPTIONS[0];
};

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
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchTask = async () => {
      setLoading(true);
      setError("");
      try {
        const task = await getTaskById(id);
        if (!isMounted) {
          return;
        }
        setTitle(task?.title || "");
        setDescription(task?.description || "");
        setTopic(task?.topic || "Research");
        setStatus(getNormalizedStatus(task?.status));
        setDate(task?.date || new Date().toISOString());
      } catch (e) {
        if (!isMounted) {
          return;
        }
        setError(e.message || "Ошибка загрузки задачи");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTask();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSave = async (e) => {
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

    setIsSaving(true);
    const result = await updateTaskById(id, {
      title: trimmedTitle,
      description: trimmedDescription,
      topic,
      status,
      date,
    });
    setIsSaving(false);

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
    setIsDeleting(true);
    const result = await removeTask(id);
    setIsDeleting(false);
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

  const isActionDisabled = isSaving || isDeleting;
  const canSave =
    isEdit && title.trim() && description.trim() && !isSaving && !loading;

  const topicClassName = useMemo(() => {
    const match = TOPIC_OPTIONS.find((option) => option.value === topic);
    return match ? match.colorClass : "_orange";
  }, [topic]);

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            {loading ? (
              <div className="pop-browse__loader">
                <Loader label="Загружаем задачу" />
              </div>
            ) : (
              <>
                <div className="pop-browse__top-block">
                  {isEdit ? (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="pop-browse__title-input"
                      placeholder="Название задачи"
                      autoFocus
                    />
                  ) : (
                    <h3 className="pop-browse__ttl">
                      {title || "Без названия"}
                    </h3>
                  )}
                  <button
                    type="button"
                    className={`categories__theme theme-top ${topicClassName} ${
                      isEdit ? "_active-category" : ""
                    }`}
                    onClick={() => {
                      if (!isEdit) {
                        return;
                      }
                      const currentIndex = TOPIC_OPTIONS.findIndex(
                        (option) => option.value === topic,
                      );
                      const nextIndex =
                        (currentIndex + 1) % TOPIC_OPTIONS.length;
                      setTopic(TOPIC_OPTIONS[nextIndex].value);
                    }}
                    disabled={!isEdit}
                  >
                    <span className={topicClassName}>{topic}</span>
                  </button>
                </div>
                <div className="pop-browse__status status">
                  <p className="status__p subttl">Статус</p>
                  <div className="status__themes">
                    {STATUS_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`status__theme ${
                          status === option ? "_gray" : ""
                        }`}
                        onClick={() => isEdit && setStatus(option)}
                        disabled={!isEdit}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pop-browse__wrap">
                  <form
                    className="pop-browse__form form-browse"
                    id="formBrowseCard"
                    onSubmit={handleSave}
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
                  <Calendar
                    onDateChange={(selectedDate) =>
                      isEdit && setDate(selectedDate)
                    }
                    selectedDate={date}
                  />
                </div>
                <div className="theme-down__categories theme-down">
                  <p className="categories__p subttl">Категория</p>
                  <div className="categories__themes">
                    {TOPIC_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`categories__theme ${option.colorClass} ${
                          topic === option.value ? "_active-category" : ""
                        }`}
                        onClick={() => isEdit && setTopic(option.value)}
                        disabled={!isEdit}
                      >
                        <span className={option.colorClass}>
                          {option.value}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {error ? (
                  <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
                ) : null}
              </>
            )}
            <div
              className={`pop-browse__btn-browse ${
                isEdit || loading ? "_hide" : ""
              }`}
            >
              <div className="btn-group">
                <button
                  type="button"
                  className="btn-browse__edit _btn-bor _hover03"
                  onClick={() => setIsEdit(true)}
                >
                  Редактировать задачу
                </button>
                <button
                  type="button"
                  className="btn-browse__delete _btn-bor _hover03"
                  onClick={handleDelete}
                  disabled={isActionDisabled}
                >
                  {isDeleting ? "Удаление..." : "Удалить задачу"}
                </button>
              </div>
              <button
                type="button"
                className="btn-browse__close _btn-bg _hover01"
                onClick={handleClose}
              >
                Закрыть
              </button>
            </div>
            <div
              className={`pop-browse__btn-edit ${
                !isEdit || loading ? "_hide" : ""
              }`}
            >
              <div className="btn-group">
                <button
                  type="submit"
                  className="btn-edit__edit _btn-bg _hover01"
                  form="formBrowseCard"
                  disabled={!canSave}
                >
                  {isSaving ? "Сохранение..." : "Сохранить"}
                </button>
                <button
                  type="button"
                  className="btn-edit__edit _btn-bor _hover03"
                  onClick={() => setIsEdit(false)}
                  disabled={isSaving}
                >
                  Отменить
                </button>
                <button
                  type="button"
                  className="btn-edit__delete _btn-bor _hover03"
                  id="btnDelete"
                  onClick={handleDelete}
                  disabled={isActionDisabled}
                >
                  {isDeleting ? "Удаление..." : "Удалить задачу"}
                </button>
              </div>
              <button
                type="button"
                className="btn-edit__close _btn-bg _hover01"
                onClick={handleClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopBrowse;

