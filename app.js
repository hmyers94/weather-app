const form = document.querySelector("#form");
let apiKey = "";
const cityName = document.querySelector("#city-name");
const cityTemp = document.querySelector("#city-temp");
const cityWeather = document.querySelector("#city-weather");
const main = document.querySelector("main");

apiKey = prompt("Enter your OpenWeather key: ");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const searchInput = form.elements.query.value;
  console.log(searchInput);
  const config = { params: { q: searchInput, appid: apiKey } };
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`,
    config
  );
  try {
    getWeather(res.data);
  } catch (e) {
    // Ignore failed attempt
  }

  form.elements.query.value = "";
  main.classList.remove("hidden");
});

const getWeather = function (city) {
  const name = city.name;
  const tempC = ` ${Math.trunc(city.main.temp - 273.15)}`;
  const tempF = ` ${Math.trunc((tempC * 9) / 5 + 32)}`;
  const weather = city.weather[0].description;
  cityName.innerHTML = name;
  cityTemp.innerHTML = `${tempC} °C / ${tempF} °F`;
  cityWeather.innerHTML = ` ${weather.charAt(0).toUpperCase()}${weather.slice(
    1
  )}`;
};
