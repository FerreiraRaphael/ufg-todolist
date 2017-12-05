/** @module api/helpers */

/**
 * @typedef {Object} ApiError
 * @property {string} message Messagem de erro
 * @property {string} type Tipo do erro
 * @property {string} path Caminho do erro
 * @property {string} value Valor do erro
 */

/**
 * @function ApiError
 * @param  {Error[]} apiErrors Array de Erros
 * @return {module:api/helpers~ApiError} Objeto da Api de erros
 */
function ApiError(apiErrors = []) {
  const errors = apiErrors.map(
    ({ message, path, type = 'Api Error', value = '' }) => {
      if (!message || !path)
        throw new Error('ApiError must have a message and path');
      return {
        message, type, path, value
      }
    }
  );
  return { errors };
}

module.exports = { ApiError };
