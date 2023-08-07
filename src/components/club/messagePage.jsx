import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import io from 'socket.io-client'
import '../../assets/css/club/upcomingRides.css'

const END_POINT = 'https://fahrerhub.site';
let socket;
function MessagePage(props) {

    const { userId, token } = useSelector((store) => store.User)
    const clubToken = props.clubToken
    const bottomRef = useRef(null)

    const users = props?.users
    const head = props?.head
    const rideId = props?.rideId
    const clubId = props?.clubId

    const [chat, setChat] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [profile1, setProfile1] = useState(null)
    const [profile2, setProfile2] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        socket = io(END_POINT)
        socket.emit('setup', userId)
        console.log('connecting');
        socket.on('connection')
        return () => {
            socket.disconnect()
        }
    }, [])

    const loadChat = (userId, receiverId) => {
        axiosInstance.post('/chat/accessChat', { userId, receiverId, clubId, rideId }, {
            headers: {
                authorization: `Bearer ${clubToken}`
            }
        }).then((res) => {
            setMessages(res?.data?.messages)
            setChat(res?.data?.chat)
            if (res?.data?.chat.users[0]._id === userId) {
                setProfile1(res?.data?.chat.users[0].profileImage)
                setProfile2(res?.data?.chat.users[1].profileImage)
            } else {
                setProfile2(res?.data?.chat.users[0].profileImage)
                setProfile1(res?.data?.chat.users[1].profileImage)
            }
            let id = res?.data?.chat._id;
            console.log('joined chat');
            socket.emit('joinChat', id)
            setMessage('')
        }).catch((err) => {
            console.log(err);
            if (err?.response?.data?.errMsg) {
                toast.error(err.response.data.errMsg)
            }
        })
    }



    const sendMessage = () => {
        const chatId = chat?._id
        if (message.length !== 0) {
            axiosInstance.post('/chat/addMessage', { message, chatId }, {
                headers: {
                    authorization: `Bearer ${clubToken}`
                }
            }).then((res) => {
                let updMsg = [...messages, res?.data?.msg];
                setMessages(updMsg)
                setMessage('')
                console.log('new message');
                socket.emit('new message', res?.data?.msg, chatId)
            }).catch((err) => {
                if (err?.response?.data?.errMsg) {
                    toast.error(err.response.data.errMsg)
                }
            })
        }

    }

    useEffect(() => {
        socket.on('messageResponse', (msg, room) => {
            console.log(chat);
            console.log(msg.sender,'hhhh');
            console.log(msg?.sender?.toString()!==userId?.toString());
            console.log(userId);
            if (room == chat?._id&&msg?.sender?.toString()!==userId?.toString()) {
                console.log('response in');
                let updMsg = [...messages, msg];
                setMessages(updMsg)
            }
        })
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    })



    return (
        <><Toaster toastOptions={3000} />
            <div className="flex h-screen antialiased text-gray-800">
                <div className="sm:flex sm:flex-row h-full w-full overflow-x-hidden">
                    <div className="flex sm:flex sm:flex-col py-8 pl-6 overflow-x-scroll sm:overflow-y-scroll pr-2 gap-2 sm:w-64 bg-white flex-shrink-0">
                        <button onClick={() => navigate(-1)} className='bg-black hidden sm:block text-white hover:bg-white hover:text-black py-2 rounded-md'>Back</button>
                        {userId != head?._id ?
                            <div onClick={() => loadChat(userId, head._id)} className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">

                                <div className="h-20 w-20 rounded-full border overflow-hidden">
                                    <img
                                        src={head?.profileImage ? head?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                        alt="Avatar"
                                        className="h-full w-full"
                                    />
                                </div>
                                <div className="text-sm font-semibold mt-2">
                                    {head?.name}
                                </div>
                            </div> : ''}

                        {users.length !== 0 ? users.map((user) => (
                            <>
                                {user.rider._id !== userId ? <div key={user.rider._id} onClick={() => loadChat(userId, user?.rider?._id)} className={`flex flex-col items-center ${chat?.users.some(friend=>friend._id==user?.rider?._id)?"bg-indigo-300":"bg-indigo-100"} border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg`}>
                                    <div className="h-20 w-20 rounded-full border overflow-hidden">
                                        <img
                                            src={user.rider?.profileImage ? user.rider?.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                            alt="Avatar"
                                            className="h-full w-full"
                                        />
                                    </div>
                                    <div className="text-sm font-semibold mt-2">
                                        {user.rider.name}
                                    </div>
                                </div> : ''}
                            </>
                        )) : ''}

                    </div>

                    <div className="flex flex-col flex-auto h-full p-6 ">
                        <button onClick={() => navigate(-1)} className='bg-black px-4 sm:hidden text-white hover:bg-white hover:text-black py-2 rounded-md'>Back</button>

                        {chat ? <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                            <div className="flex flex-col h-full overflow-x-auto mb-4">

                                <div className="flex flex-col h-full">
                                    {messages.map((message) => (
                                        <div key={message._id} className="grid grid-cols-12 gap-y-2">
                                            {(message?.sender?._id || message?.sender) == userId ? <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                                <div className="flex items-center justify-start flex-row-reverse">
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                        <img
                                                            src={profile1 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                                            alt="Avatar"
                                                            className="h-full w-full rounded-full"
                                                        />
                                                    </div>
                                                    <div className="relative mr-3 w-full text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                        <div className='break-words'>{message?.message}</div>
                                                        <small className="text-xs text-gray-400"> {new Date(message?.createdAt).toLocaleString('en-US', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true
                                                        })}</small>
                                                    </div>
                                                </div>
                                            </div> : <div className="col-start-1 col-end-7 p-3 rounded-lg">
                                                <div className="flex flex-row items-center">
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                        <img
                                                            src={profile2 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                                            alt="Avatar"
                                                            className="h-full w-full rounded-full"
                                                        />
                                                    </div>
                                                    <div className="relative mr-3 w-full text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                        <div className='break-words'>{message?.message}</div>
                                                        <small className="text-xs text-gray-400"> {new Date(message?.createdAt).toLocaleString('en-US', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true
                                                        })}</small>
                                                    </div>
                                                </div>
                                            </div>}
                                            <div ref={bottomRef} />
                                        </div>
                                    ))}

                                </div>

                            </div>

                            <div>
                                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                    <div className="flex-grow ml-4">
                                        <div className="relative w-full">
                                            <input
                                                onChange={(e) => setMessage(e.target.value)}
                                                value={message}
                                                type="text"
                                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                                placeholder="Type your message..."
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <button
                                            onClick={() => sendMessage()}
                                            type='button'
                                            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                        >
                                            <span>Send</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className='flex justify-center h-screen '><h1 className='self-center text-3xl'>Select any message!!</h1></div>}

                    </div>
                </div>
            </div>

        </>
    )
}

export default MessagePage