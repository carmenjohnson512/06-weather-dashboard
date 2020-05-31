    const inputEl = $("#city-input");
    const searchEl = $("#search-button");
    const clearEl = $("#clear-history");
    const nameEl = $("#city-name");
    const dateEl = $("#current-date");
    const currentPicEl = $("#current-pic");
    const currentTempEl = $("#temperature");
    const currentHumidityEl = $("#humidity");4
    const currentWindEl = $("#wind-speed");
    const currentUVEl = $("#UV-index");
    const historyEl = $("#history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    // console.log(searchHistory);
    

    const APIKey = "0dd903385007dcf679d5824d5b9e348c";
//  When search button is clicked, read the city name typed by the user

    function getWeather(cityName) {
//  Using saved city name, execute a current condition get request from open weather map api
       let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
    //    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=austin&units=imperial&appid=0dd903385007dcf679d5824d5b9e348c'
     
       $.ajax({
        url: queryURL,
        method: "GET"
       }).then(function(response){
            // console.log('this is the wetahter data',response);
            // console.log('temp', response.main.temp)
            // console.log('humidity', response.main.humidity)
            // console.log('wind speed', response.wind.speed)
            nameEl.text(response.name)
            dateEl.text(moment().format('MMMM Do YYYY'))
            currentPicEl.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            currentTempEl.text("Temperature: " + response.main.temp + " Farenheit");
            currentHumidityEl.text("Humidity: " + response.main.humidity + "%");
            currentWindEl.text("Wind Speed: " + response.wind.speed + " MPH");
            getUVIndex(cityName);
            forecast(cityName);
        });
        
        function getUVIndex () {
            let lat = response.lat;
            let lon = response.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0dd903385007dcf679d5824d5b9e348c&lat=" + lat + "&lon=" + lon;
            $.ajax({
                url: UVQueryURL,
                method: "GET"
            }).then(function(response){
                    let UVIndex = $("<span>");
                    UVIndex.attr("class","badge badge-danger");
                    UVIndex.text(response.value);
                    currentUVEl.text("UV Index: ", UVIndex);
                    console.log("is this UV Index?", UVIndex)
        
            }); 
        };  
    };



function forecast(inputEl) {
    // do another ajax call and append foracast stuff
//  Using saved city name, execute a current condition get request from open weather map api
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
            // console.log('this is the forecast data',response);
        });           
}; console.log("forecast data?", forecast(inputEl.val()));



 searchEl.on("click", function(){
     getWeather(inputEl.val())
 });