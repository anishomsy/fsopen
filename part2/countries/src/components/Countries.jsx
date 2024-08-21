import { useState } from "react";
import { getWeather } from "../services/Weather";
import { useEffect } from "react";

export function CountryInfo({ country }) {
  const languages = country.languages;
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
      </div>
      <div>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
      </div>
      <div>
        <h1>Languages</h1>
        <ul>
          {Object.values(languages).map((value, id) => (
            <li key={id}>{value}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <div>
        <Weather country={country} />
      </div>
    </>
  );
}

export function Weather({ country }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const capital = country.capital;
    getWeather(capital).then((data) => setWeatherData(data));
  }, []);

  if (weatherData === null) {
    return null;
  }

  return (
    <>
      <h1>Weather in {country.capital}</h1>
      <p>
        temperature(actual):{" "}
        {weatherData.current_condition[0].temp_C + " Celcius"}
      </p>

      <p>
        temperature(feels like):{" "}
        {weatherData.current_condition[0].FeelsLikeC + " Celcius"}
      </p>
      <p>wind: {weatherData.current_condition[0].windspeedKmph + " km/h"} </p>
    </>
  );
}
