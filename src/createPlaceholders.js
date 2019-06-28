export default (placeholder, count) => {
  const result = [];

  [...Array(count).keys()].forEach(() => result.push(placeholder));

  return result;
};
