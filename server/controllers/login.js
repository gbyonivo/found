import jwt from 'jsonwebtoken';
import { getAccountByEmailAndPassword } from './accountService.js';

const login = async ({ body: { email, password } }, res) => {
  const account = await getAccountByEmailAndPassword({ email, password });
  if (account) {
    const token = jwt.sign({ email, id: account.id }, process.env.SECRET);
    res.send(token);
  } else {
    res.status(401).send();
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }
  const token = authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.signedInAccount = decoded;
    next();
  });
};

export {
  login,
  authenticateToken,
};
