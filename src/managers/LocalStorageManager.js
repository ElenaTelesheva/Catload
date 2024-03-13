export const getFromLocalStorage = ({ name }) => {
  const result = JSON.parse(localStorage.getItem(name));
  return result;
};

export const setInLocalStorage = ({ name, data }) => {
  localStorage.setItem(name, data);
};
