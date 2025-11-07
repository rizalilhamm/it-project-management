const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/usersRepository");
const hash = require("../utils/hash");
const dotenv = require("dotenv");
dotenv.config();

async function register(data) {
  if (data.password.length < 8) {
    const err = new Error("Password must be at least 8 characters long");
    err.code = 400;
    throw err;
  }
  const checkUser = await userRepo.findByEmail(data.email);
  if (checkUser) {
    const error = new Error("User already exist");
    error.code = 400;
    throw error;
  }

  data.password = await hash.hashPassword(data.password);
  const user = await userRepo.createUser(data);
  return user;
}

async function login({ email, password }) {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    return null;
  }

  const ok = await hash.compare(password, user.password);
  if (!ok) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
  return token;
}

async function resetPassword(email) {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    const error = new Error("User not found");
    error.code = 404;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
  return token;
}

module.exports = { register, login, resetPassword };
