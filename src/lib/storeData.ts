export const storeData = (
  key: string,
  value: [] | object | string | number,
) => {
  localStorage.setItem(key, JSON.stringify(value));
};
