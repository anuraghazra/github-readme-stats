const axios = require("axios");

const renderError = (message) => {
  return `
    <svg width="495" height="100" viewBox="0 0 495 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
    .text { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2F80ED }
    .small { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #252525 }
    </style>
    <rect x="0.5" y="0.5" width="494" height="99%" rx="4.5" fill="#FFFEFE" stroke="#E4E2E2"/>
    <text x="25" y="45" class="text">Something went wrong! file an issue at https://git.io/JJmN9</text>
    <text id="message" x="25" y="65" class="text small">${message}</text>
    </svg>
  `;
};

// https://stackoverflow.com/a/48073476/10629172
function encodeHTML(str) {
  return str.replace(/[\u00A0-\u9999<>&](?!#)/gim, function (i) {
    return "&#" + i.charCodeAt(0) + ";";
  });
}

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

function isValidHexColor(hexColor) {
  return new RegExp(
    /^([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{4})$/
  ).test(hexColor);
}

function request(data, headers) {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://api.github.com/graphql",
      method: "post",
      headers: {
        ...headers,
      },
      data,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

module.exports = {
  renderError,
  kFormatter,
  encodeHTML,
  isValidHexColor,
  request,
};
