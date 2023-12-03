import { makeApiRequest } from '../utils/apiRequests'

export const addTasks = async (uuid) => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'))

  const response = await makeApiRequest({
    method: 'POST',
    url: `http://localhost:8000/users/${uuid}/populate_tasks/`,
    token: authTokens.access,
  })

  return await response.json()
}

export const updateFavorite = async (taskId, isFavorite) => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'))

  const response = await makeApiRequest({
    method: 'PATCH',
    url: `http://localhost:8000/tasks/${taskId}/`,
    data: { is_favorite: isFavorite },
    token: authTokens.access,
  })

  return await response.json()
}

export const completeTask = async (taskId, isCompleted) => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'))

  const response = await makeApiRequest({
    method: 'PATCH',
    url: `http://localhost:8000/tasks/${taskId}/`,
    data: { completed: isCompleted },
    token: authTokens.access,
  })

  return await response.json()
}
