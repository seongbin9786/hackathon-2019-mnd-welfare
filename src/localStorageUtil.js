export const save = (k, v) => {
  const stringifiedV = JSON.stringify(v);
  localStorage.setItem(k, stringifiedV);
};

export const get = k => {
  const v = localStorage.getItem(k);
  if (v === null) return null;
  return JSON.parse(v);
};
