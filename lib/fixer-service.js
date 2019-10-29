require('dotenv').config();
const axios = require('axios');

const symbols = process.env.SYMBOLS || 'EUR,USD,GBP';

// Axios Client declaration
const api = axios.create({
	baseURL: 'http://data.fixer.io/api/latest?access_key=',
	timeout: process.env.TIMEOUT || 5000,
});
// axios.defaults.baseURL = 'http://data.fixer.io/api/latest?access_key=';

// Generic GET request function
const getData = async (url) => {
  const response = await api.get(url, {
			params: {
				access_key: process.env.API_KEY
			}
		})
    const { data } = response;
    if (data.success) {
      return data;
    }
    throw new Error(data.error.type);
};

module.exports = {
  getRates: () => getData(`${symbols}&base=EUR`),
  getSymbols: () => getData('/symbols'),
};
