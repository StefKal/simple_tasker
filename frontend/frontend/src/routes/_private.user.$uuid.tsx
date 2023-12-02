import { Button, Card, Typography } from '@material-tailwind/react'
import { useLoaderData, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

export default function UserProfile() {
  const userData = useLoaderData()
  const auth = useAuth()
  console.log('IN PROFILE', userData)

  return (
    <div className="flex flex-col gap-10 items-start bg-gray-100">
      <h1 className="text-4xl">Hello user</h1>

      <div className="w-full p-10">
        <TableWithStripedRows tasks={userData.tasks} />
      </div>
      <Button
        variant="outlined"
        onClick={auth.logoutUser}
        className="font-gotham-light px-5 py-2 normal-case text-sm text-text border-text">
        Log out
      </Button>
    </div>
  )
}
export function TableWithStripedRows({ tasks }) {
  const TABLE_HEAD = ['Task ID', 'Title', 'Completed']

  return (
    <Card className="h-96 w-full rounded-r-lg overflow-y-auto">
      <table className="text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map(({ id, title, completed }) => (
            <tr key={id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal">
                  {id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal">
                  {title}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal">
                  {completed ? 'Yes' : 'No'}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
