// const weatherApiKey = "PZtHYWQEYcvnuk932JxdQNWnK3tHxp9n";
const cityKey = "6-315040_1_AL"; // for Taichung

const getWeather = async() => {

  const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${weatherApiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  return data[0];
};


