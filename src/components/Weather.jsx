import React from 'react'
import "./weather.css"
import Search_icon from "../assets/Assets/search.png"
import Cloud from "../assets/Assets/cloud.png"
import Drizzle from "../assets/Assets/drizzle.png"
import Rain from "../assets/Assets/rain.png"
import Snow from "../assets/Assets/snow.png"
import Clear from "../assets/Assets/clear.png"
import Humidity from "../assets/Assets/humidity.png"
import Wind from "../assets/Assets/wind.png"


const Weather = () => {

    const [weatherData,setWeatherData] = React.useState(false)

    const inputRef = React.useRef()

    const allIcons = {
       "01d" : Clear,
       "01n" : Clear,
       "02d" : Cloud,
       "02n" : Cloud,
       "03d" : Cloud,
       "03n" : Cloud,
       "04d" : Drizzle,
       "04n" : Drizzle,
       "09d" : Rain,
       "09n" : Rain,
       "10d" : Rain,
       "10n" : Rain,
       "13d" : Snow,
       "13n" : Snow
    }

    const search = async (city) => {
        if(city === ""){
            alert("Enter city name");
            return;
        }
        try{
            const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);

            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;

            console.log(data.weather[0].icon)

            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temprature:Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })


        } catch(error){
            setWeatherData(false)
            console.error("Error in fetching weather data")
        }
    }
    React.useEffect(()=>{
        search("London")
    },[])

  return (
    <div className='weather'>
        <div className="searchbar">
            <input type="text" placeholder='Search' ref={inputRef} />
            <img src={Search_icon} alt="Search-icon" onClick={() => search(inputRef.current.value)}/>
        </div>
        {weatherData?
            <>
                <img src={weatherData.icon} className='weather-icon' alt="weather_condition"/>
                <p className= 'Temprature'>{weatherData.temprature}°C</p>
                <p className='Location'>{weatherData.location}</p>
                <div className='weatherData'>
                    <div className='col'>
                        <img src={Humidity} alt="humidity-description"/>
                        <div>
                            <p>{weatherData.humidity}</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={Wind} alt="wind-description"/>
                        <div>
                            <p>{weatherData.windSpeed}</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </> : <></>
        }
        
    </div>
  )
}

export default Weather
