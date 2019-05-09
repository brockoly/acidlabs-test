const axios = require('axios');

const getData = async (coordinates) => {
  try {
    const config = {
      timeout: 30000,
      baseURL: process.env.NODE_ENV === 'production' ? 'https://acidlabs-test-api.herokuapp.com/weather' : 'http://localhost:5000/weather',
      rejectUnauthorized: false,
      strictSSL: false,
    };
    
    const url = `/${coordinates}`;
  
    const request = axios.create(config);
  
    const { data } = await request.get(url);
    return data;
  } catch (e) {
    const data = {
      message: 'No se encuentra el país seleccionado',
      error: `Error: ${e}`
    }
    return data;
  }
  
}

export default getData;
