function checkAuth(req, res, next) {
  const { apiKey } = req.query;

  if (apiKey !== "12345") {
    return res.status(401).send("Provide valid API Key");
  }

  next();
}

module.exports = checkAuth;
