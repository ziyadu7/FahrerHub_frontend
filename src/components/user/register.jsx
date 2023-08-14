import React, { useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'


function SignUp() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [Err, setErr] = useState(null)
  const navigate = useNavigate()

  const regex_password = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9]){8,16}/gm
  // const regex_otp = /^(?=.*[0-9])/gm
  const regex_mobile = /^\d{10}$/

  async function handleSubmit() {

    try {
      axiosInstance.post('/user/register', { name, email, phone, password }).then((res) => {
        if (res.data.message) {
          toast.success(res.data.message)
          navigate('/login')
        }
      }).catch((err) => {
        if (err.response.status === 404) {
          navigate('/serverError')
        } else if (err.response.status == 500) {
          navigate('/serverError')
        } else if (err?.response?.data) {
          toast.error(err?.response?.data?.errMsg)
        }
      })
    } catch (error) {
      console.log(error);
    }


  }



  function onSignUP() {
    if (name.trim().length == 0 || email.trim().length == 0 || phone.trim().length == 0 || password.trim().length == 0 || rePassword.trim().length == 0) {
      setErr('Fill all the fields')
    } else {
      if ((regex_mobile.test(phone) == false)) {
        setErr('Enter valid mobile number')
      } else if (regex_password.test(password) == false) {
        setErr('Use strong password')
      } else if (password !== rePassword) {
        setErr("Password doesn't match")
      } else {
        handleSubmit()
      }
    }


  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name" />

            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email" />
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="phone"
              placeholder="phone No" />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={`block border ${Err == 'Use strong password' && 'border-red-700'} border-grey-light w-full p-3 rounded mb-4`}
              name="password"
              placeholder="Password" />
            <input
              type="password"
              onChange={(e) => setRePassword(e.target.value)}
              className={`block border ${Err == "Password doesn't match" && 'border-red-700'} border-grey-light w-full p-3 rounded mb-4`}
              name="confirm_password"
              placeholder="Confirm Password" />
            <div className='flex justify-center'>
              <span className='text-red-600 text-sm'>{Err ? Err : '[password should contain A-Z&a-z&1-9]'}</span>
            </div>
            <button
              type="submit"
              onClick={() => onSignUP()}
              className="w-full text-center cursor-pointer py-3 rounded bg-green-800 text-white hover:bg-green-dark focus:outline-none my-1"
            >Create Account</button>


          </div>

          <div className="text-grey-dark mt-6 flex">
            Already have an account?
            <p className="no-underline border-b border-blue text-blue cursor-pointer" onClick={()=>navigate('/login')}>
              Log in
            </p>.
          </div>
        </div>
      </div>
    </>

  )
}

export default SignUp