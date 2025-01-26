import { addCigarHandler, getAllCigarsHandler } from "./src/handlers/cigars";
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { auth, credential } from "firebase-admin";
const serviceAccount = require("./firebaseServerKey/chapmanm3-cigarapp-firebase-adminsdk-9fp5l-1f5dd70a5f.json")

//Init firebase admin
const fireBase = initializeApp({
  credential: credential.cert(serviceAccount)
})

const firebaseAuth = auth()

async function authMiddleware(req: Request, res: Response, next: () => void) {
  const idToken = req.header("id-token")
  console.log("Request Headers: ", req.header("id-token"))

  if (!idToken) {
    res.status(404).json('No id token header provided')
    return
  }

  const { uid } = await firebaseAuth.verifyIdToken(idToken)
  req.headers['uid'] = uid
  next()
}

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())
app.use(authMiddleware)

app.use

app.get('/cigars', (req, res) => getAllCigarsHandler(req, res));

app.post('/createCigar', (req, res) => addCigarHandler(req, res))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`cigarApp backend listening on port ${port}`)
});
