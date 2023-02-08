import Link from "next/link"
export default function Nav(){
  return(
    <div className="bg-gray-800 py-3 w-full flex justify-between px-4 sm:px-6">
      <div className="flex items-center text-gray-300 font-semibold text-3xl">
        Lithium 
      </div>

      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition duration-75 delay-75 ease-linear">
          <Link href="/signin">
            Signin
          </Link>
        </button>

        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-400 transition duration-75 delay-75 ease-linear">
          <Link href="/signup">
            Signup
          </Link>
        </button>
      </div>
    </div>
  )
}