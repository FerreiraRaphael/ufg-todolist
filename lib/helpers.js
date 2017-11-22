/**
 * @function {ApiError}
 * @property {Array[{message, path, type, value}]} {apiErrors} - Array of error objects {message, path, type, value}
 * @return {ErrorObject} - A object with field {errors} containg error objects
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
