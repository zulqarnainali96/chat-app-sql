import { createLazyFileRoute } from '@tanstack/react-router'
import Login from '../Pages/Auth/Login/login'
import Loader from '../Components/Loader'

export const Route = createLazyFileRoute('/login')({
  pendingComponent: () => <Loader xxl={true} />,
  component: () => <Login />
})