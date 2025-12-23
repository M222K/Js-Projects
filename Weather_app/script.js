document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo=  document.getElementById("weather-info");
    const cityNameDisplay= document.getElementById("city-name");
    const tempratureDisplay= document.getElementById("temperature");
    const descriptionDisplay= document.getElementById("description");
    const errorDisplay = document.getElementById("error-message");

    const API_KEY ="b49b9b23661b7e504a28838193e6f24c";

    getWeatherBtn.addEventListener("click",async ()=>{
        const city=cityInput.value.trim();
        if(!city)return; // Do nothing if input is empty

        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }catch(error){
            displayError();
        }

    });

    async function fetchWeatherData(city){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response= await fetch(url); // returns a promise once it is resolved we get the response object
        console.log(typeof response);
        console.log(response);

        if(!response.ok){
            throw new error("City not found");
        }

        const data= await response.json(); // returns a promise once it is resolved we get the actual data
        return data;
    }

    function displayWeatherData(data){
        // display the data in the html elements
        console.log(data);
        //destructuring the data object to extract required info
        const {name,main,weather}=data; // main and weather are objects inside data object
        cityNameDisplay.textContent=`City:${name}`;
        tempratureDisplay.textContent=`Temperature: ${main.temp} °C`;
        descriptionDisplay.textContent=`Description:${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        errorDisplay.classList.add("hidden");

    }

    function displayError(){
        weatherInfo.classList.add("hidden");
        errorDisplay.classList.remove("hidden");
    }
})