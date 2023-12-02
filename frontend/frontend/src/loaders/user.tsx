import { refreshAction } from '../actions/_guest.login_actions'
import { makeApiRequest } from '../utils/apiRequests'

export const UserLoader = async ({ params }) => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'))
  let response = await makeApiRequest({
    method: 'GET',
    url: `http://localhost:8000/users/${params.uuid}/`,
    token: authTokens.access,
  })

  if (response.status == 401) {
    const refresh = await refreshAction(authTokens.refresh)
    localStorage.setItem('authTokens', JSON.stringify(refresh))
  }

  if (!response.ok) {
    throw new Response('Not Found', { status: 404 })
  }

  const data = await response.json()
  console.log('inloader', data)

  return data
}
