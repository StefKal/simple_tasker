import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import Guest from './routes/_guest._index.tsx'
import Login from './routes/_guest.login.tsx'
import Signup from './routes/_guest.signup.tsx'
import NotFound from './components/NotFound.tsx'
import { signupAction } from './actions/_guest.signup_actions.tsx'
import { AuthProvider } from './hooks/auth.tsx'
import UserProfile from './routes/_private.user.$uuid.tsx'
import { ProtectedRoute } from './routes/_private._index.tsx'
import { UserLoader } from './loaders/user.tsx'
import { loginAction } from './actions/_guest.login_actions.tsx'
import { ThemeProvider } from '@material-tailwind/react'

function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" element={<Guest />} />
        <Route path="/login" element={<Login />} action={loginAction} />
        <Route path="/signup" element={<Signup />} action={signupAction} />
        <Route key="/users" path="users" element={<ProtectedRoute />}>
          <Route
            index
            key="/users/index"
            path=":uuid"
            element={<UserProfile />}
            loader={UserLoader}
          />
        </Route>
        ,
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </AuthProvider>
)
