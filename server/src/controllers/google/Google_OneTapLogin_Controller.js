const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const createUserIfNotExists = require('../userActions')

exports.googleLogin = async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    // Extract user info from Google payload
    const username = payload.name || payload.email.split('@')[0];
    const email = payload.email;
    const password = null; // or generate a random string if needed
    const picture = payload.picture || null;
    const create_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    createUserIfNotExists(username, email, password, picture, create_at)
    
    
    res.json({ success: true, user: payload });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid Google credential', error: error.message });
  }
};
