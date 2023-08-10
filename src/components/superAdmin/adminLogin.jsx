import React, { useState , useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { useDispatch } from 'react-redux'
import { superAdminLogin } from '../../store/slice/superAdmin'

function AdminLogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('loging')
    },[])

    async function handleLogin() {
        if (email.trim().length == 0 || password.trim().length == 0) {
            toast.error('Fill all the fields')
        } else {
            axiosInstance.post('/admin/login', { email, password }).then((res) => {

                if (res.data.message) {
                    toast.success(res.data.mesaage)
                    const name = res.data.name
                    const role = res.data.role
                    const token = res.data.token
                    dispatch(superAdminLogin({ name, role, token }))
                    navigate('/admin')
                }
            }).catch((err) => {
                if(err.response.status==500){
                    navigate('/serverError')
                }else if(err?.response?.data){
                    toast.error(err?.response?.data?.errMsg)
                }
            })
        }
    }

    return (
        <>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Admin Sign in</h1>

                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email" />

                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />

                        <button
                            type="submit"
                            onClick={() => handleLogin()}
                            className="w-full text-center py-3 rounded bg-green-800 text-white hover:bg-green-dark focus:outline-none my-1"
                        >Login Account</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin