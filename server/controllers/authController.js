const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { googleVerify } = require('../utils');

exports.googleSignIn = async (req, res) => {
  try {
    const ticket = await googleVerify(req.body.tokenId);

    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ firstName: name.split(' ')[0], lastName: name.split(' ')[1], email });
    }

    const payload = { userId: user.id };

    const token = jwt.sign(payload, req.app.get('jwtSecret'));

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
