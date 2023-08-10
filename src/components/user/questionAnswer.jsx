import React, { useEffect, useState } from 'react'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import axiosInstance from '../../api/axios'
import { toast } from 'react-hot-toast'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'

function QuestionAnswer(props) {

  const [question, setQuestion] = useState([])

  const token = props.token
  const userId = props.userId

  useEffect(() => {
    setQuestion(props?.question)
  }, [])

  const [arrow, setArrow] = useState(false)
  const [answer, setAnswer] = useState('')

  const addAnswer = (questionId, event) => {
    event.preventDefault();
    axiosInstance.post('/user/addAnswer', { answer, questionId }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res?.data?.answers);
      setQuestion((prevQuestion) => {
        return {
          ...prevQuestion,
          answers: res?.data?.answers,
        }
      })
      toast.success(res.data.message)
    }).catch((err) => {
      if (err.response.status == 403) {
        navigate('/accessDenied')
      } else if (err.response.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
    })
  }

  const addLike = (answerId, questionId, event) => {
    event.preventDefault();
    axiosInstance
      .post('/user/addLike', { answerId, questionId }, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        setQuestion((prevQuestion) => {
          const updatedAnswers = prevQuestion.answers.map((answer) => {
            if (answer._id === answerId) {
              if (!answer.likes.includes(userId)) {
                return {
                  ...answer,
                  likeCount: answer.likeCount + 1,
                  likes: [...answer.likes, userId],
                };
              }
            }
            return answer;
          });
          return {
            ...prevQuestion,
            answers: updatedAnswers,
          };
        });
      })
      .catch((err) => {
        if (err.response.status == 403) {
          navigate('/accessDenied')
        } else if (err.response.status == 500) {
          navigate('/serverError')
        } else if (err?.response?.data) {
          toast.error(err?.response?.data?.errMsg)
        }
      });
  };

  const disLike = (answerId, questionId, event) => {
    event.preventDefault();
    axiosInstance
      .post('/user/disLike', { answerId, questionId }, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => {
        setQuestion((prevQuestion) => {
          const updatedAnswers = prevQuestion.answers.map((answer) => {
            if (answer._id === answerId) {
              if (answer.likes.includes(userId)) {
                return {
                  ...answer,
                  likeCount: answer.likeCount - 1,
                  likes: answer.likes.filter((id) => id !== userId),
                };
              }
            }
            return answer;
          });
          return {
            ...prevQuestion,
            answers: updatedAnswers,
          };
        });
      })
      .catch((err) => {
        if (err.response.status == 403) {
          navigate('/accessDenied')
        } else if (err.response.status == 500) {
          navigate('/serverError')
        } else if (err?.response?.data) {
          toast.error(err?.response?.data?.errMsg)
        }
      });
  };


  return (
    <section className="py-2 bg-transparent w-full text-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -m-8">
          <div className="w-full md:w-1/2 p-8">
            <div className="flex flex-wrap -m-1.5">
              <div className="w-full p-1.5">
                <a className="block p-6 border border-gray-200 hover:border-gray-300 rounded-lg transition duration-200" href="#">
                  <div className="flex flex-wrap items-center justify-between -m-2">
                    <div className="w-auto p-2">
                      <p>Question By : {question?.questionBy?.name}</p>
                      <h3 className="font-semibold tracking-tight">{question?.question}?</h3>
                    </div>
                    <div className="w-auto p-2">
                      {arrow ? <button onClick={(e) => { e.preventDefault(); setArrow(false) }}>
                        <SlArrowUp />
                      </button> : <button onClick={(e) => { e.preventDefault(); setArrow(true) }}>
                        <SlArrowDown />
                      </button>}
                    </div>

                  </div>
                  <div className={`${arrow ? 'block' : " hidden"} `}>
                    <div className='flex'>
                      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className=' bg-slate-700 focus:border-2 focus:border-white rounded-s-md px-0 sm:px-2 py-1' />
                      <button onClick={(e) => addAnswer(question._id, e)} className='bg-blue-700 rounded-e-md px-2 py-1'>answer</button>
                    </div>
                    {
                      question?.answers?.map((answer) => (
                        <div key={answer._id} className='mt-2'>
                          <p>Answer by : {answer?.answerBy?.name}</p>
                          <div className='flex justify-between'>
                            <p className={`tracking-tight`}>Answer : {answer?.answer}</p>
                            <div className='flex'>
                              <p>Likes:{answer?.likeCount}</p>{answer?.likes?.includes(userId) ? <AiFillLike onClick={(e) => disLike(answer._id, question._id, e)} className='w-8 h-5' /> : <AiOutlineLike onClick={(e) => addLike(answer._id, question._id, e)} className='w-8 h-5' />}
                            </div>
                          </div>

                        </div>
                      ))
                    }
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuestionAnswer