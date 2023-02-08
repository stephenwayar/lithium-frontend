import Head from "next/head"
import toast, { Toaster } from 'react-hot-toast'
import Link from "next/link"
import { signup } from "../services/auth"
import { useEffect, useState } from "react"
import Router from "next/router";
import { Icon } from '@iconify/react';
import cookie from "cookiejs"

export default function Signup({ tokenExpired }: any){
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    lastName: false
  })
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })

  useEffect(() => {
    if(tokenExpired){
      cookie.remove('lithium_user')
      window.localStorage.removeItem('lithium_user')
    }
  }, [])

  const handleSignup = async (e: any) => {
    e.preventDefault()

    if(!firstName){
      setError({
        ...error,
        firstName: true
      })
      setErrorMessage({
        ...errorMessage,
        firstName: 'First name is required'
      })

      setTimeout(() => {
        setError({
          ...error,
          firstName: false
        })
        setErrorMessage({
          ...errorMessage,
          firstName: ''
        })
      }, 3000)
    }else if(!lastName){
      setError({
        ...error,
        lastName: true
      })
      setErrorMessage({
        ...errorMessage,
        lastName: 'Last name is required'
      })

      setTimeout(() => {
        setError({
          ...error,
          lastName: false
        })
        setErrorMessage({
          ...errorMessage,
          lastName: ''
        })
      }, 3000)
    }else if(!email){
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
    }else if(password.length < 6){
      setError({
        ...error,
        password: true
      })
      setErrorMessage({
        ...errorMessage,
        password: 'Password must be at least 6 characters long'
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
    }else if(!confirmPassword){
      setError({
        ...error,
        confirmPassword: true
      })
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Confirm password'
      })

      setTimeout(() => {
        setError({
          ...error,
          confirmPassword: false
        })
        setErrorMessage({
          ...errorMessage,
          confirmPassword: ''
        })
      }, 3000)
    }else if(password !== confirmPassword){
      setError({
        ...error,
        password: true,
        confirmPassword: true
      })
      setConfirmPassword('')
      setErrorMessage({
        ...errorMessage,
        confirmPassword: 'Passwords do not match'
      })

      setTimeout(() => {
        setError({
          ...error,
          password: true,
          confirmPassword: true
        })
        setErrorMessage({
          ...errorMessage,
          confirmPassword: 'Passwords do not match'
        })
      }, 3000)
    }else{
      setIsLoading(true)
      setError({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false
      })

      interface UserPayload {
        email: string, 
        password: string, 
        firstName: string, 
        lastName: string 
      }

      const userPayload: UserPayload = { 
        email, 
        password, 
        firstName, 
        lastName
       }

      try{
        await signup(userPayload)

        toast('Signup Success',
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
          Router.push('/signin')
        }, 1500)
        
        setIsLoading(false)
      }catch(exception: any){
        console.log(exception)
        setIsLoading(false)
        setPassword('')
        setConfirmPassword('')
        setError({
          ...error,
          email: true
        })
        setErrorMessage({
          ...errorMessage,
          email: exception.response?.data?.message ?
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

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value)
    setError({
      ...error,
      confirmPassword: false
    })
    setErrorMessage({
      ...errorMessage,
      confirmPassword: ''
    })
  }

  const handleFNameChange = (e: any) => {
    setFirstName(e.target.value)
    setError({
      ...error,
      firstName: false
    })
    setErrorMessage({
      ...errorMessage,
      firstName: ''
    })
  }

  const handleLNameChange = (e: any) => {
    setLastName(e.target.value)
    setError({
      ...error,
      lastName: false
    })
    setErrorMessage({
      ...errorMessage,
      lastName: ''
    })
  }
  return(
    <div>
      <Head>
        <title>Signup</title>
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
          <h1 className="text-center text-xl text-gray-700 font-semibold">Signup</h1>

          <form onSubmit={handleSignup} className="mt-8">
            <div className="sm:flex sm:justify-between sm:space-x-4">
              <div className="text-gray-600 w-full">
                <label>First name</label>
                <input disabled={isLoading ? true : false} value={firstName} type="text" onChange={handleFNameChange} placeholder="Enter your first name" className={`${error.firstName ? 'border-red-500 focus:outline-red-500' : 'border-gray-700'} border w-full rounded-md py-2 px-3`}/>
                {
                  error.firstName && <label className="text-sm text-red-500">{errorMessage.firstName}</label>
                }
              </div>

              <div className="text-gray-600 w-full mt-5 sm:mt-0">
                <label>Last name</label>
                <input disabled={isLoading ? true : false} value={lastName} type="text" onChange={handleLNameChange} placeholder="Enter your last name" className={`${error.lastName ? 'border-red-500 focus:outline-red-500' : 'border-gray-700'} border w-full rounded-md py-2 px-3`}/>
                {
                  error.lastName && <label className="text-sm text-red-500">{errorMessage.lastName}</label>
                }
              </div>
            </div>

            <div className="text-gray-600 mt-5">
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

            <div className="text-gray-600 mt-5">
              <label>Confirm Password</label>
              <input disabled={isLoading ? true : false} value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" type="password" className={`${error.confirmPassword ? 'border-red-500 focus:outline-red-500' : 'border-gray-700'} border w-full rounded-md py-2 px-3`}/>
              {
                error.confirmPassword && <label className="text-sm text-red-500">{errorMessage.confirmPassword}</label>
              }
            </div>

            <div className="mb-20 mt-5">
              <button disabled={isLoading ? true : false} type="submit" className="bg-gray-700 w-full hover:bg-gray-600 rounded-md py-3 h-12 px-3 text-white">
                {
                  isLoading ? <Icon className="mx-auto animate-spin" icon="icomoon-free:spinner2" color="white" /> : 'Signup'
                }
              </button>

              <div className="flex text-gray-700 mt-3 justify-center space-x-2">
                <p>Already have an account?</p>

                <Link className="hover:underline" href='/signin'>Signin</Link>
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