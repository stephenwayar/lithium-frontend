import Link from "next/link"
import { useEffect, useState } from "react"
import cookie from 'cookiejs'
import Router from "next/router"

export default function Nav({ tokenExpired }: any){
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if(tokenExpired){
      cookie.remove('lithium_user')
      window.localStorage.removeItem('lithium_user')
    }else{
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    cookie.remove('lithium_user')
    window.localStorage.removeItem('lithium_user')
    
    setIsLoggedIn(false)

    Router.push('/')  
  }
  return(
    <div className="bg-gray-800 py-3 w-full flex justify-between px-4 sm:px-6">
      <div className="flex items-center text-gray-300 font-semibold text-3xl">
        <Link href='/'>
          Lithium
        </Link> 
      </div>

      <div className="flex space-x-3">
        {
          isLoggedIn ?
          <button onClick={handleLogout} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition duration-75 delay-75 ease-linear">
            Logout
          </button> :
          <Link href="/signin">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition duration-75 delay-75 ease-linear">
              Signin
            </button>
          </Link>
        }

        {
          isLoggedIn ?
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition duration-75 delay-75 ease-linear">
              Dashboard
            </button>
          </Link> :
          <Link href="/signup">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition duration-75 delay-75 ease-linear">
              Signup
            </button>
          </Link>
        }
      </div>
    </div>
  )
}