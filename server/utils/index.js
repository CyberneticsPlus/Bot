const { OAuth2Client } = require('google-auth-library');
const { google } = require('../config/keys');
const User = require('../models/user');

const client = new OAuth2Client(google.clientID);

exports.googleVerify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: google.clientID,
  });

  return ticket;
};

exports.saveUserDataToDB = async (payload) => {
  try {
    const { firstName, lastName, email } = payload;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = new User({
        firstName,
        lastName,
        email,
      });

      await newUser.save();
    }
  } catch (err) {
    console.error(err);
  }
};
