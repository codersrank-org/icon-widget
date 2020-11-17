const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const icons = require(path.resolve(__dirname, '../src/icons'));

const iconsData = [];

Object.keys(icons).forEach((key) => {
  const fileName = key;
  const names = icons[key];
  const iconContent = fs.readFileSync(
    path.resolve(__dirname, `../src/svg/${fileName}`),
    'utf-8',
  );
  const hash = crypto.createHash('md5').update(iconContent).digest('hex');
  iconsData.push({
    names,
    hash,
    fileName,
  });
  fs.writeFileSync(path.resolve(__dirname, `../api/icon/svg/${fileName}`), iconContent);
});

fs.writeFileSync(
  path.resolve(__dirname, '../api/icon/icons.json'),
  JSON.stringify(iconsData, '', 2),
);
