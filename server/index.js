const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { port, dbURI, jwtSecret } = require('./config');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const app = express();

app.use(cors());
app.use(express.json());

app.set('jwtSecret', jwtSecret);

app.use('/auth', authRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
