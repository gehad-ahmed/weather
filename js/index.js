let findBtn=document.getElementById("findBtn")
let findLocation=document.getElementById("findLocation")
findLocation.addEventListener("input",function(){
    weather()
})
findBtn.addEventListener("click",function(){
    weather()
})

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      localStorage.removeItem("lat" )
      localStorage.removeItem("long" )
    } 
  }
  function showPosition(position) {
    const latitude = position.coords.latitude;
       const longitude = position.coords.longitude;
       console.log("lat" , latitude);
       console.log("long" , longitude);
       weather(latitude, longitude);
   }

async function weather(lat , long){
    try{
console.log("lat inside weather" , lat);
console.log("long inside weather" , long);
    
        let parameter;

        if (findLocation.value) {
            parameter = findLocation.value
        }
        else if (lat && long) {
            parameter = lat +"," + long 
            localStorage.setItem("lat" , lat)
            localStorage.setItem("long" , long)
        }
        else{
            let getLat = localStorage.getItem("lat")
            let getLong = localStorage.getItem("long")
            if (getLat && getLong) {
                parameter = getLat +"," + getLong
            }
            else{

                parameter = "cairo"
            }
        }
        let data= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f901d0ee5d5543f9b44134528241206&q=${parameter}&days=3`)
        let response=await data.json()
       
    



  displayCurrentData(response)
    nextDayFunc(response.forecast)
    }

    catch(error){
        document.getElementById("demo").innerHTML=`
        <div class="myError">
               <div class="error text-center">
                   <div class="alert alert-danger">
                       <h1>${error}</h1>
                   </div>
               </div>
           </div>
        `
       }
}


getLocation()
weather()

const todayWeather=document.getElementById("todayWeather");
const currentDay=document.getElementById("currentDay");
const currentDate=document.getElementById("currentDate");
const currentCity=document.getElementById("currentCity");
const weatherCondition=document.getElementById("weatherCondition");
const imgCondition= document.getElementById("imgCondition");
const currentTemp= document.getElementById("currentTemp")
const humidity=document.getElementById("humidity")
const windDir=document.getElementById("windDir");
const windSpeed=document.getElementById("windSpeed");

function displayCurrentData(mainObj){

    let date = new Date(mainObj.location.localtime)
    currentDay.innerHTML=date.toLocaleDateString('en-US', { weekday: 'long' });

    let day= date.getDate();
    currentDate.innerHTML=day + " " + date.toLocaleDateString('en-US', { month: 'long' });
    
    
    currentCity.innerHTML=mainObj.location.name
   weatherCondition.innerHTML=mainObj.current.condition.text

  
    let newImg= mainObj.current.condition.icon.replace(/^\/\//, 'https://')
    imgCondition.src=newImg

    currentTemp.innerHTML=mainObj.current.temp_c +`<sup>o</sup>c`;
    humidity.innerHTML=mainObj.current.humidity + `%`;
    windSpeed.innerHTML=mainObj.current.wind_kph + `km/h`







    const windDirectionMap = {
        N: 'North',
        NNE: 'North-Northeast',
        NE: 'Northeast',
        ENE: 'East-Northeast',
        E: 'East',
        ESE: 'East-Southeast',
        SE: 'Southeast',
        SSE: 'South-Southeast',
        S: 'South',
        SSW: 'South-Southwest',
        SW: 'Southwest',
        WSW: 'West-Southwest',
        W: 'West',
        WNW: 'West-Northwest',
        NW: 'Northwest',
        NNW: 'North-Northwest'
      };

    const windDirectionFull = windDirectionMap[mainObj.current.wind_dir];
    windDir.innerHTML=windDirectionFull;

}

const nextDay= document.getElementById("nextDay");
const nextDayImg= document.getElementById("nextDayImg")
const nextDayMaxTemp=document.getElementById("nextDayMaxTemp")
const nextDayMinTemp=document.getElementById("nextDayMinTemp");
const nextDayCondition=document.getElementById("nextDayCondition");


const nextDay2=document.getElementById("nextDay2")
const nextDayImg2= document.getElementById("nextDayImg2")
const nextDayMaxTemp2=document.getElementById("nextDayMaxTemp2")
const nextDayMinTemp2=document.getElementById("nextDayMinTemp2");
const nextDayCondition2=document.getElementById("nextDayCondition2");



let divsforDate = [nextDay,nextDay2]
let divsforImgs = [nextDayImg,nextDayImg2]
let divsforMaxTemp = [nextDayMaxTemp,nextDayMaxTemp2]
let divsforMinTemp = [nextDayMinTemp,nextDayMinTemp2]
let divsforCondition = [nextDayCondition,nextDayCondition2]


 function nextDayFunc(mainObj){
    mainObj.forecastday.splice(0,1)

     for(let i=0; i<mainObj.forecastday.length; i++){

// next Day

divsforDate[i].innerHTML = new Date(mainObj.forecastday[i].date).toLocaleDateString('en-US', { weekday: 'long' })

let newImg= mainObj.forecastday[i].day.condition.icon.replace(/^\/\//, 'https://')

divsforImgs[i].src=newImg



divsforMaxTemp[i].innerHTML=mainObj.forecastday[i].day.maxtemp_c
divsforMinTemp[i].innerHTML=mainObj.forecastday[i].day.mintemp_c

divsforCondition[i].innerHTML=mainObj.forecastday[i].day.condition.text

    }
    
}