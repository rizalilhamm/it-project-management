const userRepo = require('../repositories/usersRepository');


async function detail(user_id) {
  
  const user = await userRepo.findById(user_id);
  if (!user) {
    console.log('masuk:')
    throw new Error('User not found');
  }
  return user;
}

async function update(user_id, { full_name }) {
  
  const updatedUser = await userRepo.update(user_id, { full_name });
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
}

module.exports = {
  detail,
  update,
};

