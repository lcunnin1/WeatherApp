import React, { useEffect, useState } from 'react'
import './WeatherApp.css'


import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import sunnycloudy_icon from "../Assets/sunnycloudy.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import feels_icon from "../Assets/feelslike.png";
import brokencloud_icon from "../Assets/broken_cloud.png";
import sunset_icon from "../Assets/sunset.png";

// function 
export const WeatherApp = () => { 
    
    //New edit here 4/20/2024

   let [W_state, set_Wstate] = useState(cloud_icon);
   let api_key = "0d42b7461f37f75e6433c1cbe39ad3bf";
   /*Zipcode and country code regex*/
   let zip_regex = "([0-9]{5},\s*[a-zA-Z]{2})|^([0-9]{5}$)";
   /*Regex to handle just country names*/
   let count_regex = "[a-zA-Z\\s]*";
   /*List of country codes*/
   const countrycodes = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS",
               "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN",
               "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG",
               "CD", "CK", "CR", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER",
               "EE", "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI",
               "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS",
               "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR",
               "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML",
               "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA",
               "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", "PS",
               "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN",
               "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB",
               "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL",
               "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU",
               "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW","af", "ax", "al", "dz", "as", "ad", "ao", "ai", 
               "aq", "ag", "ar", "am", "aw", "au", "at", "az", "bs", "bh", "bd", "bb", "by", "be", "bz", "bj", "bm",
               "bt", "bo", "bq", "ba", "bw", "bv", "br", "io", "bn",
               "bg", "bf", "bi", "cv", "kh", "cm", "ca", "ky", "cf", "td", "cl", "cn", "cx", "cc", "co", "km", "cg",
               "cd", "ck", "cr", "hr", "cu", "cw", "cy", "cz", "dk", "dj", "dm", "do", "ec", "eg", "sv", "gq", "er",
               "ee", "sz", "et", "fk", "fo", "fj", "fi", "fr", "gf", "pf", "tf", "ga", "gm", "ge", "de", "gh", "gi",
               "gr", "gl", "gd", "gp", "gu", "gt", "gg", "gn", "gw", "gy", "ht", "hm", "va", "hn", "hk", "hu", "is",
               "in", "id", "ir", "iq", "ie", "im", "il", "it", "jm", "jp", "je", "jo", "kz", "ke", "ki", "kp", "kr",
               "kw", "kg", "la", "lv", "lb", "ls", "lr", "ly", "li", "lt", "lu", "mo", "mg", "mw", "my", "mv", "ml",
               "mt", "mh", "mq", "mr", "mu", "yt", "mx", "fm", "md", "mc", "mn", "me", "ms", "ma", "mz", "mm", "na",
               "nr", "np", "nl", "nc", "nz", "ni", "ne", "ng", "nu", "nf", "mk", "mp", "no", "om", "pk", "pw", "ps",
               "pa", "pg", "py", "pe", "ph", "pn", "pl", "pt", "pr", "qa", "re", "ro", "ru", "rw", "bl", "sh", "kn",
               "lc", "mf", "pm", "vc", "ws", "sm", "st", "sa", "sn", "rs", "sc", "sl", "sg", "sx", "sk", "si", "sb",
               "so", "za", "gs", "ss", "es", "lk", "sd", "sr", "sj", "se", "ch", "sy", "tw", "tj", "tz", "th", "tl",
               "tg", "tk", "to", "tt", "tn", "tr", "tm", "tc", "tv", "ug", "ua", "ae", "gb", "us", "uy", "uz", "vu",
               "ve", "vn", "vg", "vi", "wf", "eh", "ye", "zm", "zw"];

   const search = async () => {
    /*Handles getting from search bar*/
       let element = document.getElementsByClassName("cityInput");
       const inputvalue = element[0].value.trim();
       const cityvalue = element[0].value.trim();
       let url = ``;
       let zipcountry = inputvalue.match(zip_regex);
       let country = cityvalue.match(count_regex);
try {
       if(inputvalue === "")
       {
           return 0; {/*Handles the case where someone is searching with nothing typed in the search bar*/}
       }
       /*If regex is matched, then we know we have a zipcode or zipcode and country code*/
       else if(!(zipcountry === null))
       {
            let concatenate = zipcountry.join("");
            let zipcode = concatenate.substring(0,5);
            url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=Imperial&appid=${api_key}`;
       }
       else if(!(country === null))
       {
            let country_input = country.join("");
            url = `https://api.openweathermap.org/data/2.5/weather?q=${country_input}&units=Imperial&appid=${api_key}`;
       }

       let response = await fetch(url);
       let data = await response.json();

       const humidity = document.getElementsByClassName("humidity-percent");
       const wind = document.getElementsByClassName("wind-rate");
       const temperature = document.getElementsByClassName("weather-temp");
       const location = document.getElementsByClassName("weather-location");
       const feelslike = document.getElementsByClassName("feels-like");
       const sunset = document.getElementsByClassName("sunset-time");
    
       humidity[0].innerHTML = data.main.humidity + "%" ;
       wind[0].innerHTML = data.wind.speed + "mph";
       temperature[0].innerHTML = Math.floor(data.main.temp) + "°F";
       location[0].innerHTML = data.name;
       feelslike[0].innerHTML = Math.floor(data.main.feels_like) + "°F";

       let timezone = data.timezone;
       let epoch = data.sys.sunset;
       const sunsetTime = (sunsetTimestamp,timezoneOffset) => {

        const sunsetDate = new Date(sunsetTimestamp * 1000);
        const adjustedSunsetDate = new Date(sunsetDate.getTime() + timezoneOffset * 1000);
        const hours = adjustedSunsetDate.getUTCHours()-12;
        const minutes = adjustedSunsetDate.getUTCMinutes();
        const seconds = adjustedSunsetDate.getUTCSeconds();

        const formattedSunsetTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedSunsetTime;
       }


       sunset[0].innerHTML = sunsetTime(timezone,epoch);


       /*
       Get date in UTC time
       Filter hour and minute
       */
       let sunset_date = data.sys.sunset;
       let current_str = new Date().getTime().toString();
       current_str = current_str.substring(0,8);

       if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
       {
        set_Wstate(clear_icon);
       }
       else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
       {
        set_Wstate(sunnycloudy_icon);
       }
       else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
       {
        set_Wstate(cloud_icon);
       }
       else if(data.weather[0].icon === "04d" || data.weather.icon[0] === "04n")
       {
        set_Wstate(brokencloud_icon);
       }
       else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
       {
        set_Wstate(rain_icon);
       }
       else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
       {
        set_Wstate(rain_icon);
       }
       else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
       {
        set_Wstate(snow_icon);
       }
       else
       {
        set_Wstate(clear_icon);
       }
    }
    catch(error){
        alert("Please enter a valid location");
    }
   }      

 return (
    
//Start of HTML code 

    
   <div className = 'container' style = {{
    backgroundImage: "url('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=600')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '250vh'
   }}>

       <div className="top-bar">
           <input type="text" className="cityInput" placeholder = 'Search'/>
           <div className="search-icon" onClick={()=>{search()}}>
               <img src={search_icon} alt="" />
           </div>
       </div>

       <div className="weather-image">
           <img src={W_state} alt="" />
       </div>

       <div className="weather-temp">63°F</div>
       <div className="weather-location">London</div>


       <div className="data-container">
           <div className="element">
               <img src={humidity_icon} alt="" className="icon" />
               <div className="data">
                   <div className="humidity-percent">64%</div>
                   <div className="text">Humidity</div>
               </div>
           </div>
           <div className="element">
               <img src={wind_icon} alt="" className="icon" />
               <div className="data">
                   <div className="wind-rate">18 mph</div>
                   <div className="text">Wind Speed</div>
               </div>
           </div>
           <div className="element">
               <img src={feels_icon} alt="" className="icon" />
               <div className="data">
                   <div className="feels-like">60°F</div>
                   <div className="text">Feels Like</div>
               </div>
           </div>

           <div className="element">
               <img src={sunset_icon} alt="" className="icon" />
               <div className="data">
                   <div className="sunset-time">8:00 pm</div>
                   <div className="text">Sunset Time</div>
               </div>
           </div>

       </div>
   </div>

 )
}
export default WeatherApp