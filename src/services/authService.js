const jwt = require('jsonwebtoken');
const usersRepo = require('../repositories/usersRepository');
const hash = require('../utils/hash');
const dotenv = require('dotenv');
dotenv.config();

async function register(data) {
  if (data.password.length < 8) {
    const error = new Error('Password must be at least 8 characters long');
    error.code = 400
    throw error
  }
  const checkUser = await usersRepo.findByEmail(data.email)
  
  if (checkUser.id != 0) {
    const error = new Error('User already exist')
    error.code = 400
    throw error
  }

  data.password = await hash.hashPassword(data.password);
  const user = await usersRepo.createUser(data);
  return user;
}

async function login({ email, password }) {
  
  const user = await usersRepo.findByEmail(email);
  // if (user.id == 0) {
  //   const error = new Error('User not found')
  //   error.code = 404
  //   throw error
  // }

  const ok = await hash.compare(password, user.password);
  if (!ok) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, 
      role: user.role, 
      email: user.email }, 
      process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  return token;
}

module.exports = { register, login };
