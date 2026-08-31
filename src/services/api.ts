import { Cookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_URL;
const cookies = new Cookies();

async function api<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = cookies.get<string>("accessToken");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Backend error:", errorBody);

    throw new Error(
      `API Error ${response.status}: ${errorBody}`
    );
  }

  return response.json();
}

export default api;
