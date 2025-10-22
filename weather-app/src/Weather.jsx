import React, { useEffect, useState } from "react";

const API_KEY = "8fe041e7694cecdbda5e031afe77eefc";

export default function Weather({ city, coords }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      if (!city && !coords) return;

      setLoading(true);
      setError("");

      try {
        let url = "";

        if (coords) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric&lang=ru`;
        } else if (city) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=${API_KEY}&units=metric&lang=ru`;
        }

        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok) {
          setError(json.message || `Ошибка ${res.status}`);
          setData(null);
        } else {
          setData(json);
        }
      } catch (err) {
        setError("Ошибка сети: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, coords]);

  if (loading) return <p className="loading">Загрузка...</p>;
  if (error) return <p className="error">Ошибка: {error}</p>;
  if (!data) return null;



  return (
    <div className="WeatherCard">
      <h2>{data.name}</h2>

      <div className="weather-main">
        <div className="temp-info">
          <p className="temp">{Math.round(data.main.temp)}°C</p>
          <p className="desc">{data.weather[0].description}</p>
        </div>
      </div>

      <div className="details">
        <p><strong>Ощущается как:</strong> {Math.round(data.main.feels_like)} °C</p>
        <p><strong>Ветер:</strong> {data.wind.speed} м/с</p>
        <p><strong>Влажность:</strong> {data.main.humidity} %</p>
        <p><strong>Давление:</strong> {data.main.pressure} hPa</p>
      </div>
    </div>
  );
}