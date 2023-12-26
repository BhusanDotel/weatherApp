import React from "react";
import WeatherCard from "./assets/WeatherCard";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = React.useState({});
  const [city, setCity] = React.useState("");
  const [cityInput, setCityInput] = React.useState("");
  const [defaultCity, setDefaultCity] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState({ visibility: "hidden" });
  const [noCityStatus, setNoCityStatus] = React.useState(false);

  function handleChange(event) {
    setCityInput(event.target.value);
  }

  function showData() {
    cityInput !== ""
      ? setCount((prevNum) => {
          return prevNum + 1;
        })
      : setIsVisible({ visibility: "visible" });

    setTimeout(() => {
      setIsVisible({ visibility: "hidden" });
    }, 2000);
  }

  function hideMessage() {
    setIsVisible({ visibility: "hidden" });
  }

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const _city = `${latitude},${longitude}`;
        setDefaultCity(_city);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [defaultCity]);

  React.useEffect(() => {
    if (cityInput !== "") {
      setCity(cityInput);
    } else if (cityInput === "") {
      if (defaultCity) {
        setCity(defaultCity);
      }
    }
    async function getWeatherData() {
      await axios
        .post("https://bhusanweatherbe.onrender.com/api/weatherdata", { city })
        .then((res) => {
          if (res.data) {
            if (res.data === "no city found") {
              setNoCityStatus(true);
            } else {
              const rData = res.data;
              let _data = { ...data };
              _data.r_city = rData.location.name;
              _data.country = rData.location.country;
              _data.temp = rData.current.temp_c;
              _data.condition = rData.current.condition.text;
              _data.time = rData.location.localtime;
              _data.wind = rData.current.wind_kph;
              _data.pressure = rData.current.pressure_in;
              _data.cloud = rData.current.cloud;
              _data.humidity = rData.current.humidity;
              _data.precep = rData.current.precip_mm;
              _data.icon = rData.current.condition.icon;

              setData(_data);
              setNoCityStatus(false);
              setCityInput("");
            }
          }
        });
    }
    getWeatherData();
  }, [count, city, defaultCity]);

  return (
    <main>
      {true && (
        <WeatherCard
          time={data.time}
          isVisible={isVisible}
          hideMessage={hideMessage}
          handleChange={handleChange}
          _value={cityInput}
          showData={showData}
          noCityStatus={noCityStatus}
          country={data.country}
          r_city={data.r_city}
          temp={data.temp}
          icon={data.icon}
          condition={data.condition}
          wind={data.wind}
          cloud={data.cloud}
          humidity={data.humidity}
          precep={data.precep}
        />
      )}
    </main>
  );
}

export default App;
