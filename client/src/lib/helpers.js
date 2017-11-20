function transformObjectInUrl(object) {
  return Object.keys(object).reduce(
    (result, field) => `${result}${field}=${object[field]}`,
    '?'
  );
}

export default { transformObjectInUrl };
