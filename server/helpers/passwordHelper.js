import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      if (!error) {
        resolve(hash);
      }
      reject(error);
    });
  });
});

const comparePassword = (password, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (res) {
      resolve(true);
    }
    reject(err);
  });
});

export { hashPassword, comparePassword };
