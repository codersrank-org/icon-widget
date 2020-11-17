const fs = require('fs');
const path = require('path');

const getIcon = require('./shared/get-icon');
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
        'Content-Type': 'image/svg+xml;charset=UTF-8',
      },
      body: '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
    };
    return;
  }
  const { fileName, hash } = getIcon(name);

  if (!fileName) {
    // respond with generated SVG
    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml;charset=UTF-8',
        'Cache-Control':
          'public, immutable, no-transform, s-maxage=2592000, max-age=2592000',
      },
      body: generateIcon({ name, bg, text }),
    };
    return;
  }
  const svgContent = fs.readFileSync(path.resolve(__dirname, `svg/${fileName}`), 'utf-8');

  context.res = {
    headers: {
      'Content-Type': 'image/svg+xml;charset=UTF-8',
      'Cache-Control':
        'public, immutable, no-transform, s-maxage=2592000, max-age=2592000',
      ETag: hash,
    },
    body: svgContent,
  };
};
