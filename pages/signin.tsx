import Head from "next/head"
import { useEffect, useState } from "react"
import { signin } from "../services/auth"
import cookie from "cookiejs"
import toast, { Toaster } from 'react-hot-toast';
import Router from "next/router";
import { Icon } from '@iconify/react';
import Link from "next/link";

export default function Signin({ tokenExpired } : any){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({
    email: false,
    password: false
  })
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if(tokenExpired){
      cookie.remove('lithium_user')
      window.localStorage.removeItem('lithium_user')
    }
  }, [])

  const handleSignin = async (e: any) => {
    e.preventDefault()

    if(!email){
      setError({
        ...error,
        email: true
      })
      setErrorMessage({
        ...errorMessage,
        email: 'Email is required'
      })

      setTimeout(() => {
        setError({
          ...error,
          email: false
        })
        setErrorMessage({
          ...errorMessage,
          email: ''
        })
      }, 3000)
    }else if(!password){
      setError({
        ...error,
        password: true
      })
      setErrorMessage({
        ...errorMessage,
        password: 'Password is required'
      })

      setTimeout(() => {
        setError({
          ...error,
          password: false
        })
        setErrorMessage({
          ...errorMessage,
          password: ''
        })
      }, 3000)
    }else{
      setIsLoading(true)
      setError({
        email: false,
        password: false
      })

      const userPayload: { email: string, password: string } = { email, password }

      try{
        const user = await signin(userPayload)
        const now = new Date()

        const userObj = {
          user,
          expiry: now.getTime() + 86400000
        }

        cookie.set('lithium_user', JSON.stringify(userObj), 1)
        window.localStorage.setItem('lithium_user', JSON.stringify(userObj))

        toast('Signin Success',
          {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        )

        setTimeout(() => {
          Router.push('dashboard')
        }, 1500)
        

        setIsLoading(false)
      }catch(exception: any){
        setIsLoading(false)
        setPassword('')
        setError({
          email: true,
          password: true
        })
        setErrorMessage({
          ...errorMessage,
          password: exception.response?.data?.message ?
          exception.response?.data?.message :
          'Snap! there was a problem somewhere'
        })
      }
    }
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
    setError({
      ...error,
      email: false
    })
    setErrorMessage({
      ...errorMessage,
      email: ''
    })
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
    setError({
      ...error,
      password: false
    })
    setErrorMessage({
      ...errorMessage,
      password: ''
    })
  }
  return(
    <div>
      <Head>
        <title>Signin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Toaster position="bottom-right" reverseOrder={false}/>

      <div className="flex justify-center">
        <Link href='/'>
          <h1 className="text-gray-700 w-fit font-semibold text-3xl mt-16 sm:mt-20">Lithium</h1>
        </Link>
      </div>

      <div className="flex justify-center mx-5 mt-10 sm:mx-10">
        <div className="shadow-md border rounded-md w-full max-w-[35rem] p-4 md:p-8">
          <h1 className="text-center text-xl text-gray-700 font-semibold">Signin</h1>

          <form onSubmit={handleSignin} className="mt-4">
            <div className="text-gray-600">
              <label>Email</label>
              <input disabled={isLoading ? true : false} value={email} type="email" onChange={handleEmailChange} placeholder="Enter your email" className={`${error.email ? 'border-red-500 focus:outline-red-500' : 'border-gray-700'} border w-full rounded-md py-2 px-3`}/>
              {
                error.email && <label className="text-sm text-red-500">{errorMessage.email}</label>
              }
            </div>

            <div className="text-gray-600 mt-5">
              <label>Password</label>
              <input disabled={isLoading ? true : false} value={password} onChange={handlePasswordChange} placeholder="Enter your password" type="password" className={`${error.password ? 'border-red-500 focus:outline-red-500' : 'border-gray-700'} border w-full rounded-md py-2 px-3`}/>
              {
                error.password && <label className="text-sm text-red-500">{errorMessage.password}</label>
              }
            </div>

            <div className="mb-16 mt-5">
              <button disabled={isLoading ? true : false} type="submit" className="bg-gray-700 w-full hover:bg-gray-600 rounded-md py-3 h-12 px-3 text-white">
                {
                  isLoading ? <Icon className="mx-auto animate-spin" icon="icomoon-free:spinner2" color="white" /> : 'Signin'
                }
              </button>

              <div className="flex text-gray-700 mt-3 justify-center space-x-2">
                <p>Dont have an account?</p>

                <Link className="hover:underline" href='/signup'>Signup</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const userStr = context.req.cookies['lithium_user']

  console.log(userStr)
  if(userStr){
    const userLithium = JSON.parse(userStr)
    const now = new Date()

    if(now.getTime() > userLithium.expiry){
      // token is expired
      return { 
        props: { 
          tokenExpired: true
        } 
      }
    }else{
      // user is still logged in
      return {
        redirect: {
          permanent: false,
          destination: `/`
        },
      };
    }
  }else{
    return { 
      props: { 
        tokenExpired: true
      } 
    }
  }
}