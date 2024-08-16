//we dont write let inputBox because our variable swould remain constant always
//if we have to get any element by its id we use getElemetBy Id
//if we have to get any element by its class we use querySelecter
const inputBox=document.querySelector('.input-box');
const searchBtn=document.getElementById('searchBtn');
const weather_img=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const humidity=document.getElementById('humidity');
const wind_speed=document.getElementById('wind-speed');
const location_not_found=document.querySelector('.location-not-found');
const weather_body=document.querySelector('.weather-body');
const container=document.querySelector('.container');
const body=document.querySelector('.bgm');

//AWAIT CAN BE USED ONLY IN ASYNC FUNCTION

async function checkWeather(city){
    const api_key="1ca8a3d4b6027a6ea3203ec3df10109b";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    //fetch fetches from the mentioned url and json converts the recieved response to string to be displayed
    const weather_data=await fetch(`${url}`).then(response=>response.json()).catch((err)=>{
    console.log("weather cant be fetched!!",err)
    });
    console.log(weather_data);

    container.style.display="flex";

    if (weather_data.cod === '404') {
        //if location is wrong location-not-found img is shown and NOT weather body
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
       console.log("error");
       body.style.backgroundImage='none';
       body.style.backgroundImage = 'url("assets/background.png")';
       return;
    }
    
    //if location is correct weather-body is shown and NOT location-not-found image
    location_not_found.style.display="none";
    weather_body.style.display="flex";
   //showing the received data from api
    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}`+" °C";
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML=`${weather_data.wind.speed}kmph`;
    console.log(weather_data.weather[0].main);

    body.style.backgroundImage='none';
    //to change image
    switch (weather_data.weather[0].main) {
        case 'Clouds':
        case 'overcast clouds': // Note: Use separate case statements for each condition
            weather_img.src = "assets/cloudy.png";
            body.style.backgroundImage = 'url("assets/cloudbgm.jpg")';
            break;
        case 'Haze':
        case 'Mist':
            weather_img.src = "assets/haze.png";
            body.style.backgroundImage = 'url("assets/mistbgm.jpg")';
            break;
        case 'Clear':
            weather_img.src = "assets/sun.png";
            body.style.backgroundImage = 'url("assets/clearbgm.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
            weather_img.src = "assets/raining.png";
            body.style.backgroundImage = 'url("assets/rainbgm.jpg")';
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            body.style.backgroundImage = 'url("assets/snowbgm.jpg")';
            break;
        default:
            weather_img.src = "assets/default.png";
            body.style.backgroundImage = 'url("assets/defaultbackground.jpeg")';
            break;
    }
    

}

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
})
