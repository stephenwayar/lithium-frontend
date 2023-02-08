import axios from "axios"

const HOST = process.env.HOST

const signinURL = `${HOST}/api/auth/login/user`
const signupURL = `${HOST}/api/auth/register/user`

interface SigninPayload {
  email: string,
  password: string
}

interface SignupPayload {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

const signin = async (payload: SigninPayload) => {
  const res = await axios.post(signinURL, payload)
  return res.data
}

const signup = async (payload: SignupPayload) => {
  const res = await axios.post(signupURL, payload)
  return res.data
}

export { signin, signup }