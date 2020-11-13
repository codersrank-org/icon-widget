const fs = require('fs');
const path = require('path');

const getIconFile = require('./shared/get-icon-file');
const generateIcon = require('./shared/generate-icon');

module.exports = async function (context, req) {
  const name = req.params.name || req.query.name;
  const bg = req.query.bg;
  const text = req.query.text;
  if (!name) {
    // respond with empty image
    context.res = {
      status: 200,
      headers: {
        'content-type': 'image/svg+xml;charset=UTF-8',
      },
      body: '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
    };
    return;
  }
  const iconFileName = getIconFile(name);

  if (!iconFileName) {
    // respond with generated SVG
    context.res = {
      status: 200,
      headers: {
        'content-type': 'image/svg+xml;charset=UTF-8',
      },
      body: generateIcon({ name, bg, text }),
    };
    return;
  }
  const svgContent = fs.readFileSync(
    path.resolve(__dirname, `svg/${iconFileName}`),
    'utf-8',
  );

  context.res = {
    headers: {
      'content-type': 'image/svg+xml;charset=UTF-8',
    },
    body: svgContent,
  };
};
