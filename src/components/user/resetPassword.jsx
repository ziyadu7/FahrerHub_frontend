import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios';
import { toast } from 'react-hot-toast';

function ResetPassword() {

    const { userId } = useParams()

    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const resetPassword = () => {
        if (password.trim().length == 0 || rePassword.trim().length == 0) {
            setErr('Fill all the fields')
        } else if (password == rePassword) {
            axiosInstance.post('/user/resetPassword', { password, userId }).then((res) => {
                toast.success(res?.data?.message)
                setSuccess(true)
            }).catch((err) => {
                if (err.data.response.errMsg) {
                    toast.error(err.data.response.errMsg)
                }
            })
        } else {
            setErr('Password not match')
        }
    }
    return (
        <main id="content" role="main" className="w-screen flex h-screen items-center max-w-md mx-auto p-6">
            <div className="mt-7 w-full bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Enter new password</h1>
                    </div>

                    <div className="mt-5">
                        <div>
                            <div className="grid gap-y-4">
                                <div>
                                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Enter Password</label>
                                    <div className="relative">
                                        <input
                                            type='password'
                                            placeholder='password'
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">RePassword</label>
                                    <div className="relative">
                                        <input
                                            type='password'
                                            placeholder='repassword'
                                            onChange={(e) => setRePassword(e.target.value)}
                                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-center text-red-600 mt-2">{err || '[password should contain A-Z&a-z&1-9]'}</p>
                                </div>
                                {success ? <button
                                    onClick={() => navigate('/login')}
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Go to login
                                </button> : <button
                                    onClick={resetPassword}
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Reset password
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResetPassword