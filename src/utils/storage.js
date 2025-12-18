// Get data from storage
export const getLocalData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Save data to storage
export const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
