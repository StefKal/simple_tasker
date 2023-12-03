import { Button } from '@material-tailwind/react'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import {
  addTasks,
  completeTask,
  updateFavorite,
} from '../actions/_private.tasks'
import { TableWithStripedRows } from '../components/Table'

export default function UserProfile() {
  const userData = useLoaderData()
  const auth = useAuth()
  const revalidator = useRevalidator()
  console.log('IN PROFILE', userData)

  const handleStatusChange = async (taskId, statusType, value) => {
    if (statusType === 'favorite') {
      await updateFavorite(taskId, value)
    } else if (statusType === 'completed') {
      await completeTask(taskId, value)
    }
    revalidator.revalidate()
  }

  const handleAddTasks = async (uuid) => {
    await addTasks(uuid)
    revalidator.revalidate()
  }

  return (
    <div className="flex flex-col gap-10 p-10 items-start bg-gray-100 w-full h-full">
      <h1 className="text-4xl">Hello user</h1>

      <div className="w-full h-full">
        <TableWithStripedRows
          tasks={userData.tasks}
          onStatusChange={handleStatusChange}
        />
      </div>
      <div className=" flex gap-10">
        <Button
          variant="outlined"
          onClick={auth.logoutUser}
          className="font-gotham-light px-5 py-2 normal-case text-sm text-text border-text">
          Log Out
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleAddTasks(userData.uuid)}
          className="font-gotham-light px-5 py-2 normal-case text-sm text-text border-text">
          Add tasks
        </Button>
      </div>
    </div>
  )
}
