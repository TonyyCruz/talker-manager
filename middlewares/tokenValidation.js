const tokenIsRequired = 'Token não encontrado';
const tokenInvalid = 'Token inválido';

const tokenValidation = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (token === undefined) return res.status(401).json({ message: tokenIsRequired });
  if (token.length !== 16) return res.status(401).json({ message: tokenInvalid });

  next();
};

module.exports = {
  tokenValidation,
};