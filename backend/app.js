const express = require('express');
const app = express();
const port = 3000;
const auth = require('./routes/auth');

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use('/api/auth', auth);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})