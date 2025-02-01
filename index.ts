import { addCigarHandler, getAllCigarsHandler } from "./src/handlers/cigars";
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { createClient } from "@supabase/supabase-js";
import { env } from "process";
import invariant from "tiny-invariant";
import { jwtVerify } from "jose";

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

  req.headers['uid'] = user?.id
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
