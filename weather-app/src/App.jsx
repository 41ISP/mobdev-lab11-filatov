import React, { useState } from "react";
import Weather from "./Weather.jsx";

export default function App() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSelectedCity(city.trim());
    }
  };

  return (
    <div className="App">
      <h1>Погода по городу</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Показать погоду</button>
      </form>

      {selectedCity && <Weather city={selectedCity} />}
    </div>
  );
}