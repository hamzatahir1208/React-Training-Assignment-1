import { removeToken, getToken } from "../utils/auth";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function normaliseError(err, status = 0) {
  if (err && typeof err === "object" && "message" in err) {
    return { message: String(err.message), status, raw: err };
  }
  return { message: "An unexpected error occurred.", status, raw: err };
}

function handleUnauthorised() {
  removeToken();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

async function request(path, opts = {}) {
  const {
    method = "GET",
    headers: extraHeaders = {},
    body,
    auth = true,
  } = opts;

  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const fetchOptions = { method, headers };
  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, fetchOptions);
  } catch (networkErr) {
    throw normaliseError(
      { message: "Network error" },
      0,
    );
  }

  if (response.status === 401) {
    handleUnauthorised();
    throw normaliseError(
      { message: "Session expired. Please log in again." },
      401,
    );
  }

  let data;
  const contentType = response.headers.get("Content-Type") ?? "";
  try {
    data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && data.message) ||
      `Request failed with status ${response.status}`;
      console.log(response);
    throw normaliseError({ message }, response.status);
  }

  return data;
}

const apiClient = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

export default apiClient;
