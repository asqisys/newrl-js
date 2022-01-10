const axios = require("axios").default;

// Export general axios function
const axiosFun = ({ method, url, data }) => {
  return axios({
    method,
    url,
    data,
  });
};

module.exports = { axiosFun };
