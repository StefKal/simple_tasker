import { Button, Card, Typography } from '@material-tailwind/react'

export function TableWithStripedRows({ tasks, onStatusChange }) {
  const TABLE_HEAD = ['Task ID', 'Title', 'Favorite', '']

  return (
    <Card className="h-auto w-full rounded-r-lg overflow-y-auto">
      <table className="text-left table-fixed">
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
          {tasks.map(({ id, title, completed, is_favorite }) => (
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
                <input
                  type="checkbox"
                  checked={is_favorite}
                  onChange={(e) =>
                    onStatusChange(id, 'favorite', e.target.checked)
                  }
                />
              </td>
              <td className="p-4 text-right">
                <Button
                  className="px-5 py-2 normal-case text-sm text-text border-text bg-transparent border"
                  onClick={() => onStatusChange(id, 'completed', !completed)}>
                  Complete Task
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
