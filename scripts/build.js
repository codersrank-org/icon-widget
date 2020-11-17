const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const icons = require(path.resolve(__dirname, '../src/icons'));

icons.forEach((icon) => {
  const iconContent = fs.readFileSync(
    path.resolve(__dirname, `../src/svg/${icon.filename}`),
    'utf-8',
  );
  icon.hash = crypto.createHash('md5').update(iconContent).digest('hex');
  fs.writeFileSync(
    path.resolve(__dirname, `../api/icon/svg/${icon.filename}`),
    iconContent,
  );
});

fs.writeFileSync(
  path.resolve(__dirname, '../api/icon/icons.json'),
  JSON.stringify(icons, '', 2),
);
