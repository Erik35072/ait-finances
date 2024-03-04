function transformResponseModel({ data = null, message = null, code = null }) {
  return {
    data,
    error:
      message || code
        ? {
            message,
            code
          }
        : null
  };
}

module.exports = {
  transformResponseModel
};
