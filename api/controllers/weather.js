const axios = require('axios');
const redis = require('./redis');

const getCountry = async (coordinates) => {
  try {
    const geocodeConfig = {
      timeout: 30000,
      baseURL: 'https://maps.googleapis.com/maps/api/geocode',
    };
    
    const request = axios.create(geocodeConfig);
    const url = `/json?latlng=${coordinates}&key=AIzaSyBvESwkrpeMwCbgbGY56NIuoAfv_viNleg`;
    const { data } = await request.get(url);
    if (data.results.length > 0) {
      const country = data.results.pop().address_components.pop().long_name;
      const code = data.results.pop().address_components.pop().short_name;
      return {
        country,
        code
      };
    }
    return {
      country: null,
      code: null
    }
  } catch (e) {
    return e;
  }
  
}

const getTemperature = async (coordinates) => {
  const geocodeConfig = {
    timeout: 30000,
    baseURL: 'https://api.darksky.net/forecast/11a2f5d1b717c9d250264d185c6d0964',
  };

  const request = axios.create(geocodeConfig);
  const url = `/${coordinates}?units=si`;
  const { data } = await request.get(url);
  const temperature = Math.round(data.currently.temperature);
  return {
    temperature
  };
}

const getCapitalCity = async (code) => {
  const worldBankConfig = {
    timeout: 30000,
    baseURL: 'http://api.worldbank.org/v2/country',
  };

  const request = axios.create(worldBankConfig);
  const url = `/${code}?format=json`;
  const { data } = await request.get(url);
  const capitalCity = data[1].pop().capitalCity
  return {
    capitalCity
  };
}

exports.data = async (req, res) => {
  try {
    let data = {};
    const { coordinates } = req.params;
    const { country, code } = await getCountry(coordinates);
    // Getting data from redis depending of the country selected
    data = await redis.get(country);
    if (data === null) {
      const { temperature } = await getTemperature(coordinates);
      const { capitalCity } = await getCapitalCity(code);
      data = {
        country,
        code,
        temperature,
        capitalCity
      }
      redis.set(data.country, data);
    }
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }  
};
