import { useState, useEffect } from 'react';
import './app.css';

function App() {
  const [weather, setweather] = useState([]);
  const [location] = useState({
    lat: 36.76,
    long: 3.15,
  });
  // const [city, setcity] = useState('paris');
  const [isLoading, setisLoading] = useState(true);

  // fetch api
  useEffect(() => {
    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.long}&daily=temperature_2m_min&timezone=Europe%2FLondon`;

    async function fetchWeather() {
      setisLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();

      const daysAndT = getDaysAndTemp(
        data.daily.time,
        data.daily.temperature_2m_min,
        data.daily_units.temperature_2m_min
      );
      setweather(daysAndT);
      setisLoading(false);
    }
    fetchWeather();
  }, []);

  function getDaysAndTemp(days, temp, unit) {
    return days.map((date, index) => {
      return {
        day: getDay(date),
        date: date,
        temp: Math.round(temp[index]),
        unit: unit,
      };
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
      <h2>Mchedallah</h2>
      {!isLoading
        ? weather.map((day, index) => (
            <div className="weather-card" key={index}>
              <div className="weather-leading">
                <p>{day.day}</p>
                <p className="date">{day.date}</p>
              </div>
              <p>
                <span>{day.temp}</span>
                {day.unit}
              </p>
            </div>
          ))
        : loading}
    </div>
  );
}

export default App;
