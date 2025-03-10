import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";
import { jwtVerify } from "jose";
import { env } from "process";
import invariant from "tiny-invariant";


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

export async function authMiddleware(req: Request, res: Response, next: () => void) {
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


