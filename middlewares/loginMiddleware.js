const randomToken = () => {
  const token = Math.random().toString(36).substr(2);
  const newToken = token + token;
  return newToken.slice(randomToken.length - 16);
};

const validateEmail = (email) => {
  const regexEmail = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
  if (regexEmail.test(email)) return true;
  return false;
};

const loginVerify = async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: 'o campo "email" é obrigatório' });
  }

  const emailCheck = validateEmail(email);
  if (!emailCheck) {
    return res.status(400).json({
      message: 'o campo "email" deve ter o formato "email@email.com"' });
  }

  if (password === undefined) {
    return res.status().json({ message: 'o campo "password" é obrigatório' });
  }

  const token = randomToken();
  res.status(200).json({ token });
};

module.exports = {
  loginVerify,
};