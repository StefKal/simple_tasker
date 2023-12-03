import { makeApiRequest } from '../utils/apiRequests'

export const loginAction = async ({ request }) => {
  const formData = await request.formData()
  const submission = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const response = await makeApiRequest({
    method: request.method,
    url: 'http://localhost:8000/auth/token/',
    data: submission,
  })
  if (response.status == 401) {
    return response.json()
  }
  if (!response.ok) {
    return { error: response.statusText }
  }
  return await { success: response.json() }
}

export const refreshAction = async (token) => {
  const submission = {
    refresh: token,
  }
  const response = await makeApiRequest({
    method: 'POST',
    url: 'http://localhost:8000/auth/token/refresh/',
    data: submission,
  })
  return await response.json()
}
