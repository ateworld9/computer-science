let currentLanguage = "ru";

const changeLanguage = (language) => {
  currentLanguage = language;
};

const translate = (key) => {
  return `${currentLanguage}:${key}`;
};

module.exports = {
  changeLanguage,
  translate,
};
