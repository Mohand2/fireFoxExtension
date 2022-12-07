import { useState, useEffect } from 'react';
import './app.css';

function App() {
  const [weather, setweather] = useState([]);

  useEffect(() => {
    const API_URL =
      'https://api.open-meteo.com/v1/forecast?latitude=36.76&longitude=3.15&daily=temperature_2m_min&timezone=Europe%2FLondon';

    async function fetchWeather() {
      const response = await fetch(API_URL);
      const data = await response.json();

      const daysAndT = getDaysAndTemp(
        data.daily.time,
        data.daily.temperature_2m_min,
        data.daily_units.temperature_2m_min
      );
      setweather(daysAndT);
    }
    fetchWeather();
  }, []);

  function getDaysAndTemp(days, temp, unit) {
    return days.map((date, index) => {
      return { day: getDay(date), date: date, temp: temp[index], unit: unit };
    });
  }

  function getDay(date) {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const d = new Date(date);
    const day = weekday[d.getDay()];
    return day;
  }

  const loading = <div>Loading...</div>;

  return (
    <div className="weather">
      <h1>Mchedallah</h1>
      {weather.length
        ? weather.map((day, index) => (
            <div className="weather-card" key={index}>
              <p>{day.day}</p>
              <p>{day.date}</p>
              <p>
                {day.temp} <spna>{day.unit}</spna>{' '}
              </p>
            </div>
          ))
        : loading}
    </div>
  );
}

export default App;
