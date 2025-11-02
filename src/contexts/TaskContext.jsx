import { createContext, useState, useEffect, useCallback } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/kanbanApi";
import { useAuth } from "../hooks/useAuth";

const TaskContext = createContext(null);

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

      if (!tasksData || !Array.isArray(tasksData)) {
        setTasks([]);
        return;
      }

      const formattedTasks = tasksData.map((task) => {
        const date = new Date(task.date);
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          "0"
        )}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
          date.getFullYear()
        ).slice(-2)}`;

        let normalizedStatus = task.status || "БЕЗ СТАТУСА";
        const statusMap = {
          "Без статуса": "БЕЗ СТАТУСА",
          "Нужно сделать": "НУЖНО СДЕЛАТЬ",
          "В работе": "В РАБОТЕ",
          Тестирование: "ТЕСТИРОВАНИЕ",
          Готово: "ГОТОВО",
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
      await createTask(taskData);
      await loadTasks(); // Перезагружаем список задач
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateTaskById = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
      await loadTasks(); // Перезагружаем список задач
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks(); // Перезагружаем список задач
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
