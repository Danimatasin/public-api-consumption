import axios from 'axios';

const API_KEY = '38b0735311fd48fab07213423231307';

const getWeatherData = async (latitude, longitude, location) => {

  let apiURL;
  
  if (location) {
    apiURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
      location
    )}`;
  } else {
    apiURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;
  }
  
  try {
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getWeatherData;