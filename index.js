const express = require('express')
const app = express()
const port = 3000

app.get('/cigars', (req, res) => {
  getAllCigars
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`cigarApp backend listening on port ${port}`)
});
