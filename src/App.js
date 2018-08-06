import React, { Component } from 'react';
import cityList from './current.city.list.min.json';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Loading from './components/Loading/Loading';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      weather: []
    }
  }

  searchTrigger = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.filterCities, 1000);
  }

  filterCities = () => {
    this.setState({weather: []});
    let finalCitiesArray = [];
    let filteredCities = [];
    const city = document.getElementById("search").value;

    if (city.includes(" ")) {
      filteredCities = cityList.filter(result => {
       return result.name.toLowerCase().includes(city.toLowerCase());
    });

    this.adjustCities(filteredCities, finalCitiesArray, city);
    this.apiRequest(finalCitiesArray);
    }

    else if (city === "") {
      return null;
    }

    // Ensures the match in the first word of city name
    else {
       filteredCities = cityList.filter(result => {
        return result.name.toLowerCase().split(" ")[0]
        .substring(0, city.length)
        .includes(city.toLowerCase());
      })

      this.adjustCities(filteredCities, finalCitiesArray, city);   
      this.apiRequest(finalCitiesArray);
    }  
  }

  adjustCities = (filteredCities, finalCitiesArray, city) => {
   // First check for exact match and length of 4 items
     for (let i = 0; i < filteredCities.length; i++) {
        if (finalCitiesArray.length < 4 && filteredCities[i].name.toLowerCase() === city.toLowerCase()) {
          finalCitiesArray.push(filteredCities[i]);  
        }
      }

    let finalCitiesArrayIDs = finalCitiesArray.map((value) => value.id);

   // Second check if searched query is included - only 4 items altogether allowed
     for (let i = 0; i < filteredCities.length; i++) {
        if (finalCitiesArray.length < 4 && finalCitiesArrayIDs.includes(filteredCities[i].id) === false ) {
          finalCitiesArray.push(filteredCities[i]);
        }
      } 
  }

  apiRequest = async (finalCitiesArray) => {
    const weatherArrayPromises = await  finalCitiesArray.map((item) => {
      return (fetch("https://api.openweathermap.org/data/2.5/weather?id="+item.id+"&appid=8c88d485c3fb703d14d57e7e5b22d18b")
      .then(response => {
        return response.json();
      }))
    })
    const weatherArray = await Promise.all(weatherArrayPromises);

    // Simulates conditional rendering based on number of results
    if (weatherArray.length === 1) {
      weatherArray[0].single = "single";
    } else if (weatherArray.length === 3) {
      weatherArray[2].single = "single";
    }

    this.setState({weather: weatherArray});
  }

  getSunTime = (unix_timestamp) => {
    const date = new Date(unix_timestamp*1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedDate = hours + ':' + minutes.substr(-2);
    return formattedDate;
  }

  render() {

    const {weather} = this.state;

    let weatherResults = weather.map((item) => {
      item.main.temp = Math.round(item.main.temp);
      
      let sunrise = this.getSunTime(item.sys.sunrise);
      let sunset = this.getSunTime(item.sys.sunset);

      return <WeatherCard key={item.id} name={item.name} temp={item.main.temp} country={item.sys.country}
      clouds={item.clouds.all} wind={item.wind.speed} pressure={item.main.pressure} sunrise={sunrise} sunset={sunset}
      description={item.weather[0].description} lat={item.coord.lat} lon={item.coord.lon} single={item.single} />});
 
    return (
      <div className="App">
      <h2 className="heading">Weather Today</h2>
      <input id="search" type="text" placeholder="Search City Name.." onKeyUp={this.searchTrigger}></input>
      {weatherResults.length > 0 ? weatherResults : <Loading />}
      </div>
    );
  }
}

export default App;
