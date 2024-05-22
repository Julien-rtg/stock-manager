const express = require('express');
const app = express();
const port = 3000;
const auth = require('./routes/auth');
const userModel = require('./models/User.model');

app.use(express.json());

app.use('/api/auth', auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

userModel.syncDb();