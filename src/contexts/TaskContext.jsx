import { createContext, useState, useEffect, useCallback } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/kanbanApi";
import { useAuth } from "../hooks/useAuth";

const TaskContext = createContext(null);

const STATUS_ALIASES = {
  "без статуса": "БЕЗ СТАТУСА",
  "Без статуса": "БЕЗ СТАТУСА",
  "нужно сделать": "НУЖНО СДЕЛАТЬ",
  "Нужно сделать": "НУЖНО СДЕЛАТЬ",
  "в работе": "В РАБОТЕ",
  "В работе": "В РАБОТЕ",
  тестирование: "ТЕСТИРОВАНИЕ",
  Тестирование: "ТЕСТИРОВАНИЕ",
  готово: "ГОТОВО",
  Готово: "ГОТОВО",
};

const DEFAULT_STATUS = "БЕЗ СТАТУСА";
const DEFAULT_TOPIC = "Research";

const sanitizeTaskPayload = (payload = {}) => {
  const sanitized = { ...payload };

  if (typeof sanitized.title === "string") {
    sanitized.title = sanitized.title.trim();
  }

  if (typeof sanitized.description === "string") {
    sanitized.description = sanitized.description.trim();
  }

  if (typeof sanitized.topic === "string") {
    sanitized.topic = sanitized.topic.trim();
  }

  if (typeof sanitized.status === "string") {
    sanitized.status = sanitized.status.trim();
  }

  if (typeof sanitized.date === "string" && sanitized.date.trim() === "") {
    delete sanitized.date;
  }

  return sanitized;
};

const formatTaskDate = (rawDate) => {
  if (!rawDate) {
    return "Без срока";
  }

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return "Без срока";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
};

const normalizeStatus = (status) => {
  if (typeof status !== "string") {
    return DEFAULT_STATUS;
  }

  const trimmedStatus = status.trim();
  const normalized =
    STATUS_ALIASES[trimmedStatus] ||
    STATUS_ALIASES[trimmedStatus.toLowerCase()];

  return normalized || trimmedStatus.toUpperCase();
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuth } = useAuth();

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const tasksData = await getTasks();

      if (!Array.isArray(tasksData)) {
        setTasks([]);
        return;
      }

      const formattedTasks = tasksData.map((task) => ({
        id: task._id,
        title: task.title?.trim() || "Без названия",
        topic: task.topic || DEFAULT_TOPIC,
        date: formatTaskDate(task.date),
        status: normalizeStatus(task.status),
        description: task.description?.trim() || "",
      }));

      setTasks(formattedTasks);
    } catch (err) {
      setError(err.message || "Ошибка загрузки задач");
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [isAuth, loadTasks]);

  const addTask = async (taskData) => {
    try {
      await createTask(sanitizeTaskPayload(taskData));
      await loadTasks();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateTaskById = async (id, taskData) => {
    try {
      await updateTask(id, sanitizeTaskPayload(taskData));
      await loadTasks();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        loadTasks,
        addTask,
        updateTaskById,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext };
