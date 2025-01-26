import { addCigarHandler, getAllCigarsHandler } from "./src/handlers/cigars";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { initializeApp, applicationDefault } from "firebase-admin/app";

//Init firebase admin
const fireBase = initializeApp({
  credential: applicationDefault()
})

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())

app.get('/cigars', (req, res) => getAllCigarsHandler(req, res));

app.post('/createCigar', (req, res) => addCigarHandler(req, res))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`cigarApp backend listening on port ${port}`)
});
