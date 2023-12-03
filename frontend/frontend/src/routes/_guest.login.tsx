import { useActionData, useFetcher, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { jwtDecode } from 'jwt-decode'
import LoginComponent from '../components/Login'
import { ErrorComponent } from '../components/Error'

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const fetcher = useFetcher()
  const actionData = useActionData()

  const handleSuccess = () => {
    auth.loginUser(fetcher.data)
    const user = jwtDecode(fetcher.data.access)
    navigate(`/users/${user.user_id}/`, { replace: true })
  }

  let content
  if (actionData) {
    if (actionData.success) {
      handleSuccess()
    } else if (actionData.error) {
      content = <ErrorComponent />
    } else {
      content = <LoginComponent actionData={actionData} />
    }
  } else {
    content = <LoginComponent actionData={actionData} />
  }

  return (
    <div className="flex justify-center p-10 gap-10 bg-gray-100 w-full h-full">
      {content}
    </div>
  )
}
