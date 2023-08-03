import React, { useEffect, useState } from 'react'
import QuestionAnswer from './questionAnswer'
import axiosInstance from '../../api/axios'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import SearchBox from './search'
import Loader from './loader'

function QAsession() {
  const [search, setSearch] = useState('')
  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([])
  const [reload, setReload] = useState(false)
  const { token, userId } = useSelector((state) => state.User)
  const [loader,setLoader] = useState(true)
  

  useEffect(() => {
    axiosInstance.get('/user/getQuestions', {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setLoader(false)
      setQuestions(res.data.questions)
    }).catch((err) => {
      toast.error(err?.response?.data?.errMsg)
    })
  }, [reload])

  const addQuestion = () => {
    if(question.trim().length==0){
      toast.error('Ask any question')
    }else{
      axiosInstance.post('/user/addQuestion', { question }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then((res) => {
        toast.success(res.data.message)
        setReload(!reload)
      }).catch((err) => {
        toast.error(err?.response?.data?.errMsg)
      })
    }
  
  }


  return (
    <>
    {loader?<Loader/>:<div className='capitalize bg-[url(https://wallpaperaccess.com/full/1433024.jpg)] bg-cover bg-fixed min-h-screen'>
    <div className={`justify-end px-4 mx-auto lg:max-w-7xl pt-4 md:items-center flex md:px-8`}>
      <SearchBox search={search} setSearch={setSearch} />
    </div>
    <div className={`px-4 mx-auto lg:max-w-7xl pt-4 md:items-center bg-black bg-opacity-20 `}>
      <div className=''>
        <h1 className='text-3xl text-white'>Disscussion form</h1>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className='bg-slate-700 text-white focus:border-2 focus:border-white rounded-s-md px-2 py-1' />
          <button onClick={() => addQuestion()} className='bg-blue-700 rounded-e-md px-2 py-1'>Ask</button>
      </div>
      <div className='px-4 mx-auto lg:max-w-7xl pt-4 md:items-center bg-black bg-opacity-20 '>
        {questions.filter(question => question.question.toLowerCase().includes(search.toLowerCase())).map((question) => (
          <QuestionAnswer key={question._id} userId={userId} question={question} token={token} />
        ))}
      </div>
    </div>
  </div>}</>
  )
}

export default QAsession