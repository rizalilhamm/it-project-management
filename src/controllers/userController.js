const userService = require('../services/userService');

async function detail(req, res) {
  try {
    const user_id = req.params.user_id;
    
    const user = await userService.detail(user_id);
    if (!user) {
      return res.status(404).send('User not found');
      
    }
    res.status(201).json(user);
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function update(req, res) {
  try {
    const user_id = req.params.user_id;
    const { full_name } = req.body;
    
    const updatedUser = await userService.update(user_id, { full_name });
    if (!updatedUser) {
      return res.status(404).send('User not found');
      
    }
    res.status(200).json(updatedUser);
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  detail, update
};
