const apiKey = "a44b2d42b49f0fdd5fee4c3dbe1a2e1d";  // Replace with your OpenWeatherMap API Key

document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("city").value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  
  
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("errorMessage").textContent = "City not found!";
                document.getElementById("cityName").textContent = "";
                document.getElementById("weatherDescription").textContent = "";
                document.getElementById("temperature").textContent = "";
                document.getElementById("weatherIcon").src = "";
                document.getElementById("forecastData").innerHTML = "";
            } else {
                document.getElementById("errorMessage").textContent = "";
                displayWeather(data);
                getForecast(data.coord.lat, data.coord.lon);
            }
        })
        .catch(error => {
            document.getElementById("errorMessage").textContent = "Error fetching data!";
        });
}

function displayWeather(data) {
    document.getElementById("cityName").textContent = data.name + ", " + data.sys.country;
    document.getElementById("weatherDescription").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}

function getForecast(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const forecast = data.daily.slice(1, 4); // Get the next 3 days
            let forecastHTML = "";
            forecast.forEach((day, index) => {
                forecastHTML += `
                    <tr>
                        <td>Day ${index + 1}</td>
                        <td>${day.temp.day}°C</td>
                        <td>${day.weather[0].description}</td>
                    </tr>
                `;
            });
            document.getElementById("forecastData").innerHTML = forecastHTML;
        })
        .catch(error => {
            document.getElementById("errorMessage").textContent = "Error fetching forecast!";
        });
}
