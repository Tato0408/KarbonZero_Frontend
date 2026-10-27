// URLs de las APIs. Se pueden cambiar con un archivo .env.local (ver .env.example):
// VITE_API_URL apunta a la API institucional y VITE_API_GLOBAL_URL a la API central.
// Deben terminar en "/", porque los servicios concatenan la ruta directamente.
export const APIURL = import.meta.env.VITE_API_URL ?? "http://localhost:8081/"
export const APIGLOBAL = import.meta.env.VITE_API_GLOBAL_URL ?? "http://localhost:8080/"
