"use strict";
const searchInp = document.querySelector(".search-inp");
const searchBtn = document.querySelector(".search-icon");
const weatherImg = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const cityName = document.querySelector(".city-name");
const humidityPercentage = document.querySelector(".humidity-percentage");
const windSpeed = document.querySelector(".wind-speed");

const fetcher = async function (cityName) {
  try {
    const deliver = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?&q=${cityName}&appid=b7cfffa5610dac46cc196b4a4a8de699&units=metric&lang=fa`
    );
    console.log(deliver);
    if (!deliver.ok)
      throw new Error("شهر مورد نظر شما پیدا نشد");
    return await deliver.json();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

searchBtn.addEventListener("click", async function () {
  if (!searchInp.value) return;

  const data = await fetcher(searchInp.value);
  searchInp.value = "";
  if (!data) return;
  cityName.textContent = data.name;
  humidityPercentage.textContent = `${data.main.humidity}%`;
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  windSpeed.textContent = `${data.wind.speed} km/h`;
  weatherImg.src = `svg/${data.weather[0].main}.svg`;
});

function setBackgroundFromUnsplash(cityName) {
  const accessKey = 'pb1LNT8Y6Fl_scll-pO92lUyvaBRnH2kkkM1n1IgoH0';
  let url = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${accessKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        let imageUrl = data.results[0].urls.regular;
        document.body.style.backgroundImage = `url('${imageUrl}')`;
      }
    })
    .catch(error => console.error('Error fetching image:', error));

}

document.querySelector(".search-icon").addEventListener("click", function() {
  setBackgroundFromUnsplash(searchInp.value);
});


