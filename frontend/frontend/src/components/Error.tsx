import { Card, Typography, CardBody } from '@material-tailwind/react'

import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

export function ErrorComponent() {
  return (
    <Card className="h-fit p-2">
      <CardBody>
        <div className="flex items-center gap-2 pb-2">
          <ExclamationCircleIcon className="w-10 h-10 p-0 stroke-red-500 fill-transparent" />

          <Typography
            variant="h3"
            color="red"
            className="inline-flex items-center">
            Error
          </Typography>
        </div>
        <Typography>
          Something went wrong, sorry for the inconvenience
        </Typography>
      </CardBody>
    </Card>
  )
}
