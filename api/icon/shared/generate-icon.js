const stringToColor = require('./string-to-color');

module.exports = ({ name = '', bgColor = '', textColor = '' }) => {
  // prettier-ignore
  return /* html */ `
  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <style>
      text {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }
    </style>
    <rect width="256" height="256" fill="${bgColor || stringToColor(name)}" rx="24" />
    ${name ? /* html */ `
    <text
      x="50%"
      y="50%"
      font-weight="bold"
      font-size="160"
      fill="${textColor || '#fff'}"
      dy="0"
      text-anchor="middle"
      dominant-baseline="central"
    >
      ${ name[0].toUpperCase() }
    </text>
    ` : ''}
  </svg>
  `
};
