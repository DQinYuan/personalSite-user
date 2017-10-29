var axios= require('axios');


axios.defaults.baseURL = 'http://localhost:9090';
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json';

module.exports = axios;
