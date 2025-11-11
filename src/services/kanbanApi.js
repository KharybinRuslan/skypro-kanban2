import { api } from "./api";

export const getTasks = async () => {
  const response = await api.request("/kanban");
  return response.tasks;
};

export const getTaskById = async (id) => {
  const response = await api.request(`/kanban/${id}`);
  return response.task;
};

export const createTask = async (taskData) => {
  const response = await api.request("/kanban", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
  return response.tasks;
};

export const updateTask = async (id, taskData) => {
  const response = await api.request(`/kanban/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
  return response.tasks;
};

export const deleteTask = async (id) => {
  const response = await api.request(`/kanban/${id}`, {
    method: "DELETE",
  });
  return response.tasks;
};

