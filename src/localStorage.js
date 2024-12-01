const getMyItem = (key) => {
  const storage = localStorage.getItem(key);
  if (storage) {
    return JSON.parse(storage);
  }
  return [];
};

const setMyItemOnLocalStorage = (key, id) => {
  const items = JSON.stringify(id);
  localStorage.setItem(key, items);
};

const pushInArray = (key, id) => {
  const blankArray = getMyItem(key);
//   console.log(blankArray);
  blankArray.push(id);
  setMyItemOnLocalStorage(key, blankArray);
};

export { pushInArray, getMyItem };
