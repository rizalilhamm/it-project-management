const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ error: "all fields are required" });
    }

    if (!["supervisor", "staff"].includes(role)) {
      return res.status(400).json({ error: "invalid role" });
    }

    const user = await authService.register({
      full_name,
      email,
      password,
      role,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(err.code).json({ error: err.message, code: err.code });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'missing fields' });
    }

    const token = await authService.login({ email, password });

    if (!token) {
      return res.status(400).json({ error: 'invalid credentials' });
    }

    res.json({ token });
  } catch (err) {
    res.status(err.code).json({ error: err.message, code: err.code });
  }
}

async function resetPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "missing email or invalid format" });
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return res.status(400).json({ error: "invalid email format" });
    }

    const token = await authService.resetPassword(email);

    if (!token) {
      return res.status(400).json({ error: "invalid email" });
    }

    res.json({ token });
  } catch (err) {
    res.status(err.code).json({ error: err.message, code: err.code });
  }
}

module.exports = { register, login, resetPassword };
