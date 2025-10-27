// Load environment variables *before* any other code uses them.
// This is the standard, synchronous CommonJS way.
require('dotenv').config();

// Standard CommonJS imports
const jwt = require('jsonwebtoken');

// --- Configuration and Constants ---
// Destructure and validate environment variables immediately.
// Use nullish coalescing (??) for a safe default or throw an error.
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  // Good practice: Fail fast if critical environment vars are missing
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  // Use a more appropriate exit code for config error (e.g., 1 for general error)
  process.exit(1); 
}

const TOKEN_TYPE = 'Bearer';
// ---

/**
 * Middleware to verify the JWT from the Authorization header.
 * Attaches the decoded payload to req.user.
 * * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  // Use array destructuring with error checking
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ error: `Invalid Authorization format. Expected: ${TOKEN_TYPE} <token>` });
  }
  
  const [type, token] = parts;

  if (type !== TOKEN_TYPE) {
    return res.status(401).json({ error: `Unsupported token type. Expected: ${TOKEN_TYPE}` });
  }

  try {
    // Note: jwt.verify throws an error if verification fails (expired, invalid signature, etc.)
    const payload = jwt.verify(token, JWT_SECRET);
    
    // Attach the payload to the request object for downstream use
    req.user = payload;
    
    next();
  } catch (error) {
    // Log the error for debugging, but send a generic message to the client
    // console.error("JWT verification failed:", error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Higher-order function that returns a middleware to check if the user 
 * has the required role based on the data attached to req.user.
 * * @param {string} requiredRole - The role string required to access the route.
 * @returns {function} Express middleware function.
 */
function requireRole(requiredRole) {
  return (req, res, next) => {
    
    // It's crucial to check for req.user existence as a safeguard.
    if (!req.user || !req.user.role) {
      // 403 Forbidden is often more semantically correct than 401 here if authMiddleware has run.
      // However, 401 is okay if it implies the token didn't contain required data.
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: 'User authentication data is missing or incomplete.',
      });
    }

    // Check for role match
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ 
        error: 'Forbidden', 
        message: `Insufficient role. Required: ${requiredRole}`,
      });
    }

    next();
  };
}

// Standard CommonJS exports
module.exports = {
  authMiddleware,
  requireRole,
};