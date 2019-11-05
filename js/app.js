const clock = document.querySelector(".time span");
const weatherAside = document.querySelector(".weather");

// affichage heure
const updateTime = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  const html = `<span>${h} : ${m} : ${s}</span>`;

  // const time = now.toTimeString();
  // const htmldeux = `<span>${time}</span>`;
  clock.innerHTML = html;
};

setInterval(updateTime, 1000);

// affichage weather
const updateWeather = (weatherIcon, weatherText, temp ) => {

  const html = `
    <div><b>Meteo :</b></div>
    <div class="flex-container">
      <img src="img/icons/${weatherIcon}.svg">
      <div class="weather-content">
        <div>${weatherText}</div>
        <div>${temp}&deg;C</div>
      </div>
    </div>
  `;

  weatherAside.innerHTML += html;
};

getWeather().then(data => {

  const weatherIcon = data.WeatherIcon;
  const weatherText = data.WeatherText;
  const temp = data.Temperature.Metric.Value;

  updateWeather(weatherIcon,weatherText, temp);

}).catch(err => console.log(err));