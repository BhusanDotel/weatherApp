import React from "react";
import "./WeatherCard.css";

function WeatherCard(props) {
  const isVisible = props.isVisible;
  const noCityStatus = props.noCityStatus;

  return (
    <>
      {true ? (
        <div className="root">
          <div className="time-div">Updated @ {props.time}</div>
          <div style={isVisible} className="if-input-empty">
            City name is missing...
          </div>

          <div className="input-div">
            <img className="search-img" src="./images/search-icon.png" alt="" />
            <input
              onClick={props.hideMessage}
              autoComplete="off"
              type="text"
              onChange={props.handleChange}
              value={props._value}
              name={`${props._value}`}
              placeholder="Enter city Name"
            ></input>
            <button onClick={props.showData}>Show Weather</button>
          </div>

          <div className="display-div-all">
            {props.temp ? (
              noCityStatus && (
                <div className="city-not-found">No city found !!!</div>
              )
            ) : (
              <div className="city-not-found">Loading.....</div>
            )}

            {!noCityStatus && (
              <div className="display-div">
                <h3 className="country">{props.country}</h3>
                <h1 className="city">{props.r_city}</h1>
                <h1 className="temp">{props.temp}°C</h1>
                <img className="weather-img" src={props.icon} alt="" />
                <h3 className="condition">{props.condition}</h3>
                <div className="rain-and-cloud">
                  <h3 className="wind">Wind: {props.wind}</h3>
                  <h3 className="cloud">Cloud: {props.cloud}</h3>
                </div>
                <div className="humid-and-precep">
                  <p className="humid">Humid: {props.humidity}</p>
                  <p className="precep">Precep: {props.precep}</p>
                </div>
              </div>
            )}
          </div>
          <div className="patent-div">© Bhusan Dotel</div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default WeatherCard;
