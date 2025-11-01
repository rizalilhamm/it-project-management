
async function isValidEmail(email) {
  // Check for existence and that it's a string
    if (!email || typeof email !== 'string') {
      return false;
    }
    
    // Regex: one or more characters, followed by '@', then one or more characters, 
    // then '.', then one or more characters (e.g., test@domain.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
  
}

module.exports = { isValidEmail }