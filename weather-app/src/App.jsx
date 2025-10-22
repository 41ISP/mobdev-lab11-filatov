import React, { useState } from "react";
import Weather from "./Weather.jsx";

export default function App() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [userLocation, setUserLocation] = useState(null);

 
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setSelectedCity(""); 
        },
        (error) => {
          console.error("Ошибка при получении местоположения:", error);
          alert("Не удалось получить местоположение. Разрешите доступ в браузере.");
        }
      );
    } else {
      alert("Геолокация не поддерживается вашим браузером.");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSelectedCity(city.trim());
      setUserLocation(null); 
    }
  };

  return (
    <div className="App">
      <h1>Погода</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Показать погоду</button>
      </form>

      <button onClick={getUserLocation}>Моё местоположение</button>

      {(selectedCity || userLocation) && (
        <Weather city={selectedCity} coords={userLocation} />
      )}
    </div>
  );
}