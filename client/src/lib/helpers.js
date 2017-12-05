export function transformObjectInUrl(object) {
  return Object.keys(object).reduce(
    (result, field) => `${result}${field}=${object[field]}`,
    '?'
  );
}

const errorFields = field => {
  const fields = { username: 'Nome de Usuário' };
  return fields[field] || field;
};

const errorTypes = ({ message, path, type, value }) => {
  const types = {
    'unique violation': `${errorFields(path)} ${value} já existe`,
    'invalid login': 'Nome de usuário ou senha incorretos.'
  };
  return { [path]: types[type] || message };
};

export function transformApiErrors(errors = []) {
  return errors.reduce(
    (result, error) => ({
      ...result,
      ...errorTypes(error)
    }),
    {}
  );
}

export const filters = {
  ALL: () => true,
  UNARCHIVED: item => !item.archived,
  ARCHIVED: item => item.archived,
  DONE: item => item.done,
  UNDONE: item => !item.done
};
