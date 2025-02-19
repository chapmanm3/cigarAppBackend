import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { createClient } from "@supabase/supabase-js";
import { env } from "process";
import invariant from "tiny-invariant";
import { jwtVerify } from "jose";
import { addCigarHandler, getAllCigarsHandler } from './handlers/cigars';
import { addHumidorHandler, getHumidorsHandler } from './handlers/humidors';

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_KEY;
const supabaseJWTSecret = new TextEncoder().encode(env.SUPABASE_JWT_SECRET);

invariant(supabaseUrl)
invariant(supabaseKey)
invariant(supabaseJWTSecret)

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Access auth admin api
const adminAuthClient = supabase.auth.admin

async function authMiddleware(req: Request, res: Response, next: () => void) {
  const idToken = req.header("id-token")

  if (!idToken) {
    res.status(404).json('No id token header provided')
    return
  }

  const { payload } = await jwtVerify(idToken, supabaseJWTSecret)

  invariant(payload.sub)

  const userResponse = await adminAuthClient.getUserById(payload.sub)
  const { user } = userResponse.data

  if (!user) {
    console.error(userResponse)
    res.status(500).json("Server Error")
    return
  }

  req.user = user
  next()
}

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())
app.use(authMiddleware)

app.get('/cigars', (req, res) => getAllCigarsHandler(req, res));

app.post('/createCigar', (req, res) => addCigarHandler(req, res))

app.get('/humidors', (req, res) => getHumidorsHandler(req, res))

app.post('/createHumidor', (req, res) => addHumidorHandler(req, res))

app.get('/healthCheck', (req, res) => {
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`cigarApp backend listening on port ${port}`)
});
