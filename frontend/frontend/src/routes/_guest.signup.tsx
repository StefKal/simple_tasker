import { useActionData } from 'react-router-dom'
import ThankYou from '../components/ThankYou'
import SignupComponent from '../components/Signup'
import { ErrorComponent } from '../components/Error'

export default function Signup() {
  const actionData = useActionData()

  let content
  if (actionData) {
    if (actionData.success) {
      content = <ThankYou />
    } else if (actionData.error) {
      content = <ErrorComponent />
    }
  } else {
    content = <SignupComponent />
  }

  return (
    <div className="flex flex-wrap justify-around p-10 gap-10 bg-gray-100 w-full h-full">
      {content}
    </div>
  )
}
