const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { full_name, email, password, role } = req.body;
    console.log('aman')
    
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ error:'missing fields' });
    } 
      
    if (!['supervisor','staff'].includes(role)) {
      return res.status(400).json({ error:'invalid role' });
    }

    const user = await authService.register({ 
      full_name,
      email,
      password,
      role
    });

    res.status(201).json(user);
  
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(err.code).json({ error: err.message, code: err.code });
  }
}


module.exports = { register, login };
