class HttpError extends Error {
  constructor(message, ecode) {
    super(message); //adding a message property
    this.code = ecode; // adding a code property
  }
}

module.exports = HttpError;
