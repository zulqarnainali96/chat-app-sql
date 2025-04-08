import { createLazyFileRoute } from '@tanstack/react-router'
import Register from '../Pages/Auth/Register/register'
import Loader from '../Components/Loader'

export const Route = createLazyFileRoute('/register')({
  pendingComponent: () => <Loader xxl={true} />,
  component: () => <Register />,
})

