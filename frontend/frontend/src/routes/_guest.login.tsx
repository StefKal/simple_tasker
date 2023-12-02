import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from '@material-tailwind/react'
import { useFetcher, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.data && fetcher.state == 'idle') {
      auth.loginUser(fetcher.data)
      const user = jwtDecode(fetcher.data.access)
      navigate(`/users/${user.user_id}/`, { replace: true })
    }
  }, [fetcher])

  return (
    <div className="flex justify-center p-10 gap-10 bg-gray-100 w-full h-full">
      {fetcher.state == 'submitting' ? (
        <Spinner size="xl" color="blue" />
      ) : (
        <div className="min-w-fit w-full h-fit md:w-[30%] flex-shrink bg-gray-100">
          <Card
            color="transparent"
            shadow={true}
            className="bg-white p-5 w-full">
            <Typography variant="h4" color="blue-gray">
              Welcome
            </Typography>
            <Typography color="gray" className="mt-1 font-gotham-light">
              Log in to your account to continue.
            </Typography>
            <fetcher.Form method="post" action="/login" className="mt-8 mb-2">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  name="email"
                  crossOrigin="anonymous"
                  value="user@example.com"
                  size="lg"
                  label="email"
                  required
                />

                <Input
                  crossOrigin="anonymous"
                  type="password"
                  size="lg"
                  value="string"
                  label="password"
                  name="password"
                  title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
                />
              </div>
              <Button
                className="mt-6 normal-case text-sm shadow-sm"
                fullWidth
                type="submit">
                Log in
              </Button>
              <Typography
                color="gray"
                className="mt-4 text-center font-gotham-light">
                Don't have an account?{' '}
                <a href="/signup" className="font-medium text-gray-900">
                  Sign Up
                </a>
              </Typography>
            </fetcher.Form>
          </Card>
        </div>
      )}
    </div>
  )
}
