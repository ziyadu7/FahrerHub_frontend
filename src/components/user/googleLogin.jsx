import React, { useEffect, useState } from 'react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '../../api/axios';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../store/slice/user'


function GoogleLoginComponent() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [user, setUser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => { setUser(codeResponse) },
        onError: (error) => { console.log('Login Failed:', error); toast.error('Login Failed:') }
    });

    const googleLogin = () => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                handleLogin(res.data)
            })
            .catch((err) => { console.log(err, "Error") });

    }

    const handleLogin = (profile) => {
        axiosInstance.post('/user/googleLogin', { profile }).then((res) => {
            const name = res?.data?.name
            const token = res?.data?.token
            const role = res?.data?.role
            const userId = res?.data?.userId
            dispatch(userLogin({ name, token, role, userId }))
            navigate('/')
        }).catch((err) => {
            if(err.response.status==403){
                navigate('/accessDenied')
            }else if(err.response.status==500){
                navigate('/serverError')
            }else if(err?.response?.data){
                toast.error(err?.response?.data?.errMsg)
            }
        })
    }

    useEffect(
        () => {
            googleLogin()
        },
        [user]
    );

    return (

        <div>
            <GoogleLogin onSuccess={login} />
        </div>
    )
}

export default GoogleLoginComponent