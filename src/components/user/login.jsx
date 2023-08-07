import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../store/slice/user'
import GoogleLoginComponent from './googleLogin'
import { GoogleOAuthProvider } from '@react-oauth/google'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [reMail, setRemail] = useState(false)
  const [forgott,setForgott] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function handleLogin() {
    if (email.trim().length == 0 || password.trim().length == 0) {
      toast.error('Fill all the fields')
    } else {
      axiosInstance.post('/user/login', { email, password, reMail }).then((res) => {
        if (res.data) {
          toast.success(res.data.message)
          const name = res.data.name
          const token = res.data.token
          const role = res.data.role
          const userId = res.data.userId
          dispatch(userLogin({ name, token, role, userId }))
          navigate('/')
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          setRemail(true)
          toast.error(error.response.data.errMsg)
        } else if (error.response.data.errMsg) {
          toast.error(error.response.data.errMsg)
        }
      })
    }
  }

  const forgotPassword = ()=>{
      axiosInstance.post('/user/forgottPassword',{email}).then((res)=>{
        toast.success(res.data.messasge)
      }).catch((error)=>{
        if (error.response.data.errMsg) {
          toast.error(error.response.data.errMsg)
        }
      })
  }


  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      {forgott?<main id="content" role="main" className="w-screen flex h-screen items-center max-w-md mx-auto p-6">
      <div className="mt-7 w-full bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <a onClick={() => setForgott(false)} className="text-blue-600 decoration-2 hover:underline font-medium">
                Login here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                    />
                  </div>
                  <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                </div>
                <button
                onClick={forgotPassword}
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>:<div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign in</h1>

            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder={email||"Email"} />

            {reMail == true ? '' : <><input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password" />
            <GoogleOAuthProvider clientId='956208601128-aea9cgt0a2135p8vfm4i77ntb1q0h8kj.apps.googleusercontent.com'>
              <GoogleLoginComponent />
            </GoogleOAuthProvider>
            </>
          }
          <div className=''>
            
            <button
              onClick={() => {handleLogin(),reMail?toast.success('Check your mail'):''}}
              className={`w-full text-center py-3 rounded ${reMail == true ? 'bg-amber-700' : 'bg-green-800'} text-white hover:bg-green-dark focus:outline-none my-1`}
            >{reMail == true ? 'Verify mail' : "Login Account"}</button>
            {/* <button
              onClick={()=>navigate('/otpLogin')}
              className={`w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1`}
            >Otp Login</button> */}
          </div>

          </div>
          <div className="text-grey-dark mt-6">
            <div>
            Don't have an account?
            <a className="no-underline border-b border-blue text-blue" href="/register">
              Register
            </a>.
            </div>
            <div className='flex justify-center'>
             <a className="no-underline border-b text-blue-700 border-blue text-blue" onClick={() => setForgott(true)}>
             Forgott Password?
            </a>.
            </div>
          </div>
        </div>
      </div>}
      
    </>
  )
}

export default Login