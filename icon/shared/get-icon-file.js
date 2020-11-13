const iconsMap = require('../icons-map');

module.exports = (name = '') => {
  let fileNameFound = '';
  Object.keys(iconsMap).forEach((fileName) => {
    const n = name.toLowerCase();
    const nReplaced = name.replace(/\./g, '');
    const names = iconsMap[fileName];
    if (!fileNameFound && (names.includes(n) || names.includes(nReplaced))) {
      fileNameFound = fileName;
    }
  });
  return fileNameFound;
};
