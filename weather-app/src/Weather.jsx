import React, { useEffect, useState } from "react";

const API_KEY = "8fe041e7694cecdbda5e031afe77eefc";

export default function Weather({ city }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError("");
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric&lang=ru`;
        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok) {
          setError(json.message || `Ошибка ${res.status}`);
          setData(null);
        } else {
          setData(json);
        }
      } catch (err) {
        setError("Сетевая ошибка: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  if (loading) return <p className="loading">Загрузка...</p>;
  if (error) return <p className="error">Ошибка: {error}</p>;
  if (!data) return null;

  return (
    <div className="WeatherCard">
      <h2>{data.name}</h2>
      <p><strong>Температура:</strong> {data.main.temp} °C</p>
      <p><strong>Ощущается как:</strong> {data.main.feels_like} °C</p>
      <p><strong>Погода:</strong> {data.weather[0].description}</p>
      <p><strong>Ветер:</strong> {data.wind.speed} м/с</p>
      <p><strong>Влажность:</strong> {data.main.humidity} %</p>
      <p><strong>Давление:</strong> {data.main.pressure} hPa</p>
    </div>
  );
}