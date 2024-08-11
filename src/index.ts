import { getAllCigarsHandler } from "./handlers/cigars";

const app = express()
const port = 3000

app.get('/cigars', (req, res) => {
  getAllCigarsHandler(req, res)
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`cigarApp backend listening on port ${port}`)
});
