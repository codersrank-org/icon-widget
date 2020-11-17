const icons = require('../icons');

module.exports = (name = '') => {
  let fileName = '';
  let hash = '';
  icons.forEach((icon) => {
    const n = name.toLowerCase();
    const nReplaced = name.replace(/\./g, '');
    const names = icon.names;
    if (!fileName && (names.includes(n) || names.includes(nReplaced))) {
      fileName = icon.filename;
      hash = icon.hash;
    }
  });
  return { fileName, hash };
};
