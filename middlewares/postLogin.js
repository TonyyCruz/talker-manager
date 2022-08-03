const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/g;

const emailIsRequired = 'O campo "email" é obrigatório';
const invalidEmailFormat = 'O "email" deve ter o formato "email@email.com"';
const passwordIsRequired = 'O campo "password" é obrigatório';
const invalidPassLength = 'O "password" deve ter pelo menos 6 caracteres';

const randomToken = () => {
  const token = Math.random().toString(36).substr(2);
  const newToken = token + token;
  return newToken.slice(randomToken.length - 16);
};

const validateEmail = (email) => {
  const extraValidation = email.includes('.com');
  if (regexEmail.test(email) && extraValidation) return true;
  return false;
};

const loginVerify = async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined) return res.status(400).json({ message: emailIsRequired });
  const emailCheck = validateEmail(email);
  if (!emailCheck) return res.status(400).json({ message: invalidEmailFormat });
  if (password === undefined) return res.status(400).json({ message: passwordIsRequired });
  if (password.length < 6) return res.status(400).json({ message: invalidPassLength });

  const token = randomToken();
  res.status(200).json({ token });
};

module.exports = {
  loginVerify,
};