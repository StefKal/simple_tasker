import { makeApiRequest } from '../utils/apiRequests'

export const signupAction = async ({ request }) => {
  const data = await request.formData()
  const submission = {
    email: data.get('email'),
    password: data.get('password'),
  }
  try {
    const response = await makeApiRequest({
      method: request.method,
      url: 'http://localhost:8000/users/',
      data: submission,
    })
    if (!response.ok) {
      return { error: response.statusText }
    }
    return await { success: response.json() }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}
