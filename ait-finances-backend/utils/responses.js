const { transformResponseModel } = require("./transform");

function error(res, { message = null, code = null }) {
  return res.status(code).json(transformResponseModel({ message, code }));
}

function success(res, { data = null, code = 200 }) {
  return res.status(code).json(transformResponseModel({ data }));
}

module.exports = {
  error,
  success
};
