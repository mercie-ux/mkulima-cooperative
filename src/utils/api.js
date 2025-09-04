// src/utils/api.js
const API_BASE = import.meta.env.VITE_API_BASE + "/api";

// Helper to get token (from localStorage or sessionStorage)
const getToken = () => {
  return localStorage.getItem("token");
};

export const api = async (endpoint, options = {}) => {
  try {
    const token = getToken();

    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // auto attach token
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

// Shorthand helpers
export const get = (endpoint, options) =>
  api(endpoint, { method: "GET", ...options });

export const post = (endpoint, body, options) =>
  api(endpoint, { method: "POST", body: JSON.stringify(body), ...options });

export const put = (endpoint, body, options) =>
  api(endpoint, { method: "PUT", body: JSON.stringify(body), ...options });

export const del = (endpoint, options) =>
  api(endpoint, { method: "DELETE", ...options });
// Crops API helpers
export const getCrops = () => get("/mycrops");
export const addCrop = (crop) => post("/mycrops", crop);
export const updateCrop = (id, data) => put(`/mycrops/${id}`, data);
export const deleteCrop = (id) => del(`/mycrops/${id}`);

// Farmers API helpers
export const getFarmers = () => get("/farmers");
export const addFarmer = (farmer) => post("/farmers", farmer);
export const updateFarmer = (id, data) => put(`/farmers/${id}`, data);
export const deleteFarmer = (id) => del(`/farmers/${id}`);