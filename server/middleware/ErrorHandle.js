const CreateError = (message, statusCode, errorFound) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.errorFound = errorFound;
    return err;
  };
  
  const ErrorHandle = async (error, req, res, next) => {
    const { message, statusCode, errorFound } = error;
    return res.status(statusCode || 500).json({
      success: false,
      message,
      errorFound,
    });
  };
  
  module.exports = { ErrorHandle, CreateError };
  