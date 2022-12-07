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
        data.daily.temperature_2m_min
      );
      console.log(daysAndT[0].temp);
    }
    fetchWeather();
  }, []);

  function getDaysAndTemp(days, temp) {
    return days.map((date, index) => {
      return { date: date, temp: temp[index] };
    });
  }

  const loading = <div>Loading...</div>;

  console.log(weather.daily);

  return <p>test</p>;

  // <div className="App">{weather ? weather.daily : loading}</div>;
}

export default App;
