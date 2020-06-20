    var inputEl = $("#city-input");
    var searchEl = $("#search-button");
    var clearEl = $("#clear-history");
    var nameEl = $("#city-name");
    var dateEl = $("#current-date");
    var currentPicEl = $("#current-pic");
    var currentTempEl = $("#temperature");
    var currentHumidityEl = $("#humidity");4
    var currentWindEl = $("#wind-speed");
    var currentUVEl = $("#UV-index");
    var historyEl = $("#history");
   // var cityName = JSON.localStorage.setItem("inputEl")
    //let searchHistory = JSON.parse(localStorage.getItem("cityName")) || [];
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
            getUVIndex(cityName, response);
            forecast(cityName);
        });
        
    };

    function getUVIndex (thing1, thing2) {
        console.log('This is our repsinse is lat lon on her ???', thing2)
        let lat = thing2.coord.lat;
        let lon = thing2.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0dd903385007dcf679d5824d5b9e348c&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: UVQueryURL,
            method: "GET"
        }).then(function(uviResponse){
            console.log("is this the response data?", uviResponse.value)
            let UVIndex = $("<span>");
            UVIndex.attr("class","badge badge-danger");
            // UVIndex.text(response.value);
            var uvIndexValue =  uviResponse.value
            currentUVEl.text("UV Index: " + uvIndexValue);
            console.log("is this UV Index?", UVIndex)

            if (uvIndexValue < 4) {
                $(".UVbtn").addClass("btn-success");
              } else if (uvIndexValue >= 4 && uvIndexValue < 7) {
                $(".UVbtn").addClass("btn-warning");
              } else if (uvIndexValue >= 7){
                $(".UVbtn").addClass("btn-danger");
              }


        }); 
    };  



function forecast(inputEl) {
    // do another ajax call and append foracast stuff
//  Using saved city name, execute a current condition get request from open weather map api
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(data){
        // console.log('do we get any forecast stuff back ??', data)
        // $(".forecast").append()
            // console.log('this is the forecast data',response);
        let fiveDayForecast = [];
        for(let i = 0; i < data.list.length; i++) {
            // console.log ("looping?", data.list[i].dt_txt.split(" ")[1])
            let forecastTime = data.list[i].dt_txt.split(" ")[1];
             
            if(forecastTime === "00:00:00") {
                fiveDayForecast.push(data.list[i]);
                console.log("is this giving me forecast?", fiveDayForecast)
            } 

            let forecastDay1 = {
                date: data.list[0].dt_txt.split(" ")[0]

            };
        // console.log(fiveDayForecast)
        // append ppl in firveDatForecast to page!!!

    });           
}; 

function saveHistory (city) {

    var searchHistory = JSON.parse(localStorage.getItem('history'))
    searchHistory.push(city);
    var strHistory = JSON.stringify(searchHistory);
    localStorage.setItem("history", strHistory)

}

function displayHistory(city){
    var searchHistory = JSON.parse(localStorage.getItem('history'))
    for (let i = 0; i < searchHistory.length; i++) {
        var button = $('<button>').addClass('history-btn')
        button.text(searchHistory[i])
        $('#past-history').append(button)
        
    }
}

displayHistory()

// function to show today's weather on click each city stored in the history
$('.history-btn').on('click', function(){
    console.log('text of button ???', $(this).text())
    getWeather($(this).text())
})

// search button onclick function to run getWeather and saveHistory functions
 searchEl.on("click", function(){
     getWeather(inputEl.val())
     saveHistory(inputEl.val())
     $("#city-input").empty();
     console.log("what is this doing")
 });

 clearEl.on("click", function (){
     $("#past-history").empty();
 })