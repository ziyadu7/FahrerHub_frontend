import { toast } from 'react-hot-toast'

function errorFunction(err,navigate){
    if (err?.response?.status === 404) {
        navigate('/serverError')
      } else if (err?.response?.status == 403) {
        navigate('/accessDenied')
      } else if (err?.response?.status == 500) {
        navigate('/serverError')
      } else if (err?.response?.data) {
        toast.error(err?.response?.data?.errMsg)
      }
}

export default errorFunction