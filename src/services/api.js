const API_BASE_URL = "https://wedev-api.sky.pro/api";

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(url, options = {}) {
    const token = localStorage.getItem("token");
    const headers = {
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers,
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = { error: `Ошибка ${response.status}` };
    }

    if (!response.ok) {
      const errorMessage =
        data.error ||
        data.message ||
        (response.status === 400 && "Неверные данные") ||
        (response.status === 401 && "Требуется авторизация") ||
        (response.status === 404 && "Не найдено") ||
        `Ошибка: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  }
}

export const api = new Api(API_BASE_URL);
