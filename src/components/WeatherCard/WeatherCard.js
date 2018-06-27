import React from 'react';
import GoogleMap from './GoogleMap/GoogleMap';

import sunriseIcon from './sunrise.png';
import sunsetIcon from './sunset.png';
import temperatureIcon from './temperature.png';
import windIcon from './wind.png';
import cloudsIcon from './clouds.png';
import pressureIcon from './pressure.png';

import './WeatherCard.css';

const WeatherCard = ({name, country, single, sunrise, sunset, temp, wind, clouds, pressure, lon, lat, description}) => {

return (
    
    <div className={single + " weather-card"}>
     <h2>{name} ({country})</h2>
     
     

     <div className="sun-details">
      <img className="icon-sunrise" src={sunriseIcon} alt="sunrise" /> <p className="val-sunrise">{sunrise} UCT</p>
      <img className="icon-sunset" src={sunsetIcon} alt="sunset" /> <p className="val-sunset">{sunset} UCT</p>
     </div>
     <h4>"{description}"</h4>
     

     <div className="weather-details"> 

      <img className="icon-1" src={temperatureIcon} alt="temperature" /> <p className="val-1">{temp -273} ℃</p>
      <img className="icon-2" src={windIcon} alt="wind" /> <p className="val-2">{wind} m/s</p>
      <img className="icon-3" src={cloudsIcon} alt="clouds" /> <p className="val-3">{clouds} %</p>
      <img className="icon-4" src={pressureIcon} alt="pressure" /><p className="val-4">{pressure} hpa</p>
    

     </div>
     <GoogleMap lon={lon} lat={lat} />
    </div>
    
);
}

export default WeatherCard;

