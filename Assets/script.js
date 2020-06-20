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
            nameEl.text(response.name)
            dateEl.text(moment().format('MMM Do YYYY'))
            currentPicEl.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            currentTempEl.text("Temperature: " + response.main.temp + " °F");
            currentHumidityEl.text("Humidity: " + response.main.humidity + "%");
            currentWindEl.text("Wind Speed: " + response.wind.speed + " MPH");
            getUVIndex(cityName, response);
            forecast(cityName);
        });
        
    };

    // UV index function
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


//5 day forecast function
function forecast(inputEl) {
//  Using saved city name, execute a current condition get request from open weather map api
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(data){
        // console.log('do we get any forecast stuff back ??', data)
        
        let fiveDayForecast = [];
        for(let i = 0; i < data.list.length; i++) {
            // console.log ("looping?", data.list[i].dt_txt.split(" ")[1])
            let forecastTime = data.list[i].dt_txt.split(" ")[1];
             
            if(forecastTime === "00:00:00") {
                fiveDayForecast.push(data.list[i]);
                console.log("is this giving me forecast?", fiveDayForecast)
            } 
        };

        let forecastDay1 = {
            date: fiveDayForecast[0].dt_txt.split(" ")[0],
            weather: fiveDayForecast[0].weather[0].icon,
            temp: "Temp: " + fiveDayForecast[0].main.temp + " °F",
            humidity: "Humidity: " + fiveDayForecast[0].main.humidity + "%",
            windSpeed: "Wind Speed: " + fiveDayForecast[0].wind.speed + " MPH",
        };
       
        let forecastDate1 = $("<div>");
        let forecastWeather1 = $("<div>");
        let forecastTemp1 = $("<div>");
        let forecastHumidity1 = $("<div>");
        let forecastWS1 = $("<div>");

        $(forecastDate1).text(moment(forecastDay1.date).format('L'));
        forecastWeather1.attr("src", "http://openweathermap.org/img/wn/" + forecastDay1.weather + "@2x.png");
        console.log("is this the weather icon?", forecastWeather1)
        $(forecastTemp1).text(forecastDay1.temp);
        $(forecastHumidity1).text(forecastDay1.humidity);
        $(forecastWS1).text(forecastDay1.windSpeed);
        
        $(".forecast1").append(forecastDate1);
        $(".forecast1").append(forecastWeather1);
        $(".forecast1").append(forecastTemp1);
        $(".forecast1").append(forecastHumidity1);
        $(".forecast1").append(forecastWS1);
        
        let forecastDay2 = {
            date: fiveDayForecast[1].dt_txt.split(" ")[0],
            weather: fiveDayForecast[1].weather[0].icon,
            temp: "Temp: " + fiveDayForecast[1].main.temp + " °F",
            humidity: "Humidity: " + fiveDayForecast[1].main.humidity + " %",
            windSpeed: "Wind Speed: " + fiveDayForecast[1].wind.speed + " MPH",
        }; 
       
        let forecastDate2 = $("<div>");
        let forecastWeather2 = $("<div>");
        let forecastTemp2 = $("<div>");
        let forecastHumidity2 = $("<div>");
        let forecastWS2 = $("<div>");

        $(forecastDate2).text(moment(forecastDay2.date).format('L'));
        $(forecastWeather2).attr("src", "http://openweathermap.org/img/wn/" + forecastDay2.weather + ".png");
        $(forecastTemp2).text(forecastDay2.temp);
        $(forecastHumidity2).text(forecastDay2.humidity);
        $(forecastWS2).text(forecastDay2.windSpeed);

        $(".forecast2").append(forecastDate2);
        $(".forecast2").append(forecastWeather2);
        $(".forecast2").append(forecastTemp2);
        $(".forecast2").append(forecastHumidity2);
        $(".forecast2").append(forecastWS2);
        
        let forecastDay3 = {
            date: fiveDayForecast[2].dt_txt.split(" ")[0],
            weather: fiveDayForecast[2].weather[0].icon,
            temp: "Temp: " + fiveDayForecast[2].main.temp + " °F",
            humidity: "Humidity: " + fiveDayForecast[2].main.humidity + " %",
            windSpeed: "Wind Speed: " + fiveDayForecast[2].wind.speed + " MPH",
        };  console.log("is this the right date?", forecastDay3.date)

       
        let forecastDate3 = $("<div>");
        let forecastWeather3 = $("<div>");
        let forecastTemp3 = $("<div>");
        let forecastHumidity3 = $("<div>");
        let forecastWS3 = $("<div>");

        $(forecastDate3).text(moment(forecastDay3.date).format('L'));
        $(forecastWeather3).attr("src", "http://openweathermap.org/img/wn/" + forecastDay3.weather + ".png");
        $(forecastTemp3).text(forecastDay3.temp);
        $(forecastHumidity3).text(forecastDay3.humidity);
        $(forecastWS3).text(forecastDay3.windSpeed);

        $(".forecast3").append(forecastDate3);
        $(".forecast3").append(forecastWeather3);
        $(".forecast3").append(forecastTemp3);
        $(".forecast3").append(forecastHumidity3);
        $(".forecast3").append(forecastWS3);
        
        let forecastDay4 = {
            date: fiveDayForecast[3].dt_txt.split(" ")[0],
            weather: fiveDayForecast[3].weather[0].icon,
            temp: "Temp: " + fiveDayForecast[3].main.temp + " °F",
            humidity: "Humidity: " + fiveDayForecast[3].main.humidity + "%",
            windSpeed: "Wind Speed: " + fiveDayForecast[3].wind.speed + " MPH",
        };
       
        let forecastDate4 = $("<div>");
        let forecastWeather4 = $("<div>");
        let forecastTemp4 = $("<div>");
        let forecastHumidity4 = $("<div>");
        let forecastWS4 = $("<div>");

        $(forecastDate4).text(moment(forecastDay4.date).format('L'));
        $(forecastWeather4).attr("src", "http://openweathermap.org/img/wn/" + forecastDay4.weather + ".png");
        $(forecastTemp4).text(forecastDay4.temp);
        $(forecastHumidity4).text(forecastDay4.humidity);
        $(forecastWS4).text(forecastDay4.windSpeed);

        $(".forecast4").append(forecastDate4);
        $(".forecast4").append(forecastWeather4);
        $(".forecast4").append(forecastTemp4);
        $(".forecast4").append(forecastHumidity4);
        $(".forecast4").append(forecastWS4);
        
        let forecastDay5 = {
            date: fiveDayForecast[4].dt_txt.split(" ")[0],
            weather: fiveDayForecast[4].weather[0].icon,
            temp: "Temp: " + fiveDayForecast[4].main.temp + " °F",
            humidity: "Humidity: " + fiveDayForecast[4].main.humidity + "%",
            windSpeed: " Wind Speed: " + fiveDayForecast[4].wind.speed + " MPH",
        }; console.log ("is this the date for day 5??", forecastDay5.date)
       
        let forecastDate5 = $("<div>");
        let forecastWeather5 = $("<div>");
        let forecastTemp5 = $("<div>");
        let forecastHumidity5 = $("<div>");
        let forecastWS5 = $("<div>");

        $(forecastDate5).text(moment(forecastDay5.date).format('L'));
        $(forecastWeather5).attr("src", "http://openweathermap.org/img/wn/" + forecastDay5.weather + ".png");
        $(forecastTemp5).text(forecastDay5.temp);
        $(forecastHumidity5).text(forecastDay5.humidity);
        $(forecastWS5).text(forecastDay5.windSpeed);

        $(".forecast5").append(forecastDate5);
        $(".forecast5").append(forecastWeather5);
        $(".forecast5").append(forecastTemp5);
        $(".forecast5").append(forecastHumidity5);
        $(".forecast5").append(forecastWS5);
    });
}; 

function saveHistory (searchHistory) {

    var searchHistory = JSON.parse(localStorage.getItem('history'))
    searchHistory.push(inputEl.val());
    var strHistory = JSON.stringify(searchHistory);
    localStorage.setItem("history", strHistory)

}

function displayHistory(searchHistory){
    var searchHistory = JSON.parse(localStorage.getItem('history'))
    if(searchHistory === null) {
        searchHistory = "Austin";
    } else {
        // for (let i = 0; i < searchHistory.length; i++) {
            var historyLink = $('<div>').addClass('history-btn')
            historyLink.text(searchHistory[i])
            $('#past-history').append(historyLink)
        // }
    
    }
}

// $(document).ready(function displayLastSearch(city){
//     var searchHistory = JSON.parse(localStorage.getItem('history'))
//     for (let i = 0; i < searchHistory.length; i++) {
//         var historyLink = $('<div>').addClass('history-btn')
//         historyLink.text(searchHistory[i])
//         $('#past-history').append(historyLink)
//     }
//     getWeather(searchHistory[0]);
//     forecast(searchHistory[0]);
//     displayHistory(searchHistory[i]);
// });

displayHistory();

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
 });